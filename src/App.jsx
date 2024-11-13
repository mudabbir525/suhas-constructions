import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Homepage from './components/HomePage';
import OngoingProjects from './components/OngoingProjects';
import CompletedProjects from './components/CompletedProjects'; // Updated to match the filename
import ContactUs from './components/ContactUs';

const App = () => {
  return (
    <Router> 
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/ongoing-projects" element={<OngoingProjects />} />
            <Route path="/completed-projects" element={<CompletedProjects />} /> {/* Updated to match the filename */}
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
