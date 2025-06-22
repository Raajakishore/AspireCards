import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../../theme/colors';
import { CardWithInfo } from '../../components/CardWithInfo';
import { debitCardItems } from '../../utils/helper';
import { CreditCardCarousel } from '../../components/CreditCardUI';
import AspireLogo from '../../..//assets/icons/homeActiveTabIcon.svg'
import AddNewCardModal from '../../components/AddNewCardModal';
import { useState } from 'react';
import { SpendingLimitBar } from '../../components/SpendingLimitBar';

export const DebitCardTab = () => {
   const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style = { { flex:1, backgroundColor : colors.background.secondary} } >
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

        <View style = { styles.bottomContainer } >
            <CreditCardCarousel />
            <View style = {{marginTop: "45%"}}>
            < SpendingLimitBar limit = {2000}/>
            {
           
              
                debitCardItems.map((item)=>{
                    return (<CardWithInfo title = {item.title} body = {item.body} isTogglePresent = {item.isTogglePresent} setModalVisible = {setModalVisible} />)
                })
            }
            </View>
                <AddNewCardModal
                  visible={modalVisible}
                  onClose={() => setModalVisible(false)}
                />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer : {
        flex: 0.2,
        padding : 24
  },
  bottomContainer : {
    flex: 0.8,
    backgroundColor: colors.background.primary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 12
  },
  debitCardTextStyle: {
      marginVertical: 24,
      fontFamily : "AvenirBold",
      fontSize: 24,
      color: colors.text.primary
  },
  balanceViewStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 14
  },
  balanceTitleTextStyle: {
      fontFamily : "AvenirMedium",
      fontSize: 14,
      color: colors.text.primary
  },
  balanceTextStyle: {
      fontFamily : "AvenirBold",
      fontSize: 24,
      color: colors.text.primary
  },
  dollarViewStyle: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: colors.background.green,
    borderRadius: 6,
    alignItems:'center',
    justifyContent:'center',
    marginRight: 10
  },
  dollarTextStyle : {
    fontSize: 12,
    fontFamily : "AvenirBold",
    color: colors.text.primary
  },
  aspireLogoViewStyle: {
    position: "absolute",
    right: 24,
    top: 28
  }
});