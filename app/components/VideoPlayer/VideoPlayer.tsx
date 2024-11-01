import React from "react"
import { StyleSheet, StatusBar } from "react-native"
// import Video, { useVideoPlayer, VideoPlayerStatus, VideoSource, VideoView } from "expo-video"
import { ReplaceType, VideoPlayerManage } from "./VideoPlayerManage"
import { colors, dimensionsHeight, dimensionsWidth } from "app/theme"
import { VideoController } from "./component/VideoController"
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated"
import { ToggleViewManage } from "./component/ToggleView"
import {
  Video,
  ResizeMode,
  AVPlaybackStatus,
  AVPlaybackStatusToSet,
  AVPlaybackTolerance,
  AVPlaybackStatusSuccess,
} from "expo-av"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import * as ScreenOrientation from "expo-screen-orientation"

interface VideoPlayerProps {
  videoSource: string
  duration: number
  onTryPlay: () => void
}

export function VideoPlayer(props: VideoPlayerProps) {
  const { duration, onTryPlay } = props
  console.log("VideoPlayer Render")
  const width = dimensionsWidth

  // Ref
  const videoViewRef = React.useRef<Video>(null)
  const disableSliderProgress = React.useRef(false)
  const disableHideControllerRef = React.useRef(false)

  // Shared value
  const sliderProgress = useSharedValue(0)
  const sliderMin = useSharedValue(0)
  const sliderMax = useSharedValue(duration || 0)
  const videoControllerOpacity = useSharedValue(1)
  // const isFullScreen = useSharedValue(false)
  // const fullScreenAnimated = useSharedValue(1)
  // const videoScale = useSharedValue(1)
  // const videoTransY = useSharedValue(0)
  // const videoRotateZ = useSharedValue(0)
  const videoHeight = useSharedValue(dimensionsWidth * (9 / 16))

  // Hook

  // hook phản ứng với những thay đổi trong giá trị
  useAnimatedReaction(
    () => {
      return sliderProgress.value
    },
    (currentValue, previousValue) => {
      // ...
    },
  )

  React.useEffect(() => {
    VideoPlayerManage.pause = pause
    VideoPlayerManage.play = play
    VideoPlayerManage.replace = replace
    VideoPlayerManage.replay = replay
    VideoPlayerManage.seekBy = seekBy
    VideoPlayerManage.enterFullscreen = enterFullscreen
    VideoPlayerManage.exitFullscreen = exitFullscreen
    VideoPlayerManage.startPictureInPicture = startPictureInPicture
    VideoPlayerManage.stopPictureInPicture = stopPictureInPicture

    return () => {
      VideoPlayerManage.pause = undefined
      VideoPlayerManage.play = undefined
      VideoPlayerManage.replace = undefined
      VideoPlayerManage.replay = undefined
      VideoPlayerManage.seekBy = undefined
      VideoPlayerManage.enterFullscreen = undefined
      VideoPlayerManage.exitFullscreen = undefined
      VideoPlayerManage.startPictureInPicture = undefined
      VideoPlayerManage.stopPictureInPicture = undefined
    }
  }, [])

  // listener
  const onPlaybackStatusUpdate = async (playbackStatus: AVPlaybackStatus) => {
    // console.log("onPlaybackStatusUpdate", playbackStatus)
    if (!playbackStatus.isLoaded) {
      // Update your UI for the unloaded state
      ToggleViewManage.setTogglePlay?.("load")
      if (playbackStatus.error) {
        console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`)
        ToggleViewManage.setTogglePlay?.("error")
        // Send Expo team the error on Slack or the forums so we can help you debug!
      }
    } else {
      // Update your UI for the loaded state

      if (playbackStatus.isPlaying) {
        // Update your UI for the playing state
        ToggleViewManage.setTogglePlay?.("pause")

        runOnJS(hideViewController)()

        const duration = (playbackStatus?.durationMillis || 0) / 1000
        if (sliderMax.value === 0) {
          ToggleViewManage.setDuration?.(duration || 0)
          sliderMax.value = Math.floor(duration)
        }

        const position = playbackStatus.positionMillis / 1000
        ToggleViewManage.setCurrentTime?.(position)
        if (!disableSliderProgress.current) {
          sliderProgress.value = Math.floor(position)
        }
      } else {
        // Update your UI for the paused state
        ToggleViewManage.setTogglePlay?.("play")
        runOnJS(showViewController)()
      }

      if (playbackStatus.isBuffering) {
        // Update your UI for the buffering state
      }

      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        // The player has just finished playing and will stop. Maybe you want to play something else?
        await videoViewRef.current?.stopAsync()
      }
    }
  }

  // func
  const hideViewController = () => {
    if (videoControllerOpacity.value === 0) {
      disableHideControllerRef.current = false
    }
    if (!disableHideControllerRef.current && videoControllerOpacity.value === 1) {
      disableHideControllerRef.current = true
      videoControllerOpacity.value = withDelay(2000, withTiming(0))
    }
  }

  const showViewController = async () => {
    if (videoControllerOpacity.value === 0) {
      videoControllerOpacity.value = withTiming(1, { duration: 200 })
    } else {
      const status = (await videoViewRef.current?.getStatusAsync()) as AVPlaybackStatusSuccess
      if ((status.didJustFinish && !status.isLooping) || !status.isPlaying) return
      videoControllerOpacity.value = withTiming(0, { duration: 200 })
    }
  }

  // action
  const pause = async () => {
    await videoViewRef.current?.pauseAsync()
  }

  const play = async () => {
    await videoViewRef.current?.playAsync()
  }

  const replace = async ({ source, initialStatus, downloadFirst }: ReplaceType) => {
    await videoViewRef.current?.unloadAsync()
    await videoViewRef.current?.loadAsync(
      source,
      { shouldPlay: true, progressUpdateIntervalMillis: 1000, ...initialStatus },
      downloadFirst,
    )
  }

  const replay = async (statusToSet?: AVPlaybackStatusToSet) => {
    const status = (await videoViewRef.current?.getStatusAsync()) as AVPlaybackStatusSuccess
    if (!status?.isLoaded) {
      await onTryPlay()
    } else {
      await videoViewRef.current?.replayAsync(statusToSet)
    }
  }

  const seekBy = async (seconds: number, tolerances?: AVPlaybackTolerance) => {
    const status = (await videoViewRef.current?.getStatusAsync()) as AVPlaybackStatusSuccess
    if (!status?.isLoaded) {
      disableSliderProgress.current = false
    } else {
      await videoViewRef.current?.setPositionAsync(Math.floor(seconds) * 1000, tolerances)
      disableSliderProgress.current = false
    }
  }

  const enterFullscreen = async () => {
    StatusBar.setHidden(true, "fade")
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
    videoHeight.value = withTiming(width, { duration: 300 })
  }

  const exitFullscreen = async () => {
    StatusBar.setHidden(false, "fade")
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
    videoHeight.value = withTiming(width * (9 / 16), { duration: 300 })
  }

  const onFullScreen = async () => {
    const orientationLock = await ScreenOrientation.getOrientationLockAsync()
    console.log("onFullScreen", ScreenOrientation)
    if (orientationLock !== ScreenOrientation.OrientationLock.PORTRAIT_UP) {
      exitFullscreen()
    } else {
      enterFullscreen()
    }
  }

  const startPictureInPicture = () => {
    // const pictrueInPictureSupported = Video.isPictureInPictureSupported()
    // if (pictrueInPictureSupported) {
    //   videoViewRef.current?.startPictureInPicture()
    // }
  }

  const stopPictureInPicture = () => {
    // videoViewRef.current?.stopPictureInPicture()
  }

  const onPauseTapHandler = async () => {
    const status = (await videoViewRef.current?.getStatusAsync()) as AVPlaybackStatusSuccess
    if (status?.isPlaying) {
      pause()
    } else {
      play()
    }
  }

  const onTapSlider = () => {
    console.log("onTapSlider")
  }

  const onSlidingStart = () => {
    console.log("onSlidingStart")
    disableSliderProgress.current = true
  }

  // Gesture

  const defaultPanGesture = Gesture.Pan()
    .onStart(({ velocityY, velocityX }) => {
      // panIsVertical.value = Math.abs(velocityY) > Math.abs(velocityX)
    })
    .onUpdate(({ translationY }) => {
      // controlViewOpacity.value = withTiming(0, { duration: 100 })
      // if (isFullScreen.value) {
      //   if (translationY > 0 && Math.abs(translationY) < 100) {
      //     videoScale.value = clamp(0.9, 1 - Math.abs(translationY) * 0.008, 1)
      //     videoTransY.value = translationY
      //   }
      // } else {
      //   if (translationY < 0 && Math.abs(translationY) < 40) {
      //     videoScale.value = Math.abs(translationY) * 0.012 + 1
      //   }
      // }
    })
    .onEnd(({ translationY }, success) => {
      // if (!panIsVertical.value && !success) {
      //   return
      // }
      // if (isFullScreen.value) {
      //   if (translationY >= 100) {
      //     runOnJS(exitFullScreen)()
      //   }
      // } else {
      //   if (-translationY >= 40) {
      //     runOnJS(enterFullScreen)()
      //   }
      // }
      // videoTransY.value = 0
      // videoScale.value = withTiming(1)
    })

  const singleTapHandler = Gesture.Tap().onEnd((_event, success) => {
    if (success) {
      runOnJS(showViewController)()

      // if (controlViewOpacity.value === 0) {
      //   controlViewOpacity.value = withTiming(1, controlAnimteConfig)
      //   setControlTimeout()
      // } else {
      //   controlViewOpacity.value = withTiming(0, controlAnimteConfig)
      // }
    }
  })

  const doubleTapHandle = Gesture.Tap()
    .numberOfTaps(2)
    // .maxDuration(doubleTapInterval)
    .onStart(({ x }) => {
      // doubleTapIsAlive.value = x < leftDoubleTapBoundary && x > rightDoubleTapBoundary
    })
    .onEnd(({ x, y, numberOfPointers }, success) => {
      // if (success) {
      //   if (numberOfPointers !== 1) {
      //     return
      //   }
      //   if (x < leftDoubleTapBoundary) {
      //     doubleLeftOpacity.value = 1
      //     rippleLeft.current?.onPress({ x, y })
      //     runOnJS(seekByStep)(true)
      //     return
      //   }
      //   if (x > rightDoubleTapBoundary) {
      //     doubleRightOpacity.value = 1
      //     rippleRight.current?.onPress({
      //       x: x - rightDoubleTapBoundary,
      //       y,
      //     })
      //     runOnJS(seekByStep)(false)
      //   }
      // }
    })

  const taps = Gesture.Exclusive(doubleTapHandle, singleTapHandler)

  const onPanGesture = defaultPanGesture

  const gesture = Gesture.Race(onPanGesture, taps)

  // animateStyle
  const defaultVideoStyle = useAnimatedStyle(() => {
    return {
      // transform: [
      //   {
      //     scale: videoScale.value,
      //   },
      //   {
      //     translateY: videoTransY.value,
      //   },
      //   { rotate: `${videoRotateZ.value}deg` },
      // ],
      height: videoHeight.value,
    }
  }, [])

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, defaultVideoStyle]}>
        <Video
          ref={videoViewRef}
          style={styles.video}
          resizeMode={ResizeMode.CONTAIN}
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        />
        <VideoController
          videoControllerOpacity={videoControllerOpacity}
          sliderProgress={sliderProgress}
          sliderMax={sliderMax}
          sliderMin={sliderMin}
          onPauseTapHandler={onPauseTapHandler}
          onSlidingComplete={seekBy}
          onTapSlider={onTapSlider}
          onSlidingStart={onSlidingStart}
          onReplay={replay}
          onFullScreen={onFullScreen}
        />
      </Animated.View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.palette.neutral900,
  },
  video: {
    aspectRatio: 16 / 9,
    width: "100%",
  },
})
