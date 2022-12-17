import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect} from "react";
import {View, Text, TouchableOpacity, ScrollView} from "react-native";
import styles from './Styles';
import { doc, onSnapshot, query, where} from 'firebase/firestore';
import { firestore, collection, USERS, CLASSES,} from './firebase/Config'
import {getAuth} from './firebase/Config'

export default function Home({navigation}) {
  const auth = getAuth();
  const [uid, setUid] = useState(auth.currentUser.uid)
  const [name, setName] = useState([])
  const [opetettavat1, setOpetettavat1] = useState([])
  const [opetettavat2, setOpetettavat2] = useState([])

  useEffect(() => {
  const q = query(collection(firestore,USERS));

  const unsubscribe = onSnapshot(q,(querySnapshot) => {
    const tempMessages = []
    
    querySnapshot.forEach((doc) => {
      if(doc.data().uid == uid){
        const messageObject = {
          id: doc.id,
          text: (doc.data().fName + " " + doc.data().lName),
          opetettavat1: doc.data().opetettavat1,
          opetettavat2: doc.data().opetettavat2
        }
        tempMessages.push(messageObject)}
    })
    setName(tempMessages)
    setOpetettavat1(tempMessages)
  })
  return () => {
    unsubscribe()
  }
}, [])
const [luokat, addNewLuokka] = useState([])
  const [luokka2, addNewLuokka2] = useState([])

  useEffect(() => {
    const q = query(collection(firestore,USERS), where("role", "==", "Student",));

    const unsubscribe = onSnapshot(q,(querySnapshot) => {
      const tempMessages = []
      
      querySnapshot.forEach((doc) => {
        const messageObject = {
          luokka: (doc.data().luokka)}

        tempMessages.push(messageObject)
      })
      addNewLuokka(tempMessages)
    })

    return () => {
      unsubscribe()
    }
  }, [])
  useEffect(() => {
    const q = query(collection(firestore,CLASSES));

    const unsubscribe = onSnapshot(q,(querySnapshot) => {
      const tempMessages = []
      
      querySnapshot.forEach((doc) => {
        const messageObject = {
          luokka: (doc.data().luokka)}

        tempMessages.push(messageObject)
      })
      addNewLuokka2(tempMessages)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  console.log(luokat , "Home näkymä")

  return(
    <ScrollView>
      <View style={styles.container}> 
          <StatusBar style="auto" />
          <Text style={styles.welcome}>Tervetuloa Lissuun!</Text>
          {
      name.map((name) => (
        <View key={name.id}>
          <Text style={styles.userInfo2}></Text>
          <Text style={styles.userInfo3}>{name.text}</Text>
        </View>
      ))
    }
    <Text> Luo uusi luokka painamalla plussaa!</Text>
          <Text> Alla näet listan koulun luokista</Text>
          <Text> Klikkaamalla pääset antamaan palautetta</Text>
          <View>
              {
              luokka2.map((luokka, index) =>(
             <TouchableOpacity style={styles.luokkalistaus} key={index}  onPress={() => (navigation.navigate('Luokka', {luokka}), console.log(luokka, "juujuu"))}><Text style={styles.luokkatext}>{luokka.luokka}</Text></TouchableOpacity>)
            )}
          </View>
      </View>
      </ScrollView>
  );
}