import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './Layout';
import DashboardPage from './pages/Dashboard';
import ChatWidget from './components/ChatWidget';
import AnalyzeBillPage from './pages/AnalyzePage';
import MeterPage from './pages/MeterPage';
import ScamCheckPage from './pages/ScamCheckPage';
import SavingsPage from './pages/SavingsPage';
import ComplaintPage from './pages/ComplaintPage';
import AppliancePage from './pages/AppliancePage';

function App() {
  return (
    <Router>
      <ChatWidget />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard Routes with Layout */}
        <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
        <Route path="/dashboard/analyze" element={<DashboardLayout><AnalyzeBillPage /></DashboardLayout>} />
        <Route path="/dashboard/meter" element={<DashboardLayout><MeterPage /></DashboardLayout>} />
        <Route path="/dashboard/scam-check" element={<DashboardLayout><ScamCheckPage /></DashboardLayout>} />
        <Route path="/dashboard/savings" element={<DashboardLayout><SavingsPage /></DashboardLayout>} />
        <Route path="/dashboard/complaint" element={<DashboardLayout><ComplaintPage /></DashboardLayout>} />
        <Route path="/dashboard/appliance" element={<DashboardLayout><AppliancePage /></DashboardLayout>} />

        {/* Placeholder for other dashboard routes */}
        <Route path="/dashboard/*" element={<DashboardLayout><div className="p-8 text-white">Feature coming soon...</div></DashboardLayout>} />
      </Routes>
    </Router>
  );
}

export default App;


