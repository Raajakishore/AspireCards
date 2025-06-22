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
    amountTextStyle: {
        color: colors.text.green,
        fontFamily: "AvenirDemiBold"
    },
    container: {
        backgroundColor: '#f0fcf4',
        borderRadius: 6,
        paddingHorizontal: 24,
        paddingVertical: 12
    }
});
