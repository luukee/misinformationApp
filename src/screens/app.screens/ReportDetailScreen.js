import React, { useEffect } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Linking,
  FlatList,
  TouchableHighlight,
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
import { CommonActions } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

export default ({ navigation, route }) => {
  const { colorInfo } = useSelector((state) => state.Theme);
  const { t, i18n } = useTranslation();

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f4f7fb" }}>
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
            marginTop: 10,
            marginBottom: 30,
          }}
        />
      </View>

      <View style={{ flex: 1, width: "90%", alignSelf: "center" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              borderRadius: 10,
              padding: 15,
            }}
          >
            <MText
              text={t("reportDetail:title")}
              style={{
                color: colorInfo.colors.primary,
                fontSize: 18,
                marginBottom: 10,
              }}
            />

            <MText
              text={route.params.report._data.title}
              style={{
                color: "#000",
                fontSize: 15,
              }}
            />
          </View>

          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              borderRadius: 10,
              padding: 15,
              marginTop: 10,
            }}
          >
            <MText
              text={t("reportDetail:link")}
              style={{
                color: colorInfo.colors.primary,
                fontSize: 18,
                marginBottom: 10,
              }}
            />

            <MText
              onPress={() => {
                Linking.openURL(route.params.report._data.link.slice(0,4) == "http" ? route.params.report._data.link : "https://"+ route.params.report._data.link);
              }}
              text={route.params.report._data.link}
              style={{
                color: "#000",
                fontSize: 15,
                marginBottom: 10,
              }}
            />

            <MText
              onPress={() => {
                Linking.openURL(route.params.report._data.secondLink.slice(0,4) == "http" ? route.params.report._data.secondLink : "https://"+ route.params.report._data.secondLink);
              }}
              text={route.params.report._data.secondLink}
              style={{
                color: "#000",
                fontSize: 15,
              }}
            />
          </View>

          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              borderRadius: 10,
              padding: 15,
              marginTop: 10,
            }}
          >
            <MText
              text={t("reportDetail:image")}
              style={{
                color: colorInfo.colors.primary,
                fontSize: 18,
                marginBottom: 10,
              }}
            />

            <FlatList
              numColumns={3}
              data={route.params.report._data.images}
              renderItem={({ item, index }) => {
                return (
                  <MImage
                    source={{ uri: item }}
                    style={{
                      width: "30%",
                      height: 100,
                      margin: 5,
                    }}
                    resizeMode={"cover"}
                  />
                );
              }}
            />
          </View>

          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              borderRadius: 10,
              padding: 15,
              marginTop: 10,
            }}
          >
            <MText
              text={t("reportDetail:detail")}
              style={{
                color: colorInfo.colors.primary,
                fontSize: 18,
                marginBottom: 10,
              }}
            />

            <MText
              text={route.params.report._data.detail}
              style={{
                color: "#000",
                fontSize: 15,
              }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
