// import { VideoPlayer } from "app/components"
import { ListView, Screen } from "app/components"
import { colors, scale } from "app/theme"
import React from "react"
import { View, StyleSheet } from "react-native"
import { SearchBar } from "./components/SearchBar"
import { apiTheMovie } from "app/services/TheMovieDB/ApiTheMovieDB"
import { SearchMultiResponse } from "app/services/TheMovieDB/api.types"
import { ListRenderItem } from "@shopify/flash-list"
import { MEDIA_TYPE } from "app/common/theMovieDB"
import { MovieItem } from "./components/MovieItem"

interface ListMovieType {
  list: SearchMultiResponse[]
  page: number
}

export function SearchMovie() {
  const [listMovie, setListMovie] = React.useState<ListMovieType>({
    list: [],
    page: 0,
  })

  const onSearch = async (text: string) => {
    if (!text) return
    const response = await apiTheMovie.searchMulti(text, 1)
    console.log("response", response)

    if (response) {
      setListMovie({
        list: response,
        page: 1,
      })
    }
  }

  console.log("listMovie", listMovie)

  const renderItem: ListRenderItem<SearchMultiResponse> = React.useCallback(({ item }) => {
    if (item.media_type === MEDIA_TYPE.person) {
      return null
      // return <PersonItem item={item} />
    }
    return <MovieItem item={item} />
  }, [])

  return (
    <Screen
      preset="fixed"
      backgroundColor={colors.palette.neutral900}
      statusBarStyle="light"
      safeAreaEdges={["bottom", "top"]}
      contentContainerStyle={styles.container}
      KeyboardAvoidingViewProps={{
        enabled: false,
      }}
    >
      <SearchBar onSearch={onSearch} />
      <View style={styles.listContainer}>
        <ListView
          data={listMovie.list}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          estimatedItemSize={scale(82)}
        />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  listContainer: {
    flex: 1,
  },
})
