
import React, { Component } from 'react';
import { Text, View, Animated, Easing } from 'react-native';
import { TextField } from 'react-native-material-textfield'
import { Button, Header, Title } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Avatar from '../components/Avatar/Avatar'
import Styles, {inputStyles} from './ProfilePage.style.js'

const AnimatedButton = Animated.createAnimatedComponent(Button);
const RegEx = {
  email: /^(([^<>()[\]{}'^?\\.,!|//#%*-+=&;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  name: /^[A-Za-z]([-']?[A-Za-z]+)*( [A-Za-z]([-']?[A-Za-z]+)*)+$/,
  phone: /^[0-9]{10,11}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d$@!%*€#£?&]{5,}$/,
}

export default class App extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      fullName: "",
      phone: "",
      email: "",
      password: "",
      profilePicture:false,
      disabled: true,
      image:null,
      scaleValue: new Animated.Value(0),
      animatedPress: new Animated.Value(1),
    }
  }

  //returns array of objects with TextFields props
  get inputs(){
    return [
      {
        name: 'fullName',
        label: 'Full Name',
        value: this.state.fullName,
        error: this.state['touched-fullName'] && this.errors.fullName
      },

      {
        name: 'phone',
        label: 'Phone',
        value: this.state.phone,
        error: this.state['touched-phone'] && this.errors.phone,
        keyboardType:'phone-pad'

      },
      {
        name: 'email',
        label: 'E-Mail',
        value: this.state.email,
        error: this.state['touched-email'] && this.errors.email,
        keyboardType:'email-address'
      },
      {
        name: 'password',
        label: 'Password',
        value: this.state.password,
        error: this.state['touched-password'] && this.errors.password,
        secure: true
      },
    ]
  }

  //this.completed === true when form is completed
  get completed(){
   return this.inputs.every((input)=>!!input.value && !input.error) && this.state.image
  }

  //return this.errors object with 'name' prop of input as a key and error text as a value
  //input is validated for errors onBlur(), error desapears in the process of typing if it's fixed
  get errors(){
    return {
      fullName:!this.state.fullName.match(RegEx['name']) ? "Please Check Your Full Name" : "",
      email:!this.state.email.match(RegEx['email']) ? "Wrong E-mail Address" : "",
      phone: !this.state.phone.match(RegEx['phone']) ? "Wrong Phone Number" : "",
      password:!this.state.password.match(RegEx['password']) ? "Must Be At Least 5 Letters (1 Upper Case) and 1 Number" : "",
    }
  }

  //change scale of the button (bounce in and out) when it becomes active
  animateButton = () => {
    Animated.timing(
        this.state.scaleValue,
        {
          toValue: 1,
          duration: 300,
          easing: Easing.easeOutBack
        }
    ).start();
  }

  animatePressBtn = () => {
    Animated.timing(
        this.state.scaleValue,
        {
          toValue: 1,
          duration: 300,
          easing: Easing.easeOutBack
        }
    ).start();
  }

  onBlur = (name) => {
    this.setState({['touched-'+name]: true},()=>{
    })
  }

  //callback from child Avatar for entire form validation
  onLoaded = (image)=>{
    if(image)this.setState({image},()=>{console.log('image')})
  }

  onPressButton = () => {
    alert(`You are ready to go further. Your data: name: ${this.state.fullName}, email: ${this.state.email}, phone: ${this.state.phone}`)
  }

  onPressIn = () => {
    Animated.spring(this.state.animatedPress, {
      toValue: 0.95,
    }).start()
  }

  onPressOut =() => {
    Animated.spring(this.state.animatedPress, {
      toValue: 1,
      friction: 5,
      tension: 100,
    }).start()
  }

  //renders inputs in a loop
  renderInput = input =>  (
    <View style = {Styles.inputWrapper} key = {input.name}>
      <TextField
        label = { input.label }
        value = { input.value }
        onChangeText={ (text) => this.setState({ [input.name]: text }) }
        {...inputStyles}
        onBlur={()=>this.onBlur(input.name)}
        error = { input.error}
        secureTextEntry= { input.secure }
        keyboardType={input.keyboardType}
        underlineColorAndroid="transparent"
      />
    </View>
  )

  render() {
    const buttonScale = this.state.scaleValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.2, 1]
    });
    const buttonColor = this.state.scaleValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgb(230,230,230)', 'rgb(0, 145, 204)',]
    });

    return (
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Header style={Styles.header}>
          <Title style={Styles.title}>Profile Page</Title>
        </Header>

        <View style={Styles.page}>
          <View style = {Styles.avatarContainer}>
            <Avatar onLoaded={(img)=>this.onLoaded(img)}/>
          </View>

          {this.inputs.map(this.renderInput)}

          {this.completed && this.animateButton()}
          <AnimatedButton
            disabled={!this.completed} block
            style={[Styles.button, { transform: [{scale: buttonScale}], backgroundColor: buttonColor },
            { transform: [{ scale: this.state.animatedPress }], opacity: !this.completed ? 0.5 : 1 },
          ]}
            onPressIn={()=>this.onPressIn()}
            onPressOut={()=>this.onPressOut()}
            onPress={()=>this.onPressButton()}
          >
            <Text style={Styles.buttonText}>NEXT</Text>
          </AnimatedButton>
        </View>

      </KeyboardAwareScrollView>

    );
  }
}
