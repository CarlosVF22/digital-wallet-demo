export function generateToken(): string {
    // Genera un número de 6 dígitos y lo convierte en string (asegurando ceros a la izquierda)
    const token = Math.floor(100000 + Math.random() * 900000);
    return token.toString();
}
