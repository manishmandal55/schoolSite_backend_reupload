import dotenv from 'dotenv';
// import mysql from 'mysql2';
import mysql from 'mysql2/promise';
dotenv.config();

const promisepool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
});

// const promisepool=pool.promise();

const testConnection = async()=>{
    try{
         const [rows] = await promisepool.query('SELECT 1 + 1 AS result');
        console.log("Database connected sucessfully")
        return true;
    } catch(error){
        console.error("database connection failed:",error.message)
        return false;
    }
    
};

export {promisepool,testConnection};
