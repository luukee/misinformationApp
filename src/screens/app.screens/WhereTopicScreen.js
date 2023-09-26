import React, { useEffect, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableHighlight,
  Alert,
  Keyboard,
  Pressable
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
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
import MIcon from "../../components/MIcon";
import SearchableDropdown from "react-native-searchable-dropdown";
import DropDownPicker from "react-native-dropdown-picker";
import AppLoading from "../../components/AppLoading/AppLoading";
import FirebaseHelper from "../../firebase/FirebaseHelper";
import { t } from "i18next";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";



export default ({ navigation }) => {
  const { colorInfo } = useSelector((state) => state.Theme);

  const isFocused = useIsFocused();

  const [originalStates, setOriginalStates] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  // const [selectedStateID, setSelectedStateID] = useState("");
  // const [openStateDropdown, setOpenStateDropdown] = useState(false);

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  // const [openCityDropdown, setOpenCityDropdown] = useState(false);

  const [loading, setLoading] = useState(false);

  const [selectedItems, setSelectedItems] = useState();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    fetchLocations();
  }, []);



  const fetchLocations = () => {
    setLoading(true);

    FirebaseHelper.fetchAllRecordsOfCollection("locations", (response) => {
      setLoading(false);

      // let tempStates = [];
      // response.response.map((stateData) => {
      //   tempStates.push({
      //     label: stateData.id,
      //     value: stateData.id,
      //   });
      // });

      let json = require("../../../src/constants/States.json");

      let tempStates = [];
      json.map((stateData) => {
        tempStates.push({
          id: stateData.id,
          name: stateData.name,
        });
      });

      // console.log(tempStates)
      // const sorter1 = (a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
      // tempStates.sort(sorter1)
      setStates(tempStates);
      // console.log(states)
      setOriginalStates(response.response);
    });
  };

  const fetchCities = (selectedState) => {
    let tempCities = [];

    // Object.keys(
    //   originalStates.find((state) => state.id === selectedState)._data
    // ).map((city) => {
    //   tempCities.push({
    //     label: city,
    //     value: city,
    //   });
    // });

    let json1 = require("../../../src/constants/Cities.json");
    // console.log(selectedState)
    json1
      .find((state) => state.name == selectedState)
      .cities.map((city) => {
        tempCities.push({
          id: city.id,
          name: city.name,
        });
      });

    // console.log(tempCities)
    // const sorter1 = (a, b) => a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1;
    // tempCities.sort(sorter1)
    if (tempCities.length == 0) {
      tempCities.push({
        id: 1,
        name: selectedState,
      });
    }

    setCities(tempCities);
  };

  const onContinuePress = () => {
    if (!selectedState) {
      Alert.alert(t("whereTopic:Alert"), t("whereTopic:alertState"));
      // alert("Title","Please select any State.")
    } else if (!selectedCity) {
      Alert.alert(t("whereTopic:Alert"), t("whereTopic:alertCity"));
    } else {
      // const allCities = originalStates.find(
      //   (state) => state.id === selectedState
      // )._data;
      // const topicID =
      //   allCities[
      //     Object.keys(
      //       originalStates.find((state) => state.id === selectedState)._data
      //     ).find((city) => city === selectedCity)
      //   ];

      const topicID = "FKSpyOwuX6JoYF1fyv6b";
      console.log(topicID);
      navigation.navigate(global.screens. agencySelect, {
        topicID: topicID,
        selectedState: selectedState,
        selectedCity: selectedCity,
      });
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
          text={t("whereTopic:locate")}
          containerStyle={{ width: "100%" }}
          style={{ fontWeight: "bold", fontSize: 32, textAlign: "left" }}
        />


  <KeyboardAwareScrollView keyboardShouldPersistTaps="always">

        <MText
          text={t("whereTopic:state")}
          style={{
            color: colorInfo.colors.primary,
            fontSize: 18,
            marginTop: 40,
            marginBottom: 10,
          }}
        />

        <SearchableDropdown
          onTextChange={(text) => console.log(text)}
          //On text change listner on the searchable input
          selectedItems={selectedItems}
          onItemSelect={(state) => {
            // alert(JSON.stringify(state));
            setSelectedState(state.name);
            setSelectedItems(state);
            fetchCities(state.name);
            setSelectedCity(null);
            console.log(state.name);
          }}
          //onItemSelect called after the selection from the dropdown
          containerStyle={{ padding: 5 }}
          //suggestion container style
          textInputStyle={{
            //inserted text style
            padding: 12,
            borderWidth: 1,
            borderColor: "#ccc",
            backgroundColor: "#FAF7F6",
          }}
          itemStyle={{
            //single dropdown item style
            padding: 10,
            marginTop: 2,
            backgroundColor: "#FAF9F8",
            borderColor: "#bbb",
            borderWidth: 1,
          }}
          itemTextStyle={{
            //text style of a single dropdown item
            color: "#222",
          }}
          itemsContainerStyle={{
            borderWidth: 0,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,

            margin: 5,
          }}
          items={states}
          //mapping of item array
          // defaultIndex={2}
          //default selected item index
          placeholder={t("whereTopic:selectState")}
          //place holder for the search input
          resetValue={false}
          //reset textInput Value with true and false state
          underlineColorAndroid="transparent"
          //To remove the underline from the android input
          listProps={{
            nestedScrollEnabled: true
        }}
        />
        
        
        {/* <DropDownPicker
          open={openStateDropdown}
          value={selectedState}
          items={states}
          setOpen={(value) => {
            setOpenStateDropdown(value);
          }}
          setValue={(state) => {
            setSelectedState(state);

            fetchCities(state());
          }}
          placeholder={t("whereTopic:selectState")}
          style={{
            borderWidth: 0,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
          dropDownContainerStyle={{
            borderWidth: 0,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
            height: 100,

            margin: 5,
          }}
        /> */}

        <MText
          text={t("whereTopic:city")}
          style={{
            color: colorInfo.colors.primary,
            fontSize: 18,
            marginTop: 120,
            marginBottom: 10,
          }}
        />

        {/* <KeyboardAvoidingView  behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex: 1}}> */}

        <SearchableDropdown
          onTextChange={(text) => console.log(text)}
          //On text change listner on the searchable input
          selectedItems={selectedItems}
          onItemSelect={(city) => {
            setSelectedItems(city);
            setSelectedCity(city.name);
          }}
          //onItemSelect called after the selection from the dropdown
          containerStyle={{ padding: 5 }}
          //suggestion container style
          textInputStyle={{
            //inserted text style
            padding: 12,
            borderWidth: 1,
            borderColor: "#ccc",
            backgroundColor: "#FAF7F6",
          }}
          itemStyle={{
            //single dropdown item style
            padding: 10,
            marginTop: 2,
            backgroundColor: "#FAF9F8",
            borderColor: "#bbb",
            borderWidth: 1,
          }}
          itemTextStyle={{
            //text style of a single dropdown item
            color: "#222",
          }}
          itemsContainerStyle={{
            
            borderWidth: 0,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,

            margin: 5,
            
          }}
          items={cities}
          //mapping of item array
          //defaultIndex={2}
          //default selected item index
          placeholder={t("whereTopic:selectCity")}
          //place holder for the search input
          resetValue={false}
          //reset textInput Value with true and false state
          underlineColorAndroid="transparent"
          //To remove the underline from the android input
          listProps={{
            nestedScrollEnabled: true
          }}
        />
</KeyboardAwareScrollView>
        {/* </TouchableWithoutFeedback>
      </KeyboardAvoidingView> */}

        {/* <DropDownPicker
          open={openCityDropdown}
          value={selectedCity}
          items={cities}
          setOpen={(value) => {
            setOpenCityDropdown(value);
          }}
          setValue={(city) => {
            setSelectedCity(city);
          }}
          placeholder={t("whereTopic:selectCity")}
          style={{
            borderWidth: 0,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
          dropDownContainerStyle={{
            borderWidth: 0,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            height: 200,

            elevation: 5,

            margin: 5,
          }}
        /> */}
  

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
      {/* </TouchableWithoutFeedback> */}
      {/* </KeyboardAwareScrollView> */}
    </SafeAreaView>
  );
};
