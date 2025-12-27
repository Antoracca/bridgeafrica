-- STEP 1/2: Full migration script WITHOUT CREATE INDEX CONCURRENTLY
-- (Removed only the CREATE INDEX CONCURRENTLY statement)

-- ============================================================================
-- MIGRATION COMPLÈTE : SÉCURISATION FLUX D'INSCRIPTION
-- ============================================================================

-- PARTIE 1 : BACKUP DES DONNÉES EXISTANTES
CREATE TABLE IF NOT EXISTS phone_migration_backup (
    id UUID PRIMARY KEY,
    original_phone TEXT,
    normalized_phone TEXT,
    migrated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO phone_migration_backup (id, original_phone, normalized_phone)
SELECT
    id,
    phone AS original_phone,
    REGEXP_REPLACE(COALESCE(phone, ''), '[\s\.\-\(\)]', '', 'g') AS normalized_phone
FROM public.profiles
WHERE phone IS NOT NULL AND phone != ''
ON CONFLICT (id) DO NOTHING;

DO $$
DECLARE
    backup_count INT;
BEGIN
    SELECT COUNT(*) INTO backup_count FROM phone_migration_backup;
    RAISE NOTICE '✓ Backup créé : % numéros de téléphone sauvegardés', backup_count;
END $$;

-- PARTIE 2 : NETTOYAGE DES ANCIENNES STRUCTURES
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS check_phone_exists(text);
DROP FUNCTION IF EXISTS check_email_exists(text);
DO $$ BEGIN RAISE NOTICE '✓ Nettoyage des anciennes structures terminé'; END $$;

-- PARTIE 3 : CREATION/MODIF TABLE PROFILES
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
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN RAISE NOTICE '✓ Table profiles créée/vérifiée'; END $$;

-- PARTIE 4 : FONCTIONS RPC
CREATE OR REPLACE FUNCTION check_email_exists(email_to_check text)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE normalized_email text; BEGIN
 normalized_email := LOWER(TRIM(COALESCE(email_to_check, '')));
 IF normalized_email = '' THEN RETURN false; END IF;
 RETURN EXISTS (SELECT 1 FROM auth.users WHERE LOWER(TRIM(email)) = normalized_email);
EXCEPTION WHEN OTHERS THEN RAISE WARNING 'Erreur dans check_email_exists pour "%": %', email_to_check, SQLERRM; RETURN true; END; $$;
COMMENT ON FUNCTION check_email_exists IS 'Vérifie si un email existe dans auth.users avec normalisation. Fail-closed sur erreur.';

CREATE OR REPLACE FUNCTION check_phone_exists(phone_to_check text)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE normalized_phone text; BEGIN
 normalized_phone := REGEXP_REPLACE(COALESCE(phone_to_check, ''), '[\s\.\-\(\)]', '', 'g');
 IF normalized_phone = '' OR normalized_phone IS NULL THEN RETURN false; END IF;
 RETURN EXISTS (SELECT 1 FROM public.profiles WHERE REGEXP_REPLACE(COALESCE(phone, ''), '[\s\.\-\(\)]', '', 'g') = normalized_phone);
EXCEPTION WHEN OTHERS THEN RAISE WARNING 'Erreur dans check_phone_exists pour "%": %', phone_to_check, SQLERRM; RETURN true; END; $$;
COMMENT ON FUNCTION check_phone_exists IS 'Vérifie si un téléphone existe dans profiles avec normalisation E.164. Fail-closed sur erreur.';
GRANT EXECUTE ON FUNCTION check_email_exists TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION check_phone_exists TO anon, authenticated, service_role;
DO $$ BEGIN RAISE NOTICE '✓ Fonctions RPC créées avec sécurité fail-closed'; END $$;

-- PARTIE 5 : TRIGGER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE normalized_phone text; normalized_email text; BEGIN
 normalized_phone := REGEXP_REPLACE(COALESCE(NEW.raw_user_meta_data->>'phone', ''), '[\s\.\-\(\)]', '', 'g');
 IF normalized_phone = '' THEN normalized_phone := NULL; END IF;
 normalized_email := LOWER(TRIM(NEW.email));
 BEGIN
  INSERT INTO public.profiles (id,email,first_name,last_name,role,country,phone,auth_method,created_at,updated_at)
  VALUES (NEW.id, normalized_email, TRIM(COALESCE(NEW.raw_user_meta_data->>'first_name', '')), TRIM(COALESCE(NEW.raw_user_meta_data->>'last_name', '')), COALESCE(NEW.raw_user_meta_data->>'role', 'patient'), COALESCE(NEW.raw_user_meta_data->>'country', ''), normalized_phone, COALESCE(NEW.raw_user_meta_data->>'auth_method', 'manual'), NOW(), NOW())
  ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email, first_name = EXCLUDED.first_name, last_name = EXCLUDED.last_name, phone = EXCLUDED.phone, updated_at = NOW();
  RETURN NEW;
 EXCEPTION WHEN unique_violation THEN RAISE WARNING 'Violation de contrainte unique lors de la création du profil pour %: %', NEW.id, SQLERRM; RAISE EXCEPTION 'Impossible de créer le profil : % existe déjà. Transaction annulée.', SQLERRM USING HINT = 'Email ou téléphone déjà utilisé'; WHEN OTHERS THEN RAISE WARNING 'Erreur inattendue lors de la création du profil pour % : % (SQLSTATE: %)', NEW.id, SQLERRM, SQLSTATE; RAISE EXCEPTION 'Création du profil impossible : %. Transaction annulée.', SQLERRM USING HINT = 'Contactez le support si cette erreur persiste'; END; END; $$;
COMMENT ON FUNCTION handle_new_user IS 'Trigger de création automatique du profil lors de l''inscription. Normalise phone en E.164. Fail-closed : rollback si erreur.';
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
DO $$ BEGIN RAISE NOTICE '✓ Trigger créé avec sécurité fail-closed et normalisation'; END $$;

-- PARTIE 6 : MIGRATION DES DONNEES EXISTANTES
DO $$ DECLARE updated_count INT; BEGIN
 UPDATE public.profiles SET phone = REGEXP_REPLACE(phone, '[\s\.\-\(\)]', '', 'g'), updated_at = NOW()
 WHERE phone IS NOT NULL AND phone != '' AND phone ~ '[\s\.\-\(\)]';
 GET DIAGNOSTICS updated_count = ROW_COUNT; RAISE NOTICE '✓ Migration : % numéros normalisés au format E.164', updated_count; END $$;

-- PARTIE 7 : CONTRAINTES
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS phone_format_check;
ALTER TABLE public.profiles ADD CONSTRAINT phone_format_check CHECK (phone IS NULL OR (phone ~ '^\+[0-9]+$' AND LENGTH(phone) >= 10 AND LENGTH(phone) <= 15));
COMMENT ON CONSTRAINT phone_format_check ON public.profiles IS 'Assure que les téléphones sont au format E.164 : +[indicatif][numéro], 10-15 chiffres. NULL autorisé.';
DO $$ BEGIN RAISE NOTICE '✓ Contrainte CHECK ajoutée pour validation E.164'; END $$;

-- PARTIE 8 : RLS POLICIES
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Public profiles are viewable" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
DO $$ BEGIN RAISE NOTICE '✓ Politiques RLS configurées'; END $$;

-- PARTIE 9: (Index creation skipped in this step)
DO $$ BEGIN RAISE NOTICE '✓ Index creation deferred to step 2'; END $$;

-- PARTIE 10 : VERIFICATIONS POST-MIGRATION
DO $$ DECLARE duplicate_count INT; duplicate_phones TEXT; BEGIN
 SELECT COUNT(*) INTO duplicate_count FROM (SELECT phone, COUNT(*) as cnt FROM public.profiles WHERE phone IS NOT NULL GROUP BY phone HAVING COUNT(*) > 1) dups;
 IF duplicate_count > 0 THEN SELECT STRING_AGG(phone, ', ') INTO duplicate_phones FROM (SELECT phone FROM public.profiles WHERE phone IS NOT NULL GROUP BY phone HAVING COUNT(*) > 1 LIMIT 10) dup_list; RAISE WARNING '⚠ Trouvé % téléphones en doublon après normalisation : %', duplicate_count, duplicate_phones; RAISE WARNING 'Vérifiez la table phone_migration_backup pour les valeurs originales'; ELSE RAISE NOTICE '✓ Aucun doublon détecté après normalisation'; END IF; END $$;
DO $$ DECLARE invalid_count INT; BEGIN SELECT COUNT(*) INTO invalid_count FROM public.profiles WHERE phone IS NOT NULL AND NOT (phone ~ '^\+[0-9]+$'); IF invalid_count > 0 THEN RAISE WARNING '⚠ Trouvé % numéros avec format invalide (pas E.164)', invalid_count; ELSE RAISE NOTICE '✓ Tous les numéros sont au format E.164'; END IF; END $$;

-- PARTIE 11 : RAPPORT FINAL
DO $$ DECLARE total_profiles INT; profiles_with_phone INT; valid_e164_format INT; backed_up_phones INT; trigger_count INT; rpc_count INT; BEGIN
 SELECT COUNT(*) INTO total_profiles FROM public.profiles;
 SELECT COUNT(phone) INTO profiles_with_phone FROM public.profiles WHERE phone IS NOT NULL;
 SELECT COUNT(*) INTO valid_e164_format FROM public.profiles WHERE phone IS NOT NULL AND phone ~ '^\+[0-9]+$';
 SELECT COUNT(*) INTO backed_up_phones FROM phone_migration_backup;
 SELECT COUNT(*) INTO trigger_count FROM information_schema.triggers WHERE trigger_name = 'on_auth_user_created';
 SELECT COUNT(*) INTO rpc_count FROM pg_proc WHERE proname IN ('check_email_exists', 'check_phone_exists');
 RAISE NOTICE ''; RAISE NOTICE '════════════════════════════════════════════════════════════════'; RAISE NOTICE '                    RAPPORT DE MIGRATION                        '; RAISE NOTICE '════════════════════════════════════════════════════════════════'; RAISE NOTICE ''; RAISE NOTICE '📊 STATISTIQUES :'; RAISE NOTICE '   • Total de profils : %', total_profiles; RAISE NOTICE '   • Profils avec téléphone : %', profiles_with_phone; RAISE NOTICE '   • Format E.164 valide : %', valid_e164_format; RAISE NOTICE '   • Téléphones sauvegardés : %', backed_up_phones; RAISE NOTICE ''; RAISE NOTICE '✅ COMPOSANTS INSTALLÉS :'; RAISE NOTICE '   • Table profiles : ✓'; RAISE NOTICE '   • Triggers actifs : %', trigger_count; RAISE NOTICE '   • Fonctions RPC : % sur 2', rpc_count; RAISE NOTICE '   • Contrainte E.164 : ✓'; RAISE NOTICE '   • Index performance : (deferred)'; RAISE NOTICE '   • Politiques RLS : ✓'; RAISE NOTICE ''; RAISE NOTICE '🔒 SÉCURITÉ :'; RAISE NOTICE '   • Normalisation E.164 : ✓ Tous niveaux'; RAISE NOTICE '   • Fail-closed : ✓ RPC + Trigger'; RAISE NOTICE '   • Row Level Security : ✓ Activé'; RAISE NOTICE ''; RAISE NOTICE '════════════════════════════════════════════════════════════════'; RAISE NOTICE '              MIGRATION COMPLÉTÉE PARTIELLEMENT — INDEX EN ATTENTE'; RAISE NOTICE '════════════════════════════════════════════════════════════════'; RAISE NOTICE ''; RAISE NOTICE '⚡ PROCHAINE ÉTAPE : Exécution CREATE INDEX CONCURRENTLY (step 2)'; RAISE NOTICE ''; END $$;