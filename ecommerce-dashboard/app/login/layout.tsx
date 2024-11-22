import { Box } from '@/components/ui/box';
import { DashboardLayoutProps } from '@/types/types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const LoginLayout = ({ children }: DashboardLayoutProps) => {
  const token = cookies().get('token')?.value;
  if (token) {
    return redirect('/dashboard');
  }
  return <Box>{children}</Box>;
};

export default LoginLayout;
