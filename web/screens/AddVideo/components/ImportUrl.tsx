// import { VideoPlayer } from "app/components"
import { colors, dimensionsWidth, scale, verticalScale } from "app/theme"
import React from "react"
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import { TheMovieDbImageUrl } from "app/common"
import { ImageLoad, Text, TextButton, TextField } from "app/components"
import { MovieItemExtend } from "app/common/theMovieDB"
import { apiPeerTube } from "app/services/PeerTube/ApiPeerTube"
import { useForm } from "react-hook-form"

interface ImportUrlProps {
  data: MovieItemExtend
}

interface TextInputData {
  name: string
  videoUrl: string
}

export function ImportUrl({ data }: ImportUrlProps) {
  const { control, handleSubmit } = useForm<TextInputData>()

  const addVideo = async () => {
    const videoUrl =
      "https://tube.xy-space.de/download/streaming-playlists/hls/videos/36ceef38-d8f6-45a5-a9ac-896932f69039-816-fragmented.mp4"
    const response = await apiPeerTube.videoImport({ name: "test", targetUrl: videoUrl })
    console.log("addVideo", response)
  }

  return (
    <View style={styles.container}>
      <ImageLoad style={styles.image} source={TheMovieDbImageUrl + data.backdrop_path} />
      <Text
        text={
          "Bạn có thể nhập bất cứ URL nào hỗ trợ bởi youtube-dl hoặc URL chỉ đến một file video."
        }
        style={styles.note}
      />

      <TextField
        name="name"
        control={control}
        label={"Name"}
        containerStyle={styles.input}
        defaultValue={data.name}
        // helper={error.email}
        // status={error.email ? "error" : undefined}
      />

      <TextField
        name="videoUrl"
        control={control}
        label={"Video url"}
        // helper={error.email}
        // status={error.email ? "error" : undefined}
      />

      <TouchableOpacity style={styles.bntPate}>
        <Text text="Pate form clipboard" style={styles.txPateClipboard} />
      </TouchableOpacity>

      <TextButton text="Nhập" onPress={addVideo} style={styles.bntImport} />
    </View>
  )
}

const styles = StyleSheet.create({
  bntImport: {
    marginTop: verticalScale(16),
  },
  bntPate: {
    alignSelf: "flex-end",
    backgroundColor: colors.palette.secondary200,
    borderRadius: 8,
    marginTop: verticalScale(4),
    paddingHorizontal: scale(8),
    paddingVertical: scale(2),
  },
  container: {},
  image: {
    alignSelf: "center",
    aspectRatio: 1280 / 720,
    borderRadius: 4,
    marginBottom: verticalScale(8),
    width: dimensionsWidth - scale(16 * 2),
  },
  input: {
    marginBottom: verticalScale(12),
  },
  inputText: {
    backgroundColor: colors.palette.neutral100,
    borderRadius: 4,
    color: colors.palette.neutral900,
    fontSize: scale(20),
    marginBottom: 0,
    marginTop: verticalScale(4),
    paddingBottom: scale(4),
    paddingHorizontal: scale(4),
    paddingTop: scale(4),
    width: "100%",
  },
  label: {
    color: colors.palette.neutral100,
    fontSize: scale(16),
    fontWeight: "700",
    marginTop: verticalScale(16),
  },
  note: {
    color: colors.palette.neutral100,
    fontSize: scale(14),
  },
  txPateClipboard: {
    color: colors.palette.neutral900,
    fontSize: scale(12),
    fontWeight: "600",
  },
})
