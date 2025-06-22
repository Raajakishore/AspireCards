import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../theme/colors';
import { useSelector } from 'react-redux';
import { selectCurrentCard } from '../store/selectors';


export function SpendingLimitBar() {
  const [spent, setSpent] = useState(0);
  const currentCard = useSelector(selectCurrentCard);

  const limit = currentCard?.spendingLimit ?? 0;

  useEffect(() => {
    // pick a random integer [0..limit]
    const randomValue = Math.floor(Math.random() * (limit + 1));
    setSpent(randomValue);
  }, [limit]);

  const progressPercent = limit > 0 ? (spent / limit) * 100 : 0;


  if( currentCard && !currentCard.isSpendingLimitEnabled ){
    return null
  }

  return (
    <View style={styles.wrapper}>
    <View style = {{flexDirection:'row', justifyContent:'space-between'}}>
      <Text testID = "header" style={styles.title}>Debit card spending limit</Text>

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

const styles = StyleSheet.create<Styles>({
  amountRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8,
  },
  barBackground: {
    width: '100%',
    height: BAR_HEIGHT,
    backgroundColor: colors.background.opaqueGreen,
    borderRadius: BAR_HEIGHT / 2,
    overflow: 'hidden',
  },
  barFill: {
    backgroundColor: colors.background.green,
    height: '100%', 
  },
  limit: {
    color: colors.text.mediumGrey,
    fontFamily: 'AvenirMedium',
    fontSize: 14,   
  },
  separator: {
    color: colors.background.separatorGrey,
    marginHorizontal: 8,
  },
  spent: {
    color: colors.background.green,
    fontFamily: 'AvenirDemiBold',
    fontSize: 14
  },
  title: {
    color: colors.background.secondary,
    fontFamily:'AvenirMedium',
    fontSize: 14,
    marginBottom: 8
  },
  wrapper: {
    alignSelf: 'center',
    paddingVertical: 16,
    width: SCREEN_WIDTH * 0.9,
  },
});

type Styles = {
  amountRow: ViewStyle;
  barBackground: ViewStyle;
  barFill: ViewStyle;
  limit: TextStyle;
  separator: TextStyle;
  spent: TextStyle;
  title: TextStyle;
  wrapper: ViewStyle;
};