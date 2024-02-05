'use server'
import { cookies } from 'next/headers'

/**
 * This actually works however
 * when implementing this throws multiple warnings and errors
 * * This still runs even when throwing errors.
 */

export async function handleLogin(sessionData: any) {
  const encryptedSessionData = sessionData // Encrypt your session data
  cookies().set('session', encryptedSessionData, {
    httpOnly: true,
    secure: true,
    maxAge: 20, // 20 seconds from the moment you login
  })
  // Redirect or handle the response after setting the cookie
}

export async function getSessionData(): Promise<string | null> {
  const encryptedSessionData = cookies().get('session')?.value
  return encryptedSessionData ? encryptedSessionData : null
}

export async function deleteSessionData() {
  cookies().delete('session')
}
