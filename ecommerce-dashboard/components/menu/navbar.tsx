import Link from 'next/link';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';

const Navbar = () => {
  return (
    <Box className="w-full bg-white border-b border-typography-500 p-3">
      <HStack className="justify-between items-center">
        <Link href="/dashboard">
          <Text className="text-typography-900 text-lg font-bold">
            Tableau de Bord
          </Text>
        </Link>
        <HStack
          space="xl"
          className="justify-center gap-20 items-center flex-1"
        >
          <Link href="/dashboard/products">
            <Text className="text-typography-900">Articles</Text>
          </Link>

          <Link href="/logout">
            <Text className="text-typography-900 focus:font-bold">
              Déconnexion
            </Text>
          </Link>
        </HStack>
      </HStack>
    </Box>
  );
};

export default Navbar;
