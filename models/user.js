const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // npm install --save bcryptjs
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    console.log("generated salt", salt);
    console.log("original password", this.password);
    this.password = await bcrypt.hash(this.password, salt);
    console.log(this.password);
});

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);