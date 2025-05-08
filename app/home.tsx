import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Product() {
  return (
    <View>
      <Text>Hello, world!</Text>
      <Link href="/product/2">Go!</Link>
    </View>
  );
}
