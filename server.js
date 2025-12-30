import app from './src/app.js';
import { testConnection } from './src/config/database.js';

const PORT= process.env.PORT || 5000;
const startServer = async() =>{
    try{
        const dbConnected = await testConnection();
        if(!dbConnected){
            console.log("cannot start sever without dtabase connection");
            process.exit(1);

        }
        app.listen(PORT,()=>{
            console.log(`server is running at port: ${PORT}`);
        });
    } catch(error){
        console.error('failed to start serverr',error);
        process.exit(1);
    }
};


startServer();