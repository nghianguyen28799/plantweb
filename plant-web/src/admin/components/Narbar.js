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
              <Link to="/contact"><NavLink>Contact</NavLink></Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Statistic
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link to="/statistic/page=1"><NavLink>Month 1</NavLink></Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/statistic/page=2"><NavLink>Month 2</NavLink></Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/statistic/page=3"><NavLink>Month 3</NavLink></Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/statistic/page=4"><NavLink>Month 4</NavLink></Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/statistic/page=5"><NavLink>Month 5</NavLink></Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/statistic/page=6"><NavLink>Month 6</NavLink></Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/statistic/page=7"><NavLink>Month 7</NavLink></Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/statistic/page=8"><NavLink>Month 8</NavLink></Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/statistic/page=9"><NavLink>Month 9</NavLink></Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/statistic/page=10"><NavLink>Month 10</NavLink></Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/statistic/page=11"><NavLink>Month 11</NavLink></Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/statistic/page=12"><NavLink>Month 12</NavLink></Link>
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