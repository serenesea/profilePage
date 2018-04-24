import { StyleSheet, Dimensions, Platform } from 'react-native'

const baseRes = {
  width: 375,
  height: 667,
  ratio: 375 / 667,
}

export const getDimensions = () => {
  const { fontScale, scale, height, width } = Dimensions.get('window')
  return {
    fontScale,
    scale,
    height,
    width,
    scaleRatio: baseRes.ratio / (width / height),
    scaleHeight: height / baseRes.height,
    scaleWidth: width / baseRes.width,
  }
}
