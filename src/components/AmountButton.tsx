import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { colors } from '../theme/colors';


export const AmountButton  = ( { amount, setAmount } ) => {
    const [isOn, setIsOn] = useState(true);
    
  return (
    <TouchableOpacity style = { styles.container } onPress = { ()=> { setAmount(amount) } }>
            <Text style = { styles.amountTextStyle }>{"S$ " + amount}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        backgroundColor: '#f0fcf4',
        borderRadius: 6
    },
    amountTextStyle: {
        fontFamily: "AvenirDemiBold",
        color: colors.text.green
    }
});
