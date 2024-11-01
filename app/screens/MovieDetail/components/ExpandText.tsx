// import { VideoPlayer } from "app/components"
import { MovieItemExtend } from "app/common/theMovieDB"
import { Text } from "app/components"
import { colors, scale, verticalScale } from "app/theme"
import { LinearGradient } from "expo-linear-gradient"
import React from "react"
import { View, StyleSheet, TouchableOpacity, LayoutAnimation } from "react-native"

interface ExpandTextProps {
  text: string
  item: MovieItemExtend
}

export function ExpandText({ text }: ExpandTextProps) {
  const [expand, setExpand] = React.useState(false)
  const onPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setExpand(!expand)
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <Text text={text} style={styles.txOverview} numberOfLines={expand ? undefined : 3} />
      <View style={styles.moreContainer}>
        <LinearGradient
          style={{ width: scale(40) }}
          colors={["transparent", "black"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
        {!expand && <Text text={"...thêm"} style={styles.more} />}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  more: {
    backgroundColor: colors.palette.neutral900,
    color: colors.palette.neutral100,
    fontSize: scale(14),
    fontWeight: "900",
  },
  moreContainer: {
    alignSelf: "flex-end",
    bottom: 0,
    flexDirection: "row",
    position: "absolute",
  },
  txOverview: {
    color: colors.palette.neutral200,
    fontSize: scale(14),
    marginTop: verticalScale(8),
  },
})
