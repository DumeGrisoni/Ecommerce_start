'use client';
import Link from 'next/link';
import { VStack } from '../ui/vstack';
import { FilePlus, LayoutList, LogOut, PackageSearch } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { HStack } from '../ui/hstack';
import { Text } from '../ui/text';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const currentPath = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    console.log(currentPath);
  }, [currentPath]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1200); // Par exemple, 1200px pour les écrans petits
    };

    handleResize(); // Vérifiez la taille de l'écran au chargement
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className={`z-10 h-screen mt-auto bg-typography-0  py-3 px-2 md:px-6
       fixed top-1/2 transform -translate-y-1/2 transition-all duration-500 border-r border-typography-400 ${
         isExpanded ? 'w-52' : 'w-16 md:w-24'
       } `}
      onMouseEnter={() => !isSmallScreen && setIsExpanded(true)}
      onMouseLeave={() => !isSmallScreen && setIsExpanded(false)}
    >
      <VStack className="space-y-2 md:space-y-4 justify-center h-full pt-16 lg:pt-0 gap-4">
        <Link href="/dashboard" className="group ">
          <HStack className="flex items-center gap-4">
            <div
              className={`rounded-full text-typography-800 h-12 min-w-12  flex bg-typography-white items-center justify-center hover:scale-105 cursor-pointer ${
                currentPath === '/dashboard' ? 'ring-2 ring-slate-600' : ''
              }`}
            >
              <PackageSearch />
            </div>
            <Text
              className={`text-typography-800  transition-opacity duration-200 ease-in ${
                isExpanded ? 'opacity-100' : 'opacity-0 '
              } group-hover:font-bold ${
                currentPath === '/dashboard' ? 'font-bold' : 'font-semibold'
              }`}
            >
              Commandes
            </Text>
          </HStack>
        </Link>

        <Link href="/dashboard/products" className="group">
          <HStack className="flex items-center gap-4">
            <div
              className={`rounded-full text-typography-800 h-12 min-w-12  flex bg-typography-white items-center justify-center hover:scale-105 cursor-pointer ${
                currentPath === '/dashboard/products' ||
                currentPath === '/dashboard/products/create'
                  ? 'ring-2 ring-slate-600'
                  : ''
              }`}
            >
              <FilePlus className="text-typography-800" />
            </div>
            <Text
              className={`text-typography-800 transition-opacity ease-in duration-200 ${
                isExpanded ? 'opacity-100' : 'opacity-0 '
              } group-hover:font-bold ${
                currentPath === '/dashboard/products' ||
                currentPath === '/dashboard/products/create'
                  ? 'font-bold'
                  : 'font-semibold'
              }`}
            >
              Articles
            </Text>
          </HStack>
        </Link>

        <Link href="/dashboard/categories" className="group">
          <HStack className="flex items-center gap-4">
            <div
              className={`rounded-full text-typography-800 h-12 min-w-12  flex 
      bg-typography-white items-center justify-center hover:scale-105 cursor-pointer ${
        currentPath === '/dashboard/categories' ||
        currentPath === '/dashboard/categories/create'
          ? 'ring-2 ring-slate-600'
          : ''
      }`}
            >
              <LayoutList className="text-typography-800" />
            </div>
            <Text
              className={`text-typography-800  transition-opacity ease-in duration-200 ${
                isExpanded ? 'opacity-100' : 'opacity-0 '
              } group-hover:font-bold ${
                currentPath === '/dashboard/categories' ||
                currentPath === '/dashboard/categories/create'
                  ? 'font-bold'
                  : 'font-semibold'
              } `}
            >
              Categories
            </Text>
          </HStack>
        </Link>

        <Link href="/logout" className="group">
          <HStack className="flex items-center gap-4 ">
            <div
              className={`rounded-full text-typography-800 h-12 min-w-12  flex bg-typography-white items-center justify-center hover:scale-105 cursor-pointer
`}
            >
              <LogOut className="text-typography-800" />
            </div>
            <Text
              className={`text-typography-800 font-semibold transition-opacity ease-in duration-200 ${
                isExpanded ? 'opacity-100' : 'opacity-0 '
              } group-hover:font-bold `}
            >
              Déconnexion
            </Text>
          </HStack>
        </Link>
      </VStack>
    </div>
  );
};

export default Navbar;
