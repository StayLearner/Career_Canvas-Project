import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import { User } from "../models/user.model.js";
import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";

dotenv.config({ path: "../.env" });

const locations = [
    "Kolkata",
    "Bangalore",
    "Hyderabad",
    "Pune",
    "Mumbai",
    "Delhi",
    "Noida",
    "Gurugram",
    "Chennai",
    "Remote"
];

const skillsPool = [
    "HTML", "CSS", "JavaScript", "TypeScript", "React", "Redux Toolkit",
    "Tailwind CSS", "Next.js", "Node.js", "Express.js", "MongoDB",
    "Mongoose", "REST API", "JWT", "Postman", "Git", "GitHub",
    "AWS", "Cloudinary", "SQL", "MySQL", "PostgreSQL", "Java",
    "Python", "Docker", "CI/CD", "Problem Solving", "DSA",
    "API Debugging", "Testing", "GraphQL", "Redis"
];

const recruiterNames = [
    "Aarav Sharma", "Priya Mehta", "Rahul Kapoor", "Sneha Iyer", "Vikram Singh",
    "Ananya Das", "Karan Malhotra", "Neha Banerjee", "Ritika Jain", "Aditya Nair",
    "Saurabh Verma", "Pooja Sinha", "Ishan Khanna", "Megha Roy", "Rohan Arora"
];

const studentNames = [
    "Rohan Ghosh", "Arjun Sen", "Meera Roy", "Sayan Dutta", "Ishita Paul",
    "Dev Kumar", "Tanvi Agarwal", "Akash Verma", "Puja Saha", "Nikhil Rao",
    "Moumita Ghosh", "Rishi Chatterjee", "Sohini Mukherjee", "Manav Bansal",
    "Diya Bose", "Yash Patel", "Kavya Menon", "Abhishek Das", "Tanya Sinha",
    "Subham Mondal", "Aniket Roy", "Riya Sharma", "Souvik Das", "Aditi Ghosh",
    "Pratik Dey", "Mitali Sen", "Rudra Banerjee", "Sakshi Gupta", "Kunal Saha",
    "Ankita Paul", "Rajdeep Nandi", "Nisha Agarwal", "Sagnik Mukherjee",
    "Payel Dutta", "Harsh Raj"
];

const companyData = [
    ["TechNova Solutions", "Building scalable web and cloud applications."],
    ["CodeCraft Labs", "Product engineering company for SaaS platforms."],
    ["NextHire Technologies", "HR tech company building recruitment tools."],
    ["PixelBridge Systems", "Frontend and UI engineering solutions."],
    ["CloudCore Infotech", "Cloud backend and API development company."],
    ["HireStack Technologies", "Hiring platform and talent analytics company."],
    ["DevBridge Labs", "Custom software development for startups."],
    ["CareerNest Systems", "Career platform solutions for students and recruiters."],
    ["StackWave Technologies", "Full-stack product development company."],
    ["BluePeak Software", "Enterprise software and dashboard solutions."],
    ["BrightPath Digital", "Digital transformation and web development agency."],
    ["WebForge Labs", "Modern web application development company."],
    ["NexGen Cloud", "Cloud-native application development company."],
    ["SkillSprint Technologies", "EdTech and learning platform company."],
    ["DataRoot Systems", "Data-driven software and analytics company."],
    ["AppNest Solutions", "Mobile and web app development company."],
    ["LogicLoop Technologies", "Backend systems and automation company."],
    ["CloudNest Digital", "Cloud deployment and DevOps solutions."],
    ["TalentGrid Systems", "Recruitment workflow software company."],
    ["InnoByte Labs", "Startup-focused product engineering company."],
    ["ByteWorks Technologies", "Web platforms and backend services company."],
    ["CoreStack Infotech", "Enterprise-grade cloud software solutions."],
    ["QuantumHire", "AI-assisted recruitment and job matching platform."],
    ["Skyline Software", "Business software and internal tool development."],
    ["RapidSoft Labs", "Fast-growing software consulting company."],
    ["DigitalCraft Systems", "Digital products and UI/UX engineering company."],
    ["VisionTech Solutions", "Technology solutions for modern businesses."],
    ["AlphaBridge Technologies", "Full-stack engineering and consulting company."],
    ["JobFlow Systems", "Workflow automation for hiring teams."],
    ["HirePulse Technologies", "Modern hiring and applicant tracking solutions."]
];

const jobTitles = [
    "Frontend Developer", "Backend Developer", "MERN Stack Developer",
    "Full Stack Developer", "React Developer", "Node.js Developer",
    "JavaScript Developer", "Software Developer", "Software Engineer",
    "Web Developer", "UI Developer", "Next.js Developer",
    "Express.js Developer", "MongoDB Developer", "API Developer",
    "Cloud Developer", "Junior Software Developer", "Associate Software Engineer",
    "React Developer Intern", "Backend Developer Intern"
];

const jobTypes = ["Full Time", "Internship", "Remote", "Hybrid", "Contract"];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomSkills = () => {
    const shuffled = [...skillsPool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
};

const seedDatabase = async () => {
    try {
        console.log("Mongo URI:", process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await Application.deleteMany();
        await Job.deleteMany();
        await Company.deleteMany();
        await User.deleteMany();

        console.log("Old data deleted");

        const hashedPassword = await bcrypt.hash("12345678", 10);

        const recruiters = await User.insertMany(
            recruiterNames.map((name, index) => ({
                fullname: name,
                email: `${name.toLowerCase().replaceAll(" ", ".")}.recruiter@example.com`,
                phoneNumber: 9876543200 + index,
                password: hashedPassword,
                role: "recruiter",
                profile: {
                    bio: "Recruiter hiring software developers for modern technology teams.",
                    profilePhoto: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`
                }
            }))
        );

        const students = await User.insertMany(
            studentNames.map((name, index) => ({
                fullname: name,
                email: `${name.toLowerCase().replaceAll(" ", ".")}.student@example.com`,
                phoneNumber: 9876543300 + index,
                password: hashedPassword,
                role: "student",
                profile: {
                    bio: "Aspiring software developer looking for full-stack and backend opportunities.",
                    skills: getRandomSkills(),
                    resume: `https://example.com/resumes/${name.toLowerCase().replaceAll(" ", "-")}.pdf`,
                    resumeOriginalName: `${name.replaceAll(" ", "_")}_Resume.pdf`,
                    profilePhoto: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`
                }
            }))
        );

        const companies = await Company.insertMany(
            companyData.map(([name, description], index) => ({
                name,
                description,
                website: `https://${name.toLowerCase().replaceAll(" ", "").replaceAll(".", "")}.example.com`,
                location: locations[index % locations.length],
                logo: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
                userId: recruiters[index % recruiters.length]._id
            }))
        );

        const jobsPayload = [];

        for (let i = 0; i < 80; i++) {
            const company = companies[i % companies.length];
            const recruiter = recruiters[i % recruiters.length];
            const title = getRandom(jobTitles);
            const requirements = getRandomSkills();

            jobsPayload.push({
                title,
                description: `We are looking for a ${title} to work on real-world web applications, APIs and scalable product features.`,
                requirements,
                salary: Math.floor(Math.random() * 10) + 3,
                experienceLevel: Math.floor(Math.random() * 4),
                location: getRandom(locations),
                jobType: getRandom(jobTypes),
                position: Math.floor(Math.random() * 10) + 1,
                company: company._id,
                created_by: recruiter._id
            });
        }

        const jobs = await Job.insertMany(jobsPayload);

        const applicationsPayload = [];

        for (let i = 0; i < 120; i++) {
            applicationsPayload.push({
                job: jobs[i % jobs.length]._id,
                applicant: students[i % students.length]._id,
                status: getRandom(["pending", "accepted", "rejected"])
            });
        }

        const applications = await Application.insertMany(applicationsPayload);

        for (const application of applications) {
            await Job.findByIdAndUpdate(application.job, {
                $push: { applications: application._id }
            });
        }

        console.log("Database seeded successfully");
        console.log("Recruiters:", recruiters.length);
        console.log("Students:", students.length);
        console.log("Companies:", companies.length);
        console.log("Jobs:", jobs.length);
        console.log("Applications:", applications.length);
        console.log("Password for all users: 12345678");

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedDatabase();