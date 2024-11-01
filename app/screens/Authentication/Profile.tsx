// import { VideoPlayer } from "app/components"
import { ImageLoad, Screen, TextButton, TextField } from "app/components"
import { colors, scale, verticalScale } from "app/theme"
import React from "react"
import { StyleSheet } from "react-native"
// interface VideoPlayingProps extends AppStackScreenProps<"VideoPlaying"> {}
import { SubmitHandler, useForm } from "react-hook-form"
import { useStores } from "app/models"
import { Login } from "./Login"
import { observer } from "mobx-react-lite"
import { apiFireBase } from "app/services/FireBase/ApiFireBase"

interface TextInputData {
  name: string
  phoneNumber: string
}

export const Profile = observer(() => {
  const { userStore } = useStores()

  const { control, handleSubmit } = useForm<TextInputData>()

  // const onUpdate: SubmitHandler<TextInputData> = async (input) => {}

  const logout = () => {
    apiFireBase.signingOut()
  }

  if (!userStore.profile.email) {
    return <Login />
  }

  return (
    <Screen
      backgroundColor={colors.palette.neutral900}
      statusBarStyle="light"
      safeAreaEdges={["bottom", "top"]}
      style={styles.container}
    >
      <ImageLoad style={styles.avatar} />
      <TextField name="name" control={control} label={"Name"} containerStyle={styles.input} />
      <TextField
        name="email"
        control={control}
        label={"Email"}
        containerStyle={styles.input}
        editable={false}
        defaultValue={userStore.profile.email}
      />
      <TextField name="phoneNumber" control={control} label={"Phone number"} />

      {/* <TextButton text="Update" onPress={handleSubmit(onUpdate)} style={styles.bntLogin} /> */}
      <TextButton text="Đăng xuất" onPress={handleSubmit(logout)} style={styles.bntLogin} />
    </Screen>
  )
})

const styles = StyleSheet.create({
  avatar: {
    alignSelf: "center",
    borderRadius: 999,
    height: scale(120),
    marginVertical: verticalScale(32),
    width: scale(120),
  },
  bntLogin: {
    marginTop: verticalScale(40),
  },
  container: {
    paddingHorizontal: scale(16),
  },
  input: {
    marginBottom: verticalScale(16),
  },
})
