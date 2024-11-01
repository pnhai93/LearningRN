// import { VideoPlayer } from "app/components"
import { Text } from "app/components"
import { colors, scale } from "app/theme"
import React from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Image } from "expo-image"
import { imageRegistry, TheMovieDbImageUrl } from "app/common"
import { MovieItemExtend } from "app/common/theMovieDB"
import { navigate } from "../../../navigators"

interface MovieItemProps {
  item: MovieItemExtend
}

export function MovieItem({ item }: MovieItemProps) {
  const goMovieDetail = () => {
    navigate("MovieDetail", { item })
    // navigate("Profile")
  }
  return (
    <TouchableOpacity onPress={goMovieDetail} style={styles.itemContainer}>
      <Image
        style={styles.image}
        source={TheMovieDbImageUrl + item.backdrop_path}
        placeholder={imageRegistry.place_holder_image}
        placeholderContentFit={"fill"}
        contentFit="contain"
        cachePolicy={null}
        recyclingKey={`${item.id}`}
      />
      <View style={styles.overViewContainer}>
        <Text text={item?.title || item.name} style={styles.title} numberOfLines={1} />
        <Text text={item.overview} style={styles.overview} numberOfLines={5} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1280 / 720,
    borderRadius: 4,
    width: scale(146),
  },
  itemContainer: {
    flexDirection: "row",
    height: scale(82),
    marginHorizontal: scale(8),
    marginVertical: scale(4),
  },
  overViewContainer: {
    flex: 1,
    marginLeft: scale(4),
  },
  overview: {
    color: colors.palette.neutral300,
    fontSize: scale(8),
    width: "100%",
  },
  title: {
    color: colors.palette.neutral100,
    fontSize: scale(12),
    fontWeight: "600",
    width: "100%",
  },
})
