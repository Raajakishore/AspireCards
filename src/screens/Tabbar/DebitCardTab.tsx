import { StyleSheet, View, Text, ScrollView, SafeAreaView, StatusBar, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { CardWithInfo } from '../../components/CardWithInfo';
import { debitCardItems } from '../../utils/helper';
import { CreditCardCarousel } from '../../components/CreditCardUI';
import AspireLogo from '../../..//assets/icons/homeActiveTabIcon.svg'
import AddNewCardModal from '../../components/AddNewCardModal';
import { useEffect, useState } from 'react';
import { SpendingLimitBar } from '../../components/SpendingLimitBar';
import { useDispatch } from 'react-redux';
import { getCardDetailsAction } from '../../store/actions';

export const DebitCardTab = () => {
   const [modalVisible, setModalVisible] = useState(false);
   const dispatch = useDispatch();
   useEffect(()=>{
      dispatch(getCardDetailsAction());
   }, [])
  return (
    <SafeAreaView style = { styles.containerStyle  } >
              <StatusBar barStyle="light-content" backgroundColor={colors.background.secondary} />
        <View style = { styles.aspireLogoViewStyle} >
          <AspireLogo width={28} height={28} />
        </View>
        <View style = { styles.topContainer } >
                <Text style={ styles.debitCardTextStyle }>{"Debit Card"}</Text>
                <Text style={ styles.balanceTitleTextStyle }>{"Available Balance"}</Text>
                <View style = { styles.balanceViewStyle }>
                    <View style = {styles.dollarViewStyle}>
                            <Text style={ styles.dollarTextStyle }>S$</Text>
                    </View>

                    <Text style={ styles.balanceTextStyle }>3,000</Text>

                </View>

        </View>
       <ScrollView
            style={ styles.scrollViewStyle }
            contentContainerStyle={ styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}
          >
        <View style = { styles.bottomContainer } >
            <CreditCardCarousel />
            <View style = { styles.addedMargin }>
            < SpendingLimitBar />
            {
                debitCardItems.map((item)=>{
                    return (<CardWithInfo  key={item.title}  item = {item} setModalVisible = {setModalVisible}  />)
                })
            }
            </View>
                <AddNewCardModal
                  visible={modalVisible}
                  onClose={() => setModalVisible(false)}
                />
        </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create<Styles>({
  aspireLogoViewStyle: {
    position: "absolute",
    right: 24,
    top: 50
  },
  containerStyle: {
     flex:1, 
     backgroundColor : colors.background.secondary
  },
  balanceTextStyle: {
      color: colors.text.primary,
      fontFamily : "AvenirBold",
      fontSize: 24
  },
  balanceTitleTextStyle: {
      color: colors.text.primary,
      fontFamily : "AvenirMedium",
      fontSize: 14
  },
  scrollViewStyle : { 
    height:"90%", 
    width:"100%", 
    zIndex: 10, 
    position: "absolute", 
    bottom:0 
  },
  balanceViewStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 14
  },
  contentContainerStyle : {
              paddingTop: "45%"
            },
  bottomContainer : {
    backgroundColor: colors.background.primary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flex: 0.8,
    padding: 12,
    paddingBottom: 32
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  addedMargin : {
    marginTop: "42%"
  },
  debitCardTextStyle: {
      color: colors.text.primary,
      fontFamily : "AvenirBold",
      fontSize: 24,
      marginVertical: 24
  },
  dollarTextStyle : {
    color: colors.text.primary,
    fontFamily : "AvenirBold",
    fontSize: 12
  },
  dollarViewStyle: {
    alignItems:'center',
    backgroundColor: colors.background.green,
    borderRadius: 6,
    justifyContent:'center',
    marginRight: 10,
    paddingHorizontal: 12,
    paddingVertical: 4
  },
  topContainer : {
        flex: 0.2,
        paddingHorizontal : 24,
        marginTop:32
  }
});

type Styles = {
  aspireLogoViewStyle: ViewStyle;
  containerStyle: ViewStyle;
  balanceTextStyle: TextStyle;
  balanceTitleTextStyle: TextStyle;
  scrollViewStyle: ViewStyle;
  balanceViewStyle: ViewStyle;
  contentContainerStyle: ViewStyle;
  bottomContainer: ViewStyle;
  container: ViewStyle;
  addedMargin: ViewStyle;
  debitCardTextStyle: TextStyle;
  dollarTextStyle: TextStyle;
  dollarViewStyle: ViewStyle;
  topContainer: ViewStyle;
};
