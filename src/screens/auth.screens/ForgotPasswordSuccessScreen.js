import React, { useEffect } from "react";
import { View, SafeAreaView, ScrollView, BackHandler } from "react-native";
import { SocialIcon } from "react-native-elements";
import { useSelector } from "react-redux";
import MButton from "../../components/MButton";
import MImage from "../../components/MImage";
import MText from "../../components/MText";
import MTextInput from "../../components/MTextInput";
import {
  getResponsiveWidth,
  getWindowWidth,
} from "../../utils/responsiveDimensions.utils";
import { CommonActions } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

export default ({ navigation }) => {
  const { colorInfo } = useSelector((state) => state.Theme);
  const { t, i18n } = useTranslation();
  const onLoginPress = () => {
    navigation.dispatch(
      CommonActions.reset({
        routes: [
          {
            name: global.screens.login,
          },
        ],
      })
    );
  };

  function handleBackButtonClick() {
    onLoginPress();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colorInfo.colors.backgroundColor }}
    >
      <MImage
        onPress={() => {
          onLoginPress();
        }}
        source={require("../../assets/back.png")}
        style={{
          width: getResponsiveWidth(20, 30),
          height: getResponsiveWidth(20, 30),
          marginLeft: 20,
          tintColor: "#37383C",
        }}
      />

      <View style={{ flex: 1, alignItems: "center" }}>
        <MImage
          source={require("../../assets/forgotPasswordSuccess.png")}
          style={{
            width: getResponsiveWidth(180, 200),
            height: getResponsiveWidth(180, 200),
          }}
        />
        <MText
          text={t("forgotPassword:emailSent")}
          style={{ fontWeight: "bold", fontSize: 22, paddingTop: 30 }}
        />
        <MText
          text={t("forgotPassword:message")}
          style={{
            fontSize: 18,
            paddingTop: 20,
            paddingHorizontal: 50,
            textAlign: "center",
          }}
        />
        <MText
            text={t("forgotPassword:noEmail")}
            style={{ fontSize: 14, paddingTop: 50, textAlign: "center" }}
          />
          <MText
            text={t("forgotPassword:reset")}
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              color: colorInfo.colors.primary,
              fontWeight: "bold",
              fontSize: 15,
              textAlign: "center"
            }}
          />
        <View
          style={{
            flexDirection: "row",
            width: getWindowWidth() - 100,
            justifyContent: "center",
            paddingTop: 40,
          }}
        >
          
          
        </View>

        <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 10 }}>
          <MButton
            onPress={() => {
              onLoginPress();
            }}
            buttonStyle={{ width: getWindowWidth() - 100, color: "" }}
            buttonTextStyle={{ fontSize: 14 }}
            title={t("forgotPassword:back")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
