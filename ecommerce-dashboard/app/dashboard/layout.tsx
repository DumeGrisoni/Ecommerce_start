import { Box } from '@/components/ui/box';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

// ------------ Import personnels -----------------
import { DashboardLayoutProps } from '@/types/types';
import Navbar from '@/components/menu/navbar';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
import Link from 'next/link';

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const token = cookies().get('token')?.value;

  if (!token) {
    return redirect('/login');
  }
  const decodedToken: { exp: number } = jwtDecode(token);
  const currentTime = new Date().getTime() / 1000;

  if (decodedToken.exp < currentTime) {
    cookies().delete('token');
    return redirect('/login');
  }
  return (
    <div className="h-screen">
      <Header />
      <HStack space="xl" className="">
        <Navbar />
        <Box className="flex-1 ml-16 md:ml-24 mt-[60px]">{children}</Box>
      </HStack>
    </div>
  );
};

export default DashboardLayout;

function Header() {
  return (
    <HStack className="flex-1 bg-typography-0 w-full border-b py-2 z-20 px-4 items-center fixed justify-between border-typography-400">
      <Link href="/dashboard">
        <Heading>Tableau de Bord</Heading>
      </Link>
      <Avatar>
        <AvatarFallbackText>D</AvatarFallbackText>
      </Avatar>
    </HStack>
  );
}
