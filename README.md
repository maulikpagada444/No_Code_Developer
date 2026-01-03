# 🚀 Green Screen - AI-Powered Website Builder

> **No-Code Website Development Platform with AI Integration**

A modern, AI-powered website builder that allows users to create, customize, and deploy websites without writing code. Built with React, Vite, and integrated with AI for intelligent design generation.

---

## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Application Flow](#-application-flow)
- [Setup & Installation](#-setup--installation)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [API Integration](#-api-integration)
- [Contributing](#-contributing)

---

## ✨ Features

### 🔐 Authentication
- **Sign Up Flow** with OTP verification
- **Sign In** with email/password
- **Google OAuth** integration
- **JWT-based** authentication
- **Route protection** (Public & Protected routes)

### 🎨 Dashboard
- **User Statistics** (Active Sites, AI Generations, Published Sites)
- **Recent Projects** overview
- **Quick Actions** (New Project, View All Projects)
- **Dark/Light Theme** support
- **GSAP animations** for smooth UX

### 🤖 AI-Powered Features
- **AI Website Generation** from text prompts
- **Smart Recommendations** for design and layout
- **Color Palette Selection** with AI suggestions
- **Template Generation** based on industry/niche

### 🛠️ Website Builder
- **Visual Editor** with drag-and-drop (planned)
- **Live Preview** panel
- **Project Workspace** for editing
- **Real-time Updates**

### 🌐 Domain Management
- **Subdomain Dashboard**
- **Custom Domain** connection
- **Domain Configuration** tools

---

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - UI library
- **Vite 7.2.2** - Build tool & dev server
- **React Router DOM 7.9.5** - Client-side routing
- **TailwindCSS 4.1.17** - Utility-first CSS framework

### UI/UX Libraries
- **Material-UI (MUI)** - Component library
- **React Icons** - Icon library
- **Lucide React** - Modern icon set
- **GSAP 3.14.2** - Animation library
- **React Simple Typewriter** - Typing animations

### Authentication & State
- **JWT Decode** - Token parsing
- **JS Cookie** - Cookie management
- **React OAuth Google** - Google authentication

### Development
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

---

## 📁 Project Structure

```
green-screen/
│
├── Public/                      # Static assets
│
├── src/
│   ├── Components/
│   │   ├── Dashboard/          # Dashboard related components
│   │   │   ├── Dashboard.jsx   # Main dashboard page
│   │   │   ├── Project.jsx     # All projects view
│   │   │   ├── Setting.jsx     # User settings
│   │   │   └── Header.jsx      # Dashboard header
│   │   │
│   │   ├── SignUp/             # Sign up flow
│   │   │   ├── SignUpFlow.jsx  # Multi-step signup
│   │   │   ├── SignUp.jsx      # Sign up form
│   │   │   └── sign-otp.jsx    # OTP verification
│   │   │
│   │   ├── SignIn/             # Sign in flow
│   │   │   ├── SignInFlow.jsx  # Multi-step signin
│   │   │   ├── SignInScreen.jsx # Sign in form
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   └── PasswordSuccess.jsx
│   │   │
│   │   ├── Home/               # Landing page
│   │   │   └── Home.jsx
│   │   │
│   │   ├── Recommendation/     # AI Recommendations
│   │   │   ├── NewProjectModal.jsx
│   │   │   ├── ProjectWorkspace.jsx
│   │   │   ├── ColorSelection.jsx
│   │   │   └── ...
│   │   │
│   │   ├── Preview/            # Website preview
│   │   │   ├── PreviewPanel.jsx
│   │   │   └── ...
│   │   │
│   │   ├── Editor/             # Visual editor (planned)
│   │   │   └── ...
│   │   │
│   │   ├── Domain/             # Domain management
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ConnectDomain.jsx
│   │   │   └── CustomDomain.jsx
│   │   │
│   │   ├── Utils/              # Utility components
│   │   │   ├── PublicRoute.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── ...
│   │   │
│   │   └── common/             # Shared components
│   │       └── AppAlert.jsx
│   │
│   ├── App.jsx                 # Main app with routing
│   ├── main.jsx                # Entry point
│   ├── ThemeProvider.jsx       # Theme context
│   └── index.css               # Global styles
│
├── .env                        # Environment variables
├── .gitignore                  # Git ignore rules
├── API_REQUIREMENTS.md         # Backend API specifications
├── index.html                  # HTML template
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

---

## 🔄 Application Flow

### 1️⃣ **User Entry → Landing Page**
```
/ → redirects to → /home
```
- User lands on **Home.jsx** (Landing page)
- Can navigate to Sign Up or Sign In

---

### 2️⃣ **Authentication Flow**

#### **Sign Up Journey:**
```
/signup (SignUpFlow.jsx)
    ↓
User enters: Email, Password, Name
    ↓
POST /auth/signup → Backend sends OTP
    ↓
/signup-otp (sign-otp.jsx)
    ↓
User enters OTP
    ↓
POST /auth/verify-otp → Backend verifies
    ↓
JWT Token + Refresh Token stored in cookies
    ↓
Redirect to /dashboard
```

#### **Sign In Journey:**
```
/signin (SignInFlow.jsx)
    ↓
User enters: Email, Password
    ↓
POST /auth/login → Backend validates
    ↓
JWT Token stored in cookies
    ↓
Redirect to /dashboard
```

#### **Forgot Password Flow:**
```
/signin → Click "Forgot Password"
    ↓
Enter Email → POST /auth/forgot-password
    ↓
OTP sent to email
    ↓
Verify OTP → POST /auth/verify-reset-otp
    ↓
Reset Password → POST /auth/reset-password
    ↓
Success → Redirect to /signin
```

---

### 3️⃣ **Dashboard Flow** (Protected Route)

```
/dashboard (Dashboard.jsx)
    ↓
Fetch user stats: GET /auth/user/stats
    ├── Active Sites count
    ├── AI Generations count
    └── Published Sites count
    ↓
Fetch recent projects: GET /auth/project/list
    ↓
Display:
    ├── Welcome message with greeting
    ├── Statistics cards (animated with GSAP)
    ├── New Project card (CTA)
    └── Recent Projects list
```

**User Actions from Dashboard:**
- **Create New Project** → Opens NewProjectModal
- **View All Projects** → Navigate to `/dashboard/project`
- **Click Project** → Navigate to `/project/preview`
- **Settings** → Navigate to `/dashboard/setting`

---

### 4️⃣ **Project Creation Flow**

```
Dashboard → Click "New Project"
    ↓
NewProjectModal opens
    ↓
User describes website idea (AI Prompt)
    ↓
POST /ai/generate-website
    ↓
Backend generates:
    ├── HTML structure
    ├── CSS styles
    ├── Suggested color palette
    └── Page components
    ↓
Navigate to /project/workspace
    ↓
ProjectWorkspace.jsx
    ├── Show generated design
    ├── AI Chatbot for modifications
    └── Edit options
    ↓
User can:
    ├── Modify design via AI chat
    ├── Select color palette (/color-selection)
    ├── Preview website (/project/preview)
    └── Publish project
```

---

### 5️⃣ **Project Management Flow**

```
/dashboard/project (Project.jsx)
    ↓
GET /auth/project/list → Fetch all projects
    ↓
Display all user projects in grid
    ↓
Click on project → Navigate to /project/preview
```

---

### 6️⃣ **Preview & Edit Flow**

```
/project/preview (PreviewPanel.jsx)
    ↓
Load project by project_id
    ↓
GET /project/{project_id}
    ↓
Display:
    ├── Live website preview (iframe)
    ├── Edit button → /project/workspace
    ├── Settings button
    └── Publish button
    ↓
User can:
    ├── Continue editing
    ├── Publish to subdomain
    └── Connect custom domain
```

---

### 7️⃣ **Domain Management Flow**

```
Project Preview → Click "Publish"
    ↓
/sub-domain/dashboard (DomainDashboard.jsx)
    ↓
Options:
    ├── Use Subdomain (yoursite.greenscreen.com)
    │   → POST /domain/create-subdomain
    │
    └── Connect Custom Domain
        ↓
        /domain/connect (ConnectDomain.jsx)
        ↓
        Enter custom domain
        ↓
        POST /domain/verify-domain
        ↓
        /domain/custom (CustomDomain.jsx)
        ↓
        Configure DNS settings
        ↓
        POST /domain/connect-custom
        ↓
        Website published on custom domain
```

---

### 8️⃣ **Route Protection System**

#### **Public Routes** (Redirect to /dashboard if logged in)
- `/home` - Landing page
- `/signup` - Sign up flow
- `/signin` - Sign in flow
- `/signup-otp` - OTP verification

#### **Protected Routes** (Require authentication)
- `/dashboard` - Main dashboard
- `/dashboard/project` - All projects
- `/dashboard/setting` - User settings
- `/project/workspace` - Project editor
- `/project/preview` - Project preview
- `/sub-domain/dashboard` - Domain dashboard
- `/domain/connect` - Connect domain
- `/domain/custom` - Custom domain setup
- `/color-selection` - Color palette selection

#### **Route Guards:**
```javascript
PublicRoute.jsx:
- Checks if user is authenticated (token in cookies)
- If YES → Redirect to /dashboard
- If NO → Show the page

ProtectedRoute.jsx:
- Checks if user is authenticated
- If YES → Show the page
- If NO → Redirect to /signin
```

---

## 🚀 Setup & Installation

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Backend API** running (see API_REQUIREMENTS.md)

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/maulikpagada444/No_Code_Developer.git
cd green-screen
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

4. **Start development server**
```bash
npm run dev
```

5. **Open browser**
```
http://localhost:5173
```

---

## 🔧 Environment Variables

Create a `.env` file with the following variables:

```env
# Backend API URL
VITE_API_BASE_URL=http://localhost:5000

# Google OAuth Client ID (optional)
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

---

## 📜 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## 🔌 API Integration

### Authentication Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Register new user |
| POST | `/auth/verify-otp` | Verify email OTP |
| POST | `/auth/login` | User login |
| POST | `/auth/forgot-password` | Request password reset |
| POST | `/auth/reset-password` | Reset password |
| POST | `/auth/logout` | Logout user |

### Project Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/auth/project/list` | Get all user projects |
| POST | `/project/create` | Create new project |
| GET | `/project/{id}` | Get project details |
| PUT | `/project/{id}` | Update project |
| DELETE | `/project/{id}` | Delete project |

### Stats Endpoint
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/auth/user/stats` | Get user statistics |

**Response Format:**
```json
{
  "status": "success",
  "data": {
    "activeSites": 5,
    "aiGenerations": 24,
    "publishedSites": 3,
    "activeSitesTrend": "+12%"
  }
}
```

For complete API specifications, see [API_REQUIREMENTS.md](./API_REQUIREMENTS.md)

---

## 🎨 Theme Support

The application supports **Dark Mode** and **Light Mode**:

- Default: **Dark Mode**
- Toggle: Available in settings/header
- Context: `ThemeProvider.jsx` manages theme state
- Styling: Defined in `index.css` with CSS variables

---

## 🔐 Authentication Flow Details

### Cookie Management
- **Access Token**: `access_token` (JWT)
- **Refresh Token**: `refresh_token` (optional)
- **Username**: `username` (for display)

### Session Management
- Tokens stored in **httpOnly cookies** (if backend configured)
- Auto-redirect on token expiry
- Remember me functionality (optional)

---

## 📊 State Management

Currently using **React Context** for:
- **ThemeContext** - Dark/Light mode
- **UserContext** (planned) - User information

No external state management library (Redux/Zustand) used yet.

---

## 🎯 Roadmap / Planned Features

- [ ] Visual drag-and-drop editor
- [ ] More AI templates and themes
- [ ] Component library integration
- [ ] Real-time collaboration (multi-user editing)
- [ ] Version control for projects
- [ ] Export to static files (HTML/CSS/JS)
- [ ] SEO optimization tools
- [ ] Analytics integration
- [ ] Mobile app version

---

## 🐛 Known Issues

- Stats API not implemented yet (shows 0 values)
- Some animations may lag on slower devices
- Preview iframe security considerations

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is private and not open-source.

---

## 👨‍💻 Developer Notes

### Important Files
- **App.jsx** - All routes and navigation
- **ThemeProvider.jsx** - Theme context and state
- **index.css** - Global styles, CSS variables, animations
- **PublicRoute.jsx** - Public route guard
- **ProtectedRoute.jsx** - Protected route guard

### Code Style
- Use **functional components** with hooks
- Follow **React best practices**
- Use **TailwindCSS** classes for styling
- Add **GSAP animations** for smooth UX
- Handle errors gracefully

### Testing
- Manual testing currently
- Unit tests (planned)
- E2E tests (planned)

---

## 📧 Contact

For questions or support, contact the development team.

---

**Built with ❤️ using React, Vite, and AI**