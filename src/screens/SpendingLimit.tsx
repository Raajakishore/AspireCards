import { useNavigation } from '@react-navigation/native';
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { colors } from '../theme/colors';
import AspireLogo from '../../assets/icons/homeActiveTabIcon.svg'
import IndicatorSVG from '../../assets/icons/indicator.svg'
import { AmountButton } from '../components/AmountButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCard } from '../store/selectors';
import { useState } from 'react';
import { updateCardAction } from '../store/actions';

export const SpendingLimit = () => {
  const navigation = useNavigation();
  const currentCard = useSelector(selectCurrentCard);
  const [spendingLimit, setSpendingLimit] = useState(currentCard?.spendingLimit ?? 0);
  const dispatch = useDispatch();
  return (
        <>
       <SafeAreaView style = { styles.topInset }/>
        <StatusBar barStyle="light-content" backgroundColor={colors.background.secondary} />
       <View style = {styles.container}>
         <View style = { { ...styles.headerStyle, marginTop : Platform.OS === "android" ? 32 : 0 } }>
            <Ionicons name="chevron-back" size={32} color={ colors.background.primary } onPress = { () => { navigation.goBack() }} />
            <AspireLogo width={28} height={28} />
         </View>
         <Text style = { styles.spendingLimitTextStyle}> Spending limit</Text>
         <View style = { styles.bottomContainerViewStyle }>
            <View>
            <View style = { styles.indicatorViewStyle }>
                <IndicatorSVG width = {16} height = {16} />
                <Text style = { styles.weeklyDebtTextStyle }>Set a weekly debit card spending limit</Text>
            </View>
            <View style = { styles.dollarAndTextStyle } >
              <View style = {styles.dollarViewStyle}>
                      <Text style={ styles.dollarTextStyle }>S$</Text>
              </View>
              <Text style = { styles.amountTextStyle }>{spendingLimit!== 0? spendingLimit : ""}</Text>
            </View>
            <View style = { styles.borderLineStyle }/>
            <Text style = { styles.infoTextStyle } >Here weekly means the last 7 days - not the calendar week</Text>
            <View style = { styles.amountContainerStyle }>
              <AmountButton amount = {5000}  setAmount = {setSpendingLimit}/>
              <AmountButton amount = {10000} setAmount = {setSpendingLimit}/>
              <AmountButton amount = {15000} setAmount = {setSpendingLimit}/>
            </View>
            </View>
            <View>
            <View style = {styles.saveViewStyle } >
              <TouchableOpacity 
                style = {{ height: 56, width: "90%", backgroundColor: spendingLimit === 0 ? colors.background.grey : colors.background.green, borderRadius: 32, justifyContent: 'center', alignItems: 'center'}} 
                disabled={spendingLimit === 0}
                activeOpacity={0.7}
                onPress={() =>{
                  if(currentCard){
                    dispatch(
                      updateCardAction({
                        id: currentCard.id,
                        updates: {
                        spendingLimit,
                        isSpendingLimitEnabled: true
                        }
                      })
                    )
                  }
                    navigation.goBack();
                }
                  }
              >
                  <Text style = { styles.saveTextStyle } >Save</Text>
              </TouchableOpacity>
            </View>
            </View>
         </View>
         </View>
      <SafeAreaView style = { styles.bottomInset }/>

      </>
  );
}

const styles = StyleSheet.create<Styles>({
  amountTextStyle: {
    fontFamily: 'AvenirBold',
    fontSize: 24,
    marginLeft: 12
  },
  bottomContainerViewStyle: {
    backgroundColor: colors.background.primary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flex:1,
    justifyContent: "space-between",
    padding: 24
  },
  container: {
    backgroundColor: colors.background.secondary,
    flex: 1,
  },
  dollarAndTextStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 16
  },
  dollarTextStyle : {
    color: colors.text.primary,
    fontFamily : "AvenirBold",
    fontSize: 12
  },
  dollarViewStyle: {
    backgroundColor: colors.background.green,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4
  },
  headerStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 24
  },
  indicatorViewStyle: {
    flexDirection: "row"
  },
  spendingLimitTextStyle: {
    color: colors.text.primary,
    fontFamily: "AvenirBold",
    fontSize: 24,
    marginBottom: 40,
    marginLeft: 24
  },
  weeklyDebtTextStyle: {
    fontFamily: "AvenirMedium",
    fontSize: 14,
    marginLeft: 12
  },
   topInset: {
    flex: 0,                
    backgroundColor: colors.background.secondary,  
  },
   bottomInset: {
    flex: 0,
    backgroundColor: colors.background.primary,  
  },
  saveTextStyle : { 
    fontSize: 16, 
    color: colors.text.primary, 
    fontFamily: "AvenirDemiBold" 
  } ,
  borderLineStyle : { 
    borderWidth: 1, 
    width: "100%", 
    borderBlockColor: colors.background.grey, 
    marginVertical : 12 
  },
  infoTextStyle : { 
    color: colors.text.grey, 
    fontFamily: "AvenirRegular", 
    fontSize: 12  
  },
  amountContainerStyle: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginVertical: 32
  },
  saveViewStyle:  { 
    width: "100%", 
    justifyContent:'center', 
    alignItems: 'center'
  }
});

type Styles = {
  amountTextStyle: TextStyle;
  bottomContainerViewStyle: ViewStyle;
  container: ViewStyle;
  dollarAndTextStyle: ViewStyle;
  dollarTextStyle: TextStyle;
  dollarViewStyle: ViewStyle;
  headerStyle: ViewStyle;
  indicatorViewStyle: ViewStyle;
  spendingLimitTextStyle: TextStyle;
  weeklyDebtTextStyle: TextStyle;
  topInset : ViewStyle;
  bottomInset: ViewStyle;
  saveTextStyle: TextStyle;
  borderLineStyle: ViewStyle;
  amountContainerStyle: ViewStyle;
  infoTextStyle: TextStyle;
  saveViewStyle: ViewStyle;
};
