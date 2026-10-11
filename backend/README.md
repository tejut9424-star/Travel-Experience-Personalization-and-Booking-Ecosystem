# Tripora Backend Service

Tripora AI backend service incorporating API Gateway, OTP Authentication, Bookings, Payments, and AI Intelligence endpoints.

## 📁 Directory Structure
```
backend/
├── ai-service/
│   ├── main.py
│   └── requirements.txt
├── src/
│   └── server.ts
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 How to Run

### 1. Start Node.js API Gateway (Port 5050 / 5000)
```bash
cd backend
npm install
npm run dev
```

### 2. Start Python AI Microservice (Port 8000)
```bash
cd backend/ai-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
API Documentation is available at `http://localhost:8000/docs`.
