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
import { CommonActions } from "@react-navigation/native";
import AppLoading from "../../components/AppLoading/AppLoading";
import FirebaseHelper from "../../firebase/FirebaseHelper";
import UtilityMethods from "../../utils/UtilityMethods";
import CommonDataManager from "../../firebase/Singleton";
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useTranslation } from "react-i18next";
import SwitchSelector from "react-native-switch-selector";


export default ({ navigation }) => {
  const LANGUAGES = [
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
  ];
  const { colorInfo } = useSelector((state) => state.Theme);
  const { t, i18n } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [authenticated, setAutheticated] = useState(false);

  const onSignUpPress = () => {
    navigation.navigate(global.screens.signUp);
  };

  const setLanguage = (code) => {
    return i18n.changeLanguage(code);
  };

  GoogleSignin.configure({
    webClientId:
      '2581605663-0jd0t8aun81i5s656p6htbhcash1ulfv.apps.googleusercontent.com',
  });

  onPressGoogle = async() =>{
    onGoogle ().then(
      
      authenticated => {
        UtilityMethods.storeObjectData("USER", auth().currentUser);
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
    )
  }

  async function onGoogle (){
    const { idToken, user } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // navigation.navigate(global.routes.bottomTabRoute);
    auth().onAuthStateChanged((user) => {
      if(user) {
        setAutheticated(true);
      }else{
        setAutheticated(false);
      }
    })
    
    return auth().signInWithCredential(googleCredential);
  }

  const onLoginPress = () => {
    if (isDataValid()) {
      setLoading(true);

      FirebaseHelper.loginWithEmailPass(email, password, (response) => {
        if (response.isSuccess) {
          console.log(response)
          FirebaseHelper.fetchARecordFromCollection(
            "mobileUsers",
            response.response.uid,
            async (response) => {
              setLoading(false);
              // console.log(response)
              // const update = {
              //   displayName: response.response._data.name
              // };
              CommonDataManager.getInstance().setUser(response);
              UtilityMethods.storeObjectData("USER", response);
              // auth().currentUser.updateProfile(update);
              
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
          if (response.message == "[auth/user-not-found] There is no user record corresponding to this identifier. The user may have been deleted."){
            Alert.alert(t("welcome:alert"),t("welcome:noUser"))
          }else if (response.message == "[auth/wrong-password] The password is invalid or the user does not have a password."){
            Alert.alert(t("welcome:alert"),t("welcome:passwordInvalid"))
          }else{
            alert(response.message);
          }
        }
      });
    }
  };

  const onForgetPasswordPress = () => {
    navigation.navigate(global.screens.forgotPassword);
  };

  const isDataValid = () => {
    let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      Alert.alert(t("welcome:alert"), t("welcome:emailRequired"));
      return false;
    } else if (/\s/.test(email)) {
      alert("Email should not contain spaces");
      return false;
    } else if (!emailReg.test(email)) {
      alert("Please enter valid email");
      return false;
    } else if (!password) {
      Alert.alert(t("welcome:alert"), t("welcome:passwordRequired"));
      return false;
    } else if (password.length < 6) {
      alert("Password should be greater than or equal to 6 characters");
      return false;
    } else {
      return true;
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
        contentContainerStyle={{
          paddingTop: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MImage
          source={require("../../assets/Logo.png")}
          style={{
            width: getResponsiveWidth(80, 120),
            height: getResponsiveWidth(80, 120),
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <MText
          text={t("welcome:welcome")}
          style={{ fontWeight: "bold", fontSize: 22, paddingTop: 10 }}
        />

        <MTextInput
          keyboardType={"email-address"}
          onChangeText={(email) => setEmail(email)}
          value={email}
          containerStyle={{ paddingTop: 20 }}
          inputContainerStyle={{ width: getWindowWidth() - 100 }}
          placeholder={t("welcome:email")}
        />
        <MTextInput
          // containerStyle={{ paddingTop: -20 }}
          secureTextEntry
          onChangeText={(password) => setPassword(password)}
          value={password}
          inputContainerStyle={{ width: getWindowWidth() - 100 }}
          placeholder={t("welcome:password")}
        />
        <MButton
          buttonStyle={{ width: getWindowWidth() - 100 }}
          buttonTextStyle={{ fontSize: 14 }}
          title={t("welcome:login")}
          onPress={() => {
            onLoginPress();
          }}
        />
        <View
          style={{
            width: getWindowWidth() - 100,
            alignItems: "flex-end",
            paddingVertical: 10,
          }}
        >
          <MText
            onPress={() => {
              onForgetPasswordPress();
            }}
            text={t("welcome:forgot")}
            style={{ fontWeight: "bold", fontSize: 12 }}
          />
        </View>
        <View
          style={{
            width: getWindowWidth() - 100,
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <MText text={t("welcome:orloginwith")} style={{ fontSize: 15 }} />
        </View>
        <View
          style={{
            flexDirection: "row",
            width: getWindowWidth() - 100,
            justifyContent: "space-around",
            paddingVertical: 5,
          }}
        >
          <SocialIcon
            type={"google"}
            button
            style={{ width: 80, borderRadius: 10 }}
            light
            onPress={() => {
              onPressGoogle();
            }}
          />
          {/* <SocialIcon
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
          /> */}
        </View>
        <View
          style={{
            flexDirection: "row",
            width: getWindowWidth() - 100,
            justifyContent: "center",
            paddingVertical: 20,
            paddingBottom: 50
          }}
        >
          <MText text={t("welcome:noaccount")} style={{ fontSize: 14 }} />
          <MText
            text={t("welcome:signup")}
            onPress={onSignUpPress}
            style={{
              color: colorInfo.colors.primary,
              fontWeight: "bold",
              fontSize: 15,
            }}
          />
        </View>
        {/* <View> */}
        <SwitchSelector
              options={LANGUAGES}
              initial={i18n.language == "en" ? 0 : 1}
              onPress={value => setLanguage(value)}
              // textColor={Color.black} //'#7a44cf'
              // selectedColor={'#2167D4'}
              buttonColor={'#2167D4'}
              // borderColor={'#EDE8E4'}
              backgroundColor={'#EDE8E4'}
              bold={true}
          />
        {/* </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};
