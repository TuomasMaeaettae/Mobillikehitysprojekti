import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect} from "react";
import {View, Text, TouchableOpacity, ScrollView, SafeAreaView, FlatList, StyleSheet} from "react-native";
import styles from './Styles';
import { doc, onSnapshot, query, where} from 'firebase/firestore';
import { firestore, collection, USERS, CLASSES,} from './firebase/Config'
import {getAuth} from './firebase/Config'
import Row from './components/Row'
import Header from './components/Header'

export default function Home({}) {
  const auth = getAuth();
  const [uid, setUid] = useState(auth.currentUser.email)
  const [name, setName] = useState([])
  const [selectedId, setSelectedId] = useState(null);
  const [userss, setNewUserss] = useState([])
  console.log(auth.currentUser.email + "hasdasdasaaaa")

    useEffect(() => {
    
    const q = query(collection(firestore,USERS), where( "sposti", "==", auth.currentUser.email));
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
          hair: (doc.data().hairinta),
          sposti: (doc.data().sposti)}
        tempMessages.push(messageObject)
      })
      setName(tempMessages)
      console.log(name)
    })
    return () => {
      unsubscribe() 
    }}, [])
  //console.log(userss)
  const select = (id) => {
    setSelectedId(id);
  }

  const data = name.filter(function(item){
    return item.sposti == auth.currentUser.email;
  })
  console.log(data)
   return (
    <ScrollView horizontal={true}>
     <SafeAreaView style={Styles.container}>
      <FlatList
        data={name} 
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

const Styles = StyleSheet.create({
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