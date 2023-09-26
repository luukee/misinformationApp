import React, { useEffect, useState } from "react";
import {
  Alert,
  View,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
  FlatList,
  Platform,
  TouchableOpacity,
  PermissionsAndroid
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
import { useIsFocused } from "@react-navigation/native";
import moment from "moment";
import { useTranslation } from "react-i18next";
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';

export default ({ navigation }) => {
  const { colorInfo } = useSelector((state) => state.Theme);

  const isFocused = useIsFocused();
  const { t, i18n } = useTranslation();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const [forceLocation, setForceLocation] = useState(true);
  const [highAccuracy, setHighAccuracy] = useState(true);
  const [locationDialog, setLocationDialog] = useState(true);
  const [significantChanges, setSignificantChanges] = useState(false);
  const [observing, setObserving] = useState(false);
  const [foregroundService, setForegroundService] = useState(false);
  const [useLocationManager, setUseLocationManager] = useState(false);
  const [longitude,setLongitude] = useState("");
  const [latitude,setLatitude] = useState("");
  const [hasLocation, setHaslocation] = useState(false);
  // const [location, setLocation] = useState<GeoPosition | null>(null);

  // const watchId = useRef<number | null>(null);

  useEffect(() => {
    getLocation()
    // getStateAndCity()
    if (isFocused) {
      fetchReports();
    }
  }, [isFocused]);

  const getStateAndCity = () =>{
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + latitude + ',' + longitude + '&key=' + myApiKey)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
})
  }

  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      setHaslocation(true);
      return true;
    }

    if (status === 'denied') {
      setHaslocation(false);
      Alert.alert('Location permission denied', 'Please go to Setting and allow location access to always or while using the App');
    }

    if (status === 'disabled') {
      setHaslocation(false);
      Alert.alert(
        `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
        '',
        [
          { text: 'Go to Settings', onPress: openSetting },
          { text: "Don't Use Location", onPress: () => {} },
        ],
      );
    }

    return false;
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };


  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }
    
    Geolocation.getCurrentPosition(
      position => {
        // setLocation(position);
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      },
      error => {
        // Alert.alert(`Code ${error.code}`, error.message);
        setLatitude("")
        setLongitude("")
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: highAccuracy,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: forceLocation,
        forceLocationManager: useLocationManager,
        showLocationDialog: locationDialog,
      },
    );
  };

  const fetchReports = () => {
    setLoading(true);

    const filters = [
      {
        key: "userID",
        operator: "==",
        value: auth().currentUser.uid,
      },
    ];

    FirebaseHelper.fetchDocumentsFromCollection(
      "reports",
      filters,
      (response) => {
        setLoading(false);

        setReports(response.response.sort(function(first, second) {
          return second._data.createdDate - first._data.createdDate;
         }));
      }
    );
  };

  const onCreateReport = () => {
    Utility.getStringData("ReminderScreen", (response) => {
      if (response === null) {
        navigation.navigate(global.screens.reminder);
      } else {
        navigation.navigate(global.screens.whereTopic);
      }
    });
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
      {/*{AppLoading.renderLoading(loading)}*/}

      <View style={{ width: getWindowWidth() - 50, paddingVertical: 10 }}>
        <MText
          text={t("home:hello")}
          style={{
            color: colorInfo.colors.primary,
            fontWeight: "bold",
            fontSize: 25,
          }}
        />
      </View>

      <TouchableHighlight
        underlayColor={colorInfo.colors.transparent}
        onPress={() => {
          if(hasLocation){
            onCreateReport();
            console.log(longitude,latitude)
          }else{
            Alert.alert('Please share your location and make new reports', 'Please go to Setting and allow location access to always or while using the App');
          }
        }}
      >
        <View
          style={{
            width: getWindowWidth() - 50,
            height: getResponsiveHeight(100, 200),
            backgroundColor: colorInfo.colors.buttonBackground,
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flex: 0.4,
              justifyContent: "center",
              alignItems: "center",
              // paddingLeft:5
            }}
          >
            <MImage
              source={require("../../assets/report.png")}
              style={{
                width: getResponsiveWidth(100, 120),
                height: getResponsiveWidth(100, 120),
              }}
            />
          </View>

          <View style={{ flex: 0.5, alignSelf: "center" }}>
            <View style={{ flexDirection: "row" }}>
              <MText
                text={t("home:report")}
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 22,
                }}
              />

              <MImage
                source={require("../../assets/back.png")}
                style={{
                  width: getResponsiveWidth(20, 30),
                  height: getResponsiveWidth(20, 30),
                  marginLeft: 5,
                  transform: [{ rotate: "180deg" }],
                }}
                imageStyle={{
                  tintColor: "white",
                }}
              />
            </View>

            <MText
              text={t("home:potential")}
              style={{
                color: "white",
                fontSize: 15,
                marginVertical: 2,
              }}
            />

            {/* <MText
                        text={'Misinformation'}
                        style={{
                            color: "white",
                            fontSize: 15
                        }}
                    /> */}
          </View>
        </View>
      </TouchableHighlight>

      <View
        style={{
          width: getWindowWidth() - 50,
          paddingTop: 20,
          paddingBottom: 10,
        }}
      >
        <MText
          text={t("home:history")}
          style={{
            color: colorInfo.colors.primary,
            fontWeight: "bold",
            fontSize: 22,
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          width: getWindowWidth() - 50,
          borderWidth: 0.1,
          borderRadius: 5,
          backgroundColor: colorInfo.colors.secondaryBackgroundColor,
          marginBottom: 10,
          paddingVertical: 20,
        }}
      >
        <FlatList
          data={reports}
          renderItem={({ item, index }) => {
            return (
              <TouchableHighlight
                underlayColor={colorInfo.colors.transparent}
                onPress={() => {
                  navigation.navigate(global.screens.reportDetail, {
                    report: item,
                  });
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: 10,
                    marginBottom: 15,
                  }}
                >
                  <MText
                    text={moment.unix(item._data.createdDate).format("MM/DD")}
                    style={{
                      color: "#000",
                      fontSize: 15,
                      marginRight: 5,
                    }}
                  />

                  <MText
                    text={item._data.title}
                    numberOfLines={1}
                    ellipsizeMode={"tail"}
                    style={{
                      color: "#000",
                      fontSize: 15,
                      width: "100%",
                    }}
                  />
                </View>
              </TouchableHighlight>
            );
          }}
          refreshing={loading}
          onRefresh={() => {
            fetchReports();
          }}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={() => {
            return loading ? null : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MImage
                  source={require("../../assets/noReport.png")}
                  style={{
                    width: getResponsiveWidth(180, 80),
                    height: getResponsiveWidth(180, 80),
                  }}
                />

                <MText
                  text={t("home:noreports")}
                  style={{
                    color: "#808080",
                    fontSize: 13,
                    marginBottom: 20,
                  }}
                />

                <MButton
                  buttonStyle={{ width: getWindowWidth() - 200 }}
                  buttonTextStyle={{ fontSize: 14 }}
                  title={t("home:startReporting")}
                  onPress={() => {
                    if(hasLocation){
                      onCreateReport();
                      console.log(longitude,latitude)
                    }else{
                      Alert.alert('Please share your location and make new reports', 'Please go to Setting and allow location access to always or while using the App');
                    }
                  }}
                />
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};
