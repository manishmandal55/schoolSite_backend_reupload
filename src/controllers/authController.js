import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { promisepool } from '../config/database.js';

const generateToken = (adminId) =>{
    return jwt.sign({adminId},process.env.JWT_SECRET,{expiresIn:'24h'});
};

export const admainLogin = async (req,res,next)=>{
    try{
        const {email,password}=req.body;
        if (!email || !password) {
            const error = new Error('Email and password required');
            error.statusCode = 400;
            error.status = 'Failed';
            throw error;
    }
    const [admins]=await promisepool.execute(
        'select * FROM admin WHERE email=?',
        [email]
    );
    if (admins.length === 0) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            error.status = 'Failed';
            throw error;
        }
        const admin = admins[0];
        
        //  bcrypt paxi add garne
        // if(password!='admin'){
        // const isPasswordValid = await bcrypt.compare(password, admin.password);
        // if (!isPasswordValid) {
        
        let isPasswordValid = false;
        if (admin.password.startsWith('$2')) {
            isPasswordValid = await bcrypt.compare(password, admin.password);
        } else {
            isPasswordValid = password === admin.password;
        }

        if (!isPasswordValid) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            error.status = 'Failed';
            throw error;
        }


        const token = generateToken(admin.id);

        res.json({
            success:true,
            message:'login sucessful',
            data:{
                token,
                admin:{
                    id:admin.id,
                    email:admin.email
                }
            }
        });
} catch(error){
    console.error('login error:',error);
    next(error);
}
};

export const getCurrentAdmin = async(req,res,next)=>{
    try{
        const [admins]=await promisepool.execute(
            'SELECT id, email, created_at FROM admin WHERE id=?',
            [req.adminId]
        );
        if (admins.length === 0) {
            const error = new Error('Admin not found');
            error.statusCode = 404;
            error.status = 'Failed';
            throw error;
        }

        res.json({
            success:true,
            data:admins[0]
        });


    } catch(error){
        console.error('getCurrentAdmin error:',error);
        next(error);
    }

};
