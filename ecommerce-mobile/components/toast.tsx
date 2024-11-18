import React from 'react';
import uuid from 'react-native-uuid';
import { Toast, ToastDescription, ToastTitle, useToast } from './ui/toast';

export function useToastNotification() {
  const toast = useToast();

  const showNewToast = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    const newId = uuid.v4();
    toast.show({
      id: newId,
      placement: 'top',
      containerStyle: { marginTop: 30 },
      duration: 1500,
      render: ({ id }) => {
        const uniqueToastId = 'toast-' + id;
        return (
          <Toast nativeID={uniqueToastId} action="muted" variant="solid">
            <ToastTitle>{title}</ToastTitle>
            <ToastDescription>{description}</ToastDescription>
          </Toast>
        );
      },
    });
  };

  return { showNewToast };
}
