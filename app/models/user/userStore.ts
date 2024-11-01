import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { Profile, ProfileModel } from "./profileModel"

export const UserStoreModel = types
  .model("UserStore")
  .props({
    profile: types.optional(ProfileModel, {}),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    // async fetchEpisodes() {
    //   const response = await api.getEpisodes()
    //   if (response.kind === "ok") {
    //     store.setProp("episodes", response.episodes)
    //   } else {
    //     console.error(`Error fetching episodes: ${JSON.stringify(response)}`)
    //   }
    // },
    async saveProfile(data: Profile) {
      console.log("saveProfile", data)

      if (!data) return
      store.profile.displayName = data.displayName
      store.profile.email = data.email || ""
      store.profile.emailVerified = data.emailVerified
      store.profile.isAnonymous = data.isAnonymous
      // store.profile.metadata.creationTime = data.metadata?.creationTime
      // store.profile.metadata.lastSignInTime = data.metadata?.lastSignInTime
      store.profile.phoneNumber = data.phoneNumber
      store.profile.photoURL = data.photoURL
      store.profile.tenantId = data.tenantId
      store.profile.uid = data.uid
      console.log("store.profile", store.profile)
    },

    async clearProfile() {
      store.profile.displayName = ""
      store.profile.email = ""
      store.profile.emailVerified = false
      store.profile.isAnonymous = false
      // store.profile.metadata.creationTime = data.metadata?.creationTime
      // store.profile.metadata.lastSignInTime = data.metadata?.lastSignInTime
      store.profile.phoneNumber = ""
      store.profile.photoURL = ""
      store.profile.tenantId = ""
      store.profile.uid = ""
    },
  }))
  .views((store) => ({
    // get episodesForList() {
    //   return store.favoritesOnly ? store.favorites : store.playList
    // },
    // hasFavorite(episode: User) {
    //   return store.favorites.includes(episode)
    // },
    get getProfile() {
      return store.profile
    },
  }))

export interface UserStore extends Instance<typeof UserStoreModel> {}
export interface UserStoreSnapshot extends SnapshotOut<typeof UserStoreModel> {}

// @demo remove-file
