import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import logo from '../assets/logo.png'
import Styles from '../Styles'

class TopBar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text></Text>
        <Image style={Styles.logo} source={logo}></Image>
        <Text></Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 100,
    flexDirection: 'row',
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'space-between', 
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight:'bold',
  }
});

export default TopBar;