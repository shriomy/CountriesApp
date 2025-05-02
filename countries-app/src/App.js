import logo from './logo.svg';
import './styles/global.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CountryPage from './pages/CountryPage';
import Layout from './components/Layout';
import {FilterProvider} from "./context/FilterContext";

function App() {
  return (
      <FilterProvider>
          <Router>
              <Layout>
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/country/:countryCode" element={<CountryPage />} />
                  </Routes>
              </Layout>
          </Router>
      </FilterProvider>
  );
}

export default App;
