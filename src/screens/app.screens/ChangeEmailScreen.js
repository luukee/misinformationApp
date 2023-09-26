import React, { useState } from "react";
import { View, SafeAreaView, ScrollView, Alert } from "react-native";
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import CommonDataManager from "../../firebase/Singleton";
import AppLoading from "../../components/AppLoading/AppLoading";
import FirebaseHelper from "../../firebase/FirebaseHelper";
import auth from "@react-native-firebase/auth";
import UtilityMethods from "../../utils/UtilityMethods";
import { CommonActions } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

export default ({ navigation }) => {
  const { colorInfo } = useSelector((state) => state.Theme);
  const { t, i18n } = useTranslation();

  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isDataValid = () => {
    let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!newEmail) {
      alert("Email is required");
      return false;
    } else if (/\s/.test(newEmail)) {
      alert("Email should not contain spaces");
      return false;
    } else if (!emailReg.test(newEmail)) {
      alert("Please enter valid email");
      return false;
    } else if (!password) {
      alert("Password is required");
      return false;
    } else if (password.length < 6) {
      alert("Password should be greater than or equal to 6 characters");
      return false;
    } else {
      return true;
    }
  };

  const onUpdatePress = () => {
    if (isDataValid()) {
      setLoading(true);

      FirebaseHelper.loginWithEmailPass(
        CommonDataManager.getInstance().getUser().email,
        password,
        (response) => {
          if (response.isSuccess) {
            FirebaseHelper.resetEmail(newEmail, (response) => {
              if (response.isSuccess) {
                FirebaseHelper.updateDocumentOfCollection(
                  "mobileUsers",
                  auth().currentUser.uid,
                  { email: newEmail },
                  (response) => {
                    setLoading(false);

                    Alert.alert(
                      "Change Email",
                      "Your email is successfully reset. Please login again.",
                      [
                        {
                          text: "Continue",
                          onPress: () => {
                            UtilityMethods.storeObjectData(
                              "USER",
                              JSON.stringify(false)
                            );
                            CommonDataManager.getInstance().setUser(null);
                            auth()
                              .signOut()
                              .then(() => {});
                            navigation.dispatch(
                              CommonActions.reset({
                                routes: [
                                  {
                                    name: global.screens.login,
                                  },
                                ],
                              })
                            );
                          },
                        },
                      ]
                    );
                  }
                );
              } else {
                setLoading(false);
                alert(response.message);
              }
            });
          } else {
            setLoading(false);
            alert(response.message);
          }
        }
      );
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colorInfo.colors.backgroundColor }}
    >
      {AppLoading.renderLoading(loading)}

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
            marginBottom: 30,
          }}
        />
      </View>

      <KeyboardAwareScrollView
        contentContainerStyle={{ alignItems: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1, width: "90%", alignSelf: "center" }}>
          <MText
            text={t("changeEmail:changeEmail")}
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
            disabled
            value={CommonDataManager.getInstance().getUser().email}
            containerStyle={{ paddingTop: 20 }}
            inputContainerStyle={{ width: getWindowWidth() - 100 }}
            placeholder={"Current email"}
          />

          <MTextInput
            // containerStyle={{ paddingTop: 20 }}
            secureTextEntry
            onChangeText={(password) => setPassword(password)}
            value={password}
            inputContainerStyle={{ width: getWindowWidth() - 100 }}
            placeholder={t("changeEmail:confirm")}
          />

          <MTextInput
            // containerStyle={{ paddingTop: 20 }}
            keyboardType={"email-address"}
            onChangeText={(newEmail) => setNewEmail(newEmail)}
            value={newEmail}
            inputContainerStyle={{ width: getWindowWidth() - 100 }}
            placeholder={t("changeEmail:newEmail")}
          />

          <MButton
            buttonStyle={{ width: getWindowWidth() - 100, color: "" }}
            buttonTextStyle={{ fontSize: 14 }}
            title={t("changeEmail:updateEmail")}
            onPress={() => {
              onUpdatePress();
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
