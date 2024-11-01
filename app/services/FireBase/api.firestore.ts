import firestore, { setDoc } from "@react-native-firebase/firestore"
import {
  AddingDocuments,
  QueryingData,
  ReadData,
  RealtimeChanges,
  RemovingData,
  UpdatingDocuments,
} from "./api.firebase.types"

class Base {}

type Constructor<T = Base> = new (...args: any[]) => T

export function WithFirestoreApis<TBase extends Constructor>(Base: TBase) {
  class FirestoreApis extends Base {
    addingDocuments(writing: AddingDocuments) {
      if (writing?.document) {
        firestore()
          .collection(writing.collection)
          .doc(writing.document)
          .set(writing.data)
          .then(writing.successCallBack)
          .catch(writing.errorCallBack)
      } else {
        firestore()
          .collection(writing.collection)
          .add(writing.data)
          .then(writing.successCallBack)
          .catch(writing.errorCallBack)
      }
    }

    updatingDocuments(updating: UpdatingDocuments) {
      firestore()
        .collection(updating.collection)
        .doc(updating.document)
        .update(updating.data)
        .then(updating.successCallBack)
        .catch(updating.errorCallBack)
    }

    removingData(removing: RemovingData) {
      firestore()
        .collection(removing.collection)
        .doc(removing.document)
        .delete()
        .then(removing.successCallBack)
        .catch(removing.errorCallBack)
    }

    async readData(read: ReadData) {
      let data
      if (read?.document) {
        data = await firestore().collection(read.collection).doc(read.document).get()
      } else {
        data = await firestore().collection(read.collection).get()
      }
      return data
    }

    realtimeChanges(info: RealtimeChanges) {
      let realtime
      if (info?.document) {
        realtime = firestore()
          .collection(info.collection)
          .doc(info.document)
          .onSnapshot(info.onResult, info.onError)
      } else {
        realtime = firestore().collection(info.collection).onSnapshot(info.onResult, info.onError)
      }
      return realtime
    }

    queryingData(queryInfo: QueryingData) {
      return firestore().collection(queryInfo.collection)
    }
  }

  return FirestoreApis
}
