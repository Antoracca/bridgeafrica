-- MIGRATION: Sécurisation et Unicité des Données
-- À exécuter dans l'éditeur SQL de Supabase pour garantir l'intégrité de l'inscription.

-- 1. Contrainte d'unicité sur le téléphone dans la table profiles
-- Cela empêche physiquement d'avoir deux profils avec le même numéro.
ALTER TABLE public.profiles
ADD CONSTRAINT profiles_phone_unique UNIQUE (phone);

-- 2. Fonction RPC pour vérifier l'existence d'un email dans auth.users (Temps réel)
-- Cette fonction permet à l'API de vérifier si un email est pris, MÊME s'il n'est pas confirmé.
CREATE OR REPLACE FUNCTION check_email_exists(email_to_check text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (SELECT 1 FROM auth.users WHERE email = email_to_check);
END;
$$;

-- 3. Fonction RPC pour vérifier l'existence d'un téléphone dans profiles (Temps réel)
-- Sécurisé pour être appelé depuis l'API sans exposer toute la table.
CREATE OR REPLACE FUNCTION check_phone_exists(phone_to_check text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (SELECT 1 FROM public.profiles WHERE phone = phone_to_check);
END;
$$;

-- 4. Accorder les permissions à l'utilisateur de l'API (anon/service_role)
GRANT EXECUTE ON FUNCTION check_email_exists TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION check_phone_exists TO anon, authenticated, service_role;
