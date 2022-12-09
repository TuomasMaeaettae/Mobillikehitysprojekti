import React, { useEffect, useState } from "react";
import {Text, View, ScrollView} from "react-native";
import styles from './Styles';
import { onSnapshot, query} from 'firebase/firestore';
import { firestore, collection, USERS,} from './firebase/Config'

export default function Luokka() {
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

return(
  <View style={styles.container}>
  <ScrollView>
    {
      userss.map((user) => (
        <View style={styles.user} key={user.id}>
          <Text style={styles.userInfo}></Text>
          <Text>{user.text}</Text>
        </View>
      ))
    }
  </ScrollView>
</View>
);
}