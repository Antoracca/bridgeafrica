-- =====================================================
-- MISE À JOUR DU TRIGGER POUR COPIER LA PHOTO GOOGLE
-- =====================================================

-- Supprimer l'ancien trigger et fonction
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- Créer la nouvelle fonction qui copie AUSSI la photo de profil
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_role TEXT;
  user_first_name TEXT;
  user_last_name TEXT;
  user_phone TEXT;
  user_country TEXT;
  user_auth_method TEXT;
  user_avatar_url TEXT;
BEGIN
  -- Extraire les métadonnées
  user_role := COALESCE(NEW.raw_user_meta_data->>'role', 'patient');
  user_first_name := COALESCE(
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'given_name'
  );
  user_last_name := COALESCE(
    NEW.raw_user_meta_data->>'last_name',
    NEW.raw_user_meta_data->>'family_name'
  );
  user_phone := NEW.raw_user_meta_data->>'phone';
  user_country := COALESCE(NEW.raw_user_meta_data->>'country', 'GA');
  user_auth_method := COALESCE(NEW.raw_user_meta_data->>'auth_method', 'manual');

  -- ✅ NOUVEAU : Extraire la photo de profil Google/OAuth
  user_avatar_url := COALESCE(
    NEW.raw_user_meta_data->>'picture',
    NEW.raw_user_meta_data->>'avatar_url'
  );

  -- Insérer le profil avec la photo
  INSERT INTO public.profiles (
    id,
    email,
    role,
    first_name,
    last_name,
    phone,
    country,
    auth_method,
    avatar_url,  -- ✅ NOUVEAU CHAMP
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    NEW.email,
    user_role,
    user_first_name,
    user_last_name,
    user_phone,
    user_country,
    user_auth_method,
    user_avatar_url,  -- ✅ COPIE DE LA PHOTO GOOGLE
    NOW(),
    NOW()
  );

  RETURN NEW;
END;
$$;

-- Recréer le trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- =====================================================
-- METTRE À JOUR LES PROFILS EXISTANTS
-- Copier les photos Google pour les utilisateurs qui n'en ont pas
-- =====================================================

UPDATE public.profiles p
SET avatar_url = COALESCE(
  u.raw_user_meta_data->>'picture',
  u.raw_user_meta_data->>'avatar_url'
)
FROM auth.users u
WHERE p.id = u.id
AND p.avatar_url IS NULL
AND (
  u.raw_user_meta_data->>'picture' IS NOT NULL
  OR u.raw_user_meta_data->>'avatar_url' IS NOT NULL
);

-- Vérification
SELECT
  id,
  email,
  avatar_url,
  CASE
    WHEN avatar_url IS NOT NULL THEN '✅ Photo présente'
    ELSE '⚠️ Pas de photo'
  END as status
FROM public.profiles
LIMIT 10;
