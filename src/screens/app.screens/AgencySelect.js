import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
  FlatList,
  Alert,
} from "react-native";
import { SocialIcon } from "react-native-elements";
import { useSelector } from "react-redux";
import MButton from "../../components/MButton";
import MImage from "../../components/MImage";
import MText from "../../components/MText";
import MTextInput from "../../components/MTextInput";
import {
  getResponsiveWidth,
  getWindowHeight,
  getWindowWidth,
} from "../../utils/responsiveDimensions.utils";
import MIcon from "../../components/MIcon";
import { useTranslation } from "react-i18next";
import AppLoading from "../../components/AppLoading/AppLoading";
import FirebaseHelper from "../../firebase/FirebaseHelper";



export default ({ navigation, route }) => {
  const { colorInfo } = useSelector((state) => state.Theme);
  const { t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language

  const [selectAgency, setSelectAgency] = useState(null);
  const [loading, setLoading] = useState(false);
  const [agencies, setAgencies] = useState([]);


  useEffect(() => {
    // fetchAgencies();
    hardcodeAgencies();
  }, []);

  const fetchAgencies = () => {
    setLoading(true);
    FirebaseHelper.fetchAllRecordsOfCollection(
      "agency",
      (response) => {
        setLoading(false);
        setAgencies(response.response.map(obj => obj._data.name))
      }
    );
  };

  const hardcodeAgencies = () => {
    setLoading(true);
    const agency = ["Univision"]
    setAgencies(agency);
    // setSelectAgency("Univision");
    setLoading(false);
  }

  const onContinuePress = () => {
    if (!selectAgency) {
      Alert.alert("Please select any agency!")
    } else {
      navigation.navigate(global.screens.talkingAbout, {
        topicID: route.params.topicID,
        selectedState: route.params.selectedState,
        selectedCity: route.params.selectedCity,
        agency: selectAgency
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


      <View style={{ flex: 1, width: "90%", alignSelf: "center" }}>
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

        <MText
          text={t("agency:whichAgency")}
          // containerStyle = {{width:'100%', paddingHorizontal:20, textAlign: 'left'}}
          style={{
            fontWeight: "bold",
            fontSize: 30,
            marginBottom: 20,
            textAlign: "left",
          }}
        />

        <FlatList

          data={agencies}
          style={{ height: getWindowHeight() / 2 }}
          renderItem={({ item, index }) => {
            return (
              <MButton
                buttonStyle={{
                  width: getWindowWidth() - 100,
                  backgroundColor:
                    item === selectAgency ? colorInfo.colors.primary : "gray",
                  marginVertical: 10,
                }}
                buttonTextStyle={{ fontSize: 14 }}
                title={item}
                onPress={() => setSelectAgency(item)}
              />
            );
          }}
        />

        {/*{options.map(option => {*/}
        {/*    return <MButton*/}
        {/*        buttonStyle={{width: getWindowWidth() - 100, backgroundColor : option === selectOption ?*/}
        {/*                colorInfo.colors.primary : 'gray', marginVertical:10}}*/}
        {/*        buttonTextStyle={{fontSize: 14}}*/}
        {/*        title={option}*/}
        {/*        onPress={()=>setSelectOption(option)}*/}
        {/*    />*/}
        {/*})*/}
        {/*}*/}
        <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 10 }}>
          <TouchableHighlight
            underlayColor={colorInfo.colors.transparent}
            onPress={() => {
              onContinuePress();
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 40,
                alignSelf: "flex-end",
                backgroundColor: colorInfo.colors.primary,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MImage
                source={require("../../assets/arrowBack.png")}
                style={{
                  width: getResponsiveWidth(20, 30),
                  height: getResponsiveWidth(20, 30),
                  transform: [{ rotate: "180deg" }],
                }}
                imageStyle={{
                  tintColor: "white",
                }}
              />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};
