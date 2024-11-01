/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme } from "react-native"
import * as Screens from "app/screens"
import Config from "../config"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { colors } from "app/theme"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { MovieItemExtend } from "app/common/theMovieDB"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: undefined
  // 🔥 Your screens go here
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
  Login: undefined
  Register: undefined
  Profile: undefined
  Home: undefined
  VideoPlaying: undefined
  SearchMovie: undefined
  MovieDetail: { item: MovieItemExtend }
  AddVideo: { item: MovieItemExtend }
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
        presentation: "transparentModal", // fix nền trắng nhấp nháy khi chuyển màn
        contentStyle: { backgroundColor: colors.palette.accent100 },
      }}
    >
      <Stack.Screen name="Login" component={Screens.Login} />
      <Stack.Screen name="Register" component={Screens.Register} />
      <Stack.Screen name="Profile" component={Screens.Profile} />
      <Stack.Screen name="Home" component={Screens.Home} />
      <Stack.Screen name="VideoPlaying" component={Screens.VideoPlaying} />
      <Stack.Screen name="SearchMovie" component={Screens.SearchMovie} />
      <Stack.Screen name="MovieDetail" component={Screens.MovieDetail} />
      <Stack.Screen name="AddVideo" component={Screens.AddVideo} />
      {/* <Stack.Screen name="Welcome" component={Screens.WelcomeScreen} /> */}
      {/** 🔥 Your screens go here */}
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      // theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      theme={DarkTheme}
      {...props}
    >
      <GestureHandlerRootView>
        <AppStack />
      </GestureHandlerRootView>
    </NavigationContainer>
  )
})
