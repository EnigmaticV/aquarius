import React from 'react';

interface NavbarItemProps {
  label: string;
  active?: boolean;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, active }) => {
  return (
     <div className={active ? 'text-white cursor-default' : 'text-which hover:text-black cursor-pointer transition'}>
      {label}
    </div>
  )
}

export default NavbarItem;
