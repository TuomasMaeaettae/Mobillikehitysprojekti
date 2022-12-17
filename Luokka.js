import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useLayoutEffect } from "react";
import {Text, View, ScrollView, Modal, TextInput, TouchableOpacity, ModalInfo} from "react-native";
import styles from './Styles';
import { onSnapshot, query, where} from 'firebase/firestore';
import { firestore, collection, USERS, MESSAGES} from './firebase/Config'
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
          text: (doc.data().fName + " " + doc.data().lName + ", oppilas"),
        }
        tempMessages.push(messageObject)}
      })
      setNewUserss(tempMessages)
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
            <Text>{user.text}</Text>
            <AntDesign
                style={styles.navButton}
                name="message1"
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