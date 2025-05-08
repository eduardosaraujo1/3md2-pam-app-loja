import { useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import productsData from "../assets/products.json";

// Only import WebView when not on web platform
let WebView: any = null;
if (Platform.OS !== "web") {
  WebView = require("react-native-webview").default;
}

function maxlen(str: string, len: number) {
  if (str.length > len) {
    return str.substring(0, len) + "..."; // Truncate and add ellipsis if longer than len
  } else {
    return str; // Keep the original string if shorter or equal to len
  }
}

export default function Checkout() {
  const { product_id } = useLocalSearchParams();
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

  const url = `https://landbot.online/v3/H-2921729-M8668NM4ITODATQ9/index.html?product_name=${maxlen(
    product.name,
    300
  )}&product_price=R$${product.price}`;

  // Render different components based on platform
  return (
    <View style={styles.container}>
      {Platform.OS === "web" ? (
        // Use iframe for web
        <div style={{ width: "100%", height: "100%" }}>
          <iframe
            src={url}
            style={{ border: "none", width: "100%", height: "100%" }}
            title="Checkout"
          />
        </div>
      ) : (
        // Use WebView for mobile platforms
        <WebView source={{ uri: url }} />
      )}
    </View>
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
