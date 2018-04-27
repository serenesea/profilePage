import React, {Component} from 'react';
import {
  View, Text, ScrollView, Alert, TouchableWithoutFeedback,
  Image, NativeModules, Dimensions, Animated
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Icon } from 'native-base';
import ProgressCircle from 'react-native-progress-circle'

import Styles from './Avatar.style.js'

const { height, width } = Dimensions.get('window')
const scaleRatio = 375 / 667 /(width / height)
const ImagePicker = NativeModules.ImageCropPicker;
const AnimatedProgressCircle = Animated.createAnimatedComponent(ProgressCircle);

export default class Avatar extends Component {

  constructor() {
    super();
    this.state = {
      image: null,
    };
  }

  componentDidMount(){
    this.progress = new Animated.Value(0)
    this.avatarBounce = setInterval(() => !this.state.noAnimation && this.avatar.bounce(1000), 2000)
  }

  componentWillUnmount(){
    clearInterval(this.avatarBounce)
  }

  //animate success ring around loaded photo
  animateProgress =() => {
    console.log(this.state.image)
    Animated.timing(
      this.progress,
        {
          toValue: 100,
         }
     ).start(()=>{
       this.setState({loading:false, loaded:true})
       this.props.onLoaded(this.state.image)
     }
    )
  }

  //set picture from camera
  pickSingleWithCamera(cropping) {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 150 * scaleRatio,
      height: 150 * scaleRatio,
      borderRadius:76 * scaleRatio,
      includeExif: true,
    }).then(image => {
      this.setState({
        loading:true,
        image: {uri: image.path, width: image.width, height: image.height},
        },()=>this.animateProgress());
    }).catch(e => {
       alert(e);
      {if(!this.state.image) this.setState({noAnimation:false})}
    });
  }

  //set picture from camera
  pickSingle(cropit, circular=false) {
    ImagePicker.openPicker({
      width: 150 * scaleRatio,
      height: 150 * scaleRatio,
      cropping: cropit,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 640 * scaleRatio,
      compressImageMaxHeight: 480 * scaleRatio,
      compressImageQuality: 0.5,
      includeExif: true,
    }).then(image => {
      this.setState({
        loading:true,
        image: { uri: image.path, width: image.width, height: image.height, mime: image.mime},
      },()=>this.animateProgress());
    }).catch(e => {
      {if(!this.state.image) this.setState({noAnimation:false})}
    });
  }

  //render pop up with options from where to get photo
  renderOptions = () => (
    this.setState({noAnimation:true},()=>{
      Alert.alert(
        'Choose Profile Picture',
        '',
        [
          {text: 'Choose from Library', onPress: () => this.pickSingle(true,true)},
          {text: 'Cancel', onPress: () => this.setState({noAnimation: false}), style: 'cancel'},
          {text: 'Take Photo', onPress: () => this.pickSingleWithCamera(true)},
        ],
        { cancelable: false }
      )
    })
  )

  //render photo when it's loaded
  renderImage = () => (
      <Animatable.View animation={this.state.loaded?'bounceIn':undefined}
        easing="ease-out" iterationCount={1} style={[Styles.successRing, this.state.loaded && {borderColor:'#6ee271'}]}
        >
        <Image
          style={Styles.placeholderImage}
          source={this.state.image}
          borderRadius={76*scaleRatio}
        />
      </Animatable.View>
  )

  renderPlaceholder = () => (
    <Animatable.View ref={(component)=>this.avatar = component} >
      <AnimatedProgressCircle
          percent={this.state.loading ? this.progress : 0}
          radius={76*scaleRatio}
          borderWidth={4*scaleRatio}
          color="#6ee271"
          shadowColor="white"
          bgColor="white"
      >
        <View >
          <Image
            style={Styles.placeholderImage}
            source={require('../../assets/avatar.png')}
            borderRadius={76*scaleRatio}
          />
        </View>
      </AnimatedProgressCircle>
        {!this.state.loading&&<Icon name ='md-add-circle' style={Styles.plusIcon}/>}
    </Animatable.View>
  )

  renderAsset = () => {
    if(this.state.image && this.state.loaded) return this.renderImage();
    return this.renderPlaceholder()
  }

  render() {
    return (
      <View style={Styles.container}>
        <TouchableWithoutFeedback onPress = {() => this.renderOptions()}>
          <View>
            <ScrollView contentContainerStyle={Styles.avatarWrapper}>
              {this.renderAsset()}
            </ScrollView>
            <View style={Styles.hint}>
              <Text style={Styles.hintText}>
                {this.state.loaded ? "Change Photo" : "Add Photo"}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
  );
  }
}
