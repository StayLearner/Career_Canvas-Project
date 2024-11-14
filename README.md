# Career Canvas 🎨💼

Career Canvas is a comprehensive job-seeking platform that connects students with recruiters, providing a dual-interface for students and recruiters.
With robust search and filtering options, clear application tracking, and a scalable backend, Career Canvas aims to streamline the job search and recruitment process. 🌐

---

## 🔗 Live Demo
🚀 [Career Canvas Live Demo] *(link coming soon after deployment)*

---

## 📚 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🎓 Student Section

- **Job Search & Filter** 🔎: Students can search and filter jobs based on role, location, and other criteria for targeted job searches.
- **Application Tracking** 📈: Track applications with real-time status updates, including accepted and rejected applications.
- **Profile Management** 📋: Update profile details (except name and phone number) for a personalized experience.
  
### 🏢 Recruiter Section

- **Company Management** 🏬: Recruiters can manage multiple companies under their account, with options to add, edit, and delete company profiles.
- **Job Listings** 📜: Recruiters can create multiple job postings for each company, view applicant lists, and manage application statuses.

### Other Features

- **Secure Authentication** 🔐: JWT for secure login, with Google OAuth for convenient access.
- **Full MVC Architecture** 🛠️: Structured, maintainable codebase.
- **Persistent Data Storage** 💾: MongoDB for reliable data storage.
- **Cloudinary Integration** ☁️: Easy file uploads for resumes and profile pictures.
- **Smooth Animations** 🎥: Framer Motion for interactive UI effects.
- **Route Protection** 🔒: Secure access with protected routes.
  
---

## 🛠️ Tech Stack

### Frontend
- **React.js** ⚛️
- **Tailwind CSS** 🎨
- **Shadcn UI** 🖌️
- **Redux Toolkit** 📦 for state management

### Backend
- **Node.js** 🟩
- **Express.js** 🌐
- **MongoDB** 🍃
- **JWT** 🔐 for token-based authentication
- **OAuth (Google)** 🔗 for streamlined login

### Additional Tools
- **Postman** 📬 for API testing
- **Cloudinary** ☁️ for file uploads
- **Framer Motion** 🎞️ for animations

---

## 🚀 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/a-AvgLearner/Career_Canvas-Project.git
   cd Career_Canvas-Project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file and add the following:
   ```plaintext
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Run the application**:
   ```bash
   npm start
   ```

---

## 📖 Usage

1. **Student Login & Job Search**: 
   - Students can log in and browse job listings. 
   - They can apply for jobs and check their application statuses (Accepted/Rejected).
   - Students can update their profile (except for name and phone number).

2. **Recruiter Job & Company Management**:
   - Recruiters can log in, register companies, and post job listings.
   - They can view and update company details.
   - Recruiters can view applicants for each job and update the application status (Accepted/Rejected).
  
3. **Profile Management**:
   - Users (students) can update their profiles, including the ability to edit most fields except for their name and phone number.

---


## 📡 API Endpoints

Here’s a quick overview of the key API endpoints:

| Endpoint                     | Description                                     | Method |
|------------------------------|-------------------------------------------------|--------|
| `/api/auth/register`          | Register a new user (Student/Recruiter)         | POST   |
| `/api/auth/login`             | Login for users (Student/Recruiter)             | POST   |
| `/api/auth/logout`            | Logout the user                                 | GET    |
| `/api/jobs/post`              | Post a new job listing                          | POST   |
| `/api/jobs/all`               | Get all job listings                            | GET    |
| `/api/jobs/apply/:id`         | Apply for a job                                 | GET    |
| `/api/jobs/applied`           | Get all jobs a user has applied for             | GET    |
| `/api/jobs/applicants/:id`    | Get applicants for a specific job               | GET    |
| `/api/jobs/status/:id`        | Update the application status (Accepted/Rejected) | POST   |

Note: Detailed API testing done via Postman.
---

## 🔮 Future Enhancements

- **Custom Domain** 🌍: Deployment with a `.com` or `.in` domain.
- **Advanced Filtering** 📊: Additional filters for a more refined job search.
- **Notifications** 🔔: Alerts for students on application status changes.
- **Admin Dashboard** 📊: For enhanced management capabilities.

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new feature branch.
3. Commit changes and push them.
4. Open a pull request.

---

## 📜 License

This project is licensed under the MIT License.

---

### ✨ Built with passion and dedication!
