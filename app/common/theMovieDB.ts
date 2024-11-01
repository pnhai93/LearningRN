import { SearchMovieResponse, SearchTVResponse } from "app/services/TheMovieDB/api.types"

export enum MEDIA_TYPE {
  person = "person",
  tv = "tv",
  movie = "movie",
}

export interface MovieItemExtend
  extends Omit<SearchMovieResponse & SearchTVResponse, "media_type"> {
  media_type: string | MEDIA_TYPE
}
