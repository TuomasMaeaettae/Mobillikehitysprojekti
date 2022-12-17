import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useLayoutEffect } from "react";
import {Text, View, ScrollView, Modal, TextInput, TouchableOpacity, ModalInfo} from "react-native";
import styles from './Styles';
import { onSnapshot, query, where} from 'firebase/firestore';
import { firestore, collection, USERS, MESSAGES} from './firebase/Config'
import { AntDesign } from '@expo/vector-icons';


export default function Luokka({route, navigation}) {
  const [userss, setNewUserss] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const luokka2 = route.params;
  const luokka = luokka2;
  console.log(luokka2.luokka.luokka, "jippii")
  useEffect(() => {
    
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

  }, [route])

  useEffect(() => {
    const q = query(collection(firestore,USERS));

    const unsubscribe = onSnapshot(q,(querySnapshot) => {
      const tempMessages = []
      
      querySnapshot.forEach((doc) => {
        if(doc.data().role == "Student"){
        const messageObject = {
          id: doc.id,
          text: (doc.data().fName + " " + doc.data().lName + ", oppilas"),
        }
        tempMessages.push(messageObject)}
      })
      //setNewUserss(tempMessages)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return(
    <View style={styles.container}>
    <ScrollView>
      {
        userss.map((user) => (
          <View style={styles.user} key={user.id}>
            <Text style={styles.userInfo}></Text>
            <Text>{user.nimi}</Text>
            <AntDesign
                style={styles.navButton}
                name="message1"
                size={24}
                color="black"
                onPress={() => navigation.navigate("Message", )}
            />
          </View>
        ))
      }
      <TouchableOpacity style={styles.luokkalistaus}  onPress={() => (navigation.navigate('LuokkaTaulukko', {luokka}), console.log(luokka, "juujuu"))}><Text style={styles.luokkatext2}>Katso koko luokan palautteet</Text></TouchableOpacity>
    </ScrollView>
  </View>
  );
}