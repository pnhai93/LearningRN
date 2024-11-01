import auth from "@react-native-firebase/auth"
import { LoadingErrorManager } from "app/components/LoadingAndError/LoadingErrorManager"
import { ReactNativeFirebase } from "@react-native-firebase/app"
import { _rootStore } from "app/models"
import { WithFirestoreApis } from "./api.firestore"
import { Collection } from "./api.firebase.types"

export class ApiFireBase extends WithFirestoreApis(class {}) {
  async signInWithEmailAndPassword(email: string, password: string): Promise<any> {
    LoadingErrorManager.showLoading?.()
    try {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          console.log("User account created & signed in!", user)
          LoadingErrorManager.hideLoading?.()
        })
        .catch((error: ReactNativeFirebase.NativeFirebaseError) => {
          console.log("signInWithEmailAndPassword", error.message)
          LoadingErrorManager.showError?.("Đăng nhập thất bại")
        })
    } catch (error: any) {
      LoadingErrorManager.showError?.(error.toString())
    }
  }

  async signingOut(): Promise<any> {
    auth()
      .signOut()
      .then(() => _rootStore.userStore.clearProfile())
      .catch(() => {
        LoadingErrorManager.showError?.("Đã xảy ra lỗi không xác định")
      })
  }

  async createUserWithEmailAndPassword(
    email: string,
    password: string,
    displayName: string,
  ): Promise<any> {
    LoadingErrorManager.showLoading?.()
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          console.log("User account created & signed in!", user)
          this.addingDocuments({
            collection: Collection.Users,
            document: user.user.uid,
            data: {
              displayName,
              uid: user.user.uid,
            },
          })
          LoadingErrorManager.hideLoading?.()
        })
        .catch((error: ReactNativeFirebase.NativeFirebaseError) => {
          let message
          switch (error.code) {
            case "auth/email-already-in-use":
              message = "That email address is already in use!"
              break
            case "auth/invalid-email":
              message = "That email address is invalid!"
              break
            default:
              message = error.message
              break
          }
          LoadingErrorManager.showError?.(message)
        })
    } catch (error: any) {
      LoadingErrorManager.showError?.(error.toString())
    }
  }
}

export const apiFireBase = new ApiFireBase()
