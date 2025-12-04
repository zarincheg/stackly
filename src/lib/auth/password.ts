import bcrypt from "bcryptjs"

/**
 * Hashes a password using bcrypt
 * @param password - Plain text password
 * @returns Hashed password
 */
export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 12
    return bcrypt.hash(password, saltRounds)
}

/**
 * Verifies a password against a hash
 * @param password - Plain text password
 * @param hashedPassword - Hashed password to compare against
 * @returns True if password matches
 */
export async function verifyPassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
}

/**
 * Validates password strength
 * @param password - Password to validate
 * @returns Validation result with errors if any
 */
export function validatePasswordStrength(password: string): {
    isValid: boolean
    errors: string[]
} {
    const errors: string[] = []

    if (password.length < 8) {
        errors.push("Password must be at least 8 characters long")
    }

    if (!/(?=.*[a-z])/.test(password)) {
        errors.push("Password must contain at least one lowercase letter")
    }

    if (!/(?=.*\d)/.test(password)) {
        errors.push("Password must contain at least one number")
    }

    return {
        isValid: errors.length === 0,
        errors,
    }
}
