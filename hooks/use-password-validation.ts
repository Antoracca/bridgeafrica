import { useState, useEffect } from 'react'

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
  const [strength, setStrength] = useState<PasswordStrength>({
    score: 0,
    requirements: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false,
    },
    message: '',
    color: 'bg-gray-200',
  })

  useEffect(() => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }

    const score = Object.values(requirements).filter(Boolean).length

    let message = ''
    let color = 'bg-gray-200'

    if (password.length === 0) {
      message = ''
      color = 'bg-gray-200'
    } else if (score <= 2) {
      message = 'Faible'
      color = 'bg-red-500'
    } else if (score <= 3) {
      message = 'Moyen'
      color = 'bg-yellow-500'
    } else if (score <= 4) {
      message = 'Bon'
      color = 'bg-blue-500'
    } else {
      message = 'Excellent'
      color = 'bg-green-500'
    }

    setStrength({
      score: (score / 5) * 100,
      requirements,
      message,
      color,
    })
  }, [password])

  return strength
}