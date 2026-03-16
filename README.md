# Krishi Sahayak

Krishi Sahayak is a mobile-first agricultural support platform designed for Indian farmers. It offers crop guidance, mandi price insights, and a simple expert-aware farmer community.

## Highlights

- **Crop Knowledge Library** with search/filter support for season and soil type.
- **Mandi Price Information** with district and crop level latest pricing.
- **Community Q&A** where farmers can ask questions and experts are tagged.
- **Multilingual UI** (English, Hindi, Marathi).
- **Accessibility-first design** using large typography, strong contrast, and simple navigation.
- **Socket.IO ready** for real-time post updates.

## Tech Stack

- **Frontend:** React + Material UI + Axios
- **Backend:** Node.js + Express + Socket.IO
- **Database:** MongoDB + Mongoose
- **Auth:** JWT + bcrypt
- **Testing:** Jest
- **CI/CD:** GitHub Actions (test + frontend build), ready for Vercel deployment

## Project Structure

```text
project-root
├── backend
│   ├── config/env.js
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── package.json
│   └── server.js
├── frontend
│   ├── public/index.html
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── App.js
│   │   └── index.js
├── tests
│   ├── crop.test.js
│   └── user.test.js
└── .github/workflows/ci.yml
```

## Setup

### 1) Backend

```bash
cd backend
npm install
cp .env.example .env # optional
npm run dev
```

Environment variables (`backend/config/env.js` fallback defaults):

- `PORT` (default: `5000`)
- `MONGODB_URI` (default: `mongodb://127.0.0.1:27017/krishi-sahayak`)
- `JWT_SECRET`
- `CLIENT_ORIGIN`

### 2) Frontend

```bash
cd frontend
npm install
npm start
```

Optional frontend variable:

- `REACT_APP_API_URL` (default: `http://localhost:5000/api`)

## Architecture

```text
React (Material UI)
   ↓ Axios
Express API + Controllers + Middleware
   ↓ Mongoose Models
MongoDB
```

Backend responsibilities:
- API routing
- input validation via model schemas
- auth + business logic

Frontend responsibilities:
- rendering simple mobile-first UI
- language switching
- API interactions

## API Documentation

### Crop APIs
- `GET /api/crops` (query: `search`, `season`, `soil`)
- `GET /api/crops/:id`
- `POST /api/crops`

### User APIs
- `POST /api/users/register`
- `POST /api/users/login`

### Community APIs
- `GET /api/posts`
- `POST /api/posts` (Bearer token)

### Mandi APIs
- `GET /api/mandi` (query: `district`, `crop`)

## Data Model Summary

### Crops
- `_id`, `name`, `seasonality`, `soil_type`, `irrigation_needs`, `fertilizers`, `pests[]`

### Users
- `_id`, `username`, `password`, `is_expert`, `language`, `community_posts[]`

### Community Posts
- `_id`, `user_id`, `crop_id`, `content`, `created_at`

### Mandi Rates
- `_id`, `district`, `crop_id`, `price`, `date`

## Deployment Notes

- GitHub Actions workflow runs backend tests and frontend build.
- Frontend can be deployed to **Vercel**.
- Backend can be deployed to any Node host (Render, Railway, EC2) with MongoDB URI configured.

## Future Enhancements

- AI crop disease detection from images
- predictive mandi pricing
- voice input in local languages
- offline-first cache for low-connectivity villages
- real-time expert chat and notification channels
