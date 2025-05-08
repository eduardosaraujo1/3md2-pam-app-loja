import { Text, View } from "react-native";
import { WebView } from "react-native-webview";

export default function Product() {
  return (
    <View>
      <Text>Hello, world!</Text>
      <WebView
        style={{ flex: 1, margintTop: 64 }}
        source={{
          uri: "https://landbot.online/v3/H-2921729-M8668NM4ITODATQ9/index.html?product_name=camiseta&product_price=R$25,00",
        }}
      ></WebView>
    </View>
  );
}
