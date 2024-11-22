import Link from 'next/link';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Card } from '@/components/ui/card';

const Custom404 = () => {
  return (
    <Box className="flex-1 min-h-screen items-center justify-center">
      <Card className="lg:w-[20%] md:w-[50%] w-[90%] bg-typography-white h-auto rounded-lg">
        <VStack space="xl" className="p-4 items-center justify-center">
          <Heading className="text-typography-900">
            404 - Page non trouvée
          </Heading>
          <Text className="text-typography-500 text-center">
            Désolé, la page que vous recherchez n&apos;existe pas.
          </Text>
          <Link href="/">
            <Button className="mt-4 mx-auto">
              <ButtonText className="text-typography-0 text-center">
                Retour à l&apos;accueil
              </ButtonText>
            </Button>
          </Link>
        </VStack>
      </Card>
    </Box>
  );
};

export default Custom404;
