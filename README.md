# Legal Assistant Application

A comprehensive legal assistant platform built with modern web technologies, providing AI-powered legal consultation, lawyer booking, and payment processing.

## 🏗️ Architecture

This is a **monorepo** built with **Turbo** containing:

- **Frontend**: React + Vite + TypeScript + Tailwind CSS 
- **Backend**: Express + TypeScript + Prisma ORM
- **Database**: SQLite (development) / PostgreSQL (production)
- **Payment**: Razorpay integration
- **AI**: Google Gemini API for legal assistance

## 🚀 Features

### Core Features
- **User Registration & Authentication** - JWT-based auth system
- **AI Legal Assistant** - Powered by Google Gemini API
- **Lawyer Directory** - Browse and book available lawyers
- **Payment Integration** - Razorpay for subscription and booking payments
- **Chat System** - Conversation history with AI assistant
- **Subscription Management** - FREE/PREMIUM user tiers

### User Features
- Legal consultation chat with AI
- Lawyer search and booking
- Payment processing for subscriptions
- Conversation history management
- Profile management

### Lawyer Features
- Registration and profile setup
- Availability scheduling
- Subscription management
- Payment integration

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- pnpm package manager
- Docker (for database)


### 1. Database Setup

#### Option A: SQLite (Development)
The project is configured to use SQLite by default. No additional setup required.

#### Option B: PostgreSQL (Production)
```bash
# Start PostgreSQL with Docker
docker run --name postgres-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=root \
  -e POSTGRES_DB=postgres \
  -p 5433:5432 \
  -d postgres:15
```

### 2. Environment Configuration

Create `.env` files in the backend directory:

```bash
# apps/backend/.env
DATABASE_URL="file:./dev.db"  # SQLite
# DATABASE_URL="postgresql://postgres:root@localhost:5433/postgres"  # PostgreSQL

# Razorpay Configuration
RAZORPAY_KEY_ID="rzp_test_your_key_id"
RAZORPAY_KEY_SECRET="your_test_key_secret"

# Google Gemini API
GOOGLE_API_KEY="your_gemini_api_key"

# JWT Secret
JWT_SECRET="your_jwt_secret_key_here"
```
### 3. Database Migration

```bash
cd packages/db
pnpm db:push  # Push schema to database
# or
pnpm db:migrate  # Run migrations
```
`

## 📚 API Endpoints

### User Routes (`/api/user`)
- `POST /register` - User registration
- `POST /login` - User login
- `GET /profile` - Get user profile (authenticated)
- `GET /availableProfile` - Get available lawyers
- `POST /send` - Send message to AI assistant
- `POST /create-order/:userId` - Create Razorpay order for subscription
- `POST /verify` - Verify payment and upgrade subscription

### Lawyer Routes (`/api/lawyer`)
- `POST /register` - Lawyer registration
- `POST /login` - Lawyer login
- Additional lawyer-specific endpoints

## 💳 Payment Integration

The application uses **Razorpay** for payment processing:

- **Subscription Payments**: Users can upgrade to PREMIUM (₹20,000)
- **Lawyer Booking**: Payment for lawyer consultations
- **Secure Verification**: HMAC signature verification for payment security

## 🤖 AI Integration

Powered by **Google Gemini API**:
- Legal consultation in simple language
- Country-specific legal advice
- Conversation history support
- 30-message limit per conversation

## 🗄️ Database Schema

Key models:
- **User**: User accounts with subscription tiers
- **Lawyer**: Lawyer profiles with availability
- **Conversation**: Chat conversations with AI
- **Chat**: Individual messages in conversations
- **Payment**: Payment transaction records
- **Mediator**: Mediation between parties

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Razorpay signature verification
- Environment variable protection
- Input validation and sanitization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Note**: Make sure to set up your API keys (Razorpay, Google Gemini) before running the application in production.