import { Instance, SnapshotOut, types, SnapshotIn } from "mobx-state-tree"

// const Metadata = types.model("Metadata").props({
//   lastSignInTime: types.maybeNull(types.number),
//   creationTime: types.maybeNull(types.number),
// })

export const UserInfoModel = types.model("UserInfo").props({
  videoChannelId: types.maybeNull(types.number),
})

export interface UserInfo extends Instance<typeof UserInfoModel> {}
export interface UserInfoSnapshotOut extends SnapshotOut<typeof UserInfoModel> {}
export interface UserInfoSnapshotIn extends SnapshotIn<typeof UserInfoModel> {}

// @demo remove-file
