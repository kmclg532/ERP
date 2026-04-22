# ERP System - MERN Stack

A modern, production-ready Enterprise Resource Planning (ERP) system built with the MERN stack (MongoDB, Express, React, Node.js).

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone and Setup**
```bash
cd ERP
npm install
npm install --prefix client
npm install --prefix server
```

2. **Environment Configuration**

**Server** - Create `server/.env`:
```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb://127.0.0.1:27017/erp
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

**Client** - Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_APP_NAME=ERP System
```

3. **Start Development Servers**
```bash
# Run both servers concurrently
npm run dev

# Or run separately:
npm run server    # Terminal 1
npm run client    # Terminal 2
```

The app will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- API: http://localhost:5000/api/v1

## 📁 Project Structure

```
ERP/
├── client/                      # React + Vite frontend
│   ├── .env
│   ├── .env.example
│   ├── eslint.config.js
│   ├── index.html
│   ├── node_modules/
│   ├── package-lock.json
│   ├── package.json
│   ├── public/
│   ├── README.md
│   ├── src/
│   │   ├── app/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── assets/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── index.css
│   │   ├── layouts/
│   │   ├── main.jsx
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── store/
│   │   ├── styles/
│   │   ├── theme/
│   │   └── utils/
│   └── vite.config.js
├── docs/
│   ├── API.md
│   ├── ARCHITECTURE.md
│   ├── ENV.md
│   ├── ERRORS.md
│   ├── FEATURES.md
│   ├── PHASES.md
│   ├── PROJECT_SPEC.md
│   ├── SETUP.md
│   └── STANDARDS.md
├── node_modules/
├── package-lock.json
├── package.json
├── README.md
└── server/
  ├── .env
  ├── .env.development
  ├── .env.example
  ├── .env.production
  ├── node_modules/
  ├── package-lock.json
  ├── package.json
  └── src/
    ├── app.js
    ├── config/
    ├── constants/
    ├── controllers/
    ├── database/
    ├── middlewares/
    ├── models/
    ├── modules/
    ├── routes/
    ├── server.js
    ├── services/
    ├── utils/
    └── validators/
```

## 🔐 Authentication

The system uses JWT-based authentication with the following features:

- **User Registration & Login** - Email/password authentication
- **JWT Tokens** - Secure token-based authentication
- **Refresh Tokens** - Long-lived tokens for session persistence
- **Protected Routes** - Server-side and client-side route protection
- **Role-Based Access** - Support for admin, manager, employee, viewer roles
- **Google OAuth** - Third-party authentication (configured in settings)

### Authentication Endpoints

```
POST   /api/v1/auth/register          - Create new user account
POST   /api/v1/auth/login             - Authenticate user
POST   /api/v1/auth/logout            - End user session
POST   /api/v1/auth/refresh           - Get new access token
GET    /api/v1/auth/me                - Get current user info
```

## Phase 1 Completed ✅

Summary:
- Auth system (JWT + roles)
- Login UI upgraded (Tailwind)
- Protected routing
- Theme system
- Navbar + profile dropdown
- Dashboard base layout

## 📊 Core Models

### User
- First name, last name, email (unique)
- Password (hashed with bcryptjs)
- Role (admin, manager, employee, viewer)
- Profile image, department
- Login tracking

### Organization
- Name, email, phone
- Address (street, city, state, country, zipCode)
- Logo, active status
- Created by user reference

### Department
- Name, description
- Organization reference
- Department head (user reference)
- Active status

### Employee
- User reference, organization, department
- Employee ID (unique), designation
- Date of joining, salary
- Manager reference
- Active status

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool (blazingly fast)
- **Tailwind CSS 4** - Utility-first CSS
- **React Router 7** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 9** - ODM for MongoDB
- **JWT** - Secure authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests
- **Nodemon** - Development auto-reload

## 🔄 API Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Success message",
  "pagination": { /* optional pagination info */ }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "status": 400
  }
}
```

## 🚦 Development Workflow

1. **Development Phase**
   - Run `npm run dev` for hot reload
   - Make changes and see instant updates
   - Use browser DevTools for debugging

2. **Testing**
   - Test API with Postman or Insomnia
   - Verify authentication flow
   - Check form validations

3. **Production Build**
   ```bash
   # Build client
   npm run build --prefix client
   
   # Server uses same Node environment
   NODE_ENV=production npm start --prefix server
   ```

## 📝 Documentation

Comprehensive documentation is available in the `/docs` folder:

- **API.md** - Complete API endpoint documentation
- **ARCHITECTURE.md** - System architecture and design patterns
- **PROJECT_SPEC.md** - Detailed project specifications
- **STANDARDS.md** - Code standards and conventions
- **PHASES.md** - Development phases and milestones
- **ENV.md** - Environment variables reference
- **SETUP.md** - Detailed setup instructions
- **ERRORS.md** - Error handling guide

## 🔒 Security Features

- ✅ Password hashing with bcryptjs (salt rounds: 10)
- ✅ JWT token-based authentication
- ✅ Secure cookie handling (httpOnly, secure, sameSite)
- ✅ CORS protection with configurable origins
- ✅ Input validation and sanitization
- ✅ Error handling without sensitive data exposure
- ✅ Role-based access control (RBAC)

## 📈 Performance Optimizations

- Database indexes on frequently queried fields
- Request/response compression (Gzip)
- Pagination for large data sets
- Lazy loading in React components
- Code splitting with Vite
- Caching strategies with axios interceptors

## 🐛 Troubleshooting

### MongoDB Connection Error
```
✗ MongoDB Connection Error: connection refused
```
Ensure MongoDB is running: `mongod` (local) or check Atlas connection string

### CORS Error
Check that `CLIENT_URL` in server `.env` matches your frontend URL

### Token Expired
The refresh token is automatically used to get a new access token. If refresh fails, user is redirected to login

### Port Already in Use
Change `PORT` in server `.env` if 5000 is occupied

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/feature-name`
2. Make changes following code standards
3. Commit with clear messages
4. Push to branch and create a Pull Request

## 📄 License

ISC

## 🎯 Roadmap

- [ ] Google OAuth integration
- [ ] Employee management dashboard
- [ ] Payroll system
- [ ] Leave management
- [ ] Performance tracking
- [ ] Report generation
- [ ] Mobile app
- [ ] Advanced analytics

---

**For detailed documentation, see the `/docs` folder.**
