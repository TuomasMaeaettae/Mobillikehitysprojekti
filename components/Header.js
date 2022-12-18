import { View, Text, StyleSheet} from 'react-native'
import React from 'react'

export default function Header() {

  return (
    <View style = {styles.row}>
    <View style={[styles.box, {width: 100}]}><Text style={styles.texti}>Oppilas</Text></View>
    <View style={styles.box2}><Text style={styles.texti}>Hyvät merkinnät</Text></View>
    <View style={styles.box3}><Text style={styles.texti}>Huonot merkinnät</Text></View>
    <View style={styles.box4}><Text style={styles.texti}>Häirintä</Text></View>
    </View>
  )
}

const styles = StyleSheet.create({
    box: {
      borderWidth: 0,
      margin: 1,
      width: 100,
      borderRadius: 10, 
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#9370db',
    },
    box2: {
      borderWidth: 0,
      margin: 1,
      width: 100,
      borderRadius: 10, 
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'green'
    },
    box3: {
      borderWidth: 0,
      margin: 1,
      width: 100,
      borderRadius: 10, 
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'orange'
    },
    box4: {
      borderWidth: 0,
      margin: 1,
      width: 100,
      borderRadius: 10, 
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'red'
    },
    row: {
      flexDirection: 'row'
    },
    texti: {
      fontWeight: "bold",
      fontSize: 20
    }
  })