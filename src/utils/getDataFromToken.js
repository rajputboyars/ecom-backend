import jwt from "jsonwebtoken"


export const getDataFromToken = (req) => {

    try {
        
        const token = req.cookies?.token || ''
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        return decodedToken.id

    } catch (error) {
        throw new Error(error.message)
    }
    
}