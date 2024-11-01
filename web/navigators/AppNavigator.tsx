/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { DarkTheme, NavigationContainer } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import React from "react"
import * as Screens from "../screens"
import Config from "../../app/config"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { MovieItemExtend } from "../../app/common/theMovieDB"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

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
  AddVideo: { item: MovieItemExtend }
  SearchMovie: undefined
  MovieDetail: { item: MovieItemExtend }
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
// const Stack = createNativeStackNavigator<AppStackParamList>()
const Drawer = createDrawerNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  return (
    <Drawer.Navigator
      initialRouteName="SearchMovie"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="SearchMovie" component={Screens.SearchMovie} />
      <Drawer.Screen name="MovieDetail" component={Screens.MovieDetail} />
      <Drawer.Screen name="AddVideo" component={Screens.AddVideo} />
    </Drawer.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  // const colorScheme = useColorScheme()

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
