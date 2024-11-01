// import { VideoPlayer } from "app/components"
import { Screen } from "app/components"
import { VideoPlayerManage } from "app/components/VideoPlayer/VideoPlayerManage"
import { AppStackScreenProps } from "app/navigators"
import { colors } from "app/theme"
import React from "react"
import { View, StyleSheet } from "react-native"
import { MoviePageView } from "./components/MoviePageView"
// interface VideoPlayingProps extends AppStackScreenProps<"VideoPlaying"> {}
import { Image } from "expo-image"
import { blurHash } from "app/common"

export function Home() {
  const image = "https://image.tmdb.org/t/p/original/Asg2UUwipAdE87MxtJy7SQo08XI.jpg"
  return (
    <Screen
      backgroundColor={colors.palette.neutral900}
      statusBarStyle="light"
      safeAreaEdges={["bottom", "top"]}
      style={styles.container}
    >
      <MoviePageView />
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {},
})
