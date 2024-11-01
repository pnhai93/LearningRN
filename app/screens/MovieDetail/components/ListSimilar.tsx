// import { VideoPlayer } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { ListRenderItem } from "@shopify/flash-list"
import { imageRegistry, TheMovieDbImageUrl } from "app/common"
import { MovieItemExtend } from "app/common/theMovieDB"
import { ImageLoad, ListView, Text } from "app/components"
import { apiTheMovie } from "app/services/TheMovieDB/ApiTheMovieDB"
import { colors, scale } from "app/theme"
import React from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"

interface ListSimilarProps {
  movie: MovieItemExtend
  heightImage: number
  space: number
  widthItem: number
  lineHeightName: number
}

export function ListSimilar({
  movie,
  heightImage,
  space,
  widthItem,
  lineHeightName,
}: ListSimilarProps) {
  const [data, setData] = React.useState<MovieItemExtend[]>([])
  const navigation = useNavigation<any>()

  React.useEffect(() => {
    const getTvSeriesSimilar = async () => {
      const response = (await apiTheMovie.getTvSeriesSimilar(movie.id, 1)) as MovieItemExtend[]
      if (response) {
        setData(response.slice(0, 15))
      }
    }
    getTvSeriesSimilar()
  }, [])

  const renderItem: ListRenderItem<MovieItemExtend> = React.useCallback(({ item }) => {
    const onPress = () => {
      navigation.push("MovieDetail", { item: { ...item, media_type: movie.media_type } })
    }
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.imageContainer,
          {
            width: widthItem,
          },
        ]}
      >
        <ImageLoad
          style={[styles.image, { height: heightImage }]}
          source={TheMovieDbImageUrl + item?.poster_path}
          placeholder={imageRegistry.place_holder_image}
          placeholderContentFit={"fill"}
          contentFit="cover"
          cachePolicy={null}
          recyclingKey={`${item.id}`}
        />
        <Text
          text={item?.title || item.name}
          style={[
            styles.name,
            {
              height: lineHeightName,
            },
          ]}
          numberOfLines={1}
        />
      </TouchableOpacity>
    )
  }, [])

  return (
    <ListView
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => `${item.id}`}
      estimatedItemSize={heightImage}
      numColumns={3}
      scrollEnabled={false}
      contentContainerStyle={{ padding: space / 2 }}
      ItemSeparatorComponent={() => <View style={{ height: space }} />}
    />
  )
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1000 / 1500,
    borderRadius: 4,
  },
  imageContainer: {
    alignItems: "center",
  },
  name: {
    bottom: 0,
    color: colors.palette.neutral100,
    fontSize: scale(12),
    width: "95%",
  },
})
