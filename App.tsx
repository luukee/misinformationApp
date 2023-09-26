import {Provider as StateProvider} from 'react-redux';

import RootRoute from './src/routes/root.routes';
import store from './src/redux/store';
import './src/constants/IMLocalize';

export default function App() {
  global.screens = {
    login: 'LoginScreen',
    signUp: 'SignupScreen',
    // selectLanguageBeforeSignUp:'SelectLanguageScreen',
    forgotPassword: 'ForgotPassword',
    forgotPasswordSuccess: 'ForgotPasswordSuccess',
    changeEmail: 'ChangeEmail',
    changePassword: 'ChangePassword',
    home: 'HomeScreen',
    reminder: 'Reminder',
    setting: 'SettingScreen',
    talkingAbout: 'TalkingAboutScreen',
    whereTopic: 'WhereTopic',
    seeFrom: 'SeeFromScreen',
    agencySelect: 'AgencySelect',
    reportCreation: 'ReportCreation',
    verificationSent: 'VerificationSentScreen',
    passwordVerificationSent: 'PasswordVerificationSentScreen',
    reportDetail: 'ReportDetail',
    reportSubmittedScreen: 'ReportSubmittedScreen',
  };

  global.routes = {
    authRoute: 'AuthRoute',
    appRoute: 'AppRoute',
    bottomTabRoute: 'BottomTabRoute',
  };

  return (
    <StateProvider store={store}>
      <RootRoute />
    </StateProvider>
  );
}
