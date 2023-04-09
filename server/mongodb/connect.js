import mongoose from "mongoose"

export const connectDB = (url) =>{
    mongoose.set('strictQuery', true)
    mongoose.connect(url).then(()=> console.log('MongoDB Works!')).catch((error) => console.log(error))
}