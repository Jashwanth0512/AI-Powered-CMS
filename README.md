
# AI-Powered Content Management System (CMS)

[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://react.dev/)
[![Flask](https://img.shields.io/badge/Flask-2.3.2-green)](https://flask.palletsprojects.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

A modern content management system enhanced with AI capabilities for automated content generation, SEO optimization, and real-time analytics.

![CMS Dashboard Preview](https://via.placeholder.com/800x400.png?text=AI+CMS+Dashboard+Preview)

## Features

- **AI Content Generation**
  - GPT-4 powered content suggestions
  - Auto-complete and text expansion
- **SEO Optimization**
  - Real-time SEO scoring
  - Keyword analysis and suggestions
- **Collaboration**
  - Role-based access control (Admin/Editor/Author)
  - Content version history
- **Analytics**
  - Real-time engagement metrics
  - Visual data dashboards
- **Responsive Design**
  - Mobile-first approach
  - Cross-browser compatibility

## Technologies Used

- **Frontend**
  - React.js
  - Recharts (Data Visualization)
  - React Router (Navigation)
  - Axios (API Client)
- **Backend**
  - Flask (Python)
  - JWT Authentication
  - SQLAlchemy (ORM)
  - spaCy (NLP)
- **AI Integration**
  - OpenAI GPT-4
  - Custom NLP pipelines
  - Elasticsearch (Content Search)

## Installation

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- PostgreSQL (v14+)

### Frontend Setup
cd frontend
npm install

### Backend Setup
cd backend
python -m venv venv
source venv/bin/activate  # Linux/MacOS
venv\Scripts\activate    # Windows
pip install -r requirements.txt

## Configuration

Create `.env` files with these templates:

**frontend/.env**
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_OPENAI_KEY=your_openai_key

**backend/.env**
FLASK_SECRET_KEY=your_secret_key
DATABASE_URL=postgresql://user:password@localhost:5432/aicms
JWT_SECRET_KEY=jwt_signing_key

## Usage

### Start Development Servers

**Frontend**
cd frontend
npm start

**Backend**
cd backend
flask run

Access the application at `http://localhost:3000`

### Available Routes
- `/login` - User authentication
- `/dashboard` - Content overview
- `/editor` - AI-powered content editor
- `/analytics` - Engagement metrics
- `/admin` - User management

## API Documentation

Key Endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/login` | POST | User authentication |
| `/api/content` | GET | Get content list |
| `/api/ai/suggest` | POST | Get AI suggestions |
| `/api/analytics` | GET | Get engagement data |

[View Full API Documentation](docs/API.md)

## Testing
**Frontend Tests**
cd frontend
npm test


**Backend Tests**
cd backend
python -m pytest tests/


## Deployment
Production deployment with Docker:
docker-compose up --build

