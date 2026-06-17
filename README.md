# Career Canvas 🎨💼

Career Canvas is a full-stack job portal platform that connects students/job seekers with recruiters. It provides separate interfaces for students and recruiters, allowing users to search jobs, apply for opportunities, manage applications, register companies, post jobs, and track applicant status.

The project is built with a MERN stack architecture and focuses on real-world job portal workflows, secure authentication, protected routes, file uploads, API documentation, and production deployment.

---

## 🔗 Live Demo

🚀 Live Website: https://www.careercanvas.online
🧪 API Docs: https://career-canvas.onrender.com/api-docs

---

## ✨ Features

### 🎓 Student Features

* User registration and login
* JWT-based authentication
* Browse and search jobs
* Apply for jobs
* View applied jobs
* Track application status
* Update profile details
* Upload resume
* View company/job details

### 🏢 Recruiter Features

* Recruiter authentication
* Register company
* View own companies
* Update company details with logo upload
* Post jobs for selected company
* View recruiter-posted jobs
* View applicants for each job
* Accept or reject applications

### 🔐 Backend Features

* MVC backend architecture
* Protected routes using authentication middleware
* Cookie-based JWT authentication
* Cloudinary file upload integration
* Multer file upload middleware
* MongoDB Atlas database
* Swagger API documentation
* CORS configured for local and production domains
* Improved error handling
* Production-ready Render deployment

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Redux Toolkit
* Tailwind CSS
* Shadcn UI
* Framer Motion
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Cookie Parser
* Multer
* Cloudinary
* Swagger UI / Swagger JSDoc

### Tools & Deployment

* Postman
* MongoDB Atlas
* Render
* Hostinger Custom Domain
* Git & GitHub

---

## 📁 Project Structure

```txt
Career_Canvas-Project/
├── backend/
│   ├── controller/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.js
├── frontend/
│   ├── src/
│   └── dist/
├── package.json
└── README.md
```

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/StayLearner/Career_Canvas-Project.git
cd Career_Canvas-Project
```

### 2. Install root/backend dependencies

```bash
npm install
```

### 3. Install frontend dependencies

```bash
cd frontend
npm install
cd ..
```

### 4. Create `.env` file in root folder

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

### 5. Run development server

```bash
npm run dev
```

---

## 📡 API Endpoints

Swagger API documentation is available at:

```txt
/api-docs
```

### User APIs

| Method | Endpoint                      | Description         |
| ------ | ----------------------------- | ------------------- |
| POST   | `/api/v1/user/register`       | Register user       |
| POST   | `/api/v1/user/login`          | Login user          |
| GET    | `/api/v1/user/logout`         | Logout user         |
| POST   | `/api/v1/user/profile/update` | Update user profile |

### Company APIs

| Method | Endpoint                        | Description             |
| ------ | ------------------------------- | ----------------------- |
| POST   | `/api/v1/company/register`      | Register company        |
| GET    | `/api/v1/company/get`           | Get recruiter companies |
| GET    | `/api/v1/company/get/:id`       | Get company by ID       |
| PUT    | `/api/v1/company/update/:id`    | Update company          |
| GET    | `/api/v1/company/all-companies` | Get all companies       |

### Job APIs

| Method | Endpoint                   | Description        |
| ------ | -------------------------- | ------------------ |
| POST   | `/api/v1/job/post`         | Post new job       |
| GET    | `/api/v1/job/get`          | Get all jobs       |
| GET    | `/api/v1/job/getAdminJobs` | Get recruiter jobs |
| GET    | `/api/v1/job/get/:id`      | Get job by ID      |

### Application APIs

| Method | Endpoint                                | Description               |
| ------ | --------------------------------------- | ------------------------- |
| POST   | `/api/v1/application/apply/:id`         | Apply for a job           |
| GET    | `/api/v1/application/get`               | Get applied jobs          |
| GET    | `/api/v1/application/:id/applicants`    | Get applicants            |
| POST   | `/api/v1/application/status/:id/update` | Update application status |

---

## 📖 Usage

### Student Flow

1. Register or login as a student.
2. Browse available jobs.
3. Search jobs by keyword.
4. Apply for jobs.
5. Track applied job status.
6. Update profile and upload resume.

### Recruiter Flow

1. Register or login as a recruiter.
2. Register a company.
3. Update company profile and logo.
4. Post jobs under company.
5. View applicants.
6. Update application status.

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Push to your branch
5. Open a pull request

---

### ✨ Built with passion, consistency, and continuous learning.
