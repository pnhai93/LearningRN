import React from "react"
import {
  ImageStyle,
  TextStyle,
  TouchableOpacity,
  type StyleProp,
  type ViewStyle,
} from "react-native"
import { Icon, IconTypes } from "../Icon"
import { Text } from "../Text"

type IconButtonProps = {
  onPress: () => void
  style?: StyleProp<ViewStyle>
  icon: IconTypes
  size?: number
  iconStyle?: ImageStyle
  text?: string
  textStyle?: TextStyle
}

export const IconButton: React.FC<IconButtonProps> = ({
  onPress,
  style,
  icon,
  size,
  iconStyle,
  text,
  textStyle,
}) => {
  const disableBnt = React.useRef(false)
  const press = async () => {
    if (!disableBnt.current) {
      disableBnt.current = true
      await onPress()
      disableBnt.current = false
    }
  }

  return (
    <TouchableOpacity onPress={press} style={style}>
      <Icon icon={icon} size={size} style={iconStyle} />
      {!!text && <Text text={text} style={textStyle} />}
    </TouchableOpacity>
  )
}
