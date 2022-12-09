import { View, Text, StyleSheet, Pressable, ScrollView} from 'react-native'
import React from 'react'


export default function Row({person, selectedId, select}) {
  const backgroundColor = person.id === selectedId ? 'green': '#f5f5f5';
  console.log("lalalaa" , person)

  return (
    
    <Pressable onLongPress={() => select(person.id)}>
    <View style = {[styles.row, {backgroundColor}]}>
    <View style={[styles.box, {backgroundColor: 'lightgrey'}, {width: 100}]}><Text >{person.text}</Text></View>
    <View style={styles.box}><Text >{person.hyvä}</Text></View>
    <View style={styles.box}><Text>{person.huono}</Text></View>
    <View style={styles.box}><Text>{person.hairinta}</Text></View>
    <View style={styles.box}><Text>{person.kotiteht}</Text></View>
    </View>
    </Pressable>
    
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

  /*<View style={[styles.box, {backgroundColor: 'lightgrey'}, {width: 100}]}><Text >{person.lName},  {person.fName}</Text></View>*/