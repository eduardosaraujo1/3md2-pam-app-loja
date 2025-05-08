import { Link } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import productsData from "../assets/products.json";

export default function Product() {
  // Get screen width for responsive layout
  const screenWidth = Dimensions.get("window").width;
  // Number of columns in the grid
  const cardWidth = screenWidth > 600 ? 240 : "100%";
  // Function to render product card
  const renderProductCard = (product: any, index: number) => {
    return (
      <Link href={`/product/${index + 1}`} key={index} asChild>
        <TouchableOpacity
          style={{ ...styles.card, width: cardWidth }}
          activeOpacity={0.7}
        >
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.cardContent}>
            <Text
              style={styles.productName}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {product.name}
            </Text>
            <Text style={styles.productPrice}>R$ {product.price}</Text>
          </View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.productGrid, { gap: 8 }]}>
            {productsData.map((product, index) =>
              renderProductCard(product, index)
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    backgroundColor: "#d7376b",
    padding: 16,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 30,
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eaeaea",
  },
  imageContainer: {
    aspectRatio: 1, // Make images square
    backgroundColor: "#f0f0f0",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  cardContent: {
    padding: 10,
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 13, // Slightly smaller font
    fontWeight: "500",
    color: "#333",
    marginBottom: 4, // Reduced margin
    height: 36, // Fixed height for exactly 2 lines
    lineHeight: 18, // Line height for 2 lines of text
    overflow: "hidden", // Hide text that exceeds the height
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#d7376b",
  },
});
