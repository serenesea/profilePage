import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native'

const { height, width, fontScale } = Dimensions.get('window')
const scaleRatio = 375 / 667 /(width / height)
const scaleWidth = width / 375
const statusBar = StatusBar.currentHeight

export const InputStyles = {
  containerStyle: {
    flex: 1,
  },
  enablesReturnKeyAutomatically: true,
  textColor: '#333333',
  errorColor: '#c30016',
  titleTextStyle: {
    fontSize: 11 * scaleRatio,
  },
  tintColor: '#0091cc',
  autoCorrect: false,
  baseColor: '#979797',
}

export default Styles = StyleSheet.create({
  header:{
    backgroundColor: '#d6d6d6',
    justifyContent:'center',
    alignItems: 'center',
    height:70 * scaleRatio,
  },
  title: {
    fontSize: 20 * fontScale,
    fontWeight: '800',
    color: '#0091cc'
  },
  page: {
    alignItems:"center"
  },
  avatarContainer: {
    height: 210 * scaleRatio,
    width,
    borderBottomWidth: 1,
    borderColor: '#e6e6e6',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#0091cc',
    alignSelf: 'center',
    width: width - 40 * scaleWidth,
    height: 40 * scaleRatio,
    marginVertical: 40 * scaleRatio,
    borderRadius: 8 * scaleRatio,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 16 * scaleRatio,
  },
  disabled: {
    backgroundColor: '#c3c3c3'
  },
  inputWrapper: {
    width: width - 40,
    height: 70,
  },
})
