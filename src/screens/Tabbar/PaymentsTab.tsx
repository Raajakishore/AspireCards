import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import UnderDevelopment from '../UnderDevelopment';

export const PaymentsTab = () : React.ReactElement => {
  return (
    <View style={styles.container}>
        <UnderDevelopment />
    </View>
  );
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
  }
});

type Styles = {
  container: ViewStyle;
};
