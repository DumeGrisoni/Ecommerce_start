'use server';
import { utapi } from '@/app/server/uploadthing';

export const getImages = async () => {
  const files = await utapi.listFiles();
  return files.files;
};
