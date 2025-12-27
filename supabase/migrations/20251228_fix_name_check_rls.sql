-- ============================================================================
-- FIX: Name Check RLS Bypass
-- ============================================================================
-- Problème: Les utilisateurs anonymes ne peuvent pas vérifier les noms
--           car RLS bloque l'accès à la table profiles
-- Solution: Créer une fonction RPC avec SECURITY DEFINER (comme check_email_exists)
-- ============================================================================

CREATE OR REPLACE FUNCTION check_name_exists(
  first_name_to_check text,
  last_name_to_check text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  normalized_first_name text;
  normalized_last_name text;
BEGIN
  -- Normalize names (trim whitespace)
  normalized_first_name := TRIM(COALESCE(first_name_to_check, ''));
  normalized_last_name := TRIM(COALESCE(last_name_to_check, ''));

  -- If either is empty, return false (not found)
  IF normalized_first_name = '' OR normalized_last_name = '' THEN
    RETURN false;
  END IF;

  -- Check if combination exists (case-insensitive)
  RETURN EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE LOWER(TRIM(first_name)) = LOWER(normalized_first_name)
      AND LOWER(TRIM(last_name)) = LOWER(normalized_last_name)
  );

EXCEPTION
  WHEN OTHERS THEN
    -- Fail open for informational check (not security-critical)
    RAISE WARNING 'Error in check_name_exists for "% %": %', first_name_to_check, last_name_to_check, SQLERRM;
    RETURN false;
END;
$$;

COMMENT ON FUNCTION check_name_exists IS 'Vérifie si un couple prénom/nom existe. INFORMATIONAL ONLY - bypass RLS via SECURITY DEFINER.';

-- Grant execute permissions to anonymous users (needed for registration)
GRANT EXECUTE ON FUNCTION check_name_exists TO anon, authenticated, service_role;

-- Test the function
DO $$
DECLARE
  test_result boolean;
BEGIN
  SELECT check_name_exists('Antoni Lucien', 'Koueni') INTO test_result;
  RAISE NOTICE '✓ Test check_name_exists pour "Antoni Lucien Koueni": %',
    CASE WHEN test_result THEN 'TROUVÉ' ELSE 'PAS TROUVÉ' END;
END $$;

-- Final notice
DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '════════════════════════════════════════════════════════════════';
  RAISE NOTICE '✓ Migration complétée : check_name_exists créée avec RLS bypass';
  RAISE NOTICE '════════════════════════════════════════════════════════════════';
  RAISE NOTICE '';
END $$;
