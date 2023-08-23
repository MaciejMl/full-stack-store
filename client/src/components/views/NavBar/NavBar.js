import { Container, Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';
import styles from './NavBar.module.scss';

const NavBar = () => {
  const loggedUser = useSelector(getUser);
  console.log(loggedUser);
  return (
    <Navbar bg="primary" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          full-stack-store.app
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {loggedUser ? (
              <>
                <Nav.Link as={NavLink} to="/ad/add">
                  Add
                </Nav.Link>
                <Nav.Link as={NavLink} to="/" className={styles.navbar}>
                  Home
                </Nav.Link>
                <Nav.Link as={NavLink} to="/logout">
                  LogOut
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={NavLink} to="/login">
                  LogIn
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
