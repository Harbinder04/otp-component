// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Verification from './pages/otpverify';
import SignIn from './pages/signin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/verify" element={<Verification />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;