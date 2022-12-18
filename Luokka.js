import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useLayoutEffect } from "react";
import {Text, View, ScrollView, Modal, TextInput, TouchableOpacity, ModalInfo, StyleSheet} from "react-native";
import Styles from './Styles';
import { doc, onSnapshot, query, where} from 'firebase/firestore';
import { firestore, collection, USERS, MESSAGES, addDoc, updateDoc, setDoc} from './firebase/Config'
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
          luokka: (doc.data().luokka),
          hair: (doc.data().hairinta)}

        tempMessages.push(messageObject)
      })
      setNewUserss(tempMessages)
    })

    return () => {
      unsubscribe() 
    }

  }, [route])

  const ebinTallennusplus2  = (user) => {
    console.log(user, "jiihaa")
  }

  const ebinTallennusPlus = async (user) => {
    console.log("nappia plus")
    const plussaRef = doc(firestore, USERS, user.id)
    await updateDoc(plussaRef, {
      plussa: user.plus+1
    })
  }

  const ebinTallennusMinus = async (user) => {
    console.log("nappia minus")
    const plussaRef = doc(firestore, USERS, user.id)
    await updateDoc(plussaRef, {
      miinus: user.minus+1
    })
  }

  const ebinTallennusHair = async (user) => {
    console.log("nappia hairinta")
    const plussaRef = doc(firestore, USERS, user.id)
    await updateDoc(plussaRef, {
      hairinta: user.hair+1
    })
  }

  return(
    <View style={Styles.container}>
    <ScrollView>
    <TouchableOpacity style={Styles.luokkalistaus2}  onPress={() => (navigation.navigate('LuokkaTaulukko', {luokka}), console.log(luokka, "juujuu"))}><Text style={Styles.luokkatext2}>Katso koko luokan {luokka.luokka.luokka} palautteet</Text></TouchableOpacity>
    <Text style={styles.otsikko2}>Luokka {luokka.luokka.luokka}</Text>
    <Text style={styles.otsikko}>Anna palautetta haluamallesi oppilaalle</Text>
      {
        userss.map((user) => (
          <View style={styles.user} key={user.id}>
            <Text style={Styles.userInfo}></Text>
            <Text style={styles.nimi}>{user.nimi}</Text>
            <View style = {styles.row}>
              <TouchableOpacity>
            <AntDesign
                style={styles.navButton2}
                name="message1"
                size={24}
                color="black"
                onPress={() => navigation.navigate("Message", )}
            /></TouchableOpacity>
            <AntDesign
                style={styles.navButton}
                name="plus"
                size={24}
                color="black"
                onPress={() => ebinTallennusPlus(user)}
            />
            <TouchableOpacity>
            <AntDesign
                style={styles.navButton3}
                name="minus"
                size={24}
                color="black"
                onPress={() => ebinTallennusMinus(user)}
            />
            </TouchableOpacity>
            <TouchableOpacity>
            <AntDesign
                style={styles.navButton4}
                name="book"
                size={24}
                color="black"
                onPress={() => ebinTallennusHair(user)}
            /></TouchableOpacity>
            </View>
          </View>
        ))
      }
    </ScrollView>
  </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: "center"
  },
  navButton:{
    padding: 10,
    margin: 10,
    backgroundColor: 'green',
    borderRadius: 25,
  },
  navButton3:{
    padding: 10,
    margin: 10,
    backgroundColor: 'red',
    borderRadius: 25,
  },
  navButton4:{
    padding: 10,
    margin: 10,
    backgroundColor: 'purple',
    borderRadius: 25,
  },
  navButton2:{
    padding: 10,
    margin: 10,
    marginLeft: 30,
    backgroundColor: 'purple',
    borderRadius: 25,
  },
  nimi: {
    fontWeight: 'bold',
    marginLeft: 30,
    fontSize: 30
  },
  user: {
    backgroundColor: 'pink',
    borderRadius: 25,
    margin: 10
  },
  otsikko: {
    fontWeight: 'bold',
    marginLeft: 25,
    fontSize: 17
  },
  otsikko2: {
    fontWeight: 'bold',
    marginLeft: 25,
    fontSize: 30
  },
})