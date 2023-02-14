import { useSession } from 'next-auth/react';
import Image from 'next/image';
import NavBarCart from './NavBarCart';
import NavbarGeneral from './NavBarGeneral';
import UserDropdown from './UserDropdown';

const NavBar = () => {
  const { data: session } = useSession();
  return session ? <NavBarCart /> : <NavbarGeneral />;
};

export default NavBar;
