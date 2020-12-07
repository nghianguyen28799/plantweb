import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const onClick = () => {
    Cookies.remove('admin-plantweb');
    window.location.href = "/";
  }

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link to="/"><NavbarBrand>Plant Shop</NavbarBrand></Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link to="/product"><NavLink>Products</NavLink></Link>
            </NavItem>
            <NavItem>
              <Link to="/user"><NavLink>Users</NavLink></Link>
            </NavItem>
            <NavItem>
              <Link to="/order"><NavLink>Orders</NavLink></Link>
            </NavItem>
            <NavItem>
              <Link to="/addproduct"><NavLink>Add Product</NavLink></Link>
            </NavItem>
            <NavItem>
              <Link to="/contact"><NavLink>Contact</NavLink></Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText><Link to="/" style={{ color: 'blue' }} onClick={onClick}>Log out</Link></NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;