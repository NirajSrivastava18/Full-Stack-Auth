import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/screens/Login';
import Register from './components/screens/Register';
import PrivateRoute from './components/private/privateRoute';
import PrivatePage from './components/screens/PrivatePage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/private"
            element={<PrivateRoute element={PrivatePage} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
