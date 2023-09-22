import { View, StyleSheet } from 'react-native';
import FormComponent from './components/form';

export default function Page() {
  return (
    <View style={styles.container}>
      <FormComponent />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
})