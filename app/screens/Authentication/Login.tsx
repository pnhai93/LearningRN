// import { VideoPlayer } from "app/components"
import { IconButton, Screen, Text, TextButton, TextField } from "app/components"
import { navigate } from "app/navigators"
import { colors, scale, verticalScale } from "app/theme"
import React from "react"
import { View, StyleSheet } from "react-native"
import { SubmitHandler, useForm } from "react-hook-form"
import { apiFireBase } from "app/services/FireBase/ApiFireBase"

interface TextInputData {
  email: string
  password: string
}

export function Login() {
  const { control, handleSubmit } = useForm<TextInputData>()

  const [error, setError] = React.useState({
    email: "",
    password: "",
  })

  const onsubmit: SubmitHandler<TextInputData> = async (input) => {
    if (!input.email || !input.password) {
      setError({
        email: !input.email ? "Bạn chưa nhập thông tin" : "",
        password: !input.password ? "Bạn chưa nhập thông tin" : "",
      })
    } else if (input.password.length < 6) {
      setError({
        email: "",
        password: "Password should be at least 6 characters",
      })
    } else {
      apiFireBase.signInWithEmailAndPassword(input.email, input.password)
    }
  }

  const forgotPassword = () => {}

  const goRegister = () => {
    navigate("Register")
  }

  return (
    <Screen
      backgroundColor={colors.palette.neutral900}
      statusBarStyle="light"
      safeAreaEdges={["bottom", "top"]}
      style={styles.container}
    >
      {/* <ImageLoad style={styles.image} source={image} /> */}
      <Text text={"Đăng nhập để tận hưởng trọn ven các tính năng bạn nhé!"} style={styles.title} />

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
        helper={error.password}
        status={error.password ? "error" : undefined}
      />

      <TextButton
        preset="none"
        onPress={forgotPassword}
        text="Quên mật khẩu?"
        textStyle={styles.forgotPassword}
      />

      <TextButton text="Đăng nhập" onPress={handleSubmit(onsubmit)} style={styles.bntLogin} />

      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text text="hoặc" style={styles.txOr} />
        <View style={styles.line} />
      </View>

      <View style={styles.orContainer}>
        <IconButton onPress={() => {}} icon="google_logo" iconStyle={styles.socialLogo} />
        <IconButton onPress={() => {}} icon="facebook_logo" iconStyle={styles.socialLogo} />
      </View>

      <View style={[styles.orContainer, styles.registerContainer]}>
        <Text text="Bạn chưa có tài khoản? " style={styles.txNotUser} />
        <TextButton
          preset="none"
          onPress={goRegister}
          text="Đăng ký ngay"
          textStyle={styles.txRegister}
        />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  bntLogin: {},
  container: {
    alignItems: "center",
    paddingHorizontal: scale(16),
  },
  forgotPassword: {
    color: colors.palette.angry500,
    fontSize: scale(12),
    marginBottom: verticalScale(32),
    marginTop: verticalScale(4),
  },
  input: {
    marginBottom: verticalScale(12),
  },
  line: {
    backgroundColor: colors.palette.neutral100,
    borderRadius: 4,
    flex: 1,
    height: 2,
  },
  orContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  registerContainer: {
    marginTop: verticalScale(32),
  },
  socialLogo: {
    borderRadius: 999,
    height: scale(40),
    marginHorizontal: scale(12),
    width: scale(40),
  },
  title: {
    color: colors.palette.neutral100,
    fontSize: scale(20),
    fontWeight: "700",
    marginHorizontal: scale(40),
    marginVertical: verticalScale(32),
    textAlign: "center",
  },
  txNotUser: {
    color: colors.palette.neutral100,
    fontSize: scale(12),
  },
  //   image: {
  //     alignSelf: "center",
  //     height: scale(100),
  //     width: scale(100),
  //   },
  txOr: {
    color: colors.palette.neutral100,
    fontSize: scale(12),
    marginHorizontal: scale(12),
    marginVertical: verticalScale(16),
  },
  txRegister: {
    color: colors.palette.angry500,
    fontSize: scale(12),
    fontWeight: "700",
  },
})
