import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Header from '../src/components/views/Header/Header';
import Footer from '../src/components/views/Footer/Footer';
import NotFound404 from '../src/components/views/NotFound404/NotFound404';
import Home from '../src/components/pages/Home/Home';
import Login from './components/pages/Login/Login';
import Logout from './components/pages/Logout/Logout';
import Register from './components/pages/Register/Register';

function App() {
  return (
    <main>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
        <Footer />
      </Container>
    </main>
  );
}

export default App;
