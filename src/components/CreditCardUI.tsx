import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
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

export const CreditCardCarousel  = (  ) => {
    const cardDetails = useSelector((state)=>state.cards.cardDetails);
    const carouselRef = useRef(null);
    const { width: SLIDER_WIDTH } = Dimensions.get('window');
    const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.90);
    const ITEM_HEIGHT = 200;
    const dispatch = useDispatch();
  return (
    <View style = { styles.container }>
        {
        cardDetails.length === 0 ?

        <CreditCardUI  item={ dummyCardData } />
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

export const CreditCardUI = ( { item  } ) => {
    const  { name, cardNum, expiryDate, cvv, isCardFreezed } = item;

    const [cardNumberVisibility, setCardNumberVisibility] = useState(true);
    return (
        <View>
         <View style = {{flexDirection:'row', justifyContent:'flex-end'}}>
            <TouchableOpacity
            activeOpacity={1}  
            style = {{ flexDirection: 'row', alignItems: 'center', backgroundColor:colors.background.primary, paddingHorizontal: 12, paddingVertical: 8, borderTopLeftRadius:12, borderTopRightRadius:12, }}
            onPress = { (  ) => { setCardNumberVisibility(prev => !prev)} }
            >
                { cardNumberVisibility ?  <HideEyeSVG width = { 16 } height = { 16 } /> : <ShowEyeSVG width = { 16 } height = { 16 } /> }
                <Text style = { { color: colors.text.green, marginLeft: 6, fontFamily: 'AvenirDemiBold', fontSize: 12}} > { cardNumberVisibility ? "Hide Card Number" : "Show Card Number" }</Text>
            </TouchableOpacity>
        </View>

        <View style = { [styles.cardViewStyle, isCardFreezed && { backgroundColor: "#c7e9c0"}] } >
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
                <Text style = { styles.cardInfoTextStyle }>{expiryDate}</Text>
                <Text style = { styles.cardInfoTextStyle }>{ cardNumberVisibility ? cvv : "***"}</Text>
            </View>

            <View style = { styles.visaLogoViewStyle }>
                <VisaSVG width={60} height={20}/>
            </View>


        </View>
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: "-10%",
        zIndex: 100,
        alignSelf: 'center'
    },
    cardViewStyle: {
        backgroundColor: colors.background.green,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        padding: 24
    },
    nameTextStyle:{
        fontSize : 22,
        fontFamily: "AvenirBold",
        color: colors.background.primary
    },
    nameViewStyle:{
        flexDirection:'row', 
        justifyContent:'flex-start',
        width:'100%',
        marginVertical: 24
    },
    visaLogoViewStyle : { 
        flexDirection:'row', 
        justifyContent:'flex-end', 
        width: '100%'
    },
    expAndCvvViewStyle: {
        flexDirection : 'row',
        justifyContent:'flex-start',
        width: '100%'
    },
    cardNumTextStyle: {
        fontSize: 14,
        fontFamily: "AvenirDemiBold",
        color: colors.background.primary,
        marginRight: 24
    },
    cardInfoTextStyle: {
        fontSize: 12,
        fontFamily: "AvenirDemiBold",
        color: colors.background.primary,
        marginRight: 32
    },
    cardNumViewStyle: {
        flexDirection:'row', 
        justifyContent:'flex-start',
        width:'100%',
        marginBottom: 8
    }
});
