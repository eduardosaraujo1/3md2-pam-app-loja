import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import productsData from "../assets/products.json";

export default function Checkout() {
  const { product_id } = useLocalSearchParams();
  const router = useRouter();

  const product = useMemo(() => {
    // Handle the case when product_id could be string or string[]
    const product_id_param = Array.isArray(product_id)
      ? product_id[0]
      : product_id;

    if (!product_id_param) return null;

    const id = parseInt(product_id_param, 10) - 1; // Convert to number and adjust for zero indexing

    // Check if id is valid and within range
    if (isNaN(id) || id < 0 || id >= productsData.length) {
      return null;
    }

    return productsData[id];
  }, [product_id]);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Checkout</Text>

      <View style={styles.productSummary}>
        <Image
          source={{
            uri: product.image.startsWith("http")
              ? product.image
              : "https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/p/e/pes-bal-st2.jpg",
          }}
          style={styles.thumbnailImage}
          resizeMode="contain"
        />
        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={2}>
            {product.name}
          </Text>
          <Text style={styles.productPrice}>R$ {product.price}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Payment Information</Text>
        {/* Mock payment form - in a real app, use a proper payment component */}
        <Text style={styles.formLabel}>Payment Method</Text>
        <View style={styles.paymentOption}>
          <Text>Credit Card</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Shipping Address</Text>
        {/* Mock shipping form */}
        <Text style={styles.formLabel}>Delivery Address</Text>
        <View style={styles.addressBox}>
          <Text>123 Example Street</Text>
          <Text>City, State 12345</Text>
        </View>
      </View>

      <View style={styles.totalSection}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalPrice}>R$ {product.price}</Text>
      </View>

      <TouchableOpacity
        style={styles.completeButton}
        onPress={() => alert("Order placed successfully!")}
      >
        <Text style={styles.completeButtonText}>Complete Purchase</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back to Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  productSummary: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 16,
    marginBottom: 16,
  },
  thumbnailImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
    justifyContent: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2e8b57",
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  formLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  paymentOption: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  addressBox: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  totalSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2e8b57",
  },
  completeButton: {
    backgroundColor: "#2e8b57",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  completeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    borderWidth: 1,
    borderColor: "#007bff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 30,
  },
  backButtonText: {
    color: "#007bff",
    fontSize: 16,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 40,
  },
});
