-- Drop existing RLS policies for products
DROP POLICY IF EXISTS "Anyone can read products" ON products;
DROP POLICY IF EXISTS "Admins can insert products" ON products;
DROP POLICY IF EXISTS "Admins can update products" ON products;
DROP POLICY IF EXISTS "Admins can delete products" ON products;

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create new RLS policies for products
CREATE POLICY "Anyone can read products"
  ON products FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin email can manage products"
  ON products
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'selvampj86@gmail.com');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);