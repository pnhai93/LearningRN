import React from "react"
import { StyleProp, ViewStyle, StyleSheet, View } from "react-native"
// import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, {
  cancelAnimation,
  runOnJS,
  SharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated"
// import { clamp } from "react-native-awesome-slider/src/utils"
import { ToggleFullScreen, ToggleNext, TogglePlay, TogglePrevious } from "./ToggleView"
import { colors, dimensionsWidth, scale } from "app/theme"
import { DurationTime } from "./DurationTime"
import { Slider } from "react-native-awesome-slider"
import { secondToTime } from "../VideoPlayerUtils"
// import { VideoPlaying } from "./video-playing"
// import { VideoLoader } from "./video-loader"
// import { TapControler } from "./tap-controler"
// import { DurationTime } from "./duration-timer"
// import { TogglePlay, ToggleFullScreen } from "./toggle-view"
// import { AwesomeSliderProps, Slider, SliderThemeType } from "react-native-awesome-slider"

type VideoControlProps = {
  videoControllerOpacity: SharedValue<number>
  fullScreenAnimated: SharedValue<number>
  sliderProgress: SharedValue<number>
  sliderMin: SharedValue<number>
  sliderMax: SharedValue<number>
  sliderThumbScale: SharedValue<number>
  onSlidingComplete: (val: number) => void
  onSlidingStart: () => void
  onTapSlider: () => void
  onPauseTapHandler: () => void
  onPrevious: () => void
  onNext: () => void
  onReplay: () => void
  onFullScreen: () => void
}

export const VideoController: React.FC<VideoControlProps> = ({
  videoControllerOpacity,
  fullScreenAnimated,
  sliderProgress,
  sliderMin,
  sliderMax,
  sliderThumbScale,
  onSlidingComplete,
  onSlidingStart,
  onTapSlider,
  onPauseTapHandler,
  onPrevious,
  onNext,
  onReplay,
  onFullScreen,
}) => {
  // console.log("fullScreenAnimated.value", fullScreenAnimated.value)
  const controlViewStyles = useAnimatedStyle(() => {
    return {
      // left: videoControllerOpacity.value === 1 ? 0 : dimensionsWidth,
      opacity: videoControllerOpacity.value,
    }
  })
  const sliderViewStyles = useAnimatedStyle(() => {
    return {
      // bottom: fullScreenAnimated.value < 1 ? 40 : 0,
      bottom: 7,
    }
  })
  return (
    <Animated.View style={[styles.controlView, controlViewStyles]}>
      <View style={styles.pauseView}>
        <TogglePlay
          onReplay={onReplay}
          onPrevious={onPrevious}
          onPauseTapHandler={onPauseTapHandler}
          onNext={onNext}
          style={styles.togglePlay}
        />
      </View>

      <Animated.View style={[styles.bottomControlGroup, styles.row, sliderViewStyles]}>
        <DurationTime />
        <ToggleFullScreen onFullScreen={onFullScreen} />
      </Animated.View>
      <Slider
        style={[styles.slider, sliderViewStyles]}
        theme={{
          minimumTrackTintColor: colors.opacity.Main(1),
          maximumTrackTintColor: colors.opacity.B(0.6),
          cacheTrackTintColor: colors.opacity.G1(1),
          bubbleBackgroundColor: colors.opacity.B(0.8),
          disableMinTrackTintColor: colors.opacity.Main(1),
        }}
        progress={sliderProgress}
        minimumValue={sliderMin}
        maximumValue={sliderMax}
        onSlidingComplete={onSlidingComplete}
        onSlidingStart={onSlidingStart}
        // isScrubbing={isScrubbing}
        bubble={secondToTime}
        // disableTapEvent
        onTap={onTapSlider}
        thumbScaleValue={sliderThumbScale}
        thumbWidth={14}
        sliderHeight={2}
        // {...sliderProps}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  bottomControlGroup: {
    justifyContent: "space-between",
    paddingBottom: 8,
    paddingHorizontal: scale(12),
    position: "absolute",
    width: "100%",
    // backgroundColor: "red",
  },
  controlView: {
    backgroundColor: colors.opacity.B(0.6),
    bottom: 0,
    justifyContent: "center",
    left: 0,
    // overflow: "hidden",
    position: "absolute",
    right: 0,
    top: 0,
  },
  pauseView: {
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  slider: {
    alignSelf: "center",
    bottom: 0,
    position: "absolute",
    width: "90%",
  },
  togglePlay: {
    marginHorizontal: scale(20),
  },
})
