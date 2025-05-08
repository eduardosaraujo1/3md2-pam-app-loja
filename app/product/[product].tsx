import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import productsData from "../../assets/products.json";

function get_product_by_id(sid: string) {
  const id = parseInt(sid, 10) - 1; // Convert to number and adjust for zero indexing

  // Check if id is valid and within range
  if (isNaN(id) || id < 0 || id >= productsData.length) {
    return null;
  }

  return productsData[id];
}

export default function Product() {
  const { product } = useLocalSearchParams();
  const router = useRouter();

  const iproduct = useMemo(() => {
    // Handle the case when product_id could be string or string[]
    const product_id_param = Array.isArray(product) ? product[0] : product;

    if (!product_id_param) return null;

    return get_product_by_id(product_id_param);
  }, [product]);

  const handleBuy = () => {
    // Navigate to checkout page with product data
    router.push({
      pathname: "/checkout",
      params: { product_id: product },
    });
  };

  if (!iproduct) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: iproduct.image.startsWith("http")
            ? iproduct.image
            : "https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/p/e/pes-bal-st2.jpg",
        }}
        style={styles.productImage}
        resizeMode="contain"
      />

      <Text style={styles.productName}>{iproduct.name}</Text>

      <View style={styles.priceContainer}>
        <Text style={styles.priceLabel}>Price:</Text>
        <Text style={styles.priceValue}>R$ {iproduct.price}</Text>
      </View>

      <Text style={styles.descriptionTitle}>Description</Text>
      <Text style={styles.description}>{iproduct.desc}</Text>

      <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
        <Text style={styles.buyButtonText}>Buy Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  productImage: {
    width: width,
    height: 300,
    marginBottom: 16,
    borderRadius: 8,
  },
  productName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 18,
    color: "#666",
    marginRight: 8,
  },
  priceValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2e8b57",
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    marginBottom: 24,
  },
  buyButton: {
    backgroundColor: "#d7376b",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 30,
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 40,
  },
});
