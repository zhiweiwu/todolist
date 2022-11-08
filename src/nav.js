import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useAuth} from './AuthContext'
import {Link} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
function WebNavbar() {
  const {loggedIn}=useAuth()
    return (
      <>
       
        <Navbar bg="primary" variant="dark">
          <Container>
          <LinkContainer to="/">
            <Navbar.Brand >Todolist</Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto">
            <LinkContainer to="/weather">
              <Nav.Link>Go out for walk?</Nav.Link>
              </LinkContainer> 
      
            </Nav>
          </Container>
        </Navbar>
  
      </>
    );
  }
  
  export default WebNavbar;
  