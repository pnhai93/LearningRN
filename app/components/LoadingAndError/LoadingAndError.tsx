// import { VideoPlayer } from "app/components"
import { Text } from "app/components"
import { colors, scale, verticalScale } from "app/theme"
import React from "react"
import { View, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native"
import { LoadingErrorManager } from "./LoadingErrorManager"
// interface VideoPlayingProps extends AppStackScreenProps<"VideoPlaying"> {}

export function LoadingAndError() {
  const [status, setStatus] = React.useState<"$load" | "$hide" | string>("$hide")

  React.useEffect(() => {
    LoadingErrorManager.showLoading = showLoading
    LoadingErrorManager.hideLoading = hideLoading
    LoadingErrorManager.showError = showError

    return () => {
      LoadingErrorManager.showLoading = undefined
      LoadingErrorManager.hideLoading = undefined
      LoadingErrorManager.showError = undefined
    }
  }, [])

  const showLoading = () => {
    setStatus("$load")
  }

  const hideLoading = () => {
    setStatus("$hide")
  }

  const showError = (error: string) => {
    setStatus(error)
  }

  if (status === "$hide") {
    return null
  }

  return (
    <View style={styles.container}>
      {status === "$load" ? (
        <ActivityIndicator size={scale(48)} color={colors.palette.angry500} />
      ) : (
        <View style={styles.errorContainer}>
          <Text text={status} style={styles.errorTx} />
          <TouchableOpacity onPress={hideLoading} style={styles.bntOk}>
            <Text text="OK" style={styles.okTx} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  bntOk: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopColor: colors.palette.neutral300,
    borderTopWidth: 1,
  },
  container: {
    alignItems: "center",
    backgroundColor: colors.palette.overlay50,
    bottom: 0,
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  errorContainer: {
    backgroundColor: colors.palette.neutral100,
    borderRadius: 12,
    width: "80%",
  },
  errorTx: {
    fontSize: scale(14),
    marginHorizontal: scale(16),
    marginVertical: verticalScale(16),
    textAlign: "center",
  },
  okTx: {
    color: colors.palette.neutral900,
    fontSize: scale(14),
    fontWeight: "900",
    marginVertical: verticalScale(12),
    textAlign: "center",
  },
})
