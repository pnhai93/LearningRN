import React from "react"
import { StyleSheet, View } from "react-native"
import { Text } from "../../Text"
import { formatTimeToMins } from "../VideoPlayerUtils"
import { colors, scale } from "app/theme"
import { ToggleViewManage } from "./ToggleView"

export const DurationTime = () => {
  const [duration, setDuration] = React.useState(0)
  const [currentTime, setCurrentTime] = React.useState(0)

  React.useEffect(() => {
    ToggleViewManage.setDuration = setDuration
    ToggleViewManage.setCurrentTime = setCurrentTime

    return () => {
      ToggleViewManage.setDuration = undefined
      ToggleViewManage.setCurrentTime = undefined
    }
  }, [])

  return (
    <View>
      <Text style={styles.timerText}>
        <Text style={styles.timerText} text={`${formatTimeToMins(currentTime)}`} />
        <Text style={styles.durationTimerText} text={` / ${formatTimeToMins(duration)}`} />
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  durationTimerText: {
    color: colors.opacity.W(0.8),
    fontSize: scale(10),
    textAlign: "right",
  },
  timerText: {
    color: colors.opacity.W(1),
    fontSize: scale(10),
    textAlign: "right",
  },
})
