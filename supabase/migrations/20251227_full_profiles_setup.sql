-- MIGRATION COMPLETE: REINITIALISATION TABLE PROFILES & TRIGGER
-- Copiez tout ce contenu dans l'éditeur SQL de Supabase et exécutez-le.

-- 1. Nettoyage (Attention: supprime les anciennes fonctions/triggers pour repartir propre)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 2. Création de la table profiles (si elle n'existe pas)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    phone TEXT UNIQUE,
    country TEXT,
    city TEXT,
    avatar_url TEXT,
    allergies TEXT,
    role TEXT DEFAULT 'patient'::TEXT,
    auth_method TEXT CHECK (auth_method IN ('manual', 'google', 'apple')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activation RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Fonction Trigger Robuste pour la création automatique de profil
-- Cette version gère l'insertion ET la mise à jour en cas de conflit (doublon id)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (
        id,
        email,
        first_name,
        last_name,
        role,
        country,
        phone,
        auth_method,
        created_at,
        updated_at
    )
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'role', 'patient'),
        COALESCE(NEW.raw_user_meta_data->>'country', ''),
        -- Gestion correcte du téléphone: s'il est null ou vide, on insère NULL pour respecter la contrainte UNIQUE
        NULLIF(NEW.raw_user_meta_data->>'phone', ''), 
        COALESCE(NEW.raw_user_meta_data->>'auth_method', 'manual'),
        NOW(),
        NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        last_name = EXCLUDED.last_name,
        first_name = EXCLUDED.first_name,
        updated_at = NOW();

    RETURN NEW;
EXCEPTION WHEN OTHERS THEN
    -- Log l'erreur dans les logs Postgres sans bloquer l'inscription (Fail Open)
    RAISE WARNING 'Erreur lors de la création du profil pour %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Attachement du Trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 5. Politiques de Sécurité (RLS)
-- Nettoyage des anciennes policies pour éviter les doublons
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Public profiles are viewable" ON public.profiles;

-- Politique: Chacun voit son propre profil
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT
    USING (auth.uid() = id);

-- Politique: Chacun modifie son propre profil
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE
    USING (auth.uid() = id);

-- Politique: Création (gérée par le trigger, mais utile si insertion manuelle via API)
CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT
    WITH CHECK (auth.uid() = id);

-- 6. Vérification finale (Pour vous rassurer)
SELECT 'Table profiles' as verification, count(*) as status FROM information_schema.tables WHERE table_name = 'profiles' AND table_schema = 'public'
UNION ALL
SELECT 'Trigger active', count(*) FROM information_schema.triggers WHERE trigger_name = 'on_auth_user_created';
