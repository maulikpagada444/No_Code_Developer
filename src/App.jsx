import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Components/Home/Home';
import { ThemeProvider } from './ThemeProvider';
import SignUpFlow from './Components/SignUp/SignUpFlow';
import SignInFlow from './Components/SignIn/SignInFlow';
import Dashboard from './Components/Dashboard/Dashboard';
import Project from './Components/Dashboard/Project';
import Setting from './Components/Dashboard/Setting';
import ProjectWorkspace from './Components/Recommendation/ProjectWorkspace';
import PreviewPanel from './Components/Priview/Preview-Panel';

function App() {
  return (
    <ThemeProvider>

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />

        <Route path="/signup" element={<SignUpFlow />} />
        <Route path="/signin" element={<SignInFlow />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/project" element={<Project />} />
        <Route path="/dashboard/setting" element={<Setting />} />
        <Route path="/project/workspace" element={<ProjectWorkspace />} />
        <Route path="/project/preview" element={<PreviewPanel />} />

      </Routes>
    </ThemeProvider>
  );
}

export default App;
