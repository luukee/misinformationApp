import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/tab.screens/HomeScreen";
import { useSelector } from "react-redux";
import { Icon } from "react-native-elements";
import SettingScreen from "../screens/tab.screens/SettingScreen";
import { useTranslation } from "react-i18next";

const BottomTabStack = createBottomTabNavigator();

function BottomTabRoute() {
  const { colorInfo } = useSelector((state) => state.Theme);
  const { t, i18n } = useTranslation();
  return (
    <BottomTabStack.Navigator
      name={global.routes.bottomTabRoute}
      initialRouteName={global.screens.home}
      screenOptions={{
        tabBarActiveTintColor: colorInfo.colors.primary,
      }}
    >
      <BottomTabStack.Screen
        name={global.screens.home}
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarLabel: t("navigate:home"),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
            paddingVertical: 2,
          },
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={1.2 * size} />
          ),
        }}
      />
      <BottomTabStack.Screen
        name={global.screens.setting}
        component={SettingScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarLabel: t("navigate:setting"),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
            paddingVertical: 2,
          },
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings" color={color} size={1.2 * size} />
          ),
        }}
      />
    </BottomTabStack.Navigator>
  );
}

export default BottomTabRoute;
