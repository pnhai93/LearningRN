import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { UserInfoModel } from "./userInfoModel"

export const PeerTubeStoreModel = types
  .model("PeerTubeStore")
  .props({
    userInfo: types.optional(UserInfoModel, {}),
  })
  .actions(withSetPropAction)
  .actions((store) => ({}))
  .views((store) => ({}))

export interface PeerTubeStore extends Instance<typeof PeerTubeStoreModel> {}
export interface PeerTubeStoreSnapshot extends SnapshotOut<typeof PeerTubeStoreModel> {}

// @demo remove-file
