import React from 'react';
import {Nav, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, NavLink} from 'reactstrap';

const TabsAdmin = ({active}) => {
  return(
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink href="/admin" active={active === 'dashboard' ? true : false}>Dashboard</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/admin/add" active={active === 'add' ? true : false}>Add New Trip</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/admin/delete" active={active === 'delete' ? true : false}>Delete a Trip</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/admin/update" active={active === 'update' ? true : false}>Update Trip Details</NavLink>
        </NavItem>
      </Nav>
      <br />
    </div>
  );
};

export default TabsAdmin;