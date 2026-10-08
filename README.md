# TRIPORA AI — AI-Powered Travel Experience, Discovery & Booking Ecosystem

> **"Your Journey. Reimagined by AI."**

Tripora AI is an intelligent travel platform combining neural travel planning, interactive destination discovery, luxury accommodations, flight comparison, dynamic itinerary editing, real-time expense ledgers, and verified supplier reservation workflows.

---

## 🌟 Key Features

1. **AI Travel Architect & Neural Planner**
   - Natural-language travel prompt interpretation (e.g. *"Plan 7 days in Kyoto with ryokans, tea tastings & temples for 2"*).
   - Structured multi-day itineraries with verified opening hours, walking routes, and budget tiers.
   - Algorithmic budget optimizer with trade-off explanations and instant savings calculations.
   - Conversational AI travel assistant drawer grounded in live POI data.

2. **Destination Exploration & Interactive Geospatial Mesh**
   - Interactive global travel map with pin markers, weather overlays, and district guides.
   - Filter by region, travel vibe (Culture & Zen, Coastal, Tropical, Alpine Luxury), budget slider, and tags.

3. **Curated Accommodations, Flights & Experiences**
   - Verified stays (Luxury Ryokans, Boutique Hotels, Cliffside Villas) with room category selections.
   - Flight comparison engine with cabin class, baggage allowance, and carbon footprint tracking.
   - Signature local experiences & private masterclasses.

4. **Interactive AI Itinerary Studio**
   - Full timeline view with morning, afternoon, and evening schedules.
   - Real-time drag/edit/delete/add custom activities.
   - 1-Click AI Day Re-synthesis with custom focus modifiers.
   - Real-time group collaboration & shareable links.

5. **Traveler Dashboard & Budget Ledger**
   - Planned vs actual spend tracking with category breakdowns.
   - Confirmed booking vouchers with digital entry tokens and QR codes.
   - Wishlist collection manager and multi-role demo switcher (Traveler / Partner / Admin).

6. **Travel Partner & Administrative Operations Hub**
   - Partner inventory calendar, revenue metrics, and listing publisher.
   - Admin telemetry console with microservice health audit, live Kafka event stream, and AI token metrics.

---

## 🏗️ Architecture & Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Framer Motion.
- **API Gateway**: Node.js, Express, TypeScript, JWT Authentication, CORS, Request Telemetry.
- **AI Microservice**: Python 3.14, FastAPI, Pydantic v2, Structured JSON outputs.
- **Databases & Event Broker**: PostgreSQL (Relational transactions), MongoDB (Travel documents), Redis (Cache & Rate Limiting), Apache Kafka (Asynchronous messaging).
- **Containerization**: Docker & Docker Compose.

---

## 🚀 Quick Start (Local Development)

### 1. Run the Frontend Web Application
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Run the Node.js API Gateway
```bash
cd services/api-gateway
npm install
npm run dev
```
Runs on [http://localhost:5000](http://localhost:5000).

### 3. Run the Python FastAPI AI Microservice
```bash
cd services/ai-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
Runs on [http://localhost:8000](http://localhost:8000) (Swagger Docs at `/docs`).

### 4. Run the Full Multi-Container Stack (Docker Compose)
```bash
docker-compose up --build
```
