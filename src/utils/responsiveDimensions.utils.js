import { Dimensions } from 'react-native';

const minScreenWidth = 250;
const maxScreenWidth = 900;

export const getWindowWidth = () => {
    return (Dimensions.get('window').width);
};

export const getWindowHeight = () => {
    return (Dimensions.get('window').height);
};

export const getScreenRatio = () => {
    return (getWindowHeight() / getWindowWidth());
}

export const getResponsiveWidth = (minSize, maxSize) => {
    return (getNewSize(minSize, maxSize));
}

export const getResponsiveHeight = (minSize, maxSize) => {
    return (getNewSize(minSize, maxSize));
}

export const getResponsiveBorderRadius = (minSize, maxSize) => {
    return (getNewSize(minSize, maxSize));
}

export const getResponsiveBorderWidth = (minSize, maxSize) => {
    return (getNewSize(minSize, maxSize));
}

export const getResponsiveTripleDotsWidth = (minSize, maxSize) => {
    return (getNewSize(minSize, maxSize));
}

export const getResponsiveButtonWidth = (minSize, maxSize) => {
    return (getNewSize(minSize, maxSize));
}

export const getResponsiveTextBoxWidth = (minSize, maxSize) => {
    return (getNewSize(minSize, maxSize));
}

export const getResponsiveIconSize = (minSize, maxSize) => {
    return (getNewSize(minSize, maxSize));
}

export const getResponsiveFontSize = (minSize, maxSize) => {
    return (getNewSize(minSize, maxSize));
}

export const getResponsiveOffset = (minSize, maxSize) => {
    return (getNewSize(minSize, maxSize));
}

const getNewSize = (minSize, maxSize) => {
    const scaleFactor = (maxScreenWidth - getScreenWidthForCalculations()) / (maxScreenWidth - minScreenWidth);
    const size = maxSize - scaleFactor * (maxSize - minSize);

    return (size);
}

const getScreenWidthForCalculations = () => {
    let screenWidth = getWindowWidth();

    if (getWindowWidth() < minScreenWidth)
        screenWidth = minScreenWidth;
    else if (getWindowWidth() > maxScreenWidth)
        screenWidth = maxScreenWidth;

    return (screenWidth);
}