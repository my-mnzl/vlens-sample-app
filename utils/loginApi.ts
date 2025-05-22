import axios from "axios";

export const loginApi = async () => {
  const url = `${process.env.EXPO_PUBLIC_API_BASE_URL}/api/DigitalIdentity/Login`;

  const requestBody = {
    geoLocation: {
      latitude: 30.193033,
      longitude: 31.463339,
    },
    imsi: null,
    imei: "123456789",
    phoneNumber: process.env.EXPO_PUBLIC_PHONE_NUMBER,
    password: process.env.EXPO_PUBLIC_PASSWORD,
  };

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    ApiKey: process.env.EXPO_PUBLIC_API_KEY,
    TenancyName: process.env.EXPO_PUBLIC_TENANCY_NAME,
  };

  try {
    const response = await axios.post(url, requestBody, { headers });

    const accessToken = response.data?.data?.accessToken;

    if (accessToken) {
      console.log("Access Token:", accessToken);
      return accessToken;
    } else {
      console.log("Access Token not found in the response");
      return null;
    }
  } catch (error) {
    console.log("Error during login:", error);
    throw error;
  }
};
