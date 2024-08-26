import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const jobsHistorySchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        maxlength: 70,
    },

    description: {
        type: String,
        trim: true
    },
    salary: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
    },
    interviewDate: {
        type: Date,
    },
    applicationStatus: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },



}, { timestamps: true })

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, `first name is required`],
        maxlength: 32
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, `last name is required`],
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: [true, `email is required`],
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: [true, `password is required`],
        minlength: [6, `password must have atleast 6 characters`]
    },
    jobHistory: [jobsHistorySchema],
    role: {
        type: Number,
        default: 0,
        enum: [0, 1]
    }


}, { timestamps: true });

//encrypting password before saving

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    else {
        this.password = await bcrypt.hash(this.password, 10)
    }

})

//compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

//return a jwt token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, { expiresIn: 3600 })
}



const User = mongoose.model("User", userSchema);

export default User;