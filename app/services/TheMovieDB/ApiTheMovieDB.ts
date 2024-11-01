/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://docs.infinite.red/ignite-cli/boilerplate/app/services/#backend-api-integration)
 * documentation for more details.
 */
import { ApiResponse, ApisauceInstance, create } from "apisauce"
import type {
  ApiConfig,
  RequestType,
  SearchMultiResponse,
  SearchTVResponse,
  TvSeriesDetailResponse,
} from "./api.types"
import { getGeneralApiProblem } from "./apiProblem"

/**
 * Configuring the apisauce instance.
 */
const DEFAULT_API_CONFIG: ApiConfig = {
  url: "https://api.themoviedb.org/3",
  timeout: 10000,
  authorizationKey:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDBlMmJjYzYyNGY2MTUzYjI2ODhlNGJjMTFkYmFmMSIsIm5iZiI6MTcyNzE1MDYxNS43OTQzMDgsInN1YiI6IjYwNDQ5NjhkY2EwZTE3MDA1NzZlZjZhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0u9b4UC2PpbADvvdx94DNd669Ap6Qh_ILAue1Cshpeo",
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class ApiTheMovie {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
        Authorization: this.config.authorizationKey,
      },
    })
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
      console.log("problem", problem)
      return null
    } else {
      console.log("response?.data", response?.data)
      return response?.data
    }
  }

  // call api
  async searchMulti(text: string, page: number): Promise<SearchMultiResponse[]> {
    const response = await this.request({
      method: "get",
      url: "/search/multi",
      params: {
        query: text,
        include_adult: true,
        language: "vi-VN",
        page,
      },
    })
    return response?.results || null
  }

  async getTvSeriesDetail(id: number): Promise<TvSeriesDetailResponse> {
    const response = await this.request({
      method: "get",
      url: `/tv/${id}`,
      params: {
        language: "vi-VN",
      },
    })
    return response || null
  }

  async getTvSeriesSimilar(id: number, page: number): Promise<SearchTVResponse[]> {
    const response = await this.request({
      method: "get",
      url: `/tv/${id}/similar`,
      params: {
        language: "vi-VN",
        page,
      },
    })
    return response?.results || null
  }
}

// Singleton instance of the API for convenience
export const apiTheMovie = new ApiTheMovie()
