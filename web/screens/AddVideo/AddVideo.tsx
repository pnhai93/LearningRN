// import { VideoPlayer } from "app/components"
import { Screen, Header } from "app/components"
import { colors, scale } from "app/theme"
import React from "react"
import { View, StyleSheet } from "react-native"
import { AppStackScreenProps, goBack } from "app/navigators"
import { ImportUrl } from "./components/ImportUrl"
import { apiPeerTube } from "app/services/PeerTube/ApiPeerTube"

interface AddVideoProps extends AppStackScreenProps<"AddVideo"> {}

export function AddVideo(props: AddVideoProps) {
  const { item } = props.route.params
  console.log("item", item)

  React.useEffect(() => {
    !apiPeerTube.getInit() && apiPeerTube.changeServer("cocamserverguild")
  }, [])

  return (
    <Screen
      preset="fixed"
      backgroundColor={colors.palette.neutral900}
      statusBarStyle="light"
      safeAreaEdges={["bottom"]}
      contentContainerStyle={styles.container}
      KeyboardAvoidingViewProps={{
        enabled: false,
      }}
    >
      <View key="1">
        <ImportUrl data={item} />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  PagerContainer: {
    height: "100%",
    marginHorizontal: scale(16),
  },
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  headerTx: {
    color: colors.palette.neutral100,
  },
})
