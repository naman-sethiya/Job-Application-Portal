import Job from '../models/jobModel.js';
import JobType from '../models/jobTypeModel.js';
import ErrorResponse from '../utils/errorResponse.js';

const createJob = async (req, res, next) => {
    try {
        const job = await Job.create({
            title: req.body.title,
            description: req.body.description,
            salary: req.body.salary,
            location: req.body.location,
            jobType: req.body.jobType,
            user: req.user.id
        });
        res.status(201).json({
            success: true,
            job
        })
    } catch (error) {
        next(error);
    }
}

// display single job

const singleJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id).populate('jobType', 'jobTypeName');
        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        next(error);
    }
}

//update job by id

const updateJob = async (req, res, next) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.job_id, req.body, { new: true }).populate('jobType', 'jobTypeName').populate('user', 'firstName lastName');
        res.status(200).json({
            success: true,
            job
        })
    } catch (error) {
        next(error);
    }
};

const deleteJob = async (req, res, next) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.job_id);
        res.status(200).json({
            success: true,
            message: "job deleted."
        })
    } catch (error) {
        next(error);
    }
}



//show all jobs

const showJobs = async (req, res, next) => {
    const keyword = req.query.keyword ? {
        title: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}


    // filter jobs by category ids
    let ids = [];
    const jobTypeCategory = await JobType.find({}, { _id: 1 });
    jobTypeCategory.forEach(cat => {
        ids.push(cat._id);
    })

    let cat = req.query.cat;
    let categ = cat !== '' ? cat : ids;


    //jobs by location
    let locations = [];
    const jobByLocation = await Job.find({}, { location: 1 });
    jobByLocation.forEach(val => {
        locations.push(val.location);
    });
    let setUniqueLocation = [...new Set(locations)];
    let location = req.query.location;
    let locationFilter = location !== '' ? location : setUniqueLocation;


    //enable pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    //const count = await Job.find({}).estimatedDocumentCount();
    const count = await Job.find({ ...keyword, jobType: categ, location: locationFilter }).countDocuments();

    try {
        const jobs = await Job.find({ ...keyword, jobType: categ, location: locationFilter }).sort({ createdAt: -1 }).populate('jobType', 'jobTypeName').populate('user', 'firstName').populate('appliedUsers', 'email').skip(pageSize * (page - 1)).limit(pageSize)
        res.status(200).json({
            success: true,
            jobs,
            page,
            pages: Math.ceil(count / pageSize),
            count,
            setUniqueLocation

        })
    } catch (error) {
        next(error);
    }
};

const allJobs = async (req, res) => {

    try {
        const jobs = await Job.find().populate('jobType', 'jobTypeName').populate('user').populate('appliedUsers', 'email');
        res.status(200).json({
            success: true,
            jobs
        })
    } catch (error) {
        res.json({
            status: false,
            error: error
        })
        next(error);
    }
}

export { createJob, singleJob, updateJob, showJobs, deleteJob, allJobs };