import { StatusBar } from 'expo-status-bar';
import '@/global.css';

import { StyleSheet, View } from 'react-native';
import { GluestackUIProvider } from './components/ui/gluestack-ui-provider';

export default function App() {
  return (
    <GluestackUIProvider mode="light">
      <View style={styles.container}>
        <StatusBar style="auto" />
      </View>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
