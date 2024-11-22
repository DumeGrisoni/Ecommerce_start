import { Box } from '@/components/ui/box';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

// ------------ Import personnels -----------------
import { DashboardLayoutProps } from '@/types/types';
import Navbar from '@/components/menu/navbar';

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
    <Box>
      <Navbar />
      <Box>{children}</Box>
    </Box>
  );
};

export default DashboardLayout;
