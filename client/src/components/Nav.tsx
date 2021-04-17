import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../static-files/imgs/logo.png";

const Navigation = () => {
  return (
    <Navbar className="navbar" bg="dark" variant="dark" sticky="top">
      <Link to="/">
        <Navbar.Brand id="nav-title">
          <img className="nav-logo" src={logo} alt="" /> Air Quality Monitoring
        </Navbar.Brand>
      </Link>
      <Nav className="nav-items">
        <Link to="/home">
          <h3>AQI List</h3>
        </Link>
        <Link to="/compareAQI">
          <h3>AQI Comparer</h3>
        </Link>
      </Nav>
    </Navbar>
  );
};

export default Navigation;
