import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, Text, ScrollView, StatusBar } from 'react-native';
import Row from './Row'
import Header from './Header'
import { onSnapshot, query, where} from 'firebase/firestore';
import { firestore, collection, USERS,} from '../firebase/Config'
import { useFocusEffect } from '@react-navigation/native';


 export default function App({route}) {

  const [selectedId, setSelectedId] = useState(null);
  const [userss, setNewUserss] = useState([])
  const luokka3 = route.params;
  console.log(luokka3.luokka.luokka, "jippii")

    useEffect(() => {
    
    const q = query(collection(firestore,USERS), where( "luokka", "==", luokka3.luokka.luokka.luokka));
    const unsubscribe = onSnapshot(q,(querySnapshot) => {
      const tempMessages = []
      
      querySnapshot.forEach((doc) => {
        const messageObject = {
          id: doc.id,
          nimi: (doc.data().fName + " " + doc.data().lName),
          akt: (doc.data().aktiivinen),
          kTeht: (doc.data().kotiteht),
          minus: (doc.data().miinus),
          plus: (doc.data().plussa),
          luokka: (doc.data().luokka),
          hair: (doc.data().hairinta)}

        tempMessages.push(messageObject)
      })
      setNewUserss(tempMessages)
      console.log(userss)
    })
    return () => {
      unsubscribe() 
    }}, [route])
  //console.log(userss)
  const select = (id) => {
    setSelectedId(id);
  }
   return (
    <ScrollView horizontal={true}>
     <SafeAreaView style={styles.container}>
     <View style = {styles.header}><Text style = {styles.htext}> Luokan {luokka3.luokka.luokka.luokka} palaute</Text></View>
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
    backgroundColor: 'pink',
  },
  box: {
    borderWidth: 11,
  },
  header:{
    margin: 10,
    borderWidth: 0,
    backgroundColor: '#9370db',
    width: 300,
    height: 47,
    borderRadius: 25,
    alignItems: "center",
  },
  htext: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black'


  }
})

/*useFocusEffect(
    useCallback(() => {
    
    const q = query(collection(firestore,USERS), where( "luokka", "==", luokka2.luokka.luokka));
    
     //Tohon "Student"-sanan paikalle propsina luokan nimi, jotta databaesta saa seulottua oikean luokan oppilaat.
    

    const unsubscribe = onSnapshot(q,(querySnapshot) => {
      const tempMessages = []
      
      querySnapshot.forEach((doc) => {
        const messageObject = {
          id: doc.id,
          nimi: (doc.data().fName + " " + doc.data().lName),
          akt: (doc.data().aktiivinen),
          kTeht: (doc.data().kotiteht),
          minus: (doc.data().miinus),
          plus: (doc.data().plussa),
          luokka: (doc.data().luokka)}

        tempMessages.push(messageObject)
      })
      setNewUserss(tempMessages)
    })

    return () => {
      unsubscribe()
      
      
    }

  }, [route])) */