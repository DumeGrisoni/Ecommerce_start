'use server';
import { utapi } from '@/app/server/uploadthing';

export const removeImage = async (imgKey: string) => {
  try {
    await utapi.deleteFiles([imgKey]);
    return { succes: true };
  } catch (error) {
    console.log(error);
    alert("Erreur lors de la suppression de l'image");
    return { succes: false };
  }
};
