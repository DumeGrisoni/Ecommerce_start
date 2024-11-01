import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View>
      <Text style={{ fontSize: 30 }}>Homescreen</Text>
      <StatusBar style="auto" />
    </View>
  );
}
