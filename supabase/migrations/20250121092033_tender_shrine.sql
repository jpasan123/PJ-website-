/*
  # Admin Role Setup

  1. Changes
    - Add role column to users table
    - Create admin role enum
    - Add admin-specific policies
    - Create initial admin user

  2. Security
    - Enable RLS for admin-specific tables
    - Add policies for admin access
*/

-- Add role column to users table if it doesn't exist
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'role'
  ) THEN
    ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user';
  END IF;
END $$;

-- Create admin-specific policies
CREATE POLICY "Admins can read all users"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT id FROM users WHERE role = 'admin'
  ));

CREATE POLICY "Admins can update all users"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (
    SELECT id FROM users WHERE role = 'admin'
  ));

-- Create admin-specific tables
CREATE TABLE IF NOT EXISTS admin_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can access logs"
  ON admin_logs
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (
    SELECT id FROM users WHERE role = 'admin'
  ));

-- Create admin dashboard settings
CREATE TABLE IF NOT EXISTS admin_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB,
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can manage settings"
  ON admin_settings
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (
    SELECT id FROM users WHERE role = 'admin'
  ));

-- Create indexes
CREATE INDEX IF NOT EXISTS users_role_idx ON users(role);
CREATE INDEX IF NOT EXISTS admin_logs_admin_id_idx ON admin_logs(admin_id);
CREATE INDEX IF NOT EXISTS admin_logs_created_at_idx ON admin_logs(created_at DESC);