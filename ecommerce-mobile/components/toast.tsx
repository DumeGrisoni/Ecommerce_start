import React from 'react';
import uuid from 'react-native-uuid';
import { Toast, ToastDescription, ToastTitle, useToast } from './ui/toast';

export function useToastNotification() {
  const toast = useToast();

  const showNewToast = () => {
    const newId = uuid.v4();
    toast.show({
      id: newId,
      placement: 'top',
      duration: 3000,
      render: ({ id }) => {
        const uniqueToastId = 'toast-' + id;
        return (
          <Toast nativeID={uniqueToastId} action="muted" variant="solid">
            <ToastTitle>Ajout au panier</ToastTitle>
            <ToastDescription>
              Votre produit a bien été ajouté au panier
            </ToastDescription>
          </Toast>
        );
      },
    });
  };

  return { showNewToast };
}
