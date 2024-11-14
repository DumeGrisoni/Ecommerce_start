import React from 'react';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { Stack } from 'expo-router';
import { ScrollView } from 'react-native';

export default function Terms() {
  return (
    <ScrollView>
      <Card className="p-5 rounded-lg max-w-[90%] mx-auto my-3">
        <Stack.Screen
          options={{
            title: "Conditions d'utilisation",
            headerTitleAlign: 'center',
          }}
        />
        {/* Titre principal */}
        <Heading className="text-2xl mb-4">Conditions d'utilisation</Heading>
        <Text className="text-sm text-gray-500 mb-4">
          Dernière mise à jour : [date]
        </Text>

        {/* Introduction */}
        <Text className="text-base mb-4">
          En utilisant notre site [URL du site] et nos services, vous acceptez
          les présentes conditions d'utilisation. Veuillez les lire
          attentivement avant d'utiliser nos services.
        </Text>

        {/* Section 1 : Acceptation des conditions */}
        <Box className="mb-6">
          <Heading className="text-lg mb-2">
            1. Acceptation des conditions
          </Heading>
          <Text className="text-base mb-2">
            En accédant à notre site et en utilisant nos services, vous
            reconnaissez avoir lu et compris les présentes conditions, et
            acceptez d'y être lié(e).
          </Text>
        </Box>

        {/* Section 2 : Utilisation de nos services */}
        <Box className="mb-6">
          <Heading className="text-lg mb-2">
            2. Utilisation de nos services
          </Heading>
          <Text className="text-base mb-2">
            Vous vous engagez à utiliser nos services de manière conforme aux
            lois et réglementations applicables. Vous ne pouvez pas utiliser nos
            services pour des activités frauduleuses ou illégales.
          </Text>
        </Box>

        {/* Section 3 : Comptes et sécurité */}
        <Box className="mb-6">
          <Heading className="text-lg mb-2">3. Comptes et sécurité</Heading>
          <Text className="text-base mb-2">
            Pour accéder à certaines parties de notre site, vous devrez créer un
            compte. Vous êtes responsable de la confidentialité de vos
            identifiants et de toutes les actions entreprises via votre compte.
          </Text>
        </Box>

        {/* Section 4 : Contenu et droits de propriété */}
        <Box className="mb-6">
          <Heading className="text-lg mb-2">
            4. Contenu et droits de propriété
          </Heading>
          <Text className="text-base mb-2">
            Tous les contenus présents sur notre site, y compris les textes,
            images, et graphiques, sont protégés par les droits d'auteur et ne
            peuvent être utilisés sans notre permission.
          </Text>
        </Box>

        {/* Section 5 : Limitation de responsabilité */}
        <Box className="mb-6">
          <Heading className="text-lg mb-2">
            5. Limitation de responsabilité
          </Heading>
          <Text className="text-base mb-2">
            Nous ne pouvons être tenus responsables des dommages indirects ou
            imprévus résultant de l'utilisation de nos services ou de
            l'impossibilité d'y accéder.
          </Text>
        </Box>

        {/* Section 6 : Modifications des conditions */}
        <Box className="mb-6">
          <Heading className="text-lg mb-2">
            6. Modifications des conditions
          </Heading>
          <Text className="text-base">
            Nous nous réservons le droit de modifier ces conditions
            d'utilisation à tout moment. Nous vous informerons de toute mise à
            jour importante par email ou notification sur notre site.
          </Text>
        </Box>

        {/* Contact Information */}
        <Box>
          <Heading className="text-lg mb-2">7. Contact</Heading>
          <Text className="text-base">
            Pour toute question concernant ces conditions d'utilisation, vous
            pouvez nous contacter à : [Adresse email de contact]
          </Text>
        </Box>
      </Card>
    </ScrollView>
  );
}
