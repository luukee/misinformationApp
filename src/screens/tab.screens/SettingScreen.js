import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
  FlatList,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import MButton from "../../components/MButton";
import MText from "../../components/MText";
import {
  getResponsiveHeight,
  getResponsiveWidth,
  getWindowHeight,
  getWindowWidth,
} from "../../utils/responsiveDimensions.utils";
import ReportHistoryWidget from "../../widgets/ReportHistoryWidget";
import MImage from "../../components/MImage";
import Utility from "../../utils/UtilityMethods";
import AppLoading from "../../components/AppLoading/AppLoading";
import FirebaseHelper from "../../firebase/FirebaseHelper";
import auth from "@react-native-firebase/auth";
import { CommonActions, useIsFocused } from "@react-navigation/native";
import moment from "moment";
import CommonDataManager from "../../firebase/Singleton";
import UtilityMethods from "../../utils/UtilityMethods";

import Selector from "../../components/LanguageSelector";
import { useTranslation } from "react-i18next";
import SwitchSelector from "react-native-switch-selector";


export default ({ navigation }) => {
  const LANGUAGES = [
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
  ];
  const { colorInfo } = useSelector((state) => state.Theme);
  const { t, i18n } = useTranslation();
  const user = auth().currentUser;
  const signUpUserUID = user.uid

  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    fetchName();
  }, []);

  const fetchName = () => {
    setLoading(true);

    FirebaseHelper.fetchARecordFromCollection(
      "mobileUsers",
      signUpUserUID,
      (response) => {
        setLoading(false);
        const userName = response.response._data.name
        console.log(userName)
        setUserName(userName)
      }
    );
  };

  const setLanguage = (code) => {
    return i18n.changeLanguage(code);
  };


  const onPressChangeEmail = () => {
    if (user.photoURL != null){
      alert("You can't change your email when log in using third party account")
    }else{
      navigation.navigate(global.screens.changeEmail);
  };
    }
    

  const onPressLogout = () => {
    Alert.alert("", t("setting:areyousure"), [
      {
        text: "No",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: t("setting:yes"),
        onPress: () => {
          UtilityMethods.storeObjectData("USER", JSON.stringify(false));
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
    ]);
  };
  

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colorInfo.colors.backgroundColor }}
    >
      <View style={{ flex: 1, width: "90%", alignSelf: "center" }}>
        <MText
          text={t("setting:settings")}
          style={{
            color: colorInfo.colors.primary,
            fontWeight: "bold",
            fontSize: 30,
            marginBottom: 30,
          }}
        />

        <MText
        
          text={user.displayName ? user.displayName : userName}
          style={{
            color: "#000",
            fontWeight: "bold",
            fontSize: 20,
          }}
        />

        <MText
          text={user.email}
          style={{
            color: "#000",
            fontSize: 16,
            marginBottom: 20,
          }}
        />

        <MText
         text={"Agency selected: Univision"}
         style={{
          color: "#000",
          fontSize: 20,
          marginBottom: 20,
        }}
         />

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MImage
            source={require("../../assets/personalInformation.png")}
            style={{
              width: getResponsiveWidth(30, 30),
              height: getResponsiveWidth(30, 30),
              marginRight: 5,
            }}
          />

          <MText
            text={t("setting:personal")}
            style={{
              color: "#000",
              fontSize: 24,
            }}
          />
        </View>

        <MText
          onPress={() => {
            onPressChangeEmail();
          }}
          text={t("setting:changeemail")}
          style={{
            color: "#000",
            fontSize: 16,
            marginTop: 20,
            marginBottom: 10,
            marginLeft: 20,
          }}
        />

        <MText
          onPress={() => {
            onPressLogout();
          }}
          text={t("setting:logout")}
          style={{
            color: "#000",
            fontSize: 16,
            marginBottom: 10,
            marginLeft: 20,
          }}
        />
        <MText
        style={{
          color: "#000",
          fontSize: 20,
          paddingTop:30,
          paddingBottom:30
        }}
        text={t("setting:selectLanguage")}
        />
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
      </View>
    </SafeAreaView>
  );
};
