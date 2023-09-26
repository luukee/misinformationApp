This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

# New Project Setup

1. From the [react-native site](https://reactnative.dev/docs/environment-setup?guide=native) I went with the "React Native CLI Quickstart":
- (see screenshot)
2. Install node -
- `brew install node`
3. Install watchman -
- `brew install watchman`
  - `brew reinstall watchman` even if you already have it installed (just to make sure)
4. [Make sure you have Rosetta installed](https://medium.com/bricksnbrackets/how-to-correctly-install-cocoapods-on-m1-m2-6abe3736c221) -
- `softwareupdate --install-rosetta`
5. Cocoapods uninstall whatever you did previously by running -
- `sudo gem uninstall cocoapods`
6. And then -
- `brew install cocoapods`
7. If you previously installed a global react-native-cli package, remove it as it may cause unexpected issues:
- `npm uninstall -g react-native-cli @react-native-community/cli`
8. Generate a new project -
- `npx react-native@latest init AwesomeProject`
9. cd into `AwesomeProject`
10. IMPORTANT: [Install React Native for macOS](https://microsoft.github.io/react-native-windows/docs/rnm-getting-started) - `npx react-native-macos-init`
11. Without using Xcode: In your React Native macOS project directory, run: - `npx react-native run-macos`

#10 is all new specific to macOS, so that might be where we can fix the existing project.

## Source of information

1. [react-native Setting up the development environment (React Native CLI Quickstart)](https://reactnative.dev/docs/environment-setup?guide=native)
- step 1, 2 & 3
2. [How To Correctly Install CocoaPods On Apple Silicon M1 & M2?](https://medium.com/bricksnbrackets/how-to-correctly-install-cocoapods-on-m1-m2-6abe3736c221)
- step 4, 5 & 6
3. [react-native - Creating a new application](https://reactnative.dev/docs/environment-setup?guide=native#creating-a-new-application)
- step 7, 8 & 9
4. [Install React Native for macOS](https://microsoft.github.io/react-native-windows/docs/rnm-getting-started)
- step 10 & 11