# API Configuration & Integration Guide

## Backend Connection Issue

If you're getting `ERR_CONNECTION_REFUSED` errors, the frontend is trying to connect to the backend on the wrong port.

## How to Fix

1. **Check which port your backend is running on:**
   - Look at your terminal where the backend is running
   - It should show something like "Server running on http://localhost:XXXX"

2. **Update the API configuration:**
   - Open `src/config/api.ts`
   - Change the `BASE_URL` from `http://localhost:3003` to match your backend port
   - For example, if your backend is on port 3001, change it to `http://localhost:3001`

3. **Alternative: Use environment variable:**
   - Create a `.env` file in the frontend directory
   - Add: `VITE_API_URL=http://localhost:YOUR_BACKEND_PORT`
   - Restart the frontend development server

## Common Backend Ports
- 3000 (default Node.js)
- 3001 (common alternative)
- 3003 (configured in backend)
- 5000 (Express default)
- 8000 (common development)

## Current Configuration
The frontend is currently configured to connect to: `http://localhost:3003`

Make sure your backend is running on this port, or update the configuration to match your backend's actual port.

## Complete Integration Status

### ✅ Completed Features
- **API Configuration**: Centralized API endpoints
- **Authentication**: User and lawyer login/register
- **User Dashboard**: Chat, lawyers, history, documents
- **Lawyer Dashboard**: Profile management
- **Chat System**: AI-powered legal assistant
- **Lawyer List**: Browse available lawyers
- **Chat History**: View previous conversations
- **Payment Integration**: Razorpay setup
- **Responsive Design**: Mobile-friendly UI

### 🔧 Backend API Endpoints
- `POST /api/v1/users/register` - User registration
- `POST /api/v1/users/login` - User authentication
- `GET /api/v1/users/profile` - User profile with conversations
- `GET /api/v1/users/availableProfile` - Available lawyers
- `POST /api/v1/users/send` - Send message to AI
- `POST /api/v1/lawyers/register` - Lawyer registration
- `POST /api/v1/lawyers/login` - Lawyer authentication
- `GET /api/v1/lawyers/profile` - Lawyer profile
- `PUT /api/v1/lawyers/update` - Update lawyer profile
- `POST /api/v1/lawyers/create-order/:lawyerId` - Create payment order
- `POST /api/v1/lawyers/verify` - Verify payment

### 🎯 Next Steps
1. Start your backend server: `cd apps/backend && npm run dev`
2. Start your frontend server: `cd apps/frontend && npm run dev`
3. Test user registration and login
4. Test AI chat functionality
5. Test lawyer browsing and booking
