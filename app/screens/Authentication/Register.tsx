// import { VideoPlayer } from "app/components"
import { Screen, Text, TextButton, TextField } from "app/components"
import { colors, scale, verticalScale } from "app/theme"
import React from "react"
import { StyleSheet } from "react-native"
// interface VideoPlayingProps extends AppStackScreenProps<"VideoPlaying"> {}
import { SubmitHandler, useForm } from "react-hook-form"
import { apiFireBase } from "app/services/FireBase/ApiFireBase"
import { observer } from "mobx-react-lite"

interface TextInputData {
  displayName: string
  email: string
  password: string
  verifyPassword: string
}

export const Register = observer(() => {
  const { control, handleSubmit } = useForm<TextInputData>()

  const [error, setError] = React.useState({
    displayName: "",
    email: "",
    password: "",
    verifyPassword: "",
  })

  const onsubmit: SubmitHandler<TextInputData> = async (input) => {
    if (!input.email || !input.password || !input.verifyPassword || !input.displayName) {
      setError({
        displayName: !input.displayName ? "Bạn chưa nhập thông tin" : "",
        email: !input.email ? "Bạn chưa nhập thông tin" : "",
        password: !input.password ? "Bạn chưa nhập thông tin" : "",
        verifyPassword: !input.verifyPassword ? "Bạn chưa nhập thông tin" : "",
      })
    } else if (input.password.length < 6) {
      setError({
        displayName: "",
        email: "",
        password: "Password should be at least 6 characters",
        verifyPassword: "",
      })
    } else if (input.password !== input.verifyPassword) {
      setError({
        displayName: "",
        email: "",
        password: "",
        verifyPassword: "Mật khẩu không khớp",
      })
    } else {
      apiFireBase.createUserWithEmailAndPassword(input.email, input.password, input.displayName)
    }
  }

  return (
    <Screen
      backgroundColor={colors.palette.neutral900}
      statusBarStyle="light"
      safeAreaEdges={["bottom", "top"]}
      style={styles.container}
    >
      {/* <ImageLoad style={styles.image} source={image} /> */}
      <Text text={"Đăng ký tài khoản"} style={styles.title} />

      <TextField
        name="displayName"
        control={control}
        label={"Display name"}
        containerStyle={styles.input}
        helper={error.displayName}
        status={error.displayName ? "error" : undefined}
      />

      <TextField
        name="email"
        control={control}
        label={"Email"}
        containerStyle={styles.input}
        helper={error.email}
        status={error.email ? "error" : undefined}
      />
      <TextField
        name="password"
        control={control}
        label={"Password"}
        isPassword
        containerStyle={styles.input}
        helper={error.password}
        status={error.password ? "error" : undefined}
      />
      <TextField
        name="verifyPassword"
        control={control}
        label={"Verify password"}
        isPassword
        helper={error.verifyPassword}
        status={error.verifyPassword ? "error" : undefined}
      />

      <TextButton text="Đăng ký" onPress={handleSubmit(onsubmit)} style={styles.bntLogin} />
    </Screen>
  )
})

const styles = StyleSheet.create({
  bntLogin: {
    marginTop: verticalScale(40),
  },
  container: {
    justifyContent: "center",
    paddingHorizontal: scale(16),
  },
  input: {
    marginBottom: verticalScale(12),
  },
  title: {
    color: colors.palette.neutral100,
    fontSize: scale(20),
    fontWeight: "700",
    marginHorizontal: scale(40),
    marginVertical: verticalScale(32),
    textAlign: "center",
  },
})
