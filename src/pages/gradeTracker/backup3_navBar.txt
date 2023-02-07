import * as React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap"

function NavBar({ setSelectedMajor }) {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Grade Tracker</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <NavDropdown title="Curriculum" id="basic-nav-dropdown">
              <NavDropdown.Item
                href="#home"
                onClick={() => {
                  setSelectedMajor("cs")
                }}
              >
                CS
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#home"
                onClick={() => {
                  setSelectedMajor("it")
                }}
              >
                IT
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavBar
