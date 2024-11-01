// TODO: write documentation for colors and palette in own markdown file and add links from here

type opacityType = 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1

export const opacity = {
  transparent: `rgba(0,0,0,0)`,
  Main: (opacity: opacityType = 1) => `rgba(234, 51, 35, ${opacity})`,
  ActiveMain: (opacity: opacityType = 1) => `rgba(41, 142, 136, ${opacity})`,
  Danger: (opacity: opacityType = 1) => `rgba(255, 61, 74, ${opacity})`,
  Warning: (opacity: opacityType = 1) => `rgba(255, 187, 0, ${opacity})`,
  Info: (opacity: opacityType = 1) => `rgba(0, 99, 247, ${opacity})`,
  Success: (opacity: opacityType = 1) => `rgba(1, 208, 134, ${opacity})`,
  W: (opacity: opacityType = 1) => `rgba(255, 255, 255, ${opacity})`,
  G1: (opacity: opacityType = 1) => `rgba(245, 247, 250, ${opacity})`,
  G2: (opacity: opacityType = 1) => `rgba(225, 227, 229, ${opacity})`,
  G3: (opacity: opacityType = 1) => `rgba(195, 197, 199, ${opacity})`,
  G4: (opacity: opacityType = 1) => `rgba(157, 159, 163, ${opacity})`,
  G5: (opacity: opacityType = 1) => `rgba(108, 110, 112, ${opacity})`,
  G6: (opacity: opacityType = 1) => `rgba(39, 41, 46, ${opacity})`,
  G7: (opacity: opacityType = 1) => `rgba(44, 45, 47, ${opacity})`,
  G8: (opacity: opacityType = 1) => `rgba(23, 26, 31, ${opacity})`,
  B: (opacity: opacityType = 1) => `rgba(0, 0, 0, ${opacity})`,
}

const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#F4F2F1",
  neutral300: "#D7CEC9",
  neutral400: "#B6ACA6",
  neutral500: "#978F8A",
  neutral600: "#564E4A",
  neutral700: "#3C3836",
  neutral800: "#191015",
  neutral900: "#000000",

  primary100: "#F4E0D9",
  primary200: "#E8C1B4",
  primary300: "#DDA28E",
  primary400: "#D28468",
  primary500: "#C76542",
  primary600: "#A54F31",

  secondary100: "#DCDDE9",
  secondary200: "#BCC0D6",
  secondary300: "#9196B9",
  secondary400: "#626894",
  secondary500: "#41476E",

  accent100: "#FFEED4",
  accent200: "#FFE1B2",
  accent300: "#FDD495",
  accent400: "#FBC878",
  accent500: "#FFBB50",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
} as const

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.neutral800,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: palette.neutral200,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   *
   */
  errorBackground: palette.angry100,

  opacity,
}
