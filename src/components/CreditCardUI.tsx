import { StyleSheet, View, Text, TouchableOpacity, Dimensions, TextStyle, ViewStyle } from 'react-native';
import { useRef, useState } from 'react';
import { colors } from '../theme/colors';
import VisaSVG from '../../assets/icons/visaLogo.svg'
import AspireLogoSVG from '../../assets/icons/aspireLogo.svg'
import ShowEyeSVG from '../../assets/icons/showCardNumber.svg'
import HideEyeSVG from '../../assets/icons/hideCardNumber.svg'
import Carousel from 'react-native-snap-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCardIdx } from '../store/cardSlice';
import { dummyCardData } from '../utils/helper';
import { Card, storeType } from '../utils/types';

export const CreditCardCarousel  =  () : React.ReactElement => {
    const cardDetails = useSelector((state : storeType)=>state.cards.cardDetails);
    const carouselRef = useRef(null);
    const { width: SLIDER_WIDTH } = Dimensions.get('window');
    const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.90);
    const dispatch = useDispatch();
  return (
    <View style = { styles.container }>
        {
        cardDetails.length === 0 ?

        <CreditCardUI  item = { dummyCardData } />
        :
        <Carousel
            ref={carouselRef}
            data={ cardDetails }
            renderItem={({ item, index }) => (
                <CreditCardUI key={index} item={item} />
            )}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            inactiveSlideScale={0.94}
            inactiveSlideOpacity={0.7}
            onSnapToItem={(index) => {
                dispatch(setSelectedCardIdx( { selectedCardIdx : cardDetails[index].id} ) );
            }}
        />
        }
       
    </View>
  );
}

export const CreditCardUI = ( { item  } : { item :  Card} ) => {
    const  { name, cardNum, expiryDate, cvv, isCardFreezed } = item;

    const [cardNumberVisibility, setCardNumberVisibility] = useState(true);
    return (
        <View>
         <View style = { styles.cardVisibilityViewStyle }>
            <TouchableOpacity
            activeOpacity={1}  
            style = {styles.cardTouchableOpacityStyle }
            onPress = { (  ) => { setCardNumberVisibility(prev => !prev)} }
            >
                { cardNumberVisibility ?  <HideEyeSVG width = { 16 } height = { 16 } /> : <ShowEyeSVG width = { 16 } height = { 16 } /> }
                <Text style = { { color: colors.text.green, marginLeft: 6, fontFamily: 'AvenirDemiBold', fontSize: 12}} > { cardNumberVisibility ? "Hide Card Number" : "Show Card Number" }</Text>
            </TouchableOpacity>
        </View>

        <View style = { [styles.cardViewStyle, isCardFreezed && { backgroundColor: colors.background.mediumGreen}] } >
            <View style = { styles.visaLogoViewStyle }>
                <AspireLogoSVG width={74} height={21}/>
            </View>

            <View style = { styles.nameViewStyle } >
                <Text style = { styles.nameTextStyle } >{name}</Text>
            </View>

            <View style = { styles.cardNumViewStyle } >
                    <Text style = { styles.cardNumTextStyle } > { cardNumberVisibility ? cardNum.slice(0, 4) : "****"  } </Text>
                    <Text style = { styles.cardNumTextStyle } > { cardNumberVisibility ? cardNum.slice(4, 8) : "****"  }</Text>
                    <Text style = { styles.cardNumTextStyle } > { cardNumberVisibility ? cardNum.slice(8, 12) : "****" }</Text>
                    <Text style = { styles.cardNumTextStyle } > { cardNum.slice(12, 16) }</Text>
            </View>

            <View style = { styles.expAndCvvViewStyle }>
                <Text style = { styles.cardInfoTextStyle }>{ `Thru: ${expiryDate}`}</Text>
                <Text style = { styles.cardInfoTextStyle }>{ `CVV: ${cardNumberVisibility ? cvv : "***"}`}</Text>
            </View>

            <View style = { styles.visaLogoViewStyle }>
                <VisaSVG width={60} height={20}/>
            </View>


        </View>
    </View>
    )
}
const styles = StyleSheet.create<Styles>({
    cardInfoTextStyle: {
        color: colors.background.primary,
        fontFamily: "AvenirDemiBold",
        fontSize: 12,
        marginRight: 32
    },
    cardNumTextStyle: {
        color: colors.background.primary,
        fontFamily: "AvenirDemiBold",
        fontSize: 14,
        marginRight: 24
    },
    cardNumViewStyle: {
        flexDirection:'row', 
        justifyContent:'flex-start',
        marginBottom: 8,
        width:'100%'
    },
    cardViewStyle: {
        alignItems: 'center',
        backgroundColor: colors.background.green,
        borderRadius: 12,
        justifyContent: 'center',
        padding: 24
    },
    container: {
        alignSelf: 'center',
        position: "absolute",
        top: "-15%",
        zIndex: 100
    },
    expAndCvvViewStyle: {
        flexDirection : 'row',
        justifyContent:'flex-start',
        width: '100%'
    },
    nameTextStyle:{
        color: colors.background.primary,
        fontFamily: "AvenirBold",
        fontSize : 22
    },
    nameViewStyle:{
        flexDirection:'row', 
        justifyContent:'flex-start',
        marginVertical: 24,
        width:'100%'
    },
    visaLogoViewStyle : { 
        flexDirection:'row', 
        justifyContent:'flex-end', 
        width: '100%'
    }, 
    cardVisibilityViewStyle : {
        flexDirection:'row', 
        justifyContent:'flex-end'
    },
    cardTouchableOpacityStyle : { 
        flexDirection: 'row', 
        alignItems: 'center',
        backgroundColor:colors.background.primary, 
        paddingHorizontal: 12, 
        paddingVertical: 8, 
        borderTopLeftRadius:12, 
        borderTopRightRadius:12, 
    }
});

type Styles = {
  cardInfoTextStyle: TextStyle;
  cardNumTextStyle: TextStyle;
  cardNumViewStyle: ViewStyle;
  cardViewStyle: ViewStyle;
  container: ViewStyle;
  expAndCvvViewStyle: ViewStyle;
  nameTextStyle: TextStyle;
  nameViewStyle: ViewStyle;
  visaLogoViewStyle: ViewStyle;
  cardVisibilityViewStyle: ViewStyle;
  cardTouchableOpacityStyle: ViewStyle;
};