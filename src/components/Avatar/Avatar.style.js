import { StyleSheet } from 'react-native'
import { getDimensions } from '../../Utils/dimensions'

const { width, scaleRatio, fontScale } = getDimensions()

const imgSize = 24

export default Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonImg: {
    height: 30 * scaleRatio,
    width: 30 * scaleRatio,
  },
  button: {
    position: 'absolute',
    top:10 * scaleRatio,
    right:40 * scaleRatio,
    backgroundColor: 'transparent',
  },
  placeholderWrapper:{
    zIndex: 2,
    position: 'relative',
    top: 0,
    width: 200,
    height: 200,
    borderStyle: 'dashed',
    borderRadius: 100,
    borderColor: 'rgba(151,151,151,0.37)',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    zIndex: 1,
  },
  ring:{
    zIndex:1,
    width: 220,
    height: 220,
    borderWidth:10,
    borderColor:'red',
    borderRadius: 110
  },
  chosen: {
    borderColor:'#a5db62',
  }
})
