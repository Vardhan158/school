import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import './App.css'; // Custom CSS file

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [showSocialIcons, setShowSocialIcons] = useState(false);

  const toggleSocialIcons = () => {
    setShowSocialIcons(!showSocialIcons);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button onClick={toggleSidebar} className="close-btn">
        <X />
      </button>
      <ul className="sidebar-menu">
        <li>
          <Link to="/help">Help</Link>
        </li>
        <li>
          <button onClick={toggleSocialIcons}>Share</button>
          {showSocialIcons && (
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a><br />
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a><br />
              <a href="https://wa.me" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

const Home = () => {
  const subjects = ["Kannada", "English", "Hindi", "Maths", "Science", "Social"];
  return (
    <div className="home">
      <h2>Subjects</h2>
      <div className="subjects-grid">
        {subjects.map((sub) => (
          <Link
            key={sub}
            to={`/subject/${sub.toLowerCase()}`}
            className="subject-tile"
          >
            {sub}
          </Link>
        ))}
      </div>
      <div className="attendance">
        <h2>Attendance</h2>
        <table>
          <thead>
            <tr>
              <th>Conducted</th>
              <th>Attended</th>
              <th>% Attendance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>50</td>
              <td>45</td>
              <td className="green">90%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SubjectPage = ({ subject }) => (
  <div className="subject-page">
    <h2>{subject} Videos</h2>
    <ul>
      <li><a href="#" target="_blank" rel="noopener noreferrer">Introduction to {subject}</a></li>
      <li><a href="#" target="_blank" rel="noopener noreferrer">Advanced {subject} Techniques</a></li>
      <li><a href="#" target="_blank" rel="noopener noreferrer">Practice Problems in {subject}</a></li>
    </ul>
    <div className="quiz">
      <h3>Quiz</h3>
      <ol>
        <li>What is the basic concept of {subject}?</li>
        <li>Give an example related to {subject}.</li>
        <li>Why is {subject} important?</li>
      </ol>
    </div>
  </div>
);

const Redeem = () => {
  const handleRedeem = () => {
    alert("Redeemed");
  };

  return (
    <div className="redeem">
      <h2>Coins: 120</h2>
      <h3>Purchase Items:</h3>
      <ul>
        <li>Pen - 20 coins</li>
        <li>Pencil - 10 coins</li>
        <li>Geometry Box - 50 coins</li>
      </ul>
      <button onClick={handleRedeem}>Redeem</button>
    </div>
  );
};

const Help = () => (
  <div className="help">
    <h2>Help & Support</h2>
    <p>If you need any assistance with the dashboard, please contact your teacher or administrator.</p>
    <p>For technical issues, reach out to support@school.edu</p>
  </div>
);

const ProfileDropdown = ({ role, setRole }) => {
  const navigate = useNavigate();

  const handleLogin = (type) => {
    setRole(type);
    alert(`Welcome ${type}`);
  };

  const handleLogout = () => {
    setRole(null);
    alert("Logged out");
    navigate("/");
  };

  return (
    <div className="profile-dropdown">
      <div className="dropdown">
        <button className="dropbtn">Profile</button>
        <div className="dropdown-content">
          {!role && (
            <>
              <button onClick={() => handleLogin("Student")}>Login as Student</button>
              <button onClick={() => handleLogin("Teacher")}>Login as Teacher</button>
            </>
          )}
          {role && <button onClick={handleLogout}>Logout</button>}
        </div>
      </div>
      {role && <span className="welcome-msg">Welcome {role}</span>}
    </div>
  );
};

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [role, setRole] = useState(null);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      <div className="app">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="main">
          <header>
            <button onClick={toggleSidebar} className="menu-btn">
              <Menu />
            </button>
            <Link to="/" className="title">Student Dashboard</Link>
            <Link to="/redeem" className="redeem-link">Redeem</Link>
            <ProfileDropdown role={role} setRole={setRole} />
          </header>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/subject/:subject" element={<SubjectRoute />} />
              <Route path="/redeem" element={<Redeem />} />
              <Route path="/help" element={<Help />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

const SubjectRoute = () => {
  const subject = window.location.pathname.split("/").pop();
  return <SubjectPage subject={subject.charAt(0).toUpperCase() + subject.slice(1)} />;
};

export default App;
