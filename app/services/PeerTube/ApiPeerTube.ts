import { _rootStore } from "app/models"
import { RequestType, VideoImportParam, VideoImportResponse } from "./api.peerTube.types"
import { ApiResponse, ApisauceInstance, create } from "apisauce"
import { getGeneralApiProblem } from "./apiProblem"
import { LoadingErrorManager } from "app/components/LoadingAndError/LoadingErrorManager"

const LIST_SERVER = {
  cocamserverguild: "https://peertube.cocamserverguild.com/",
}

const LIST_USER_PEERTUBE = {
  cocamserverguild: {
    username: "somontara",
    password: "tranducthinh",
  },
}

type LIST_SERVER_TYPE = keyof typeof LIST_SERVER

const TIMEOUT = 10000

export class ApiPeerTube {
  apisauce: ApisauceInstance

  isInit: boolean

  videoChannelsId: undefined
  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor() {
    this.isInit = false
    this.apisauce = create({
      baseURL: LIST_SERVER.cocamserverguild,
      timeout: TIMEOUT,
    })
  }

  getInit() {
    return this.isInit
  }

  async getClientId(server: string): Promise<any> {
    const getClientRes: ApiResponse<any> = await this.apisauce.get(
      "api/v1/oauth-clients/local",
      undefined,
      { baseURL: server },
    )
    if (getClientRes.data?.client_id) {
      return {
        client_id: getClientRes.data?.client_id,
        client_secret: getClientRes.data?.client_secret,
      }
    } else {
      console.log("getClientRes", getClientRes.config)
      return null
    }
  }

  async logIn(
    server: string,
    serverKey: LIST_SERVER_TYPE,
    clientId: string,
    clientSecret: string,
  ): Promise<any> {
    const logInRes: ApiResponse<any> = await this.apisauce.post(
      "api/v1/users/token",
      {
        ...LIST_USER_PEERTUBE[serverKey],
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "password",
      },
      {
        baseURL: server,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    )
    if (logInRes.data?.access_token) {
      return {
        access_token: logInRes.data?.access_token,
      }
    } else {
      console.log("logInRes", logInRes.config)
      return null
    }
  }

  async getUserInformation(server: string, accessToken: string): Promise<any> {
    const response: ApiResponse<any> = await this.apisauce.get(`api/v1/users/me`, undefined, {
      baseURL: server,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    if (response.data?.videoChannels[0]?.id) {
      return {
        videoChannelsId: response.data?.videoChannels[0]?.id,
      }
    } else {
      console.log("getUserInformation", response.data)
      return null
    }
  }

  async changeServer(serverKey: LIST_SERVER_TYPE) {
    console.log("initializeServer")
    LoadingErrorManager.showLoading?.()
    const server = LIST_SERVER[serverKey]
    try {
      let error = false
      const client = await this.getClientId(server)
      if (client) {
        const login = await this.logIn(server, serverKey, client.client_id, client.client_secret)
        if (login) {
          const userInfo = await this.getUserInformation(server, login.access_token)
          if (userInfo) {
            this.apisauce.setBaseURL(server)
            this.apisauce.setHeaders({
              Authorization: `Bearer ${login.access_token}`,
            })
            if (!this.isInit) {
              this.isInit = true
            }
            this.videoChannelsId = userInfo.videoChannelsId
          } else {
            error = true
          }
        } else {
          error = true
        }
      } else {
        error = true
      }
      if (error) {
        LoadingErrorManager.showError?.("Server không khả dụng")
      } else {
        LoadingErrorManager.hideLoading?.()
      }
    } catch (e) {
      console.log("initializeServer catch", e)
      LoadingErrorManager.showError?.("Đã xảy ra lỗi không xác định")
    }
  }

  async request({ method, url, params, axiosConfig }: RequestType): Promise<any> {
    let response: ApiResponse<any>
    switch (method) {
      case "post":
        response = await this.apisauce.post(url, params, axiosConfig)
        break
      default:
        response = await this.apisauce.get(url, params, axiosConfig)
        break
    }

    const problem = await getGeneralApiProblem(response)

    if (problem) {
      console.log("problem", problem, response)
      return null
    } else {
      console.log("response?.data", response?.data)
      return response?.data
    }
  }

  async videoImport({ name, targetUrl }: VideoImportParam): Promise<VideoImportResponse> {
    const response = await this.request({
      method: "post",
      url: `api/v1/videos/imports`,
      params: {
        channelId: this.videoChannelsId,
        name,
        targetUrl,
      },
    })
    return response?.video || null
  }
}

export const apiPeerTube = new ApiPeerTube()
