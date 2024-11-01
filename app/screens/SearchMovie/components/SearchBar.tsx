// import { VideoPlayer } from "app/components"
import { Icon } from "app/components"
import { colors, scale, verticalScale } from "app/theme"
import React from "react"
import { View, StyleSheet, TextInput } from "react-native"
import { debounce } from "lodash"

interface SearchBarProps {
  onSearch: (value: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [text, setText] = React.useState("")
  const debounceSearchContact = debounce(onSearch, 500)
  const search = React.useCallback((value: string) => {
    setText(value)
    debounceSearchContact(value)
  }, [])
  return (
    <View style={styles.searchBarContainer}>
      <Icon icon="input_search" size={scale(20)} style={styles.icon} />
      <TextInput
        style={styles.inputText}
        placeholder={"Search for a show, movie, genre, e.t.c."}
        placeholderTextColor={colors.palette.neutral300}
        // autoCorrect={false}
        //   onFocus={() => {
        //     this.props.changeInputFocus("location")
        //   }}
        //   ref={(inputLocation) => {
        //     this.inputLocation = inputLocation
        //   }}
        onChangeText={search}
        value={text}
        returnKeyType="search"
        allowFontScaling={false}
        textAlign="left"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    marginRight: scale(8),
    width: scale(20),
  },
  inputText: {
    color: colors.palette.neutral100,
    fontSize: scale(14),
    height: scale(20),
    lineHeight: scale(20),
    marginBottom: 0,
    marginTop: 0,
    paddingBottom: 0,
    paddingTop: 0,
    width: "100%",
  },
  searchBarContainer: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral700,
    flexDirection: "row",
    height: scale(36),
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(16),
    width: "100%",
  },
})
