import React from "react";
import { useSelector } from "react-redux";
import MButton from "../../components/MButton";
import {
  getResponsiveWidth,
  getWindowWidth,
} from "../../utils/responsiveDimensions.utils";
import { View, SafeAreaView, ScrollView } from "react-native";
import Selector from "../../components/LanguageSelectorBeforeSignUp";
import { useTranslation } from "react-i18next";

export default ({ navigation }) => {
  const { colorInfo } = useSelector((state) => state.Theme);
  const { t,i18n } = useTranslation();
  const onLoginPress = () => {
    navigation.navigate(global.screens.login);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colorInfo.colors.backgroundColor,
      }}
    >
      <View
        style={{ flex: 1, backgroundColor: colorInfo.colors.backgroundColor,paddingBottom:500 }}
      >
        <Selector />
      </View>
      <View
        style={{ flex: 1, backgroundColor: colorInfo.colors.backgroundColor }}
      >
        <MButton  
          buttonStyle={{ width: getWindowWidth() - 100 }}
          buttonTextStyle={{ fontSize: 14 }}
          title={t("createAccount:continue")}
          onPress={() => {
            onLoginPress();
          }}
        />
      </View>
    </SafeAreaView>
  );
};
