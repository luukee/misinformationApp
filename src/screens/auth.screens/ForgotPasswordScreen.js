import React, { useState } from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
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
import AppLoading from "../../components/AppLoading/AppLoading";
import FirebaseHelper from "../../firebase/FirebaseHelper";
import { useTranslation } from "react-i18next";

export default ({ navigation }) => {
  const { colorInfo } = useSelector((state) => state.Theme);
  const { t,i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onBackPress = () => {
    navigation.goBack();
  };

  const onForgotPasswordPress = () => {
    let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      alert("Email is required");
    } else if (/\s/.test(email)) {
      alert("Email should not contain spaces");
    } else if (!emailReg.test(email)) {
      alert("Please enter valid email");
    } else {
      setLoading(true);
      FirebaseHelper.resetPassword(email, (response) => {
        setLoading(false);
        navigation.navigate(global.screens.forgotPasswordSuccess);
      });
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colorInfo.colors.backgroundColor }}
    >
      {AppLoading.renderLoading(loading)}
      
      <MImage
        onPress={() => {
          onBackPress();
        }}
        source={require("../../assets/back.png")}
        style={{
          width: getResponsiveWidth(20, 30),
          height: getResponsiveWidth(20, 30),
          marginLeft: 20,
          tintColor: "#37383C",
        }}
      />
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <MImage
          source={require("../../assets/forgotPassword.png")}
          style={{
            width: getResponsiveWidth(180, 200),
            height: getResponsiveWidth(180, 200),
          }}
        />
        <MText
          text={t("forgotPassword:forgot")}
          style={{ fontWeight: "bold", fontSize: 22 }}
        />
        <MText
          text={
            t("forgotPassword:noWorry")
          }
          style={{
            fontSize: 18,
            paddingTop: 30,
            paddingHorizontal: 50,
            textAlign: "center",
          }}
        />
        <MTextInput
          keyboardType={"email-address"}
          onChangeText={(email) => setEmail(email)}
          value={email}
          containerStyle={{ paddingTop: 30 }}
          inputContainerStyle={{ width: getWindowWidth() - 100 }}
          placeholder={t("forgotPassword:email")}
        />
        <MButton
          buttonStyle={{ width: getWindowWidth() - 100, color: "" }}
          buttonTextStyle={{ fontSize: 14 }}
          title={t("forgotPassword:sent")}
          onPress={() => {
            onForgotPasswordPress();
          }}
        />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};
