import { StyleSheet, View, Text, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';
import { useState } from 'react';
import { colors } from '../theme/colors';

interface amountButtonProps {
  amount : number,
  setAmount: React.Dispatch<React.SetStateAction<number>> 
}

export const AmountButton  = ( { amount, setAmount } : amountButtonProps ) => {
    const [isOn, setIsOn] = useState(true);
    
  return (
    <TouchableOpacity style = { styles.container } onPress = { ()=> { setAmount(amount) } }>
            <Text style = { styles.amountTextStyle }>{"S$ " + amount}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create<Styles>({
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

type Styles = {
  amountTextStyle: TextStyle;
  container: ViewStyle;
};
