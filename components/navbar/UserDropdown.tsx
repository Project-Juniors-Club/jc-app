import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import DropDown from './DropDown';
import { useRouter } from 'next/router';

const UserDropdown = () => {
  const router = useRouter();
  const loginItems = [{ clickOption: 'My Profile', onClick: () => router.push('/users/manage') }, { clickOption: 'Log Out', onClick: () => signOut() }];
  const { data: session } = useSession();
  let username: string;
  if (session) {
    username = session.user.name;
  } else {
    username = 'Username';
  }
  return (
    <div className='flex flex-row items-center gap-2 p-0'>
      <Image src={'/assets/logos/user.svg'} width={36} height={41} alt='user' />
      <DropDown buttonName={username} dropdownItems={loginItems}></DropDown>
    </div>
  );
};

export default UserDropdown;
