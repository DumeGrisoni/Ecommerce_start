import { useAuth } from '@/store/authStore';
import { CartItemType, OrderItem, VariantProps } from '@/types/types';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const listVariants = async () => {
  const response = await fetch(`${API_URL}/productVariant`);
  const variants = await response.json();
  if (!response.ok) {
    const errorMessage =
      'Une erreur est survenue lors de la récupération de la liste des variants';
    throw new Error(errorMessage);
  }
  return variants as VariantProps[];
};

export const updateVariant = async (variant: VariantProps) => {
  console.log(
    'updateVariant',
    variant.colors.map((c) => c.sizes)
  );
  const response = await fetch(`${API_URL}/productVariant/${variant.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${useAuth.getState().token}`,
    },
    body: JSON.stringify(variant),
  });
  if (!response.ok) {
    console.log('response', response);
    const errorMessage =
      'Une erreur est survenue lors de la mise à jour du variant';
    throw new Error(errorMessage);
  }
};

export const updateStock = async (cartItems: CartItemType[]) => {
  const variants = await listVariants();
  if (!variants) {
    return;
  }
  for (const cartItem of cartItems) {
    const variant = variants.find((v) => v.id === cartItem.product.variant.id);
    if (variant) {
      const updatedStock = variant.colors.map((color) => {
        const selectedColor = cartItem.product.variant.colors.find(
          (c) => c.name === color.name
        );
        if (selectedColor) {
          const selectedSize = selectedColor.sizes.find((s) =>
            cartItem.product.variant.colors
              .find((c) => c.name === color.name)
              ?.sizes.find((size) => size.size === s.size)
          );

          if (selectedSize) {
            return {
              ...color,
              sizes: color.sizes.map((size) => {
                const selectedSize = selectedColor?.sizes.find(
                  (s) => s.size === size.size
                );
                if (selectedSize) {
                  return {
                    ...size,
                    stock: size.stock - 1,
                  };
                }
                return size;
              }),
            };
          }
        }
        return color;
      });
      variant.colors = updatedStock;
      await updateVariant(variant);
      // console.log('variant', variant);
    }
  }
};
