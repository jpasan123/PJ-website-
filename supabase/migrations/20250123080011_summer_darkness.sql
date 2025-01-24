-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create or replace function to handle Google admin authentication
CREATE OR REPLACE FUNCTION handle_google_admin_auth()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the email matches our admin email
  IF NEW.email = 'selvampj86@gmail.com' THEN
    -- Insert or update user profile with admin role
    INSERT INTO public.users (
      id,
      full_name,
      email,
      role,
      avatar_url,
      created_at,
      updated_at
    )
    VALUES (
      NEW.id,
      NEW.raw_user_meta_data->>'full_name',
      NEW.email,
      'admin',
      NEW.raw_user_meta_data->>'avatar_url',
      NOW(),
      NOW()
    )
    ON CONFLICT (id) DO UPDATE
    SET 
      role = 'admin',
      full_name = NEW.raw_user_meta_data->>'full_name',
      avatar_url = NEW.raw_user_meta_data->>'avatar_url',
      updated_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop and recreate trigger for Google auth
DROP TRIGGER IF EXISTS on_google_auth_user ON auth.users;
CREATE TRIGGER on_google_auth_user
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_google_admin_auth();

-- Create products table if it doesn't exist
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category_id UUID,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on products table
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for products
CREATE POLICY "Anyone can read products"
  ON products FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.jwt() ->> 'email' = 'selvampj86@gmail.com' OR
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (
    auth.jwt() ->> 'email' = 'selvampj86@gmail.com' OR
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (
    auth.jwt() ->> 'email' = 'selvampj86@gmail.com' OR
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);