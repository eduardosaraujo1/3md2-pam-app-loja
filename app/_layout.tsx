import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "react-native-reanimated";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerTitle: "Produtos" }} />
      <Stack.Screen
        name="product/[product]"
        options={{ headerTitle: "Comprar produto" }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
