import { StyleSheet, View } from "react-native";
import VLensButton from "../components/VLensButton";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <VLensButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
