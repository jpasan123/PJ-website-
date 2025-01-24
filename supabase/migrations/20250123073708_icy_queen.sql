-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create function to handle Google admin authentication
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

-- Create trigger for Google auth
DROP TRIGGER IF EXISTS on_google_auth_user ON auth.users;
CREATE TRIGGER on_google_auth_user
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_google_admin_auth();

-- Update existing user if exists
DO $$
BEGIN
  UPDATE users
  SET role = 'admin'
  WHERE email = 'selvampj86@gmail.com';
END $$;