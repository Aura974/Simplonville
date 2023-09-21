import { Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function Page() {
  return (
    <SafeAreaProvider>
      <Link href="/home" asChild>
        <Pressable>
          <Text>Home</Text>
        </Pressable>
      </Link>
    </SafeAreaProvider>
  );
}

