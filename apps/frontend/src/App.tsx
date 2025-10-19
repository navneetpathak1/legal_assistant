import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { initializeTheme } from "./store/slices/themeSlice";
import { Scale } from "lucide-react";
import type { RootState } from "./store";
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/AboutPage";
import RegisterPage from "./components/RegisterPage";
import SignInForm from "./components/SignInForm";
import LawyerDashboard from "./components/LawyerDashboard";
import Dashboard from "./components/Dashboard";
import TermsConditions from "./components/TermsConditions";
import RegisterForm from "./components/Register";
import LawyerProfileUpdate from "./components/LawyerUpdateProfile";
// import PaymentPage from "./components/PaymentPage";
import LawyersList from "./components/LawyersList";

function AppContent() {
  const dispatch = useAppDispatch();
  const { isDark } = useAppSelector((state: RootState) => state.theme);

  useEffect(() => {
    dispatch(initializeTheme());
  }, [dispatch]);

  return (
    <Router>
      <header className={`fixed top-0 w-full backdrop-blur-md z-50 border-b transition-colors duration-300 ${
        isDark 
          ? 'bg-slate-900/95 border-slate-700' 
          : 'bg-white/95 border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Scale className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                LegalAssist
              </span>
            </Link>
          </div>
        </div>
      </header>
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register/:type" element={<RegisterPage />} />
          <Route path="/signin/:type" element={<SignInForm/>} />
          <Route path="/dashboard" element={<LawyerDashboard/>} />
          <Route path="/userDashboard" element={<Dashboard/>} />
          <Route path="/T&C" element={<TermsConditions onBack={() => {}} page="/"/>} />
          <Route path="/register" element={<RegisterForm type="user"/>} />
          <Route path="/lawyer/update" element={<LawyerProfileUpdate/>} />
          <Route path="/lawyers" element={<LawyersList />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
