import React from "react"
import {
  ImageStyle,
  TouchableOpacity,
  type StyleProp,
  type ViewStyle,
  StyleSheet,
  TextStyle,
} from "react-native"
import { Icon, IconTypes } from "../Icon"
import { Text } from "../Text"
import { colors, scale, verticalScale } from "app/theme"

type TextButtonProps = {
  onPress: () => void
  style?: StyleProp<ViewStyle>
  icon?: IconTypes
  size?: number
  iconStyle?: ImageStyle
  text: string
  textStyle?: TextStyle
  preset?: "default" | "none"
}

export const TextButton: React.FC<TextButtonProps> = ({
  onPress,
  style,
  icon,
  size,
  iconStyle,
  text,
  textStyle,
  preset = "default",
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
    <TouchableOpacity onPress={press} style={[preset === "default" && styles.container, style]}>
      {!!icon && <Icon icon={icon} size={size || scale(36)} style={[styles.icon, iconStyle]} />}
      <Text text={text} style={[styles.text, textStyle]} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.palette.angry500,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: verticalScale(8),
  },
  icon: {
    marginRight: scale(4),
    tintColor: colors.palette.neutral900,
  },
  text: {
    color: colors.palette.neutral100,
    fontSize: scale(16),
    fontWeight: "700",
  },
})
