import React, { useState } from "react";
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import ImagePicker from "react-native-image-crop-picker";
import FirebaseHelper from "../../firebase/FirebaseHelper";
import moment from "moment";
import { CommonActions } from "@react-navigation/native";
import AppLoading from "../../components/AppLoading/AppLoading";
import auth from "@react-native-firebase/auth";
import { useTranslation } from "react-i18next";

export default ({ navigation, route }) => {
  const { colorInfo } = useSelector((state) => state.Theme);
  const { t, i18n } = useTranslation();
  const [briefInformation, setBriefInformation] = useState("");
  const [link, setLink] = useState("");
  const [link1, setLink1] = useState("");
  const [images, setImages] = useState([]);
  const [detailDescription, setDetailDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const onSubmitPress = () => {
    if (!briefInformation) {
      Alert.alert(t("reportCreation:alertTitle"),t("reportCreation:titleRequired"))
    } else if (images.length === 0 && !detailDescription && !link) {
      Alert.alert(t("reportCreation:alertTitle"),t("reportCreation:atLeast"))
    } else {
      //Upload if any images

      if (images.length > 0) {
        setLoading(true);
        uploadImages(images, 0, [], (uploadedImages) => {
          createReport(uploadedImages, (response) => {
            setLoading(false);
            //On Success
            onSuccess(response);
          });
        });
      } else {
        setLoading(true);

        createReport([], (response) => {
          setLoading(false);
          //On Success
          onSuccess(response);
        });
      }
    }
  };

  const uploadImages = (images, index, uploadedImages, callback) => {
    if (index === images.length) {
      callback(uploadedImages);
    } else {
      FirebaseHelper.uploadImage(
        images[index].path,
        "report_" + new Date().getTime().toString(),
        (response) => {
          uploadedImages.push(response.response);

          uploadImages(images, index + 1, uploadedImages, callback);
        }
      );
    }
  };

  const createReport = (uploadedImages, callback) => {
    const data = {
      userID: auth().currentUser.uid,
      state: route.params.selectedState,
      city: route.params.selectedCity,
      topic: route.params.selectedTopic,
      hearFrom: route.params.hearFrom,
      customSource: route.params.customSource,
      agency:route.params.agency,
      title: briefInformation,
      link: link,
      secondLink: link1,
      images: uploadedImages,
      detail: detailDescription,
      createdDate: moment().toDate(),
      isApproved: true,
      read: false
    };

    FirebaseHelper.createNewDocumentForCollection(
      "reports",
      data,
      (response) => {
        callback(response);
      }
    );
  };

  const onSuccess = (response) => {
    navigation.navigate(global.screens.reportSubmittedScreen, {
      reportID: response.response.id,
    });

    // Alert.alert("Report", "Your report is successfully submitted.", [
    //     {
    //         text: "Continue",
    //         onPress: () => {
    //             navigation.dispatch(
    //                 CommonActions.reset({
    //                     routes: [
    //                         {
    //                             name: global.routes.bottomTabRoute,
    //                         },
    //                     ],
    //                 })
    //             );
    //         }
    //     },
    // ]);
  };

  const removeImage = (item) => {
    setImages((images) => {
      return [...images.filter((image) => image.path !== item.path)];
    });
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
        enableOnAndroid={true} 
      >
        <View style={{ flex: 1, width: "90%", alignSelf: "center" }}>
          <MText
            text={t("reportCreation:share")}
            // containerStyle = {{width:'100%', paddingHorizontal:30}}
            style={{
              fontWeight: "bold",
              fontSize: 32,
              textAlign: "left",
            }}
          />

          <MText
            text={t("reportCreation:title")}
            style={{
              color: colorInfo.colors.primary,
              fontSize: 18,
              marginTop: 40,
              marginBottom: 10,
            }}
          />

          <MText
            text={t("reportCreation:titleDescription")}
            style={{
              color: "#37383C",
              fontSize: 15,
            }}
          />

          <MText
            text={t("reportCreation:max")}
            style={{
              color: "#37383C",
              fontSize: 15,
              marginBottom: 10,
            }}
          />

          <MTextInput
            inputContainerStyle={{ width: "100%", height: 100 }}
            multiline
            numberOfLines={10}
            maxLength={160}
            style={{
              textAlignVertical: "top",
            }}
            onChangeText={(briefInformation) =>
              setBriefInformation(briefInformation)
            }
            value={briefInformation}
            placeholder={t("reportCreation:briefly")}
          />

          <MText
            text={t("reportCreation:detail")}
            style={{
              color: colorInfo.colors.primary,
              fontSize: 18,
              marginBottom: 10,
            }}
          />

          <MText
            text={t("reportCreation:detailDescription")}
            style={{
              color: "#37383C",
              fontSize: 15,
            }}
          />

          <MText
            text={t("reportCreation:link")}
            style={{
              color: colorInfo.colors.primary,
              fontSize: 16,
              marginTop: 20,
              marginBottom: 10,
            }}
          />

          <MTextInput
            inputContainerStyle={{ width: "100%" }}
            onChangeText={(link) => setLink(link)}
            value={link}
            placeholder={"https://"}
          />

          <MTextInput
            inputContainerStyle={{ width: "100%" }}
            onChangeText={(link1) => setLink1(link1)}
            value={link1}
            placeholder={"https://"}
          />
          <MText
            text={t("reportCreation:image")}
            style={{
              color: colorInfo.colors.primary,
              fontSize: 16,
              marginTop: 20,
              marginBottom: 10,
            }}
          />

          <MText
            text={t("reportCreation:imageDescription")}
            style={{
              color: "#37383C",
              fontSize: 15,
              marginBottom: 10,
            }}
          />

        

          <FlatList
            numColumns={3}
            data={images}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    width: "30%",
                    margin: 5,
                  }}
                >
                  <MImage
                    source={{ uri: item.path }}
                    style={{
                      width: "100%",
                      height: 100,
                    }}
                    resizeMode={"cover"}
                  />
                  <TouchableHighlight
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      padding: 10,
                      backgroundColor: colorInfo.colors.primary,
                      borderRadius: 20,
                    }}
                    underlayColor={colorInfo.colors.transparent}
                    onPress={() => {
                      //Remove Image Functionality

                      removeImage(item);
                    }}
                  >
                    <MImage
                      source={require("../../assets/cross.png")}
                      style={{
                        width: getResponsiveWidth(10, 10),
                        height: getResponsiveWidth(10, 10),
                      }}
                      imageStyle={{
                        tintColor: "white",
                      }}
                    />
                  </TouchableHighlight>
                </View>
              );
            }}
          />

          <View style={{ alignItems: "flex-start" }}>
            <MButton
              buttonStyle={{ width: 200 }}
              buttonTextStyle={{ fontSize: 14 }}
              title={t("reportCreation:uploadImage")}
              onPress={() => {
                ImagePicker.openPicker({
                  multiple: true,
                }).then((pickedImages) => {
                  //Add Check of max 6 images

                  if (pickedImages.length + images.length > 6) {
                    alert("Maximum 6 images can be uploaded");
                  } else {
                    setImages([...images, ...pickedImages]);
                  }
                });
              }}
            />
          </View>
              
          <MText
            text={t("reportCreation:detailed")}
            style={{
              color: colorInfo.colors.primary,
              fontSize: 16,
              marginTop: 20,
              marginBottom: 10,
            }}
          />
 
          <MText
            text={t("reportCreation:detailedDescription")}
            style={{
              color: "#37383C",
              fontSize: 15,
              marginBottom: 10,
            }}
          />

          <MTextInput
            inputContainerStyle={{ width: "100%", height: 200 }}
            style={{
              textAlignVertical: "top",
            }}
            multiline
            numberOfLines={10}
            maxLength={1000}
            onChangeText={(detailDescription) =>
              setDetailDescription(detailDescription)
            }
            value={detailDescription}
            placeholder={t("reportCreation:describe")}
          />
          <MButton
            buttonStyle={{ width: getWindowWidth() - 50, marginBottom: 20 }}
            buttonTextStyle={{ fontSize: 14 }}
            title={t("reportCreation:submit")}
            onPress={() => {
              onSubmitPress();
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
