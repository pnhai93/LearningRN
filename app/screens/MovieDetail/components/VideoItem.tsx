// import { VideoPlayer } from "app/components"
import { Icon, Text } from "app/components"
import { colors, scale, verticalScale } from "app/theme"
import { LinearGradient } from "expo-linear-gradient"
import React from "react"
import { View, StyleSheet, TouchableOpacity, LayoutAnimation } from "react-native"

interface ExpandTextProps {
  text: string
}

export function ExpandText({ text }: ExpandTextProps) {
  const [expand, setExpand] = React.useState(false)
  const onPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setExpand(!expand)
  }
  return (
    <View>
      <Text text={text} style={styles.txOverview} numberOfLines={expand ? undefined : 4} />
      <TouchableOpacity onPress={onPress} style={styles.bnt}>
        <LinearGradient
          style={styles.linearGradient}
          colors={["transparent", "transparent", "white"]}
        >
          <Icon
            size={scale(20)}
            icon={expand ? "up" : "down"}
            color={colors.palette.neutral100}
            style={styles.icon}
          />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  bnt: {
    alignSelf: "center",
    borderRadius: 999,
    bottom: scale(10),
  },
  icon: {
    bottom: scale(-3),
  },
  linearGradient: {
    borderRadius: 999,
  },
  txOverview: {
    color: colors.palette.neutral200,
    fontSize: scale(14),
    marginTop: verticalScale(8),
  },
})
