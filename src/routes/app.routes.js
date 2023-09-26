import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabRoute from './tab.routes';
import TalkingAboutScreen from "../screens/app.screens/TalkingAboutScreen";
import SeeFromScreen from "../screens/app.screens/SeeFromScreen";
import AgencySelect from '../screens/app.screens/AgencySelect';
import VerificationSentScreen from "../screens/app.screens/VerificationSentScreen";
import ChangeEmailScreen from "../screens/app.screens/ChangeEmailScreen";
import ChangePasswordScreen from "../screens/app.screens/ChangePasswordScreen";
import PasswordVerificationSentScreen from "../screens/app.screens/PasswordVerificationSentScreen";
import LoginScreen from "../screens/auth.screens/LoginScreen";
import SignupScreen from "../screens/auth.screens/SignupScreen";
import ForgotPasswordScreen from "../screens/auth.screens/ForgotPasswordScreen";
import ReportSubmittedScreen from "../screens/app.screens/ReportSubmittedScreen";
import ForgotPasswordSuccessScreen from "../screens/auth.screens/ForgotPasswordSuccessScreen";
import ReminderScreen from "../screens/app.screens/ReminderScreen";
import WhereTopicScreen from "../screens/app.screens/WhereTopicScreen";
import ReportCreationScreen from "../screens/app.screens/ReportCreationScreen";
import CommonDataManager from "../firebase/Singleton";
import ReportDetailScreen from "../screens/app.screens/ReportDetailScreen";
// import SelectLanguageScreen from "../screens/app.screens/SelectLanguageScreen"

const AppStack = createStackNavigator();

function AppRoute() {

    return (
        <AppStack.Navigator
            name={global.routes.appRoute}
            initialRouteName={CommonDataManager.getInstance().getUser() ? global.routes.bottomTabRoute : global.screens.login}
            screenOptions={{
                headerShown: false
            }}
        >
            <AppStack.Screen name={global.screens.login} component={LoginScreen} />
            <AppStack.Screen name={global.screens.signUp} component={SignupScreen} />
            <AppStack.Screen name={global.screens.forgotPassword} component={ForgotPasswordScreen} />
            <AppStack.Screen name={global.screens.forgotPasswordSuccess} component={ForgotPasswordSuccessScreen} />

            {/* <AppStack.Screen name={global.screens.selectLanguageBeforeSignUp} component={SelectLanguageScreen} /> */}
            <AppStack.Screen name={global.routes.bottomTabRoute} component={BottomTabRoute} />
            <AppStack.Screen name={global.screens.talkingAbout} component={TalkingAboutScreen} />
            <AppStack.Screen name={global.screens.seeFrom} component={SeeFromScreen} />
            <AppStack.Screen name={global.screens.agencySelect} component={AgencySelect} />
            <AppStack.Screen name={global.screens.changeEmail} component={ChangeEmailScreen} />
            <AppStack.Screen name={global.screens.changePassword} component={ChangePasswordScreen} />
            <AppStack.Screen name={global.screens.verificationSent} component={VerificationSentScreen} />
            <AppStack.Screen name={global.screens.passwordVerificationSent} component={PasswordVerificationSentScreen} />
            <AppStack.Screen name={global.screens.reportSubmittedScreen} component={ReportSubmittedScreen} />
            <AppStack.Screen name={global.screens.reminder} component={ReminderScreen} />
            <AppStack.Screen name={global.screens.whereTopic} component={WhereTopicScreen} />
            <AppStack.Screen name={global.screens.reportCreation} component={ReportCreationScreen} />
            <AppStack.Screen name={global.screens.reportDetail} component={ReportDetailScreen} />
        </AppStack.Navigator>
    );
}

export default AppRoute;
