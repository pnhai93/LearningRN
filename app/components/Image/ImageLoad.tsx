import React from "react"
import { Image, ImageProps } from "expo-image"
import { imageRegistry } from "app/common/image"

export const ImageLoad = ({ ...rest }: ImageProps) => {
  return (
    <Image
      placeholder={imageRegistry.place_holder_image}
      placeholderContentFit={"fill"}
      contentFit="contain"
      {...rest}
    />
  )
}
