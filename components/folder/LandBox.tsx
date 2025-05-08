import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import productsData from "../../assets/products.json";

interface Product {
  image: string;
  name: string;
  price: string;
  desc: string;
  url: string;
}

export default function LandbotComponent({
  product_id,
}: {
  product_id: string | string[];
}) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const product_id_param = Array.isArray(product_id)
      ? product_id[0]
      : product_id;

    if (product_id) {
      const id = parseInt(product_id_param, 10) - 1;
      if (!isNaN(id) && id >= 0 && id < productsData.length) {
        setProduct(productsData[id]);
      }
    }
  }, [product_id]);

  // Only render when we have a product
  if (!product) return null;

  // Create URL with product data as params
  const encodedName = encodeURIComponent(product.name);
  const encodedPrice = encodeURIComponent(product.price);
  const landbotUrl = `https://chats.landbot.io/v3/YOUR_BOT_ID/?product_name=${encodedName}&product_price=${encodedPrice}&product_id=${product_id}`;

  // Alternatively, prepare injected JavaScript (window function technique)
  const injectScript = `
    window.setProductData = function() {
      if (window.Landbot && window.Landbot.setCustomData) {
        window.Landbot.setCustomData({
          product_name: "${product.name.replace(/"/g, '\\"')}",
          product_price: "${product.price.replace(/"/g, '\\"')}",
          product_id: "${product_id}"
        });
      }
    };
    
    // Try to set data immediately if Landbot is already loaded
    if (window.Landbot) {
      window.setProductData();
    }
    
    // Also set up event listener for when Landbot initializes
    window.addEventListener('landbot-init', function() {
      window.setProductData();
    });
  `;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: landbotUrl }}
        style={styles.webview}
        onMessage={(event) => {
          // Handle any messages from the WebView if needed
          console.log("Message from WebView:", event.nativeEvent.data);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: "#007bff",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 999,
  },
  webview: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.7,
    display: "none", // Initially hidden, would be shown when chat is expanded
  },
});
