import { View, Text, StyleSheet} from 'react-native'
import React from 'react'

export default function Header() {

  return (
    <View style = {styles.row} backgroundColor = 'green'>
    <View style={[styles.box, {width: 100}]}><Text >Oppilas</Text></View>
    <View style={styles.box}><Text >Hyvät merkinnät</Text></View>
    <View style={styles.box}><Text>Huonot merkinnät</Text></View>
    <View style={styles.box}><Text>Häirintä</Text></View>
    <View style={styles.box}><Text>Kotiteht</Text></View>
    </View>
  )
}

const styles = StyleSheet.create({
    box: {
      borderWidth: 1,
      width: 100,
      alignItems: 'center',
      justifyContent: 'center'
    },
    row: {
      flexDirection: 'row',

    }
  })