import React from "react"
import { TextInputProps, View, StyleSheet, StyleProp, TextStyle, TextInput } from "react-native"
import { IconButton, Text } from "app/components"
import { useController, Control } from "react-hook-form"

export interface TextFieldProps extends TextInputProps {
  label?: string
  labelStyle?: StyleProp<TextStyle>
  control: Control
  name: string
  changeText?: () => void
  defaultValue?: string
  isPassword?: boolean
}

/**
 * A component which has a label and an input together.
 */
export function TextField(props: TextFieldProps) {
  const { label, labelStyle, control, name, defaultValue, changeText, isPassword, ...rest } = props

  const { field } = useController({
    control,
    defaultValue,
    name,
  })

  const [secureTextEntry, setSecureTextEntry] = React.useState(isPassword)

  const onChangeText = (text: string) => {
    field.onChange(text)
    changeText && changeText()
  }

  const onSeePassword = () => {
    setSecureTextEntry((secureTextEntry) => !secureTextEntry)
  }

  return (
    <View style={styles.container}>
      <Text text={label} style={[styles.label, labelStyle]} />
      <TextInput
        value={field.value}
        onChangeText={onChangeText}
        underlineColorAndroid={"transparent"}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        allowFontScaling={false}
        multiline={props?.multiline}
        {...rest}
      />
      {isPassword && field.value.length > 0 && (
        <IconButton
          icon={secureTextEntry ? "eye_off" : "eye"}
          onPress={onSeePassword}
          style={styles.eye}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  eye: {},
  input: {},
  label: {},
})
