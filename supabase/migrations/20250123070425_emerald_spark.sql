/*
  # Admin Authentication Setup

  1. Tables
    - Ensure users table exists with role column
    - Add necessary indexes and constraints
  
  2. Security
    - Enable RLS
    - Set up admin-specific policies
    - Ensure proper access control

  3. Admin User
    - Create admin user with proper credentials
    - Set up auth records and profile
*/

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop and recreate users table
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  address TEXT,
  role TEXT DEFAULT 'user',
  avatar_url TEXT,
  settings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT valid_role CHECK (role IN ('user', 'admin'))
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create comprehensive RLS policies
CREATE POLICY "Users can read own data"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id OR role = 'admin');

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id OR role = 'admin');

CREATE POLICY "Users can insert own data"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create admin user with proper setup
DO $$
DECLARE
  _user_id UUID := 'd0d8c19c-1c99-4e9b-9d35-3f831fb8c5c1';
  _email TEXT := 'john@example.com';
  _password TEXT := 'password123';
BEGIN
  -- Create admin in auth.users
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    aud
  )
  VALUES (
    _user_id,
    '00000000-0000-0000-0000-000000000000',
    _email,
    crypt(_password, gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"John Doe"}',
    false,
    'authenticated'
  )
  ON CONFLICT (id) DO NOTHING;

  -- Create admin identity
  INSERT INTO auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    provider_id,
    last_sign_in_at,
    created_at,
    updated_at
  )
  VALUES (
    _user_id,
    _user_id,
    jsonb_build_object(
      'sub', _user_id,
      'email', _email
    ),
    'email',
    _email,
    now(),
    now(),
    now()
  )
  ON CONFLICT (provider_id, provider) DO NOTHING;

  -- Create admin profile
  INSERT INTO users (
    id,
    full_name,
    email,
    role,
    created_at,
    updated_at
  )
  VALUES (
    _user_id,
    'John Doe',
    _email,
    'admin',
    now(),
    now()
  )
  ON CONFLICT (id) DO UPDATE
  SET role = 'admin',
      updated_at = now();
END $$;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Verify setup
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM users 
    WHERE role = 'admin' AND email = 'john@example.com'
  ) THEN
    RAISE EXCEPTION 'Admin user was not created properly';
  END IF;
END $$;