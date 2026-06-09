# Campus Connect

A modern full-stack platform that connects campus users and facilitates service sharing and collaboration. Campus Connect enables students and staff to discover services, connect with others, and leverage AI-powered matching to find the perfect collaborators.

## Features

- **User Authentication**: Secure authentication system powered by NextAuth with session management
- **User Dashboard**: Personalized dashboard for managing profile, services, and connections
- **Service Management**: Create, browse, and manage services offered by campus community
- **AI-Powered Matching**: Intelligent matching algorithm using LangChain and Google GenAI to connect users with relevant services
- **Real-Time Chat**: Socket.io powered instant messaging for direct communication
- **Inbox Management**: Manage messages and notifications from other users
- **Privacy & Terms**: Built-in privacy policy and terms of service pages
- **Responsive UI**: Modern, animated interface built with Tailwind CSS and Framer Motion

## Tech Stack

### Frontend
- **Next.js 16.2.6** - React framework with server-side rendering and API routes
- **React 19.2.4** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions

### Backend
- **Node.js** - JavaScript runtime
- **Next.js API Routes** - Serverless backend functions
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### AI & Real-Time
- **LangChain** - AI framework for building intelligent applications
- **Google GenAI** - Generative AI capabilities
- **Socket.io** - Real-time bidirectional communication

### Other Tools
- **NextAuth** - Authentication solution
- **Axios** - HTTP client
- **Zod** - Schema validation
## Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB database (local or cloud)
- Google Generative AI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd campusconnect
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```env
# Database
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Google GenAI
GOOGLE_AI_API_KEY=your_google_ai_api_key

# Other configurations
NODE_ENV=development
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

### Available Scripts

```bash
# Start development server with auto-reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

### Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── chat/          # Chat functionality
│   │   ├── match/         # Matching service
│   │   ├── services/      # Service management
│   │   └── user/          # User endpoints
│   ├── (app)/             # Protected routes group
│   │   ├── dashboard/     # User dashboard
│   │   └── services/      # Services listing and details
│   ├── login/             # Login page
│   ├── privacy/           # Privacy policy
│   └── terms/             # Terms of service
├── components/            # Reusable React components
│   ├── AIMatchModel.tsx   # AI matching interface
│   ├── ChatModal.tsx      # Chat interface
│   └── SessionWrapper.tsx # Auth session provider
├── lib/                   # Utility functions
│   ├── db.ts             # Database connection
│   ├── matchAgent.ts     # AI matching logic
├── models/               # Mongoose schemas
│   ├── chat.model.ts
│   ├── service.model.ts
│   └── user.model.ts
├── types/                # TypeScript type definitions
│   └── next-auth.d.ts    # NextAuth types
└── middleware.ts         # Next.js middleware
```

## Key Features Explained

### Authentication
The app uses NextAuth for secure authentication with session management. User sessions are stored and validated for protected routes.

### AI Matching
Uses LangChain and Google GenAI to intelligently match users with relevant services based on profiles and preferences.

### Real-Time Chat
Socket.io enables real-time messaging between users for direct communication about services.

### Database Models
- **User Model**: Stores user profiles, preferences, and metadata
- **Service Model**: Manages service listings with details and creator info
- **Chat Model**: Stores message history and conversations

## API Routes

- `POST /api/auth/[...nextauth]` - Authentication endpoints
- `GET/POST /api/services` - Service management
- `GET/POST /api/chat` - Chat functionality
- `POST /api/match` - AI matching service
- `GET /api/user/dashboard` - User dashboard data

## Deployment

The application can be deployed on:
- **Vercel** (recommended for Next.js)
- **AWS**, **Google Cloud**, **Azure**
- Any Node.js hosting platform

Update environment variables on your hosting platform accordingly.

## Development Guidelines

- **TypeScript**: Maintain strict type checking
- **Code Style**: Follow ESLint configuration
- **Components**: Keep components reusable and modular
- **Database**: Use Mongoose models for database operations
- **API Routes**: Implement proper error handling and validation

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is private and confidential.

## Support

For issues and questions, please refer to the documentation or contact the development team.
