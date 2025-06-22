import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../theme/colors';
import { useSelector } from 'react-redux';
import { selectCurrentCard } from '../store/selectors';


export function SpendingLimitBar() {
  const [spent, setSpent] = useState(0);
  const currentCard = useSelector(selectCurrentCard);

  const limit = currentCard.spendingLimit;

  useEffect(() => {
    // pick a random integer [0..limit]
    const randomValue = Math.floor(Math.random() * (limit + 1));
    setSpent(randomValue);
  }, [limit]);

  const progressPercent = limit > 0 ? (spent / limit) * 100 : 0;


  if( !currentCard.isSpendingLimitEnabled ){
    return null
  }

  return (
    <View style={styles.wrapper}>
    <View style = {{flexDirection:'row', justifyContent:'space-between'}}>
      <Text style={styles.title}>Debit card spending limit</Text>

      <View style={styles.amountRow}>
        <Text style={styles.spent}>${spent.toLocaleString()}</Text>
        <Text style={styles.separator}>|</Text>
        <Text style={styles.limit}>${limit.toLocaleString()}</Text>
      </View>
    </View>

      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${progressPercent}%` }]} />
      </View>
    </View>
  );
}

const BAR_HEIGHT = 15;
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: 'center',
    paddingVertical: 16,
  },
  title: {
    fontSize: 14,
    marginBottom: 8,
    color: colors.background.secondary,
    fontFamily:'AvenirMedium'
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  spent: {
    fontSize: 14,
    fontFamily: 'AvenirDemiBold',
    color: colors.background.green,          // green
  },
  separator: {
    marginHorizontal: 8,
    color: colors.background.separatorGrey,
  },
  limit: {
    fontSize: 14,
    fontFamily: 'AvenirMedium',
    color: colors.text.mediumGrey,   
  },
  barBackground: {
    width: '100%',
    height: BAR_HEIGHT,
    backgroundColor: colors.background.opaqueGreen, // light green background
    borderRadius: BAR_HEIGHT / 2,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#28A745', // green fill
  },
});
