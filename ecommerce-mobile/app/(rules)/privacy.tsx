import React from 'react';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { Stack } from 'expo-router';
import { ScrollView } from 'react-native';

export default function Privacy() {
  return (
    <ScrollView>
      <Card className="p-5 rounded-lg max-w-[90%] mx-auto my-3">
        <Stack.Screen
          options={{
            title: 'Politique de confidentialité',
            headerTitleAlign: 'center',
          }}
        />

        {/* Titre principal */}
        <Heading className="text-2xl mb-4">
          Politique de Confidentialité
        </Heading>
        <Text className="text-sm text-gray-500 mb-4">
          Dernière mise à jour : [date]
        </Text>

        {/* Introduction */}
        <Text className="text-base mb-4">
          Votre vie privée est d'une importance capitale pour nous. Cette
          politique de confidentialité explique comment [Nom de l'entreprise]
          recueille, utilise, et protège vos informations personnelles lorsque
          vous utilisez notre site web [URL du site] et nos services.
        </Text>

        {/* Section 1 : Informations collectées */}
        <Box className="mb-6">
          <Heading className="text-lg mb-2">
            1. Informations que nous recueillons
          </Heading>
          <Text className="text-base mb-2">
            Nous recueillons différentes informations pour vous fournir une
            meilleure expérience et traiter vos commandes, notamment :
          </Text>
          <Box className="pl-4">
            <Text className="text-sm mb-1">
              - <Text className="font-bold">Informations d'identité</Text> :
              nom, prénom, adresse email, mot de passe (lors de la création de
              votre compte).
            </Text>
            <Text className="text-sm mb-1">
              - <Text className="font-bold">Informations de contact</Text> :
              adresse postale, numéro de téléphone.
            </Text>
            <Text className="text-sm mb-1">
              - <Text className="font-bold">Informations de paiement</Text> :
              méthodes de paiement, numéro de carte bancaire (si applicable et
              en accord avec les normes de sécurité).
            </Text>
            <Text className="text-sm mb-1">
              - <Text className="font-bold">Données de navigation</Text> :
              adresse IP, type de navigateur, durée de navigation, pages
              visitées.
            </Text>
          </Box>
        </Box>

        {/* Section 2 : Utilisation des informations */}
        <Box className="mb-6">
          <Heading className="text-lg mb-2">
            2. Comment nous utilisons vos informations
          </Heading>
          <Text className="text-base mb-2">
            Les informations collectées sont utilisées pour les raisons
            suivantes :
          </Text>
          <Box className="pl-4">
            <Text className="text-sm mb-1">
              - <Text className="font-bold">Traitement des commandes</Text> :
              pour préparer, gérer et expédier vos achats.
            </Text>
            <Text className="text-sm mb-1">
              - <Text className="font-bold">Service client</Text> : pour
              répondre à vos questions et traiter vos retours ou remboursements.
            </Text>
            <Text className="text-sm mb-1">
              - <Text className="font-bold">Amélioration de nos services</Text>{' '}
              : pour personnaliser votre expérience et améliorer la qualité de
              notre site.
            </Text>
            <Text className="text-sm mb-1">
              - <Text className="font-bold">Marketing</Text> : avec votre
              consentement, nous pouvons vous envoyer des offres et promotions.
            </Text>
          </Box>
        </Box>

        {/* Section 3 : Protection des informations */}
        <Box className="mb-6">
          <Heading className="text-lg mb-2">
            3. Protection de vos informations
          </Heading>
          <Text className="text-base mb-2">
            Nous mettons en œuvre des mesures de sécurité pour protéger vos
            données personnelles, notamment :
          </Text>
          <Box className="pl-4">
            <Text className="text-sm mb-1">
              - <Text className="font-bold">Cryptage SSL</Text> : pour sécuriser
              les informations sensibles pendant la transmission.
            </Text>
            <Text className="text-sm mb-1">
              - <Text className="font-bold">Stockage sécurisé</Text> : pour les
              informations financières et les données d'identité.
            </Text>
            <Text className="text-sm mb-1">
              - <Text className="font-bold">Accès restreint</Text> : seules les
              personnes autorisées peuvent accéder aux données personnelles.
            </Text>
          </Box>
        </Box>

        {/* Section 4 : Partage des informations */}
        <Box className="mb-6">
          <Heading className="text-lg mb-2">
            4. Partage de vos informations
          </Heading>
          <Text className="text-base mb-2">
            Nous ne vendons, n'échangeons, ni ne louons vos informations
            personnelles. Cependant, nous pouvons les partager avec des tiers de
            confiance pour les raisons suivantes :
          </Text>
          <Box className="pl-4">
            <Text className="text-sm mb-1">
              - <Text className="font-bold">Fournisseurs de services</Text> :
              pour la gestion des paiements, la livraison des commandes, et
              l'analyse des données.
            </Text>
            <Text className="text-sm mb-1">
              - <Text className="font-bold">Obligations légales</Text> : si la
              loi l'exige ou pour protéger nos droits.
            </Text>
          </Box>
        </Box>

        {/* Section 5 : Utilisation des cookies */}
        <Box className="mb-6">
          <Heading className="text-lg mb-2">
            5. Cookies et technologies similaires
          </Heading>
          <Text className="text-base">
            Nous utilisons des cookies pour améliorer votre expérience et
            analyser le trafic de notre site. Vous pouvez paramétrer votre
            navigateur pour refuser les cookies. Cependant, certaines
            fonctionnalités de notre site peuvent ne pas fonctionner
            correctement.
          </Text>
        </Box>

        {/* Contact Information */}
        <Box>
          <Heading className="text-lg mb-2">6. Contact</Heading>
          <Text className="text-base">
            Pour toute question concernant cette politique de confidentialité,
            vous pouvez nous contacter à : [Adresse email de contact]
          </Text>
        </Box>
      </Card>
    </ScrollView>
  );
}
