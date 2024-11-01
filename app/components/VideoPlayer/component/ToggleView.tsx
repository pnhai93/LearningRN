import React from "react"
import { StyleProp, ActivityIndicator, StyleSheet, View, ViewStyle } from "react-native"
// import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated"
// import { clamp } from "react-native-awesome-slider/src/utils"
// import { palette } from "../theme/palette"
// import { dimensionsWidth, scale, verticalScale } from "theme"
// import { VideoPlaying } from "./video-playing"
// import { VideoLoader } from "./video-loader"
// import { DurationTime } from "./duration-timer"
import { TapController } from "app/components/Button/TapController"
import { Icon } from "app/components/Icon"
import { colors, scale } from "app/theme"

// const AnimatedLottieView = Animated.createAnimatedComponent(LottieView)

// Type
export interface ToggleViewManageType {
  setTogglePlay?: (state: TogglePlayState) => void
  setFullScreen?: (fullScreen: boolean) => void
  setPrevious?: (disable: boolean) => void
  setNext?: (disable: boolean) => void
  setDuration?: (duration: number) => void
  setCurrentTime?: (duration: number) => void
}

// Manage
export const ToggleViewManage: ToggleViewManageType = {
  setTogglePlay: undefined,
  setFullScreen: undefined,
  setPrevious: undefined,
  setNext: undefined,
  setDuration: undefined,
  setCurrentTime: undefined,
}

// toggle play and pause
type TogglePlayState = "load" | "play" | "pause" | "error"
type TogglePlayProps = {
  style?: ViewStyle
  onPauseTapHandler: () => void
  onPrevious: () => void
  onNext: () => void
  onReplay: () => void
}

export const TogglePlay: React.FC<TogglePlayProps> = ({
  style,
  onPauseTapHandler,
  onPrevious,
  onNext,
  onReplay,
}) => {
  const [state, setState] = React.useState<TogglePlayState>("load")

  React.useEffect(() => {
    ToggleViewManage.setTogglePlay = setTogglePlay
    return () => {
      ToggleViewManage.setTogglePlay = undefined
    }
  }, [])

  const setTogglePlay = React.useCallback((state: TogglePlayState) => {
    setState(state)
  }, [])

  if (state === "load")
    return <ActivityIndicator size={scale(48)} color={colors.palette.neutral100} />

  if (state === "error")
    return (
      <TapController onPress={onReplay} style={[styles.togglePlay, style]}>
        <Icon icon={"replay"} size={scale(48)} style={styles.iconColor} />
      </TapController>
    )

  return (
    <>
      {/* <TogglePrevious onPrevious={onPrevious} /> */}
      <TapController onPress={onPauseTapHandler} style={[styles.togglePlay, style]}>
        <Icon icon={state} size={scale(48)} style={styles.iconColor} />
      </TapController>
      {/* <ToggleNext onNext={onNext} /> */}
    </>
  )
}

// toggle full screen
type ToggleFullScreenProps = {
  style?: ViewStyle
  onFullScreen: () => void
}

export const ToggleFullScreen: React.FC<ToggleFullScreenProps> = ({ style, onFullScreen }) => {
  const [isFullScreen, setIsFullScreen] = React.useState<boolean>(false)

  React.useEffect(() => {
    ToggleViewManage.setFullScreen = setFullScreen
    return () => {
      ToggleViewManage.setFullScreen = undefined
    }
  }, [])

  const setFullScreen = React.useCallback((fullScreen: boolean) => {
    setIsFullScreen(fullScreen)
  }, [])

  return (
    <TapController onPress={onFullScreen} style={[styles.fullScreen, style]}>
      <Icon
        icon={isFullScreen ? "full_screen_off" : "full_screen_on"}
        size={scale(16)}
        style={styles.iconColor}
      />
    </TapController>
  )
}

// toggle previous
type TogglePreviousProps = {
  style?: ViewStyle
  onPrevious: () => void
}

export const TogglePrevious: React.FC<TogglePreviousProps> = ({ style, onPrevious }) => {
  const [disablePrevious, setDisablePrevious] = React.useState<boolean>(false)

  React.useEffect(() => {
    ToggleViewManage.setPrevious = setPrevious
    return () => {
      ToggleViewManage.setPrevious = undefined
    }
  }, [])

  const setPrevious = React.useCallback((disable: boolean) => {
    if (disable !== disablePrevious) {
      setDisablePrevious(disable)
    }
  }, [])

  return (
    <TapController onPress={onPrevious} style={[styles.fullScreen, style]}>
      <Icon
        icon={"previous"}
        size={scale(32)}
        style={disablePrevious ? styles.disableIcon : styles.iconColor}
      />
    </TapController>
  )
}

// toggle next
type ToggleNextProps = {
  style?: ViewStyle
  onNext: () => void
}

export const ToggleNext: React.FC<ToggleNextProps> = ({ style, onNext }) => {
  const [disableNext, setDisableNext] = React.useState<boolean>(false)

  React.useEffect(() => {
    ToggleViewManage.setNext = setNext
    return () => {
      ToggleViewManage.setNext = undefined
    }
  }, [])

  const setNext = React.useCallback((disable: boolean) => {
    if (disable !== disableNext) {
      setDisableNext(disable)
    }
  }, [])

  return (
    <TapController onPress={onNext} style={[styles.fullScreen, style]}>
      <Icon
        icon={"next"}
        size={scale(32)}
        style={disableNext ? styles.disableIcon : styles.iconColor}
      />
    </TapController>
  )
}

const styles = StyleSheet.create({
  disableIcon: {
    tintColor: colors.palette.neutral500,
  },
  fullScreen: {},
  iconColor: {
    tintColor: colors.palette.neutral100,
  },

  togglePlay: {
    height: scale(48),
    width: scale(48),
  },
})
