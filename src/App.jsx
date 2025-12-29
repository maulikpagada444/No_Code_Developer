import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Components/Home/Home';
import { ThemeProvider } from './ThemeProvider';
import SignUpFlow from './Components/SignUp/SignUpFlow';
import SignInFlow from './Components/SignIn/SignInFlow';
import SignOtp from './Components/SignUp/sign-otp';
import Dashboard from './Components/Dashboard/Dashboard';
import Project from './Components/Dashboard/Project';
import Setting from './Components/Dashboard/Setting';
import ProjectWorkspace from './Components/Recommendation/ProjectWorkspace';
import PreviewPanel from './Components/Preview/PreviewPanel';
import DomainDashboard from './Components/Domain/Dashboard';
import ConnectDomain from './Components/Domain/ConnectDomain';
import CustomDomain from './Components/Domain/CustomDomain';
import ColorSelection from './Components/Recommendation/ColorSelection';

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUpFlow />} />
        <Route path="/signup-otp" element={<SignOtp />} />
        <Route path="/signin" element={<SignInFlow />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/project" element={<Project />} />
        <Route path="/dashboard/setting" element={<Setting />} />
        <Route path="/project/workspace" element={<ProjectWorkspace />} />
        <Route path="/project/preview" element={<PreviewPanel />} />
        <Route path="/sub-domain/dashboard" element={<DomainDashboard />} />
        <Route path="/domain/connect" element={<ConnectDomain />} />
        <Route path="/domain/custom" element={<CustomDomain />} />
        <Route path="/color-selection" element={<ColorSelection />} />

      </Routes>
    </ThemeProvider>
  );
}

export default App;
