import mongoose from 'mongoose'

const mongoUrl = process.env.MONGODB as string

const connectDb = async (): Promise<void> => {
     try{
        if(mongoose.connection.readyState >= 1){
            return;
        }
        await mongoose.connect(mongoUrl)
        console.log('mongodb connected');
     }catch(err){
        console.log(err);
        throw new Error('mongodb is not connected')
     }
}

export default connectDb