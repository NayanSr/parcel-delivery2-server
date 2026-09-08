const mongoose= require("mongoose");

const connectDB= async()=>{
    // const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } }; // New
    try {
        const conn= await mongoose.connect(process.env.MONGO_URI);
        // await mongoose.connection.db.admin().command({ ping: 1 }); // new
        console.log(`MongoDB Connect: ${conn.connection.host}`);

    } catch (error) {
        console.error(`Error: ${error.message}`);
       
        process.exit();
    }
}


// export default connectDB; >> need  "type": "module"
module.exports= connectDB; 