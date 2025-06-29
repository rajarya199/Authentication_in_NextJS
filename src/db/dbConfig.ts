import mongoose from 'mongoose';

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URL! )
        const connection=mongoose.connection;
        connection.on('connected',()=>{
            console.log('MongoDB connected successfully');
        })
        connection.on("error",(err)=>{
            console.log('mongodb connection error,please make sure db is up and running:'+err)
            process.exit()
        })
    }
    catch(error){
        console.log("something went wrong in connecting db:",error)

    }
}