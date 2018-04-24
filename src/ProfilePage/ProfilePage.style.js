import { StyleSheet } from 'react-native'
import { getDimensions } from '../Utils/dimensions'

const { width, scaleRatio, fontScale } = getDimensions()

const imgSize = 24

export default Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width
  },
  avatarContainer: {
    marginTop: 70 * scaleRatio,
    padding: 10 * scaleRatio,
    height: 250 * scaleRatio,
    width,
    borderBottomWidth: 1,
    borderColor: '#e6e6e6'
  },
  headerContainer: {
    position: 'absolute',
    top: 0
  }

})
