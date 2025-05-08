import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Product() {
  return (
    <View style={{ flex: 1 }}>
      <Text>Hello, world!</Text>
      <Link href="/product/2">Hello!</Link>
    </View>
  );
}
