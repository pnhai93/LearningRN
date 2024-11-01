// import { VideoPlayer } from "app/components"
import { MovieItemExtend } from "app/common/theMovieDB"
import { Text } from "app/components"
import { colors, dimensionsWidth, scale, verticalScale } from "app/theme"
import React from "react"
import { View, StyleSheet } from "react-native"
import { ListSimilar } from "./ListSimilar"

interface TabViewProps {
  item: MovieItemExtend
}

export function TabView({ item }: TabViewProps) {
  const similarHeightImage = scale(175)
  const similarLineHeightName = scale(18)
  const similarWidthImage = (similarHeightImage * 1000) / 1500
  const similarSpace = (dimensionsWidth - similarWidthImage * 3) / 4
  const similarWidthItem = similarSpace + similarWidthImage

  return (
    <View style={styles.root}>
      <Text text="More Like This" style={styles.tabTitle} />
      <ListSimilar
        movie={item}
        key="1"
        heightImage={similarHeightImage}
        space={similarSpace}
        widthItem={similarWidthItem}
        lineHeightName={similarLineHeightName}
      />
      {/* <View style={styles.page} key="2">
          <Text>Second page</Text>
        </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    borderColor: colors.palette.neutral500,
    borderTopWidth: 2,
  },
  tabTitle: {
    color: colors.palette.neutral100,
    fontWeight: "700",
    marginLeft: scale(16),
    marginVertical: verticalScale(8),
  },
})
