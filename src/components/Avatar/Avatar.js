import React, {Component} from 'react';
import {
  View, Text, StyleSheet, ScrollView, Alert,
  Image, TouchableOpacity, NativeModules, Dimensions,
} from 'react-native';
import Styles from './Avatar.style.js'

import { getDimensions } from '../../Utils/dimensions'

const { width, scaleRatio, fontScale } = getDimensions()

var ImagePicker = NativeModules.ImageCropPicker;


export default class Avatar extends Component {

  constructor() {
    super();
    this.state = {
      image: null,
    };
  }

  pickSingleWithCamera(cropping) {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 200 * scaleRatio,
      height: 200 * scaleRatio,
      borderRadius:150 * scaleRatio,
      includeExif: true,
    }).then(image => {
      console.log('received image', image);
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height},
        images: null
      });
    }).catch(e => alert(e));
  }

  pickSingle(cropit, circular=false) {
    ImagePicker.openPicker({
      width: 200 * scaleRatio,
      height: 200 * scaleRatio,
      cropping: cropit,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 640 * scaleRatio,
      compressImageMaxHeight: 480 * scaleRatio,
      compressImageQuality: 0.5,
      includeExif: true,
    }).then(image => {
      console.log('received image', image);
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
        images: null
      });
    }).catch(e => {
      console.log(e);
      Alert.alert(e.message ? e.message : e);
    });
  }

  renderOptions = () => (
    Alert.alert(
      'Choose Profile Picture',
      '',
      [
        {text: 'Open Library', onPress: () => this.pickSingle(true,true)},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Open Camera', onPress: () => this.pickSingleWithCamera(true)},
      ],
      { cancelable: false }
    )
  )

  renderImage = () => (
    <View style = {[Styles.ring, Styles.chosen]}>
      <View style = {Styles.placeholderWrapper}>
        <Image
          style={Styles.placeholderImage} source={this.state.image}
          borderRadius={100}
/>
      </View>
    </View>
  )

  renderPlaceholder = () => (
    <View style = {Styles.ring}>
      <View style = {Styles.placeholderWrapper}>
        <Image
          style={Styles.placeholderImage}
          source={require('../../assets/avatar.png')}
          borderRadius={100}
          />
      </View>
    </View>
  )

  renderAsset = () => {
    if(!this.state.image) return this.renderPlaceholder()
    return this.renderImage();
  }

  render() {
    return (
      <TouchableOpacity onPress = {() => this.renderOptions()} style={Styles.container}>

        <ScrollView>
          {this.renderAsset()}
        </ScrollView>

        <TouchableOpacity onPress = {() => this.renderOptions()} style={Styles.button}>
          <Image style = {Styles.buttonImg} source = {require('../../assets/addBtn.png')} />
        </TouchableOpacity>

      </TouchableOpacity >
  );
  }
}
