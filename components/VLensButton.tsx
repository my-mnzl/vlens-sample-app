import React, { useState } from "react";
import { ActivityIndicator, Button, StyleSheet, View } from "react-native";
import "react-native-get-random-values";
import VLensView from "react-native-vlens";
import { v4 as uuidv4 } from "uuid";
import { loginApi } from "../utils/loginApi";

const VLensButton = () => {
  const [showVLens, setShowVLens] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [transactionId] = useState(uuidv4());

  const handleVLensSuccess = () => {
    console.log("VLens Success");
    setShowVLens(false);
  };

  const handleVLensFailure = () => {
    console.log("VLens Failed");
    setShowVLens(false);
  };

  const handleStartVLens = async () => {
    try {
      setLoading(true);
      const token = await loginApi();
      if (token) {
        setAccessToken(token);
        setShowVLens(true);
      }
    } catch (error) {
      console.error("Failed to get access token:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#397374" />
      </View>
    );
  }

  if (showVLens && accessToken) {
    return (
      <VLensView
        transactionId={transactionId}
        isLivenessOnly={true}
        isNationalIdOnly={false}
        env={{
          apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL || "",
          accessToken: accessToken,
          refreshToken: "",
          apiKey: process.env.EXPO_PUBLIC_API_KEY || "",
          tenancyName: process.env.EXPO_PUBLIC_TENANCY_NAME || "",
        }}
        defaultLocale="en"
        colors={{
          accent: "#4E5A78",
          primary: "#397374",
          secondary: "#AF9759",
          background: "#FEFEFE",
          dark: "#000000",
          light: "#FFFFFF",
        }}
        errorMessages={[]}
        onSuccess={handleVLensSuccess}
        onFaild={handleVLensFailure}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Start VLens" onPress={handleStartVLens} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default VLensButton;
