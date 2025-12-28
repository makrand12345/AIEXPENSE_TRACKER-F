import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Signup from "./pages/Signup";
import Summary from "./pages/Summary";
import Goals from "./pages/Goals";
import VoiceAssistant from "./pages/VoiceAssistant";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import FinanceSetup from "./pages/FinanceSetup";
import "./components/Pages.css";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/voice" element={<VoiceAssistant />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />}/>
        <Route path="/finance-setup" element={<FinanceSetup />} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;
