import { StyleSheet, Dimensions } from 'react-native'

const { height, width } = Dimensions.get('window')
const scaleRatio = 375 / 667 /(width / height)

export default Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  plusIcon: {
    fontSize: 30 * scaleRatio,
    color: '#0091cc',
    position: 'absolute',
    bottom:5 * scaleRatio,
    right: 5 * scaleRatio,
  },
  avatarWrapper:{
    flex:1,
    width,
    marginBottom: 20 * scaleRatio,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  placeholderImage: {
    width: 150 * scaleRatio,
    height: 150 * scaleRatio,
    borderRadius: 76 * scaleRatio,
    resizeMode: 'cover'
  },
  successRing: {
    borderWidth: 4 * scaleRatio,
    height: 160 * scaleRatio,
    width: 160 * scaleRatio,
    borderRadius: 80 * scaleRatio,
    justifyContent: 'center',
    alignItems: 'center'
  },
  hint: {
    position: 'absolute',
    bottom: 5 * scaleRatio,
    alignSelf: 'center',
  },
  hintText:{
    color: '#0091cc'
  }
})
