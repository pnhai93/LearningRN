// import { VideoPlayer } from "app/components"
import { Text } from "app/components"
import { colors, scale } from "app/theme"
import React from "react"
import { View, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { imageRegistry, TheMovieDbImageUrl } from "app/common"
import { SearchPersonResponse } from "app/services/TheMovieDB/api.types"

interface PersonItemProps {
  item: SearchPersonResponse
}

export function PersonItem({ item }: PersonItemProps) {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.image}>
        <Image
          style={styles.avatar}
          source={TheMovieDbImageUrl + item.profile_path}
          placeholder={imageRegistry.place_holder_image}
          placeholderContentFit={"fill"}
          contentFit="contain"
          recyclingKey={`${item.id}`}
        />
      </View>
      <View style={styles.overViewContainer}>
        <Text text={item.name} style={styles.title} numberOfLines={3} />
        <Text text={"Person"} style={styles.overview} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    aspectRatio: 485 / 720,
    borderRadius: 4,
    height: scale(82),
  },
  image: {
    alignItems: "center",
    height: scale(82),
    justifyContent: "center",
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
