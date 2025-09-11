import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/AboutPage";
import RegisterPage from "./components/RegisterPage";
import SignInForm from "./components/SignInForm";
import LawyerDashboard from "./components/LawyerDashboard";
import Dashboard from "./components/Dashboard";
import TermsConditions from "./components/TermsConditions";
import RegisterForm from "./components/Register";
import LawyerProfileUpdate from "./components/LawyerUpdateProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register/:type" element={<RegisterPage />} />
        <Route path="/signin/:type" element= {<SignInForm/>} />
        <Route path="/dashboard" element= {<LawyerDashboard/>} />
        <Route path="/userDashboard" element= {<Dashboard/>} />
        <Route path="/T&C" element= {<TermsConditions onBack={() => {}} page = "/"/>} />
        <Route path="/register" element={<RegisterForm type="user"/>} />
        <Route path="/lawyer/update" element= {<LawyerProfileUpdate/>} />
      </Routes>
    </Router>
  );
}

export default App;
