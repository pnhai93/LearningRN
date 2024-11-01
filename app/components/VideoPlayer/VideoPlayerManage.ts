import { AVPlaybackSource, AVPlaybackStatusToSet } from "expo-av"

export interface ReplaceType {
  source: AVPlaybackSource
  initialStatus?: AVPlaybackStatusToSet
  downloadFirst?: boolean
}

export interface VideoPlayerManageType {
  pause?: () => void
  play?: () => void
  replace?: (option: ReplaceType) => void
  replay?: () => void
  seekBy?: (seconds: number) => void
  enterFullscreen?: () => void
  exitFullscreen?: () => void
  startPictureInPicture?: () => void
  stopPictureInPicture?: () => void
}

export const VideoPlayerManage: VideoPlayerManageType = {
  pause: undefined,
  play: undefined,
  replace: undefined,
  replay: undefined,
  seekBy: undefined,
  enterFullscreen: undefined,
  exitFullscreen: undefined,
  startPictureInPicture: undefined,
  stopPictureInPicture: undefined,
}
