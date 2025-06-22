import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeTab } from "./HomeTab";
import { DebitCardTab } from "./DebitCardTab";
import { PaymentsTab } from "./PaymentsTab";
import { CreditTab } from "./CreditTab";
import { ProfileTab } from "./ProfileTab";
import { colors } from "../../theme/colors";
import CreditTabActiveIcon from "../../../assets/icons/creditActiveTabIcon.svg";
import CreditTabInActiveTabIcon from "../../../assets/icons/creditInActiveTabIcon.svg";
import DebitCardActiveTabIcon from "../../../assets/icons/debitCardActiveTabIcon.svg";
import DebitCardInActiveTabIcon from "../../../assets/icons/debitCardInActiveTabIcon.svg";
import PaymentsActiveTabIcon from "../../../assets/icons/paymentsActiveTabIcon.svg";
import PaymentsInActiveTabIcon from "../../../assets/icons/paymentsInActiveTabIcon.svg";
import ProfileActiveTabIcon from "../../../assets/icons/profileActiveTabIcon.svg";
import ProfileInActiveTabIcon from "../../../assets/icons/profileInActiveTabIcon.svg";
import HomeActiveTabIcon from "../../../assets/icons/homeActiveTabIcon.svg";
import HomeInActiveTabIcon from "../../../assets/icons/homeInActiveTabIcon.svg";
import { HomeTabbarParamList } from "../../utils/types";

const Tab = createBottomTabNavigator<HomeTabbarParamList>();

export function HomeTabbar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.background.green,
        tabBarInactiveTintColor: colors.background.grey,
        tabBarIcon: ({ focused, size }) => {
          switch (route.name) {
            case "Home":
              return focused ? (
                <HomeActiveTabIcon width={size} height={size} />
              ) : (
                <HomeInActiveTabIcon width={size} height={size} />
              );
            case "Debit Card":
              return focused ? (
                <DebitCardActiveTabIcon width={size} height={size} />
              ) : (
                <DebitCardInActiveTabIcon width={size} height={size} />
              );
            case "Payments":
              return focused ? (
                <PaymentsActiveTabIcon width={size} height={size} />
              ) : (
                <PaymentsInActiveTabIcon width={size} height={size} />
              );
            case "Credit":
              return focused ? (
                <CreditTabActiveIcon width={size} height={size} />
              ) : (
                <CreditTabInActiveTabIcon width={size} height={size} />
              );
            case "Profile":
              return focused ? (
                <ProfileActiveTabIcon width={size} height={size} />
              ) : (
                <ProfileInActiveTabIcon width={size} height={size} />
              );
          }
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Debit Card"
        component={DebitCardTab}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Payments"
        component={PaymentsTab}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Credit"
        component={CreditTab}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileTab}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
