import User from "../models/userModel.js";
import ErrorResponse from "../utils/errorResponse.js";
import Job from "../models/jobModel.js";
import mongoose from "mongoose";
//load all users
const allUsers = async (req, res, next) => {

    //pagination
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await User.find({}).estimatedDocumentCount();

    try {
        const users = await User.find().sort({ createdAt: -1 }).select(`-password`)
            .skip(pageSize * (page - 1))
            .limit(pageSize)

        res.status(200).json({
            success: true,
            users,
            page,
            pages: Math.ceil(count / pageSize),
            count
        })
        next();
    } catch (error) {
        return next(error);
    }
}

//single user
const singleUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            success: true,
            user
        })
        next();
    } catch (error) {
        return next(error);
    }
}

//edit user
const editUser = async (req, res, next) => {
    const adminId = req.user._id; // ID of the admin making the request
    const userId = req.params.id;
    const { appliedJob, isAdmin, jobStatus } = req.body; // jobTitle, newStatus, and role are being sent in the request

    try {
        // Fetch the user to be edited
        const user1 = await User.findById(userId);
        if (!user1) {
            return next(new ErrorResponse("User not found", 404));
        }

        console.log(appliedJob);

        // Check if the job with the provided title is created by the admin, only if appliedJob is provided
        if (appliedJob) {
            const jobToUpdate = user1.jobHistory.find(job => job.id === appliedJob);
            if (!jobToUpdate) {
                return next(new ErrorResponse("Job not found", 404));
            }

            if (jobToUpdate.user.toString() !== adminId.toString()) {
                return next(new ErrorResponse("The selected job has not been created by you", 404));
            }

            // Update the application status of the job if jobStatus is provided
            if (jobStatus) {
                jobToUpdate.applicationStatus = jobStatus;
            }
        }

        // Update the user role if isAdmin is provided and the admin has the necessary permissions
        if (isAdmin !== undefined) {
            if (req.user.role !== 1) { // Check if the admin is actually an admin
                return next(new ErrorResponse("Unauthorized to change user roles", 403));
            }
            user1.role = isAdmin;
        }

        // Save the updated user document
        const updatedUser = await user1.save();

        res.status(200).json({
            success: true,
            user: updatedUser
        });

    } catch (error) {
        return next(error);
    }
};


const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        res.status(200).json({
            success: true,
            message: "user deleted successfully"
        })
        next();
    } catch (error) {
        return next(error);
    }

}


const createUserJobsHistory = async (req, res, next) => {
    const { title, description, salary, location, id } = req.body;
    console.log(id);
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        if (!currentUser) {
            return next(new ErrorResponse("You must log in", 401));
        }

        // Find the job by title (or use a unique identifier like job ID if available)
        const job = await Job.findOne({ _id: mongoose.Types.ObjectId(id) });
        console.log(job);
        if (!job) {
            return next(new ErrorResponse("Job not found", 404));
        }

        // Check if the job is available
        if (!job.available) {
            return next(new ErrorResponse("Sorry, we aren't accepting applications for this role", 400));
        }

        // Check if the user has already applied for this job
        const jobAlreadyApplied = currentUser.jobHistory.some(jobHistory => jobHistory.title === title);
        const userAlreadyApplied = job.appliedUsers.includes(req.user._id);

        if (jobAlreadyApplied || userAlreadyApplied) {
            return next(new ErrorResponse("You have already applied for this job", 400));
        }

        // Add job to user's job history
        const addJobHistory = {
            title,
            description,
            salary,
            location,
            user: job.user
        };

        console.log(addJobHistory);

        currentUser.jobHistory.push(addJobHistory);
        await currentUser.save();

        // Add user ID to the job's appliedUsers array
        job.appliedUsers.push(req.user._id);
        await job.save();

        res.status(200).json({
            success: true,
            currentUser
        });

    } catch (error) {
        return next(error);
    }
};



export { allUsers, singleUser, editUser, deleteUser, createUserJobsHistory };