import jwt from 'jsonwebtoken';

//
const ACCESS_SECRET = 'secret12345utd';

export const generateAccessToken = (userId: string): string => {
    return jwt.sign(
        { userId },
        ACCESS_SECRET,
        {
            expiresIn: '15m'
        }
    );
};

// Función adicional para verificar tokens
export const verifyAccessToken = (token: string): any => {
    try {
        return jwt.verify(token, ACCESS_SECRET);
    } catch (error) {
        throw new Error('Token inválido');
    }
};