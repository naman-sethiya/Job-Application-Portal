import mongoose from 'mongoose';


const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, `Title is required`],
        maxlength: 70
    },
    description: {
        type: String,
        trim: true,
        required: [true, `Description is required`],
    },
    salary: {
        type: String,
        trim: true,
        required: [true, `Salary is required`],
    },
    location: {
        type: String,
    },
    available: {
        type: Boolean,
        default: true
    },
    jobType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobType",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true

    },
    appliedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]


}, { timestamps: true });


const Job = mongoose.model("Job", jobSchema);

export default Job;