import React, { useEffect, useState } from "react";
import { View, SafeAreaView, ScrollView, BackHandler } from "react-native";
import { CheckBox, SocialIcon } from "react-native-elements";
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
import UtilityMethods from "../../utils/UtilityMethods";
import { useTranslation } from "react-i18next";

export default ({ navigation }) => {
  const { colorInfo } = useSelector((state) => state.Theme);
  const { t, i18n } = useTranslation();
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const onStartPress = () => {
    if (dontShowAgain) {
      UtilityMethods.storeStringData("ReminderScreen", "true");
    }

    navigation.navigate(global.screens.whereTopic);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colorInfo.colors.backgroundColor }}
    >
      <View style={{ width: "90%", alignSelf: "center" }}>
        <MImage
          onPress={() => {
            navigation.goBack();
          }}
          source={require("../../assets/back.png")}
          style={{
            width: getResponsiveWidth(20, 30),
            height: getResponsiveWidth(20, 30),
            tintColor: "#37383C",
          }}
        />
      </View>

      <View
        style={{
          flex: 1,
          width: "90%",
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MImage
          source={require("../../assets/reminder.png")}
          style={{
            width: getResponsiveWidth(200, 200),
            height: getResponsiveWidth(200, 200),
          }}
        />

        <MText
          text={t("addNewReport:reminder")}
          style={{
            color: "#000",
            fontWeight: "bold",
            fontSize: 22,
          }}
        />

        <MText
          text={t("addNewReport:description")}
          style={{
            color: "#000",
            fontSize: 16,
            width: getWindowWidth() - 100,
            textAlign: "center",
            marginTop: 10,
          }}
        />

        <MText
          text={t("addNewReport:example")}
          style={{
            color: "#000",
            fontSize: 16,
            width: getWindowWidth() - 100,
            textAlign: "center",
            marginTop: 10,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            marginVertical: 15,
            width: getWindowWidth() - 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 0.15 }}>
            <MImage
              source={require("../../assets/correct.png")}
              style={{
                width: getResponsiveWidth(20, 30),
                height: getResponsiveWidth(20, 30),
                marginRight: 20,
              }}
            />
          </View>

          <View style={{ flex: 0.85 }}>
            <MText
              text={t("addNewReport:correct")}
              style={{
                color: "#000",
                fontSize: 16,
              }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginBottom: 20,
            width: getWindowWidth() - 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 0.15 }}>
            <MImage
              source={require("../../assets/wrong.png")}
              style={{
                width: getResponsiveWidth(20, 30),
                height: getResponsiveWidth(20, 30),
              }}
            />
          </View>

          <View style={{ flex: 0.85 }}>
            <MText
              text={t("addNewReport:incorrect")}
              style={{
                color: "#000",
                fontSize: 16,
              }}
            />
          </View>
        </View>

        <MButton
          buttonStyle={{ width: getWindowWidth() - 100 }}
          buttonTextStyle={{ fontSize: 14 }}
          title={t("addNewReport:start")}
          onPress={() => {
            onStartPress();
          }}
        />

        <CheckBox
          title={t("addNewReport:noShow")}
          textStyle={{
            color: "#000",
            fontSize: 16,
            fontWeight: "normal",
          }}
          containerStyle={{
            borderWidth: 0,
            backgroundColor: "transparent",
          }}
          checked={dontShowAgain}
          onPress={() => setDontShowAgain(!dontShowAgain)}
        />
      </View>
    </SafeAreaView>
  );
};
