<div align="center">
  <img src="https://github.com/user-attachments/assets/09fd40a6-1a2b-47e5-90b8-7d973b11bed9" width="800" alt="BillGuard AI Banner" />

  <h1>⚡ BillGuard AI</h1>
  <p><strong>AI-Powered Electricity Bill Error Detection and Savings Agent</strong></p>

  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#project-structure">Project Structure</a> •
    <a href="#installation">Installation</a> •
    <a href="#usage">Usage</a> •
    <a href="#screenshots">Screenshots</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/React-18-blue" alt="React 18" />
    <img src="https://img.shields.io/badge/TypeScript-5.0-blue" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vite-Lighting%20Fast-purple" alt="Vite" />
    <img src="https://img.shields.io/badge/Python-3.11+-yellow" alt="Python" />
    <img src="https://img.shields.io/badge/FastAPI-High%20Performance-green" alt="FastAPI" />
    <img src="https://img.shields.io/badge/License-MIT-gray" alt="License MIT" />
  </p>
</div>

<br />

## 🌟 Overview

**BillGuard AI** is a comprehensive full-stack solution designed to empower consumers against electricity bill overcharging and inefficiencies. By leveraging state-of-the-art **Computer Vision, Optical Character Recognition (OCR), and advanced AI/ML algorithms**, BillGuard analyzes user-uploaded electricity bills to verify accurate meter readings and calculated charges.

It crosses the extracted data with official state-specific tariffs, detects discrepancies, intelligently generates targeted complaints, and provides concrete savings recommendations. Say goodbye to confusing electric charges and welcome automated savings.

---

## ✨ Core Features

- **📄 AI Bill Extraction & Parsing:** Easily upload your electricity bills in PDF or Image formats. Our AI accurately extracts consumer details, billed units, and itemized charges with **98%+ accuracy**.
- **🔍 Smart Error Detection:** The engine cross-checks mathematically computed charges against complex, official statutory state tariffs to pinpoint overcharges instantly.
- **📸 Meter Photo Verification:** Upload a photo of your physical electricity meter to objectively validate mathematically billed units.
- **📝 Auto Complaint Generator:** If an overcharge or discrepancy is detected, BillGuard generates automated, professionally articulated complaint drafts along with evidence to file disputes seamlessly.
- **💰 Personalized Savings Recommendations:** Get custom-tailored, actionable insights and tips to optimize energy consumption and lower future bills.
- **🤖 Integrated AI Assistant:** Resolve tariff-related questions instantly and get your bill explained plainly by our integrated chatbot.

---

## 🛠️ Tech Stack

### Frontend (User Interface)
The interface is designed with a premium, responsive modern aesthetic focusing on user experience.
- **[React 18](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)** for robust, type-safe components.
- **[Vite](https://vitejs.dev/)** for lightning-fast module bundling and HMR.
- **[TailwindCSS](https://tailwindcss.com/)** for utility-first, custom styling.
- **[Framer Motion](https://www.framer.com/motion/)** for highly dynamic scroll & transition animations.
- **[Lucide React](https://lucide.dev/)** for scalable vector icons.

### Backend (AI & API)
The backend is highly optimized for complex AI computations and data management.
- **[Python 3.11+](https://www.python.org/)** native environment.
- **[FastAPI](https://fastapi.tiangolo.com/)** for reliable, high-performance async RESTful APIs.
- **OCR & Computer Vision** routines for robust document parsing.
- **AI/ML Agents** to calculate tariff logic and perform contextual explanations.

---

## 📁 Project Structure

```text
billguard/
├── frontend-vite/          # React frontend environment
│   ├── src/
│   │   ├── components/     # Reusable UI components (buttons, cards, forms)
│   │   ├── pages/          # Full page views (Landing, Dashboard, Auth)
│   │   ├── lib/            # Utilities and helper functions
│   │   └── ...
│   └── package.json        # Frontend dependencies
│
└── backend/                # Python FastAPI backend environment
    ├── app/                # Main application logic
    │   ├── api/            # API routing handlers
    │   ├── agents/         # AI models and analysis logic
    │   └── services/       # Core business logic methods
    ├── main.py             # FastAPI entry point
    └── requirements.txt    # Python dependencies
```

---

## ⚙️ Installation

### Prerequisites
Before you begin, ensure you have the following installed on your machine:
- **Node.js** (v18 or higher)
- **Python** (v3.11 or higher)
- **npm** or **yarn**

<br />

### 1. Frontend Setup

Navigate to the frontend directory, install dependencies, and run the development server.

```bash
cd frontend-vite
npm install
npm run dev
```
The site will be available locally (usually at `http://localhost:5173`).

<br />

### 2. Backend Setup

Navigate to the Python backend directory, install required packages, and launch FastAPI.

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
# Or alternately run python main.py
```
The REST API will be available locally (usually at `http://localhost:8000`).

---

## 🖥️ Usage Guide

1. **Sign Up/Log In:** Register an account securely via the portal interface.
2. **Upload Bill:** Upload your recent electricity bill documentation natively as a PDF or image file.
3. **Upload Meter (Optional):** Upload an image of your meter to double-check unit reads visually.
4. **View Analysis:** Wait momentarily as the system processes the OCR extraction and tariff verification to reveal overcharges, warnings, or confirmations of accuracy.
5. **Take Action:** Review personalized savings recommendations. If inconsistencies arise, generate dispute drafts directly from the dashboard.

---

## 📸 Screenshots & Gallery

### 🏠 Landing Page
<img width="100%" alt="Landing Page Preview" src="https://github.com/user-attachments/assets/09fd40a6-1a2b-47e5-90b8-7d973b11bed9" />

### ✨ Features Overview
<img width="100%" alt="Features Overview" src="https://github.com/user-attachments/assets/4abebe1e-bfca-410b-abfb-7aa6fb8a9ad1" />

### ⚙️ How it Works
<img width="100%" alt="How it works section" src="https://github.com/user-attachments/assets/96c18f10-3e33-4eb0-b6e2-97f1c6d9a2c9" />

### 🔑 Authentication Dashboard
<img width="100%" alt="Login and Sign Up Interface" src="https://github.com/user-attachments/assets/449df1a7-c1d3-456a-a19a-d0f9ad8ce4a8" />

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/PrudhviRaavi/Bill-Guard-AI/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the **[MIT License](LICENSE)**. See the `LICENSE` file for details.

---

<div align="center">
  <sub>Built with ❤️ by the BillGuard AI Team</sub>
</div>
