import React, { useState } from "react";
import { View, SafeAreaView, ScrollView, Alert,KeyboardAvoidingView, } from "react-native";
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
import { CommonActions } from "@react-navigation/native";
import FirebaseHelper from "../../firebase/FirebaseHelper";
import AppLoading from "../../components/AppLoading/AppLoading";
import moment from "moment";
import UtilityMethods from "../../utils/UtilityMethods";
import CommonDataManager from "../../firebase/Singleton";
import { useTranslation } from "react-i18next";

export default ({ navigation }) => {
  const { colorInfo } = useSelector((state) => state.Theme);
  const { t, i18n } = useTranslation();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const onLogInPress = () => {
    navigation.navigate(global.screens.login);
  };

  const isDataValid = () => {
    let nameReg = /^[a-zA-Z\s]*$/;
    let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!userName) {
      alert("Name is required");
      return false;
    } else if (userName.charAt(0) === " ") {
      alert("First letter in name should not be a space character");
      return false;
    } else if (!nameReg.test(userName)) {
      alert("Name should be letters only");
      return false;
    } else if (!email) {
      alert("Email is required");
      return false;
    } else if (/\s/.test(email)) {
      alert("Email should not contain spaces");
      return false;
    } else if (!emailReg.test(email)) {
      alert("Please enter valid email");
      return false;
    } else if (!password) {
      alert("Password is required");
      return false;
    } else if (password.length < 6) {
      alert("Password should be greater than or equal to 6 characters");
      return false;
    } else if (!confirmPassword) {
      alert("Confirm Password is required");
      return false;
    } else if (password !== confirmPassword) {
      alert("Both password does not match");
      return false;
    } else {
      return true;
    }
  };

  const onContinuePress = () => {
    if (isDataValid()) {
      setLoading(true);

      FirebaseHelper.checkEmailAlreadyExists(email, (response) => {
        if (response.isSuccess) {
          FirebaseHelper.signUpWith(email, password, (signupResponse) => {
            if (signupResponse.isSuccess) {
              const data = {
                name: userName,
                email: email,
                joiningDate: moment().utc().unix(),
                isBanned: false,
              };

              FirebaseHelper.createADocumentForCollection(
                "mobileUsers",
                signupResponse.response.uid,
                data,
                (response) => {
                  setLoading(false);
                  
                  CommonDataManager.getInstance().setUser(data);
                  UtilityMethods.storeObjectData("USER", data);

                  navigation.dispatch(
                    CommonActions.reset({
                      routes: [
                        {
                          name: global.routes.bottomTabRoute,
                        },
                      ],
                    })
                  );
                }
              );
            } else {
              setLoading(false);
              alert(signupResponse.message);
            }
          });
        } else {
          setLoading(false);
          alert(response.message);
        }
      });
    }
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
      {AppLoading.renderLoading(loading)}

      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MImage
          source={require("../../assets/Logo.png")}
          style={{
            width: getResponsiveWidth(80, 120),
            height: getResponsiveWidth(80, 120),
            marginTop: 10,
          }}
        />
        <MText
          text={t("createAccount:create")}
          style={{ fontWeight: "bold", fontSize: 22, paddingTop: 20 }}
        />
        <MTextInput
          onChangeText={(userName) => setUserName(userName)}
          value={userName}
          containerStyle={{ paddingTop: 30 }}
          inputContainerStyle={{ width: getWindowWidth() - 100 }}
          placeholder={t("createAccount:username")}
        />
        <MTextInput
          onChangeText={(email) => setEmail(email)}
          value={email}
          keyboardType={"email-address"}
          containerStyle={{ paddingTop: -20 }}
          inputContainerStyle={{ width: getWindowWidth() - 100 }}
          placeholder={t("createAccount:email")}
        />
        <MTextInput
          secureTextEntry
          onChangeText={(password) => setPassword(password)}
          value={password}
          containerStyle={{ paddingTop: -20 }}
          inputContainerStyle={{ width: getWindowWidth() - 100 }}
          placeholder={t("createAccount:password")}
        />
        <MTextInput
          secureTextEntry
          onChangeText={(confirmPassword) =>
            setConfirmPassword(confirmPassword)
          }
          value={confirmPassword}
          containerStyle={{ paddingTop: -20 }}
          inputContainerStyle={{ width: getWindowWidth() - 100 }}
          placeholder={t("createAccount:confirmPassword")}
        />
        <MButton
          buttonStyle={{ width: getWindowWidth() - 100 }}
          buttonTextStyle={{ fontSize: 14 }}
          title={t("createAccount:signup")}
          onPress={() => {
            onContinuePress();
          }}
        />
        <View
          style={{
            width: getWindowWidth() - 100,
            alignItems: "center",
            paddingBottom: 10,
            paddingTop: 20,
          }}
        >
          {/* <MText text={"- Or Sign Up With -"} style={{ fontSize: 15 }} /> */}
        </View>
        {/* <View
          style={{
            flexDirection: "row",
            width: getWindowWidth() - 100,
            justifyContent: "space-around",
            paddingTop: 15,
          }}
        >
          <SocialIcon
            type={"google"}
            button
            style={{ width: 80, borderRadius: 10 }}
            light
          />
          <SocialIcon
            type={"facebook"}
            button
            style={{ width: 80, borderRadius: 10 }}
            light
          />
          <SocialIcon
            type={"twitter"}
            button
            style={{ width: 80, borderRadius: 10 }}
            light
          />
        </View> */}
        <View
          style={{
            flexDirection: "row",
            width: getWindowWidth() - 100,
            justifyContent: "center",
            paddingTop: 20,
          }}
        >
          <MText text={t("createAccount:haveAccount")} style={{ fontSize: 14 }} />
          <MText
            text={t("createAccount:login")}
            onPress={onLogInPress}
            style={{
              color: colorInfo.colors.primary,
              fontWeight: "bold",
              fontSize: 15,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
