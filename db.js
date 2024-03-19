const mongoose = require("mongoose");
const User = require("./models/userModel")

const createDefaultUser = async () => {
    try {
        const existingUser = await User.findOne({ email: 'Amjad@desolint.com' });
        if (!existingUser) {
            const defaultUser = new User({
                email: 'Amjad@desolint.com',
                password: '123456abc' // Set your default password here
            });
            await defaultUser.save();
            console.log('Default user created successfully.');
        } else {
            console.log('Default user already exists.');
        }
    } catch (error) {
        console.error('Error creating default user:', error);
    }
};

const connectDB = (URL) => {
    return mongoose.connect(URL).then(() => {
        return createDefaultUser()
    })
};


  
module.exports = connectDB;