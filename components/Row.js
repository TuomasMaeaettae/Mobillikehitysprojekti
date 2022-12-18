import { View, Text, StyleSheet, Pressable, ScrollView} from 'react-native'
import React from 'react'


export default function Row({person, selectedId, select}) {
  const backgroundColor = person.id === selectedId ? 'green': '#f5f5f5';
  console.log("lalalaa" , person)

  return (
    
    <Pressable onLongPress={() => select(person.id)}>
    <View style = {[styles.row]}>
    <View style={[styles.box, {width: 100}]}><Text style={styles.texti}>{person.nimi}</Text></View>
    <View style={styles.box2}><Text style={styles.texti}>{person.plus}</Text></View>
    <View style={styles.box3}><Text style={styles.texti}>{person.minus}</Text></View>
    <View style={styles.box4}><Text style={styles.texti}>{person.hair}</Text></View>
    </View>
    </Pressable>
    
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
      flexDirection: 'row',
    },
    texti: {
      fontWeight: "bold",
      fontSize: 20
    },
  })

  /*<View style={[styles.box, {backgroundColor: 'lightgrey'}, {width: 100}]}><Text >{person.lName},  {person.fName}</Text></View>*/