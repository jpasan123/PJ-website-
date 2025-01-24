-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create new admin user
DO $$
DECLARE
  _user_id UUID := uuid_generate_v4();
  _email TEXT := 'selvampj86@gmail.com';
  _password TEXT := 'pj@12345678';
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
    '{"full_name":"PJ Admin"}',
    false,
    'authenticated'
  )
  ON CONFLICT (email) DO NOTHING;

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
    'PJ Admin',
    _email,
    'admin',
    now(),
    now()
  )
  ON CONFLICT (email) DO UPDATE
  SET role = 'admin',
      updated_at = now();
END $$;

-- Verify new admin setup
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM users 
    WHERE role = 'admin' AND email = 'selvampj86@gmail.com'
  ) THEN
    RAISE EXCEPTION 'New admin user was not created properly';
  END IF;
END $$;