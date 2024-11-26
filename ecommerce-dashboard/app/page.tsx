'use client';
import { Box } from '@/components/ui/box';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    redirect('/dashboard');
  }, []);
  return (
    <Box className="min-h-screen bg-typography-100 items-center justify-center">
      <Box className="flex items-center justify-center h-full"></Box>
    </Box>
  );
}
