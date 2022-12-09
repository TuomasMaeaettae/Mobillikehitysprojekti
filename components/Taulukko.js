import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, Text, ScrollView, StatusBar } from 'react-native';
import {DATA} from '../Data'
import Row from './Row'
import Header from './Header'
import { onSnapshot, query} from 'firebase/firestore';
import { firestore, collection, USERS,} from '../firebase/Config'


 export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [userss, setNewUserss] = useState([])

  useEffect(() => {
    const q = query(collection(firestore,USERS));

    const unsubscribe = onSnapshot(q,(querySnapshot) => {
      const tempMessages = []
      
      querySnapshot.forEach((doc) => {
        if(doc.data().role == "Teacher"){
          const messageObject = {
            id: doc.id,
            text: (doc.data().fName + " " + doc.data().lName + ", opettaja")
          }
          tempMessages.push(messageObject)}
        if(doc.data().role == "Student"){
        const messageObject = {
          id: doc.id,
          text: (doc.data().fName + " " + doc.data().lName + ", oppilas")
        }
        tempMessages.push(messageObject)}
      })
      setNewUserss(tempMessages)
    })

    return () => {
      unsubscribe()
    }
  }, [])
  console.log(userss)

  const select = (id) => {
    setSelectedId(id);
  }

   return (
    <ScrollView horizontal={true}>
     <SafeAreaView style={styles.container}>
     <View style = {styles.header}><Text style = {styles.htext}> Luokan palaute</Text></View>
      <FlatList
        data={userss} 
        keyExtractor={item => item.id}
        extraData={selectedId}
        ListHeaderComponent={() => <Header/>}
        renderItem={({item}) => (
          <Row person={item} selectedId={selectedId} select={select}/>
        )}>
      </FlatList>
     </SafeAreaView>
    </ScrollView>
   );
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink'
  },
  box: {
    borderWidth: 1,
  },
  header:{
    margin: 10,
    borderWidth: 1,
    backgroundColor: 'green',
    width: 100,
  },
  htext: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'pink'


  }
})

