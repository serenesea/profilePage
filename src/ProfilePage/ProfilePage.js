
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Avatar from '../components/Avatar/Avatar'
import Header from '../components/Header/Header'
import Styles from './ProfilePage.style.js'

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={Styles.container}>

        <View style={Styles.headerContainer}>
          <Header />
        </View>
        <View style = {Styles.avatarContainer}>
          <Avatar />
        </View>

      </View>
    );
  }
}
