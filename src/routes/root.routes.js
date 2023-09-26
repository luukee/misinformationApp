import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import AuthRoute from "./auth.routes";
import AppRoute from "./app.routes";
import { View } from "react-native";
import { getResponsiveWidth } from "../utils/responsiveDimensions.utils";
import MImage from "../components/MImage";
import UtilityMethods from "../utils/UtilityMethods";
import CommonDataManager from "../firebase/Singleton";

function RootRoute() {
  const { isLoggedIn } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();

  const [isFetchingAuth, setIsFetchingAuth] = useState(true);

  useEffect(() => {
    //fetch User

    setTimeout(() => {
      UtilityMethods.getObjectData("USER", (response) => {
        if (response !== null) {
          if (response !== "false") {
            CommonDataManager.getInstance().setUser(response);

            setIsFetchingAuth(false);
          } else {
            setIsFetchingAuth(false);
          }
        } else {
          setIsFetchingAuth(false);
        }
      });
    }, 2000);
  }, []);

  return (
    <NavigationContainer>
      {!isFetchingAuth && <AppRoute />}

      {isFetchingAuth && (
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MImage
            source={require("../assets/Logo.png")}
            style={{
              width: getResponsiveWidth(150, 250),
              height: getResponsiveWidth(150, 250),
            }}
          />
        </View>
      )}
    </NavigationContainer>
  );
}

export default RootRoute;
