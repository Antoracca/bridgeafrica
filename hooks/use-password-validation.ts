import { useMemo } from 'react'

export interface PasswordStrength {
  score: number
  requirements: {
    length: boolean
    uppercase: boolean
    lowercase: boolean
    number: boolean
    special: boolean
  }
  message: string
  color: string
}

export function usePasswordValidation(password: string): PasswordStrength {
  return useMemo(() => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }

    const scoreCount = Object.values(requirements).filter(Boolean).length

    let message = ''
    let color = 'bg-gray-200'

    if (password.length === 0) {
      message = ''
      color = 'bg-gray-200'
    } else if (scoreCount <= 2) {
      message = 'Faible'
      color = 'bg-red-500'
    } else if (scoreCount <= 3) {
      message = 'Moyen'
      color = 'bg-yellow-500'
    } else if (scoreCount <= 4) {
      message = 'Bon'
      color = 'bg-blue-500'
    } else {
      message = 'Excellent'
      color = 'bg-green-500'
    }

    return {
      score: (scoreCount / 5) * 100,
      requirements,
      message,
      color,
    }
  }, [password])
}
