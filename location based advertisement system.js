import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const AdvertisementScreen = () => {
  const [nearbyAds, setNearbyAds] = useState([]);

  useEffect(() => {
    // Fetch nearby ads based on user's current location
    const fetchNearbyAds = async () => {
      try {
        const response = await fetch('http://your-backend-url/ads/latitude/longitude');
        const data = await response.json();
        setNearbyAds(data.ads);
      } catch (error) {
        console.error('Error fetching nearby ads:', error);
      }
    };

    // Call the function to fetch ads
    fetchNearbyAds();
  }, []);

  return (
    <View>
      <Text>Nearby Ads:</Text>
      {nearbyAds.map((ad, index) => (
        <Text key={index}>{ad.title}</Text>
        // Render the fetched ads in your UI
      ))}
    </View>
  );
};

export default AdvertisementScreen;
