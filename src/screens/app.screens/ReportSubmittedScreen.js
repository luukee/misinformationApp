import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
  BackHandler,
} from "react-native";
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
import { CommonActions } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

export default ({ navigation, route }) => {
  const { colorInfo } = useSelector((state) => state.Theme);
  const { t, i18n } = useTranslation();

  const [loading, setLoading] = useState(false);

  const onBackPress = () => {
    navigation.dispatch(
      CommonActions.reset({
        routes: [
          {
            name: global.routes.bottomTabRoute,
          },
        ],
      })
    );
  };

  function handleBackButtonClick() {
    onBackPress();

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

  const onViewMyReportPress = () => {
    fetchReportDetail((report) => {
      navigation.navigate(global.screens.reportDetail, {
        report,
      });
    });
  };

  const fetchReportDetail = (callback) => {
    setLoading(true);

    FirebaseHelper.fetchARecordFromCollection(
      "reports",
      route.params.reportID,
      (response) => {
        setLoading(false);

        callback(response.response);
      }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f4f7fb" }}>
      {AppLoading.renderLoading(loading)}

      <View style={{ width: "90%", alignSelf: "center" }}>
        <MImage
          onPress={() => {
            onBackPress();
          }}
          source={require("../../assets/back.png")}
          style={{
            width: getResponsiveWidth(20, 30),
            height: getResponsiveWidth(20, 30),
            tintColor: "#37383C",
            marginBottom: 30,
          }}
        />
      </View>

      <View
        style={{
          flex: 1,
          width: "90%",
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <MImage
          source={require("../../assets/reportSuccess.png")}
          style={{ height: 180, width: "100%" }}
        />
        <MText
          text={t("report:thankyou")}
          style={{
            fontWeight: "bold",
            fontSize: 24,
            paddingTop: 30,
            textAlign: "center",
          }}
        />

        <MText
          text={t("report:text")}
          style={{ padding: 30, textAlign: "center" }}
        />

        <MButton
          buttonStyle={{ width: getWindowWidth() - 100 }}
          buttonTextStyle={{ fontSize: 14 }}
          title={t("report:view")}
          onPress={() => {
            onViewMyReportPress();
          }}
        />
      </View>
    </SafeAreaView>
  );
};
