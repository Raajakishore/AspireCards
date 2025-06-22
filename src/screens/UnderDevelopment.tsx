import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');

export default function UnderDevelopment() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animations/underDevelopment.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
      <Text style={styles.title}>
        This screen is under development
      </Text>
      <Text style={styles.subtitle}>
        Check back soon!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.opaqueGreen,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  lottie: {
    height: width * 0.8,
    marginLeft: 64,
    width: width * 0.8
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: colors.text.lightGreen,
    textAlign: 'center',
  },
  title: {
    marginTop: 24,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.green, 
    fontFamily: 'AvenirMedium', 
    textAlign: 'center',
  },
});
