import { ApisauceConfig } from "apisauce"

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number

  authorizationKey: string
}

export interface RequestType {
  method: "get" | "post"
  url: string
  params?: object
  axiosConfig?: ApisauceConfig
}

export interface SearchMovieResponse {
  adult: boolean
  backdrop_path?: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path?: string
  release_date?: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface SearchTVResponse {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  first_air_date: string
  name: string
  vote_average: number
  vote_count: number
}

export interface SearchPersonResponse {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: string
  profile_path?: string
  known_for: Array<SearchTVResponse | SearchMovieResponse>
}

export interface SearchMultiResponse
  extends Omit<SearchMovieResponse & SearchTVResponse & SearchPersonResponse, "media_type"> {
  media_type: string
}

interface CreatedBy {
  id: number
  credit_id: string
  name: string
  original_name: string
  gender: number
  profile_path: string
}

interface Genres {
  id: number
  name: string
}

interface Networks {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export interface TvSeriesDetailResponse {
  adult: boolean
  backdrop_path: string
  created_by: CreatedBy[]
  episode_run_time: any[]
  first_air_date: string
  genres: Genres[]
  homepage: string
  id: number
  in_production: boolean
  languages: string[]
  last_air_date: string
  name: string
  networks: Networks[]
  number_of_episodes: number
  number_of_seasons: number
  origin_country: string[]
  original_language: number
  original_name: number
  overview: number
  popularity: number
  poster_path: number
  status: string
  tagline: string
  type: string
  vote_average: number
  vote_count: number
}
