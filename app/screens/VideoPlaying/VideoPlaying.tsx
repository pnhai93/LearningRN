// import { VideoPlayer } from "app/components"
import { VideoPlayer, Screen } from "app/components"
import { VideoPlayerManage } from "app/components/VideoPlayer/VideoPlayerManage"
import { AppStackScreenProps } from "app/navigators"
import React from "react"
import { View, StyleSheet } from "react-native"
interface VideoPlayingProps extends AppStackScreenProps<"VideoPlaying"> {}

export function VideoPlaying(props: VideoPlayingProps) {
  const videoSource = "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"

  const rePlay = () => {
    VideoPlayerManage.replace?.({
      source: {
        uri: videoSource,
      },
    })
  }

  React.useEffect(() => {
    rePlay()
  }, [])

  return (
    <Screen safeAreaEdges={["bottom", "top"]}>
      <VideoPlayer onTryPlay={rePlay} videoSource={videoSource} duration={0} />
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
