import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/screens/Login';
import Register from './components/screens/Register';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
