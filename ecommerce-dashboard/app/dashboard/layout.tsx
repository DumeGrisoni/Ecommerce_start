import { Box } from '@/components/ui/box';
import { DashboardLayoutProps } from '@/types/types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const token = cookies().get('token')?.value;
  if (!token) {
    return redirect('/login');
  }
  return <Box>{children}</Box>;
};

export default DashboardLayout;
