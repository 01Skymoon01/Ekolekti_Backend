import jwt from 'jsonwebtoken'

// Expires in 30 days
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

export default generateToken