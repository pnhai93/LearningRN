// import { VideoPlayer } from "app/components"
import { colors, dimensionsWidth, scale } from "app/theme"
import React from "react"
import { View, StyleSheet } from "react-native"
import PagerView from "react-native-pager-view"
import { Image } from "expo-image"
import { blurHash } from "app/common"

interface ImageItemProps {
  uri: string
}

const ImageItem = ({ uri }: ImageItemProps) => {
  return (
    // <View style={styles.imageItemContainer}>
    <Image
      style={styles.fastImage}
      source={uri}
      placeholder={{ blurhash: blurHash }}
      contentFit="cover"
      transition={1000}
    />
    // </View>
  )
}

export function MoviePageView() {
  const image = "https://image.tmdb.org/t/p/original/Asg2UUwipAdE87MxtJy7SQo08XI.jpg"
  const listImage = [image, image]

  return (
    <View style={styles.container}>
      <PagerView style={styles.container} initialPage={0}>
        {listImage.map((item, index) => {
          return <ImageItem uri={item} key={index} />
        })}
      </PagerView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: scale(415),
  },
  fastImage: {
    // backgroundColor: colors.palette.neutral900,
    height: scale(415),
    width: dimensionsWidth,
  },
  imageItemContainer: {},
})
