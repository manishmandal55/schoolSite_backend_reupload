import jwt from 'jsonwebtoken';

export const authenticate = (req,res,next)=>{
    try{
         const token = req.header('Authorization')?.replace('Bearer ', '');
         if (!token){
            const error = new Error('Access denied. No token provided');
            error.statusCode = 401;
            error.status = 'Failed';
            throw error;
         }
         const decoded = jwt.verify(token,process.env.JWT_SECRET);
         req.adminId = decoded.adminId;
         next();
         
    } catch(error){
        if (error.statusCode) {
            next(error);
        } else {
            const authError = new Error('Invalid token');
            authError.statusCode = 401;
            authError.status = 'Failed';
            next(authError);
        }
    }
};
