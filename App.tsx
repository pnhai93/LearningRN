import "@expo/metro-runtime"
import React from "react"
import * as SplashScreen from "expo-splash-screen"
import App from "./app/app"
import WebApp from "./web/index"
import { Platform } from "react-native"
SplashScreen.preventAutoHideAsync()

function IgniteApp() {
  return <WebApp />

  // if (Platform.OS === "web") {
  //   return <WebApp />
  // } else {
  //   return <App hideSplashScreen={SplashScreen.hideAsync} />
  // }
  // return <App hideSplashScreen={SplashScreen.hideAsync} />
}

export default IgniteApp
