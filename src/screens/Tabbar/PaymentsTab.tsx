import React from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const PaymentsTab = () => {
  return (
    <View style={styles.container}>
      {/* ▶️ Top Container (fixed) */}
      <View style={styles.topContainer}>
        <Text style={styles.topText}>Top Content</Text>
      </View>

      {/* ▶️ Bottom Container (scrolls over) */}
      <View style={styles.bottomWrapper}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {Array.from({ length: 30 }).map((_, i) => (
            <View key={i} style={styles.item}>
              <Text>Item #{i + 1}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const OVERLAP = 80; // how much the bottom container covers the top

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  topContainer: {
    height: SCREEN_HEIGHT * 0.4,
    backgroundColor: '#4a90e2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topText: {
    color: 'white',
    fontSize: 24,
  },
  bottomWrapper: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.4 - OVERLAP, // raise it up to overlap
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,            // iOS
    elevation: 10,         // Android
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  scrollContent: {
    padding: 16,
    paddingTop: OVERLAP + 16,  // give some breathing room at the top
  },
  item: {
    height: 60,
    marginBottom: 12,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});
