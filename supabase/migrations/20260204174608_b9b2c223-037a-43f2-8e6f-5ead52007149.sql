-- Fix SECURITY DEFINER functions with proper search_path
-- Adding pg_catalog, pg_temp to prevent search_path injection attacks

-- Fix has_role_by_name function
CREATE OR REPLACE FUNCTION public.has_role_by_name(_user_id UUID, _role_name TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog, pg_temp, public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles ur
        JOIN public.roles r ON ur.role_id = r.id
        WHERE ur.user_id = _user_id
          AND r.name = _role_name
    )
$$;

-- Fix is_org_member function
CREATE OR REPLACE FUNCTION public.is_org_member(_user_id UUID, _org_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog, pg_temp, public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.org_memberships
        WHERE user_id = _user_id
          AND org_id = _org_id
          AND status = 'active'
    )
$$;

-- Move pg_trgm extension from public to extensions schema
-- First create extensions schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS extensions;

-- Drop and recreate pg_trgm in extensions schema
DROP EXTENSION IF EXISTS pg_trgm CASCADE;
CREATE EXTENSION IF NOT EXISTS pg_trgm SCHEMA extensions;