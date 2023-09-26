import React from "react";
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

export default ({ navigation }) => {
  const { colorInfo } = useSelector((state) => state.Theme);

  const onSignUpPress = () => {
    navigation.navigate(global.screens.signUp);
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
      <MText
        text={"Change Password ? "}
        containerStyle={{ width: "100%", paddingHorizontal: 30 }}
        style={{
          fontWeight: "bold",
          fontSize: 28,
          paddingTop: 30,
          textAlign: "left",
          color: colorInfo.colors.primary,
        }}
      />

      <MTextInput
        containerStyle={{ paddingTop: 60 }}
        inputContainerStyle={{ width: getWindowWidth() - 100 }}
        placeholder={"Current password"}
      />

      <MTextInput
        containerStyle={{ paddingTop: 20 }}
        inputContainerStyle={{ width: getWindowWidth() - 100 }}
        placeholder={"New password"}
      />

      <MTextInput
        containerStyle={{ paddingTop: 20 }}
        inputContainerStyle={{ width: getWindowWidth() - 100 }}
        placeholder={"Confirm new password"}
      />
      <MButton
        buttonStyle={{ width: getWindowWidth() - 100, color: "" }}
        buttonTextStyle={{ fontSize: 14 }}
        title={"Update password"}
      />
    </SafeAreaView>
  );
};
