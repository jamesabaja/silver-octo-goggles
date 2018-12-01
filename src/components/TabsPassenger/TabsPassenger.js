import React from 'react';
import {Nav, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, NavLink} from 'reactstrap';

const TabsPassenger = ({active}) => {
  return(
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink href="/passenger/dashboard" active={active === 'dashboard' ? true : false}>Dashboard</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/passenger/book/trip" active={active === 'book' ? true : false}>Book a Trip</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/passenger/view/trips" active={active === 'viewtrips' ? true : false}>View Your Booked Trips</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/passenger/settings" active={active === 'settings' ? true : false}>Account Settings</NavLink>
        </NavItem>
      </Nav>
      <br />
    </div>
  );
};

export default TabsPassenger;