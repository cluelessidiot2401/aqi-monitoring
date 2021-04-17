import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../static-files/imgs/mern-logo.png";

const Navigation = () => {
  const componentsToRender = (): JSX.Element => {
    return (
      <>
        <Link to="/register">
          <h3>Register</h3>
        </Link>
        <Link to="/profile">
          <h3>Profile</h3>
        </Link>
      </>
    );
  };

  return (
    <Navbar className="navbar" bg="dark" variant="dark" sticky="top">
      <Link to="/">
        <Navbar.Brand id="nav-title">
          <img className="nav-logo" src={logo} alt="" /> My App
        </Navbar.Brand>
      </Link>
      <Nav className="nav-items">
        <Link to="/dashboard">
          <h3>Dashboard</h3>
        </Link>
        <Link to="/home">
          <h3>Home</h3>
        </Link>
        {componentsToRender()}
      </Nav>
    </Navbar>
  );
};

export default Navigation;
