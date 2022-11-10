import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Home from '../Home'

class TopBar2 extends React.Component {


  render() {
    return (
      <View style={styles.container}>
        <Text></Text>
        <Text>Lissu</Text>
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

export default TopBar2;