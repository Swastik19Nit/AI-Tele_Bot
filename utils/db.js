import mongoose from 'mongoose';
const connect = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        throw new Error("Error connecting to Mongoose");
    }
}

export default connect; 
