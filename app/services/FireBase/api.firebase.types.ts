export interface CreateUserWithEmailAndPassword {
  status: "ok" | "failed"
}

export enum Collection {
  Users = "Users",
}

export interface AddingDocuments {
  collection: Collection
  data: any
  document?: string
  successCallBack?: () => void
  errorCallBack?: () => void
}

export interface UpdatingDocuments {
  collection: Collection
  data: any
  document: string
  successCallBack?: () => void
  errorCallBack?: () => void
}

export interface RemovingData {
  collection: Collection
  document: string
  successCallBack?: () => void
  errorCallBack?: () => void
}

export interface ReadData {
  collection: Collection
  document?: string
  successCallBack?: () => void
  errorCallBack?: () => void
}

export interface RealtimeChanges {
  collection: Collection
  document?: string
  onResult: (snapshot: any) => void
  onError?: (snapshot: any) => void
}

export interface QueryingData {
  collection: Collection
}
