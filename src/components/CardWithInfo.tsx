import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../theme/colors";
import InsightSVG from "../../assets/icons/insight.svg";
import SpendingLimitSVG from "../../assets/icons/spendingLimit.svg";
import GetNewCardSVG from "../../assets/icons/newCard.svg";
import DeactivatedCardSVG from "../../assets/icons/deactivatedCard.svg";
import FreezeCardSVG from "../../assets/icons/freezeCard.svg";
import { Fontisto } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentCard } from "../store/selectors";
import { updateCardAction } from "../store/actions";
import { DebitCardItemInfo } from "../utils/helper";

const svgToRender = (title: string) => {
  switch (title) {
    case "Top-up account":
      return <InsightSVG width={36} height={36} />;
    case "Weekly spending limit":
      return <SpendingLimitSVG width={36} height={36} />;
    case "Freeze card":
      return <FreezeCardSVG width={36} height={36} />;
    case "Deactivated cards":
      return <DeactivatedCardSVG width={36} height={36} />;
    case "Get a new card":
      return <GetNewCardSVG width={36} height={36} />;
    default:
      break;
  }
};

interface cardWithInfoProps {
  item: DebitCardItemInfo;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CardWithInfo = ({ item, setModalVisible }: cardWithInfoProps) => {
  const { title, body, isTogglePresent, toggleOnTitle, toggleOnBody } = item;
  const navigation = useNavigation<any>();
  const currentCard = useSelector(selectCurrentCard);
  const [isOn, setIsOn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (title === "Weekly spending limit") {
      setIsOn(Boolean(currentCard && currentCard.isSpendingLimitEnabled));
    } else if (title === "Freeze card") {
      setIsOn(Boolean(currentCard && currentCard.isCardFreezed));
    }
  }, [currentCard]);

  const onTogglePress = () => {
    if (!currentCard) {
      return;
    } else if (title === "Weekly spending limit" && !isOn) {
      navigation.navigate("SpendingLimit");
    } else if (title === "Weekly spending limit" && isOn) {
      dispatch(
        updateCardAction({
          id: currentCard.id,
          updates: { isSpendingLimitEnabled: false, spendingLimit: 0 },
        }),
      );
      setIsOn((prev) => !prev);
    } else if (title === "Freeze card") {
      dispatch(
        updateCardAction({
          id: currentCard.id,
          updates: { isCardFreezed: !isOn },
        }),
      );
      setIsOn((prev) => !prev);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, !currentCard && styles.emptyCardStyle]}
      onPress={() => {
        if (title === "Get a new card") {
          setModalVisible(true);
        }
      }}
    >
      <View style={styles.iconStyle}>
        {svgToRender(title)}
        <View style={styles.infoStyle}>
          <Text testID="title" style={styles.titleTextStyle}>
            {isOn ? toggleOnTitle : title}
          </Text>
          <Text testID="body" style={styles.bodyTextStyle}>
            {isOn
              ? title === "Weekly spending limit"
                ? toggleOnBody + currentCard?.spendingLimit
                : toggleOnBody
              : body}
          </Text>
        </View>
      </View>

      {isTogglePresent ? (
        <TouchableOpacity testID="toggle-button" onPress={onTogglePress}>
          <Fontisto
            name={isOn ? "toggle-on" : "toggle-off"}
            size={50}
            color={isOn ? colors.background.green : colors.background.grey}
          />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create<Styles>({
  bodyTextStyle: {
    fontFamily: "AvenirRegular",
    fontSize: 14,
    marginVertical: 2,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
  },
  emptyCardStyle: {
    opacity: 0.6,
  },
  iconStyle: {
    alignItems: "center",
    flexDirection: "row",
  },
  infoStyle: {
    paddingHorizontal: 12,
  },
  titleTextStyle: {
    fontFamily: "AvenirMedium",
    fontSize: 16,
  },
});

type Styles = {
  container: ViewStyle;
  emptyCardStyle: ViewStyle;
  iconStyle: ViewStyle;
  infoStyle: ViewStyle;
  titleTextStyle: TextStyle;
  bodyTextStyle: TextStyle;
};

function NativeStackNavigationProp<T>() {
  throw new Error("Function not implemented.");
}
