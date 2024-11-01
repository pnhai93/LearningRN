// import { VideoPlayer } from "app/components"
import { Text, IconButton, ImageLoad, ListView, Screen, TextButton } from "app/components"
import { colors, dimensionsWidth, scale, verticalScale } from "app/theme"
import React from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { AppStackScreenProps, goBack, navigate } from "app/navigators"
import { apiTheMovie, ApiTheMovie } from "app/services/TheMovieDB/ApiTheMovieDB"
import { TheMovieDbImageUrl } from "app/common"
import { TvSeriesDetailResponse } from "app/services/TheMovieDB/api.types"
import { LinearGradient } from "expo-linear-gradient"
import { ExpandText } from "./components/ExpandText"
import { TabView } from "./components/TabView"

interface MovieDetailProps extends AppStackScreenProps<"MovieDetail"> {}

export function MovieDetail(props: MovieDetailProps) {
  const { item } = props.route.params
  console.log("item", item)

  const [movieDetail, setMovieDetail] = React.useState<TvSeriesDetailResponse>()

  React.useEffect(() => {
    const getTvSeriesDetail = async () => {
      const response = await apiTheMovie.getTvSeriesDetail(item.id)
      console.log("getTvSeriesDetail", response)
      if (response) {
        setMovieDetail(response)
      }
    }
    getTvSeriesDetail()
  }, [])

  const goAddVideo = () => {
    navigate("AddVideo", { item })
  }

  return (
    <Screen
      preset="scroll"
      backgroundColor={colors.palette.neutral900}
      statusBarStyle="light"
      safeAreaEdges={["bottom", "top"]}
      // contentContainerStyle={styles.container}
      // KeyboardAvoidingViewProps={{
      //   enabled: false,
      // }}
    >
      <View style={{ paddingBottom: scale(32) }}>
        <ImageLoad style={styles.image} source={TheMovieDbImageUrl + item.backdrop_path} />
        <LinearGradient
          style={styles.linearGradient}
          colors={["transparent", "transparent", "transparent", "black"]}
        />
        <Text text={item?.title || item?.name} style={styles.title} />
      </View>
      <View style={styles.contentView}>
        <Text>
          <Text text={`Average: `} style={styles.textDate} />
          <Text text={`${item.vote_average}`} style={styles.average} />
          <Text text={`   ${item.first_air_date}`} style={styles.textDate} />
        </Text>
        <TextButton
          onPress={() => {}}
          icon="play"
          text="Play"
          style={styles.bntPlay}
          textStyle={styles.bntPlayTx}
        />
        {/* <TextButton onPress={() => {}} icon="video_plus" text="Add" /> */}
        {!!item?.overview && <ExpandText item={item} text={item?.overview} />}
      </View>
      <View style={styles.grInteractBnt}>
        <IconButton
          onPress={goAddVideo}
          icon={"video_plus"}
          text="Add video"
          iconStyle={styles.interactBnt}
          textStyle={styles.interactText}
          style={styles.interactContainer}
        />
        <IconButton
          onPress={() => {}}
          icon={"playlist_plus"}
          text="My list"
          iconStyle={styles.interactBnt}
          textStyle={styles.interactText}
          style={styles.interactContainer}
        />
        <IconButton
          onPress={() => {}}
          icon={"comment_plus"}
          text="Comment"
          iconStyle={styles.interactBnt}
          textStyle={styles.interactText}
          style={styles.interactContainer}
        />
      </View>
      <TabView item={item} />
      <IconButton
        onPress={goBack}
        icon="arrow_left"
        style={styles.bntBack}
        iconStyle={styles.arrowLeft}
        size={32}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  arrowLeft: {
    tintColor: colors.palette.neutral100,
  },
  average: {
    color: colors.palette.angry500,
    fontSize: scale(12),
    fontWeight: "900",
  },
  bntBack: {
    left: scale(12),
    position: "absolute",
    top: scale(8),
  },
  bntPlay: {
    marginBottom: verticalScale(4),
    marginTop: verticalScale(8),
    backgroundColor: colors.palette.neutral100,
  },
  bntPlayTx: {
    color: colors.palette.neutral900,
  },
  contentView: {
    marginHorizontal: scale(16),
  },
  grInteractBnt: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: verticalScale(8),
  },
  image: {
    aspectRatio: 1280 / 720,
    width: dimensionsWidth,
  },
  interactBnt: {
    height: scale(24),
    tintColor: colors.palette.neutral100,
    width: scale(24),
  },
  interactContainer: {
    alignItems: "center",
  },
  interactText: {
    color: colors.palette.neutral300,
    fontSize: scale(12),
  },
  linearGradient: {
    bottom: scale(32),
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  textDate: {
    color: colors.palette.neutral500,
    fontSize: scale(12),
  },
  title: {
    bottom: 0,
    color: colors.palette.neutral100,
    fontSize: scale(32),
    fontWeight: "900",
    marginHorizontal: scale(16),
    position: "absolute",
  },
})
