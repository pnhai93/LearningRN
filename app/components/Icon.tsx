import * as React from "react"
import { ComponentType } from "react"
import {
  Image,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from "react-native"

export type IconTypes = keyof typeof iconRegistry

interface IconProps extends TouchableOpacityProps {
  /**
   * The name of the icon
   */
  icon: IconTypes

  /**
   * An optional tint color for the icon
   */
  color?: string

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number

  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>

  /**
   * An optional function to be called when the icon is pressed
   */
  onPress?: TouchableOpacityProps["onPress"]
}

/**
 * A component to render a registered icon.
 * It is wrapped in a <TouchableOpacity /> if `onPress` is provided, otherwise a <View />.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/components/Icon/}
 * @param {IconProps} props - The props for the `Icon` component.
 * @returns {JSX.Element} The rendered `Icon` component.
 */
export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...WrapperProps
  } = props

  const isPressable = !!WrapperProps.onPress
  const Wrapper = (WrapperProps?.onPress ? TouchableOpacity : View) as ComponentType<
    TouchableOpacityProps | ViewProps
  >

  const $imageStyle: StyleProp<ImageStyle> = [
    $imageStyleBase,
    color !== undefined && { tintColor: color },
    size !== undefined && { width: size, height: size },
    $imageStyleOverride,
  ]

  return (
    <Wrapper
      accessibilityRole={isPressable ? "imagebutton" : undefined}
      {...WrapperProps}
      style={$containerStyleOverride}
    >
      <Image style={$imageStyle} source={iconRegistry[icon]} />
    </Wrapper>
  )
}

export const iconRegistry = {
  loud: require("../../assets/icons/loud.webp"),
  next: require("../../assets/icons/next.webp"),
  pause: require("../../assets/icons/pause.webp"),
  play: require("../../assets/icons/play.webp"),
  previous: require("../../assets/icons/previous.webp"),
  quiet: require("../../assets/icons/quiet.webp"),
  full_screen_on: require("../../assets/icons/full_screen_on.webp"),
  full_screen_off: require("../../assets/icons/full_screen_off.webp"),
  replay: require("../../assets/icons/replay.webp"),
  input_search: require("../../assets/icons/input_search.webp"),
  arrow_left: require("../../assets/icons/arrow_left.webp"),
  down: require("../../assets/icons/down.webp"),
  up: require("../../assets/icons/up.webp"),
  video_plus: require("../../assets/icons/video_plus.webp"),
  playlist_check: require("../../assets/icons/playlist_check.webp"),
  playlist_plus: require("../../assets/icons/playlist_plus.webp"),
  comment_plus: require("../../assets/icons/comment_plus.webp"),
  eye: require("../../assets/icons/eye.webp"),
  eye_off: require("../../assets/icons/eye_off.webp"),
  facebook_logo: require("../../assets/icons/facebook_logo.webp"),
  google_logo: require("../../assets/icons/google_logo.webp"),
}

const $imageStyleBase: ImageStyle = {
  resizeMode: "contain",
}
