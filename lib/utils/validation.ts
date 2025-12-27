/**
 * Utilities for data normalization and validation
 * Used across API routes, server actions, and database functions
 *
 * @module validation
 */

/**
 * Normalizes a phone number to E.164 format
 *
 * E.164 format: +[country code][number] (no spaces, hyphens, or parentheses)
 * Examples:
 *   "+1 (234) 567-8900" → "+12345678900"
 *   "+33 6 12 34 56 78" → "+33612345678"
 *   "" → null
 *   null → null
 *
 * @param phone - The phone number to normalize
 * @returns Normalized phone number in E.164 format, or null if empty/invalid
 */
export function normalizePhone(phone: string | null | undefined): string | null {
  if (!phone || phone.trim() === '') return null

  // Remove all whitespace, dots, hyphens, parentheses
  // Keep only + and digits
  const cleaned = phone.replace(/[\s\.\-\(\)]/g, '')

  // E.164 must start with +
  if (!cleaned.startsWith('+')) {
    // If it's a local number without country code, return as-is
    // Frontend validation (react-phone-number-input) should catch this
    return cleaned || null
  }

  return cleaned
}

/**
 * Normalizes an email address to lowercase and trims whitespace
 *
 * Examples:
 *   "User@Example.COM  " → "user@example.com"
 *   "" → null
 *   null → null
 *
 * @param email - The email address to normalize
 * @returns Normalized email address, or null if empty
 */
export function normalizeEmail(email: string | null | undefined): string | null {
  if (!email || email.trim() === '') return null
  return email.toLowerCase().trim()
}

/**
 * Liste des TLDs (Top Level Domains) valides les plus courants
 * Utilisé pour détecter les domaines suspects comme gmail.mo, outlook.co, etc.
 */
const VALID_TLDS = [
  // TLDs génériques courants
  'com', 'net', 'org', 'edu', 'gov', 'mil', 'int',
  // TLDs pays les plus utilisés
  'fr', 'de', 'uk', 'ca', 'au', 'jp', 'cn', 'in', 'br', 'mx',
  'it', 'es', 'nl', 'se', 'ch', 'be', 'at', 'dk', 'fi', 'no',
  'pl', 'ru', 'za', 'nz', 'ie', 'pt', 'gr', 'cz', 'ro', 'hu',
  // Afrique francophone
  'ga', 'cm', 'ci', 'sn', 'ml', 'bf', 'ne', 'tg', 'bj', 'td',
  'gn', 'rw', 'bi', 'cd', 'cg', 'cf', 'dj', 'km', 'mg', 'mu',
  'sc', 'tn', 'dz', 'ma', 'mr',
  // Nouveaux TLDs courants
  'io', 'app', 'dev', 'tech', 'online', 'site', 'store', 'info', 'biz'
]

/**
 * Domaines email populaires avec leurs TLDs valides
 * Empêche les erreurs courantes comme gmail.mo, outlook.co, etc.
 */
const POPULAR_EMAIL_DOMAINS: Record<string, string[]> = {
  'gmail': ['com'],
  'googlemail': ['com'],
  'outlook': ['com', 'fr'],
  'hotmail': ['com', 'fr'],
  'yahoo': ['com', 'fr'],
  'icloud': ['com'],
  'protonmail': ['com', 'ch'],
  'zoho': ['com'],
  'aol': ['com'],
  'yandex': ['com', 'ru'],
  'mail': ['ru', 'com'],
  'live': ['com', 'fr'],
  'msn': ['com']
}

/**
 * Valide un email avec vérification stricte du domaine et du TLD
 *
 * Rejette :
 * - Les domaines populaires avec TLD incorrect (gmail.mo, outlook.co)
 * - Les TLDs suspects ou très rares
 * - Les formats d'email invalides
 *
 * @param email - L'email à valider
 * @returns Object avec le statut de validation et un message d'erreur si invalide
 */
export function validateEmailDomain(email: string): {
  valid: boolean
  error?: string
} {
  if (!email || email.trim() === '') {
    return { valid: false, error: 'Email requis' }
  }

  const normalized = normalizeEmail(email)
  if (!normalized) {
    return { valid: false, error: 'Email invalide' }
  }

  // Validation format basique
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(normalized)) {
    return { valid: false, error: 'Format d\'email invalide' }
  }

  // Extraction du domaine et TLD
  const parts = normalized.split('@')
  if (parts.length !== 2) {
    return { valid: false, error: 'Format d\'email invalide' }
  }

  const domain = parts[1]
  const domainParts = domain.split('.')

  if (domainParts.length < 2) {
    return { valid: false, error: 'Domaine invalide' }
  }

  const tld = domainParts[domainParts.length - 1]
  const domainName = domainParts[domainParts.length - 2]

  // Vérification TLD valide
  if (!VALID_TLDS.includes(tld)) {
    return {
      valid: false,
      error: `Extension ".${tld}" non reconnue. Vérifiez votre adresse email.`
    }
  }

  // Vérification domaines populaires (gmail, outlook, etc.)
  if (POPULAR_EMAIL_DOMAINS[domainName]) {
    const validTLDs = POPULAR_EMAIL_DOMAINS[domainName]
    if (!validTLDs.includes(tld)) {
      return {
        valid: false,
        error: `${domainName}.${tld} n'existe pas. Vouliez-vous dire ${domainName}.${validTLDs[0]} ?`
      }
    }
  }

  return { valid: true }
}

/**
 * Normalizes a name (first name or last name) by trimming whitespace
 *
 * Note: Does not convert case or remove accents, as names should preserve
 * original capitalization and diacritics
 *
 * Examples:
 *   "  Jean  " → "Jean"
 *   "José" → "José" (preserves accent)
 *   "" → null
 *
 * @param name - The name to normalize
 * @returns Normalized name, or null if empty
 */
export function normalizeName(name: string | null | undefined): string | null {
  if (!name || name.trim() === '') return null
  return name.trim()
}

/**
 * Validates a password against security requirements
 *
 * Requirements:
 * - At least 8 characters
 * - At least one uppercase letter (A-Z)
 * - At least one lowercase letter (a-z)
 * - At least one digit (0-9)
 * - At least one special character (!@#$%^&*(),.?":{}|<>)
 *
 * @param password - The password to validate
 * @returns Object with validation status and list of errors
 */
export function validatePassword(password: string): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Le mot de passe doit faire au moins 8 caractères')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une majuscule')
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une minuscule')
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins un chiffre')
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*(),.?":{}|<>)')
  }

  return {
    valid: errors.length === 0,
    errors
  }
}
