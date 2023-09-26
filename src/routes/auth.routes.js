import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/auth.screens/LoginScreen';
import SignupScreen from '../screens/auth.screens/SignupScreen';
import ForgotPasswordScreen from '../screens/auth.screens/ForgotPasswordScreen';
import ForgotPasswordSuccessScreen from "../screens/auth.screens/ForgotPasswordSuccessScreen";

const AuthStack = createStackNavigator();

function AuthRoute() {
    return (
        <AuthStack.Navigator
            name={global.routes.authRoute}
            initialRouteName={global.screens.login}
            screenOptions={{
                headerShown: false
            }}>
            <AuthStack.Screen name={global.screens.login} component={LoginScreen} />
            <AuthStack.Screen name={global.screens.signUp} component={SignupScreen} />
            <AuthStack.Screen name={global.screens.forgotPassword} component={ForgotPasswordScreen} />
            <AuthStack.Screen name={global.screens.forgotPasswordSuccess} component={ForgotPasswordSuccessScreen} />
        </AuthStack.Navigator>
    );
}

export default AuthRoute;
