import React from "react";
import { View, SafeAreaView, ScrollView, Image } from "react-native";
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
import emailImage from "../../assets/email.jpeg";
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
      <MImage
        source={emailImage}
        style={{ height: 140, width: "100%", marginTop: 70 }}
      />
      <MText
        text={"Verification is sent "}
        style={{
          fontWeight: "bold",
          fontSize: 24,
          paddingTop: 30,
          textAlign: "center",
        }}
      />

      <MText
        text={"Please go to your email and verify your new email"}
        style={{ padding: 30, textAlign: "center" }}
      />
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <MText
          text={"Don't receive an email ? "}
          style={{ textAlign: "right" }}
        />
        <MText
          onPress={() => navigation.navigate(global.screens.changeEmail)}
          text={"  Reset email"}
          style={{
            fontWeight: "bold",
            textAlign: "left",
            color: colorInfo.colors.primary,
          }}
        />
        <MButton
          onPress={() => navigation.navigate(global.screens.login)}
          buttonStyle={{ width: getWindowWidth() - 100, color: "" }}
          buttonTextStyle={{ fontSize: 14 }}
          title={"View my report"}
        />
      </View>
    </SafeAreaView>
  );
};
