import { Instance, SnapshotOut, types, SnapshotIn } from "mobx-state-tree"

// const Metadata = types.model("Metadata").props({
//   lastSignInTime: types.maybeNull(types.number),
//   creationTime: types.maybeNull(types.number),
// })

export const ProfileModel = types.model("Profile").props({
  // metadata: types.optional(Metadata, {}),
  photoURL: types.maybeNull(types.string),
  phoneNumber: types.maybeNull(types.string),
  tenantId: types.maybeNull(types.string),
  displayName: types.maybeNull(types.string),
  emailVerified: types.optional(types.boolean, false),
  isAnonymous: types.optional(types.boolean, false),
  uid: types.optional(types.string, ""),
  email: types.optional(types.string, ""),
})

export interface Profile extends Instance<typeof ProfileModel> {}
export interface ProfileSnapshotOut extends SnapshotOut<typeof ProfileModel> {}
export interface ProfileSnapshotIn extends SnapshotIn<typeof ProfileModel> {}

// @demo remove-file
