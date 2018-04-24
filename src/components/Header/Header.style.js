import { StyleSheet } from 'react-native'
import { getDimensions } from '../../Utils/dimensions'

const { width, scaleRatio, fontScale } = getDimensions()

const imgSize = 24

export default Styles = StyleSheet.create({
  header:{
    fontSize: 20 * fontScale,
    textAlign: 'center',
    color:'#F0F0F0',
    fontWeight: '800',
    marginTop: 20 * scaleRatio,
  },
  container: {
    paddingHorizontal: 20 * scaleRatio,
    height: 70 * scaleRatio,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#979797',
    width
  },

})
