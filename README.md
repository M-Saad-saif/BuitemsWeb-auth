
# BuitemsWeb-auth 🎓

A **student-focused web platform** providing essential academic tools such as a **secure student portal**, **GPA/CGPA calculator**, and **assignment front-page generator** — all in one place.

Designed to help students **manage academic records safely** and **simplify everyday university tasks**.

---

## 🌐 Live Project
👉 https://buitemsweb-auth.vercel.app  

---

## 📌 Key Features

### 🔐 Student Portal (Core Feature)
- Secure user registration & login
- Personal academic data storage
- Save and manage academic records safely
- Token-based authentication
- Protected user routes

### 🧮 GPA / CGPA Calculator
- Calculate semester GPA
- Calculate cumulative CGPA
- Quick, accurate, and student-friendly
- Ideal for result planning and performance tracking

### 📄 Assignment Front-Page Generator
- Auto-generate professional assignment front pages
- Reduces formatting effort for students
- Clean and academic-standard layout

---

## 🛠 Tech Stack

| Layer        | Technology |
|--------------|------------|
| Frontend     | React, JavaScript |
| Backend      | Node.js, Express |
| Database     | MongoDB (Mongoose) |
| Authentication | JWT (Token-based) |
| File Handling | Multer / Cloudinary |
| Deployment   | Vercel and Render|

---

## 📁 Project Structure

```

BuitemsWeb-auth/
├── src/ (41400 tokens)
    ├── index.css
    ├── components/ (40500 tokens)
    │   ├── images/ (700 tokens)
    │   │   ├── pic.jfif
    │   │   ├── ass pg 1.png
    │   │   ├── ass pg 2.png
    │   │   ├── ass pg 3.png
    │   │   ├── ass pg 4.png
    │   │   ├── buitems logo.png
    │   │   └── backgrond for laptop.png
    │   ├── Footer.js (300 tokens)
    │   ├── PortalDetails/ (9100 tokens)
    │   │   ├── GPACalculatorTab.js (800 tokens)
    │   │   ├── ProfileHeader.js (800 tokens)
    │   │   ├── ProfileTab.js (900 tokens)
    │   │   ├── AddSemesterDialog.js (1400 tokens)
    │   │   ├── SemesterRecordsTab .js (1400 tokens)
    │   │   ├── EditProfileDialog.js (1500 tokens)
    │   │   └── GPAAnalysisTab.js (2300 tokens)
    │   ├── FrontPages.js (800 tokens)
    │   ├── Login.js (900 tokens)
    │   ├── AggregateCal.js (1000 tokens)
    │   ├── TimeTable.js (1500 tokens)
    │   ├── Signup.js (1500 tokens)
    │   ├── About.js (1600 tokens)
    │   ├── CGPAcal.js (1600 tokens)
    │   ├── GPAcal.js (1700 tokens)
    │   ├── Home.js (2000 tokens)
    │   ├── Navbar.js (2500 tokens)
    │   ├── GenerateFP.js (2600 tokens)
    │   ├── PortalOFuser.js (3800 tokens)
    │   └── FacAndDept.js (8900 tokens)
    ├── App.test.js
    ├── reportWebVitals.js
    ├── index.js
    └── App.js (600 tokens)
├── public/ (600 tokens)
    ├── robots.txt
    ├── BUITEMS tab logo.ico
    ├── manifest.json
    └── index.html (300 tokens)
├── desktop.ini
├── backend/ (5800 tokens)
    ├── utils/ (200 tokens)
    │   ├── cloudinary.js
    │   └── multerconfig.js
    ├── middleware/ (200 tokens)
    │   └── fetchuser.js (200 tokens)
    ├── DB.js (200 tokens)
    ├── package.json (200 tokens)
    ├── index.js (200 tokens)
    ├── models/ (900 tokens)
    │   └── UserModel.js (900 tokens)
    └── routes/ (3900 tokens)
    │   └── userauth.js (3900 tokens)
├── .gitignore
├── vercel.json (200 tokens)
├── package.json (300 tokens)
└── README.md (800 tokens)

````

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/M-Saad-saif/BuitemsWeb-auth.git
cd BuitemsWeb-auth
````

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd ..
npm install
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

## 🔗 Sample API Endpoints

```
POST   /api/auth/createuser    → Register student
POST   /api/auth/login       → Login student
GET    /api/auth/profile     → Fetch student data (Protected)
```

---

## 🔐 Security & Best Practices

✔ JWT-based authentication
✔ Environment variables for sensitive data
✔ Modular & scalable folder structure
✔ `.gitignore` for security

---

## 🎯 Use Cases

* University students managing academic records
* GPA/CGPA calculation before result submission
* Quick generation of assignment front pages
* Learning full-stack authentication systems

---

## 👨‍💻 Author

**Saad Saif**
Computer Science Student | MERN Stack Developer

GitHub: [https://github.com/M-Saad-saif](https://github.com/M-Saad-saif)

---
