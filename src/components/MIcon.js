import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const MIcon = (props) => {
  const iconStyle = {
    alignItems: "center",
    ...props.iconStyle,
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Icon.Button
        name={props.name}
        size={props.size ? props.size : 20}
        backgroundColor={props.backgroundColor}
        borderRadius={props.borderRadius ? props.borderRadius : 5}
        onPress={props.onPress}
        iconStyle={iconStyle}
      >
        {props.text && (
          <Text style={{ fontFamily: "Arial", fontSize: 15 }}>
            {props.text}
          </Text>
        )}
      </Icon.Button>
    </View>
  );
};

export default MIcon;
