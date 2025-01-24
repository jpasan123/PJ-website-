/*
  # Create Buket User Profile

  1. Changes:
    - Add new user "buket" to auth.users
    - Create identity for buket with proper provider_id
    - Create user profile for buket in public.users table

  2. Security:
    - Maintain data integrity
    - Follow Supabase auth standards
    - Use ON CONFLICT to prevent duplicates
*/

-- First create auth user
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
VALUES
  (
    'f7g8h9i0-j1k2-7h8i-3j4k-8l9m0n1o2p3',
    '00000000-0000-0000-0000-000000000000',
    'buket@example.com',
    crypt('password123', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Buket"}',
    false,
    'authenticated'
  )
ON CONFLICT (id) DO NOTHING;

-- Create identity with provider_id
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
VALUES
  (
    'f7g8h9i0-j1k2-7h8i-3j4k-8l9m0n1o2p3',
    'f7g8h9i0-j1k2-7h8i-3j4k-8l9m0n1o2p3',
    '{"sub":"f7g8h9i0-j1k2-7h8i-3j4k-8l9m0n1o2p3","email":"buket@example.com"}',
    'email',
    'buket@example.com',
    now(),
    now(),
    now()
  )
ON CONFLICT (provider_id, provider) DO NOTHING;

-- Create user profile
INSERT INTO public.users (
  id,
  full_name,
  email,
  phone,
  address,
  created_at,
  updated_at
)
VALUES
  (
    'f7g8h9i0-j1k2-7h8i-3j4k-8l9m0n1o2p3',
    'Buket',
    'buket@example.com',
    '+1234567890',
    '789 Pine St, Village',
    now(),
    now()
  )
ON CONFLICT (id) DO NOTHING;