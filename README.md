# 🌍 Carbon Footprint Tracker

Full-stack app to log activities, calculate emissions, gamify progress, and get recommendations.

## Quick Start (Docker)

```bash
cp backend/.env.example backend/.env
docker-compose up --build
```

- Backend: http://localhost:4000
- Swagger Docs: http://localhost:4000/api/docs
- Frontend: http://localhost:5173
- MongoDB: mongodb://mongo:27017/carbon
```

## Manual Start (Dev)

Backend:
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Frontend:
```bash
cd frontend
npm install
npm run dev
```

Mobile (Expo):
```bash
cd mobile
npm install
npm start
```

## Env Vars

See `backend/.env.example`.
