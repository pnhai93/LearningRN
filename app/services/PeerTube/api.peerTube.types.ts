import { ApisauceConfig } from "apisauce"

export interface RequestType {
  method: "get" | "post"
  url: string
  params?: object
  axiosConfig?: ApisauceConfig
}

export interface VideoImportResponse {
  id: number
  uuid: string
  shortUUID: string
}

export interface VideoImportParam {
  name: string
  targetUrl: string
}
