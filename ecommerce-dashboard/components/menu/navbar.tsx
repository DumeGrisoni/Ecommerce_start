import Link from 'next/link';
import { Box } from '@/components/ui/box';
import { VStack } from '../ui/vstack';
import { ChartBarStacked, FilePlus, Home, LogOut } from 'lucide-react';

const Navbar = () => {
  return (
    <Box className="w-auto h-[50%] p-3 fixed top-1/2 transform -translate-y-1/2 ">
      <VStack className="space-y-4 justify-around h-full">
        <Link
          href="/dashboard"
          className="rounded-full h-12 w-12 flex bg-typography-white items-center justify-center hover:scale-105 cursor-pointer"
        >
          <Home className="text-typography-800 " />
        </Link>

        <Link
          href="/dashboard/products"
          className="rounded-full h-12 w-12 flex bg-typography-white items-center justify-center hover:scale-105 cursor-pointer"
        >
          <FilePlus className="text-typography-800" />
        </Link>
        <Link
          href="/dashboard/categories"
          className="rounded-full h-12 w-12 flex bg-typography-white items-center justify-center hover:scale-105 cursor-pointer"
        >
          <ChartBarStacked className="text-typography-800" />
        </Link>

        <Link
          href="/logout"
          className="rounded-full h-12 w-12 flex bg-typography-white items-center justify-center hover:scale-105 cursor-pointer"
        >
          <LogOut className="text-typography-800" />
        </Link>
      </VStack>
      {/* </VStack> */}
    </Box>
  );
};

export default Navbar;
