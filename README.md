# WALLFIT - Women's Wellness Fitness Application

A full-stack fitness and wellness application designed specifically for women aged 20-45.

## Features

- 🏋️ **Fitness Programs**: Choose from 8 expertly designed fitness programs
- 👥 **Community**: Join groups, ask questions, and connect with other women
- 📊 **Dashboard**: Track your progress and view your personalized program
- 🍎 **Nutrition Guidance**: Meal suggestions for each program
- 💬 **Discussion Forums**: Post questions and replies in community groups

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Framer Motion
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Bcrypt

## Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/youssefiml/W-allfit.git
cd WALLFIT
```

2. Install dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Set up environment variables

Create `server/.env`:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Run the application

```bash
# Terminal 1 - Start server
cd server
npm run dev

# Terminal 2 - Start client
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Deployment on Railway

See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for detailed deployment instructions.

### Quick Start

1. **Create Railway Project**
   - Go to https://railway.app
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository

2. **Configure Service**
   - Root Directory: `server`
   - Start Command: `npm start`
   - Railway will automatically build the client

3. **Add MongoDB**
   - Click "New" → "Database" → "MongoDB"
   - Copy the connection string

4. **Set Environment Variables**
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_random_string
   NODE_ENV=production
   ```

5. **Deploy**
   - Railway auto-deploys on push to main
   - Get your public URL from Railway dashboard

For detailed instructions, see [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)

## Project Structure

```
WALLFIT/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   └── services/      # API services
│   └── package.json
├── server/                 # Express backend
│   ├── controllers/       # Route controllers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Auth middleware
│   └── data/              # Sample programs
└── package.json           # Root package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

### Programs
- `GET /api/program` - Get user's program
- `POST /api/program` - Save user's program
- `GET /api/program/samples` - Get sample programs

### Community
- `GET /api/community/posts` - Get all posts
- `POST /api/community/posts` - Create post
- `POST /api/community/posts/:postId/reply` - Reply to post
- `GET /api/community/groups` - Get all groups
- `POST /api/community/groups` - Create group
- `POST /api/community/groups/:id/join` - Join group
- `POST /api/community/groups/:id/leave` - Leave group

## License

ISC

## Author

WALLFIT Team

