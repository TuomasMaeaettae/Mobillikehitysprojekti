import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import logo from '../assets/logo.webp'
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
    backgroundColor: '#ff69b4',
    alignItems: 'center',
    justifyContent: 'space-between', 
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight:'bold',
    borderBottomWidth: 2,
    borderColor: "black"
  }
});

export default TopBar;