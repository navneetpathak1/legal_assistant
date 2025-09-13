import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { useAppDispatch } from "./store/hooks";
import { initializeTheme } from "./store/slices/themeSlice";
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/AboutPage";
import RegisterPage from "./components/RegisterPage";
import SignInForm from "./components/SignInForm";
import LawyerDashboard from "./components/LawyerDashboard";
import Dashboard from "./components/Dashboard";
import TermsConditions from "./components/TermsConditions";
import RegisterForm from "./components/Register";
import LawyerProfileUpdate from "./components/LawyerUpdateProfile";
import PaymentPage from "./components/PaymentPage";

function AppContent() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeTheme());
  }, [dispatch]);

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
        <Route path="/payment/:lawyerId" element={<PaymentPage onBack={() => window.history.back()} />} />
        <Route path="/upgrade" element={<PaymentPage onBack={() => window.history.back()} />} />
      </Routes>
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
