import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme/colors';
import InsightSVG from '../../assets/icons/insight.svg'
import SpendingLimitSVG from '../../assets/icons/spendingLimit.svg'
import GetNewCardSVG from '../../assets/icons/newCard.svg'
import DeactivatedCardSVG from '../../assets/icons/deactivatedCard.svg'
import FreezeCardSVG from '../../assets/icons/freezeCard.svg'
import ToggleOn from '../../assets/toggle.svg'
import ToggleOff from '../../assets/toggle-1.svg'
import { Fontisto } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCard } from '../store/selectors';
import { updateCardSettings } from '../store/cardSlice';


const svgToRender = ( title )=>{
    switch(title){
        case "Top-up account":
            return ( <InsightSVG width={36} height={36} /> )
        case "Weekly spending limit":
            return ( <SpendingLimitSVG width={36} height={36} /> )
        case "Freeze card":
            return ( <FreezeCardSVG width={36} height={36} /> )
        case "Deactivated cards":
            return ( <DeactivatedCardSVG width={36} height={36} /> )
        case "Get a new card":
            return ( <GetNewCardSVG width={36} height={36} /> )
        default:
            break
    }
}
export const CardWithInfo  = ( { title, body, isTogglePresent  = false, setModalVisible} ) => {

    const navigation = useNavigation();
    const currentCard = useSelector(selectCurrentCard);
    console.log("currentCard", currentCard);
    const [isOn, setIsOn] = useState(currentCard);
    const dispatch = useDispatch();
    console.log("currentCard", currentCard);
    useEffect(()=>{
        if(title === "Weekly spending limit"){
            setIsOn(currentCard.isSpendingLimitEnabled)
        } else if ( title === "Freeze card" ) {
            setIsOn(currentCard.isCardFreezed)
        }
    }, [currentCard])

    const onTogglePress = () => {
        console.log("Weekly spending limit && isOn",title, isOn)
        if(title === "Weekly spending limit" && !isOn){
            navigation.navigate("SpendingLimit");
        }
        else if(title === "Weekly spending limit" && isOn){
            console.log("incoming 2");
            dispatch(updateCardSettings({ id: currentCard.id, isSpendingLimitEnabled: false, spendingLimit : 0 }));
            setIsOn(prev => !prev); 
        }
        else if ( title === "Freeze card" ) {
            dispatch(updateCardSettings({ id: currentCard.id, isCardFreezed : !isOn }));
            setIsOn(prev => !prev); 
        }
    }
    
  return (
    <TouchableOpacity style = { styles.container } onPress = {()=>{ if(title === "Get a new card") {setModalVisible(true)} }}>

        <View style = { styles.iconStyle } >
            { svgToRender(title) }
            <View style = { styles.infoStyle } >
                <Text style={{ fontFamily: 'AvenirMedium', fontSize: 16 }}>{title}</Text>
                <Text style={{ fontFamily: 'AvenirRegular', fontSize: 14, marginVertical : 2 }}>{body}</Text>
            </View>
        </View>

       { isTogglePresent ?
      <TouchableOpacity onPress={onTogglePress}>
        <Fontisto
          name={isOn ? 'toggle-on' : 'toggle-off'}
          size={50}
          color={isOn ? colors.background.green : colors.background.grey}
        />
      </TouchableOpacity>
        :
        <></> }

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center',
        marginTop: 32
    },
    iconStyle: {
        flexDirection:'row',
        alignItems:'center'
    },
    infoStyle: {
        paddingHorizontal:12
    },
    toggleButtonStyle: {

    }
});
