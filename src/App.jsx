import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";

import EntrepreneurDashboard from "./Pages/Dashboard/EntrepreneurDashboard";
import Navbar from "./Components/Navbar";

import EntrepreneurProfile from "./Pages/Profile/EntrepreneurProfile";
import InvestorPage from "./Pages/Entrepreneurs/InvestorPage";
import Notifications from "./Pages/Notification/Notifications";
import DocumentsPage from "./Pages/Document/DocumentsPage";
import SettingPage from "./Pages/Entrepreneurs/SettingPage";

function App() {
  return (
    <>
      <div>
        <Navbar/>
      
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard" element={<EntrepreneurDashboard />} />
          <Route path="/Profile" element={<EntrepreneurProfile/>} />
          <Route path="/Investors" element={<InvestorPage/>} />
          <Route path="/Notification" element={<Notifications/>} />
          <Route path="/Document" element={<DocumentsPage/>} />
          <Route path="/settings" element={<SettingPage/>} />

        </Routes>
      </div>
    </>
  );
}

export default App;
