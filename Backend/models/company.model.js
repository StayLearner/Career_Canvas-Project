import { application } from "express";
import mongoose  from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type:String,
    },
    website:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobType:{
        type: String,
        required: true
    },
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required: true
    },
    created_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    applications: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
    }
]  
});

export const Job =  mongoose.model("Job", jobschema);

