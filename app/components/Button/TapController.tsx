import React from "react"
import { View, type StyleProp, type ViewStyle } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import { runOnJS } from "react-native-reanimated"

const hitSlop = { left: 8, bottom: 4, right: 8, top: 4 }

type TapControlerProps = {
  onPress: () => void
  style?: StyleProp<ViewStyle>
  children: React.ReactNode
}

export const TapController: React.FC<TapControlerProps> = ({ onPress, style, children }) => {
  const gesture = Gesture.Tap().onEnd((_e, success) => {
    if (success) {
      runOnJS(onPress)()
    }
  })

  return (
    <GestureDetector gesture={gesture}>
      <View hitSlop={hitSlop} style={style}>
        {children}
      </View>
    </GestureDetector>
  )
}
