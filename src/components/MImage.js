import React from "react";
import { View } from "react-native";
import { Image } from "react-native-elements";

const MImage = (props) => {
  const imageContainerStyle = {
    aspectRatio: 1,
    flex: 1,
    ...props.containerStyle,
  };

  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", ...props.style }}
    >
      <Image
        source={props.source}
        containerStyle={imageContainerStyle}
        onPress={props.onPress}
        resizeMode={props.resizeMode ? props.resizeMode : "contain"}
        style={props.imageStyle}
      />
    </View>
  );
};

export default MImage;
