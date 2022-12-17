import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useLayoutEffect } from "react";
import {Text, View, ScrollView, Modal, TextInput, TouchableOpacity, ModalInfo} from "react-native";
import styles from './Styles';
import { onSnapshot, query, where} from 'firebase/firestore';
import { firestore, collection, USERS, MESSAGES, addDoc, updateDoc, setDoc} from './firebase/Config'
import { AntDesign } from '@expo/vector-icons';

export default function Luokka({navigation}) {
  const [userss, setNewUserss] = useState([])
  const [modalVisible, setModalVisible] = useState(false);

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
          fNimi: (doc.data().fName),
          lNimi: (doc.data().lName),
          akt: (doc.data().aktiivinen),
          kTeht: (doc.data().kotiteht),
          minus: (doc.data().miinus),
          plus: (doc.data().plussa)}
        
        tempMessages.push(messageObject)}
      })
      setNewUserss(tempMessages)
    })

    return () => {
      unsubscribe()
    }
  }, [])
  const ebinTallennusplus2  = (user) => {
    console.log(user, "jiihaa")
  }

  const ebinTallennusplus = async(user) => {const docRef = await updateDoc(collection(firestore, USERS), {
    uid: user.id,
    fName: user.fNimi,
    lName: user.lNimi,
    plussa: user.plus+1
  })};

  return(
    <View style={styles.container}>
    <ScrollView>
      {
        userss.map((user, index) => (
          <View style={styles.user} key={user.id}>
            <Text style={styles.userInfo}></Text>
            <Text>{user.fNimi} {user.lNimi}</Text>
            <AntDesign
                style={styles.navButton}
                name="message1"
                size={24}
                color="black"
                onPress={() => navigation.navigate('Message')}
            />
            <AntDesign
                style={styles.navButton}
                name="plus"
                size={24}
                color="black"
                onPress={() => ebinTallennusplus(user.plus)}
            />
            <AntDesign
                style={styles.navButton}
                name="minus"
                size={24}
                color="black"
                onPress={() => navigation.navigate('Message')}
            />
            <AntDesign
                style={styles.navButton}
                name="book"
                size={24}
                color="black"
                onPress={() => navigation.navigate('Message')}
            />
          </View>
        ))
      }
    </ScrollView>
  </View>
  );
    }