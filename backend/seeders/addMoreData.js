import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import { User } from "../models/user.model.js";
import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";

dotenv.config({ path: "../.env" });

const password = "12345678";

const locations = [
    "Kolkata", "Bangalore", "Hyderabad", "Pune", "Mumbai",
    "Delhi", "Noida", "Gurugram", "Chennai", "Remote"
];

const jobTypes = ["Full Time", "Internship", "Remote", "Hybrid", "Contract"];

const skillsPool = [
    "HTML", "CSS", "JavaScript", "TypeScript", "React", "Redux Toolkit",
    "Tailwind CSS", "Next.js", "Node.js", "Express.js", "MongoDB",
    "Mongoose", "REST API", "JWT", "Postman", "Git", "GitHub",
    "AWS", "Cloudinary", "SQL", "MySQL", "PostgreSQL", "Java",
    "Python", "Docker", "CI/CD", "Problem Solving", "DSA",
    "API Debugging", "Testing", "GraphQL", "Redis", "Microservices"
];

const recruitersData = [
    "Avinash Rao", "Simran Kaur", "Kabir Malhotra", "Nandini Shah", "Raghav Menon",
    "Shreya Nair", "Amitabh Sen", "Tina Dsouza", "Parth Mehta", "Madhurima Roy",
    "Jayant Sinha", "Lavanya Iyer", "Siddharth Bose", "Rukmini Das", "Harshit Arora",
    "Anjali Kapoor", "Neil Banerjee", "Mira Choudhury", "Ayaan Khanna", "Sonali Verma"
];

const studentsData = [
    "Aritra Ghosh", "Sourav Pal", "Rimjhim Das", "Nabanita Roy", "Arindam Dey",
    "Soham Saha", "Pritam Mondal", "Srijita Banerjee", "Debolina Sen", "Anirban Paul",
    "Riya Dutta", "Sayak Chatterjee", "Ishaan Gupta", "Anwesha Bose", "Rahul Nandi",
    "Sanchita Ghosh", "Priyanka Saha", "Rohit Agarwal", "Tanmoy Das", "Shalini Verma",
    "Abhijit Roy", "Koyel Mukherjee", "Riddhi Sharma", "Saptarshi Dey", "Anushka Pal",
    "Deep Sinha", "Mrinmoy Biswas", "Aditi Paul", "Sayanika Das", "Akshay Jain",
    "Tirtha Ghosh", "Nikita Kumari", "Bishal Sarkar", "Madhumita Saha", "Ritesh Prasad",
    "Soumya Chakraborty", "Rupsa Roy", "Arka Chatterjee", "Payal Agarwal", "Kartik Das"
];

const companiesData = [
    ["Google", "google.com", "Search, cloud, AI and software engineering company."],
    ["Microsoft", "microsoft.com", "Cloud, productivity and enterprise software company."],
    ["Amazon", "amazon.com", "E-commerce, cloud computing and technology company."],
    ["Adobe", "adobe.com", "Creative software and digital experience company."],
    ["IBM", "ibm.com", "Enterprise technology, cloud and AI solutions company."],
    ["Oracle", "oracle.com", "Database, cloud and enterprise software company."],
    ["Salesforce", "salesforce.com", "CRM and cloud-based business software company."],
    ["Atlassian", "atlassian.com", "Collaboration and developer productivity tools company."],
    ["Intel", "intel.com", "Semiconductor and computing technology company."],
    ["NVIDIA", "nvidia.com", "AI computing, GPU and accelerated computing company."],
    ["Cisco", "cisco.com", "Networking, security and enterprise infrastructure company."],
    ["PayPal", "paypal.com", "Digital payments and financial technology company."],
    ["Uber", "uber.com", "Mobility, delivery and platform technology company."],
    ["Airbnb", "airbnb.com", "Travel marketplace and hospitality technology company."],
    ["Spotify", "spotify.com", "Audio streaming and media technology company."],
    ["Netflix", "netflix.com", "Streaming entertainment and engineering platform company."],
    ["Samsung", "samsung.com", "Consumer electronics and technology company."],
    ["SAP", "sap.com", "Enterprise software and ERP solutions company."],
    ["Accenture", "accenture.com", "Technology consulting and digital transformation company."],
    ["Infosys", "infosys.com", "IT services, consulting and digital solutions company."],
    ["TCS", "tcs.com", "Global IT services, consulting and business solutions company."],
    ["Wipro", "wipro.com", "IT consulting, engineering and business technology company."],
    ["Cognizant", "cognizant.com", "Technology services and digital engineering company."],
    ["Capgemini", "capgemini.com", "Consulting, technology and outsourcing company."],
    ["Zoho", "zoho.com", "Cloud software and business productivity platform company."],
    ["Freshworks", "freshworks.com", "Customer engagement and SaaS software company."],
    ["Flipkart", "flipkart.com", "E-commerce and digital marketplace company."],
    ["Swiggy", "swiggy.com", "Food delivery and consumer technology company."],
    ["Zomato", "zomato.com", "Food discovery, delivery and restaurant technology company."],
    ["Razorpay", "razorpay.com", "Payments and fintech infrastructure company."],
    ["PhonePe", "phonepe.com", "Digital payments and financial technology company."],
    ["Meesho", "meesho.com", "E-commerce platform for small businesses and sellers."],
    ["Ola", "olacabs.com", "Mobility and transportation technology company."],
    ["CRED", "cred.club", "Fintech and rewards-based credit platform company."],
    ["Postman", "postman.com", "API development and collaboration platform company."],
    ["MongoDB", "mongodb.com", "Database platform and developer data services company."],
    ["GitHub", "github.com", "Developer collaboration and code hosting platform."],
    ["GitLab", "gitlab.com", "DevOps platform for software development lifecycle."],
    ["Vercel", "vercel.com", "Frontend cloud and deployment platform company."],
    ["Netlify", "netlify.com", "Web deployment and hosting platform company."]
];

const jobTitles = [
    "Frontend Developer", "Backend Developer", "MERN Stack Developer", "Full Stack Developer",
    "React Developer", "Node.js Developer", "JavaScript Developer", "Software Developer",
    "Software Engineer", "Web Developer", "UI Developer", "Next.js Developer",
    "Express.js Developer", "MongoDB Developer", "API Developer", "Cloud Developer",
    "DevOps Engineer", "Junior Software Developer", "Associate Software Engineer",
    "React Developer Intern", "Backend Developer Intern", "Full Stack Developer Intern",
    "Product Engineer", "SaaS Developer", "Technical Consultant", "Application Developer",
    "System Analyst", "QA Engineer", "Automation Tester", "Data Analyst",
    "Database Developer", "Java Developer", "Python Developer", "TypeScript Developer",
    "AWS Developer", "GraphQL Developer", "Microservices Developer", "Cloud Support Engineer",
    "Software Testing Intern", "Frontend Engineer"
];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomSkills = () => {
    const shuffled = [...skillsPool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 3) + 4);
};

const slug = (text) => text.toLowerCase().replaceAll(" ", ".").replace(/[^a-z0-9.]/g, "");

const createUsersIfNotExist = async (users, role, hashedPassword, phoneStart) => {
    const createdUsers = [];

    for (let i = 0; i < users.length; i++) {
        const name = users[i];
        const email = `${slug(name)}.${role}@example.com`;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                fullname: name,
                email,
                phoneNumber: phoneStart + i,
                password: hashedPassword,
                role,
                profile: {
                    bio: role === "student"
                        ? "Aspiring software developer exploring full-stack, backend and frontend opportunities."
                        : "Recruiter helping teams hire skilled developers and technology professionals.",
                    skills: role === "student" ? getRandomSkills() : [],
                    resume: role === "student" ? `https://example.com/resumes/${slug(name)}.pdf` : "",
                    resumeOriginalName: role === "student" ? `${name.replaceAll(" ", "_")}_Resume.pdf` : "",
                    profilePhoto: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`
                }
            });
        }

        createdUsers.push(user);
    }

    return createdUsers;
};

const addMoreData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");

        const hashedPassword = await bcrypt.hash(password, 10);

        const recruiters = await createUsersIfNotExist(recruitersData, "recruiter", hashedPassword, 9880000000);
        const students = await createUsersIfNotExist(studentsData, "student", hashedPassword, 9890000000);

        console.log("Recruiters ready:", recruiters.length);
        console.log("Students ready:", students.length);

        const companies = [];

        for (let i = 0; i < companiesData.length; i++) {
            const [name, domain, description] = companiesData[i];

            let company = await Company.findOne({ name });

            if (!company) {
                company = await Company.create({
                    name,
                    description,
                    website: `https://${domain}`,
                    location: getRandom(locations),
                    logo: `https://logo.clearbit.com/${domain}`,
                    userId: recruiters[i % recruiters.length]._id
                });
            }

            companies.push(company);
        }

        console.log("Companies ready:", companies.length);

        const jobsToCreate = [];

        for (let i = 0; i < 180; i++) {
            const company = companies[i % companies.length];
            const recruiter = recruiters[i % recruiters.length];
            const title = getRandom(jobTitles);
            const requirements = getRandomSkills();

            jobsToCreate.push({
                title,
                description: `We are hiring a ${title} to work on scalable web applications, clean APIs, product features and modern engineering workflows.`,
                requirements,
                salary: Math.floor(Math.random() * 18) + 3,
                experienceLevel: Math.floor(Math.random() * 6),
                location: getRandom(locations),
                jobType: getRandom(jobTypes),
                position: Math.floor(Math.random() * 12) + 1,
                company: company._id,
                created_by: recruiter._id
            });
        }

        const jobs = await Job.insertMany(jobsToCreate);
        console.log("Jobs added:", jobs.length);

        const applicationsToCreate = [];

        for (let i = 0; i < 260; i++) {
            const job = jobs[i % jobs.length];
            const student = students[i % students.length];

            const existingApplication = await Application.findOne({
                job: job._id,
                applicant: student._id
            });

            if (!existingApplication) {
                applicationsToCreate.push({
                    job: job._id,
                    applicant: student._id,
                    status: getRandom(["pending", "accepted", "rejected"])
                });
            }
        }

        const applications = await Application.insertMany(applicationsToCreate);

        for (const application of applications) {
            await Job.findByIdAndUpdate(application.job, {
                $addToSet: { applications: application._id }
            });
        }

        console.log("Applications added:", applications.length);
        console.log("Additive demo data completed successfully");
        console.log("Password for all new users:", password);

        console.log("Sample recruiter login:");
        console.log(`${slug(recruitersData[0])}.recruiter@example.com`);

        console.log("Sample student login:");
        console.log(`${slug(studentsData[0])}.student@example.com`);

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

addMoreData();