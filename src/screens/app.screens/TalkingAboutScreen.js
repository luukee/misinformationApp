import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
  FlatList,
  Alert
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
import FirebaseHelper from "../../firebase/FirebaseHelper";
import AppLoading from "../../components/AppLoading/AppLoading";
import { useTranslation } from "react-i18next";


export default ({ navigation, route }) => {
  const { colorInfo } = useSelector((state) => state.Theme);
  const { t, i18n } = useTranslation();

  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [customTopic, setCustomTopic] = useState(null);
  

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = () => {
    setLoading(true);

    FirebaseHelper.fetchARecordFromCollection(
      "tags",
      route.params.topicID,
      (response) => {
        setLoading(false);
        const topic = response.response._data.Topic.active
        const other = "*Other/Otro"
        const rest = topic.slice(1)
        rest.sort()
        rest.push(other)
        setTopics(rest);
      }
    );
  };

  const onContinuePress = () => {
    if (!selectedTopic) {
      Alert.alert(t("talkingAbout:Alert"),t("talkingAbout:topic"))
    } else {
      navigation.navigate(global.screens.seeFrom, {
        selectedState: route.params.selectedState,
        selectedCity: route.params.selectedCity,
        selectedTopic: selectedTopic,
        topicID: route.params.topicID,
        agency: route.params.agency,
        customTopic: customTopic
      });
    }
  };

  const checkOtherOptionSelected = (item) => {
    if (item !== "*Other/Otro") {
      setSelectedTopic(item);
      setCustomTopic(null);
    } else {
      Alert.prompt(
        t("talkingAbout:providetopic"),
        t("talkingAbout:whatabout"),
        [
          {
            text: t("talkingAbout:cancel"),
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: t("talkingAbout:ok"),
            onPress: text => {setSelectedTopic(item); setCustomTopic(text);}
          }
        ],
        "plain-text"
      );
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colorInfo.colors.backgroundColor }}
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
          text={t("talkingAbout:whatabout")}
          // containerStyle = {{width:'100%', paddingHorizontal:30}}
          style={{
            fontWeight: "bold",
            fontSize: 32,
            marginBottom: 20,
            textAlign: "left",
          }}
        />

        <FlatList
          data={topics}
          style={{ height: getWindowHeight() / 2 }}
          renderItem={({ item, index }) => {
            return (
              <MButton
                buttonStyle={{
                  width: getWindowWidth() - 100,
                  backgroundColor:
                    item === selectedTopic ? colorInfo.colors.primary : "gray",
                  marginVertical: 10,
                }}
                buttonTextStyle={{ fontSize: 14 }}
                title={item}
                onPress={() => checkOtherOptionSelected(item)}
              />
            );
          }}
        />

<MText
          text={t("talkingAbout:topicabout") + (customTopic === null ? selectedTopic === null ? t("talkingAbout:notselected") : selectedTopic : customTopic)}
          // containerStyle = {{width:'100%', paddingHorizontal:30}}
          style={{
            // fontWeight: "bold",
            fontSize: 15,
            // marginBottom: 20,
            textAlign: "center",
          }}
        />

<MText
          text={t("talkingAbout:noother") }
          // containerStyle = {{width:'100%', paddingHorizontal:30}}
          style={{
            // fontWeight: "bold",
            fontSize: 15,
            // marginBottom: 20,
            textAlign: "center",
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
