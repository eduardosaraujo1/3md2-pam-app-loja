import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Product() {
  const { product_id } = useLocalSearchParams();

  return (
    <View>
      <Text>Hello, world!</Text>
      <Text>Product ID: {product_id}</Text>
    </View>
  );
}
