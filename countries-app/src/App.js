import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CountryPage from './pages/CountryPage';
import Layout from './components/Layout';

function App() {
  return (
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/country/:countryCode" element={<CountryPage />} />
          </Routes>
        </Layout>
      </Router>
  );
}

export default App;
