import { Dimensions, Platform } from "react-native"
// import DeviceInfo from "react-native-device-info"

const { width, height } = Dimensions.get("window")

const DESIGN_WIDTH = Platform.OS === "web" ? 1440 : 375
const DESIGN_HEIGHT = Platform.OS === "web" ? 1024 : 812
const DESIGN_IPAD_WIDTH = 550

export const isTabletOrIpad = () => {
  // const isTablet = DeviceInfo.isTablet()
  // if (isTablet) {
  //   return true
  // }

  if (Platform.OS === "ios") {
    if (Platform.isPad) {
      return true
    }
  }
  const ratio = width / height
  if (ratio > 0.7 && ratio < 1.3) {
    return true
  }

  return false
}

export const scale = (size: number) => {
  if (isTabletOrIpad() && width >= DESIGN_IPAD_WIDTH) {
    return size
  }
  return (width / DESIGN_WIDTH) * size
}

export const verticalScale = (size: number) => (height / DESIGN_HEIGHT) * size
export const dimensionsWidth =
  isTabletOrIpad() && width > DESIGN_IPAD_WIDTH ? DESIGN_IPAD_WIDTH : width
export const dimensionsHeight = height
export const widthScreenFull = width
