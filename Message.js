import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {Text, View, ScrollView, TextInput, Button} from "react-native";
import styles from './Styles';
import { onSnapshot, query, firebase, orderBy} from 'firebase/firestore';
import { firestore, 
        collection, 
        USERS, 
        MESSAGES, 
        VIESTI, 
        addDoc, 
        getAuth, 
        onAuthStateChanged } from './firebase/Config'

export default function Message({navigation}) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('')
  const user = query(collection(firestore,USERS));
  const auth = getAuth();
  const [uid, setUid] = useState(auth.currentUser.uid)
  const [name, setName] = useState([])

  useEffect(() => {
    const sender = query(collection(firestore,USERS));
   
    const unsubscribe = onSnapshot(sender,(querySnapshot) => {
      const tempMessages = []
     
      querySnapshot.forEach((doc) => {
        if(doc.data().uid == uid){
          const messageObject = {
            id: doc.id,
            text: (doc.data().fName + " " + doc.data().lName)
          }
          tempMessages.push(messageObject)}
      })
      setName(tempMessages)
    })
    return () => {
      unsubscribe()
    }
  }, [])
  
  const save = async() => {
      const docRef = await addDoc(collection(firestore,VIESTI),{
        text: newMessage,
        //created: serverTimestamp(),
        sentBy: name,
        //sentTo: user,
      }).catch (error => console.log(error))
      setNewMessage('')
  }

    useEffect(() => {
      const q = query(collection(firestore,VIESTI), orderBy('created', 'asc'))
  
      const unsubscribe = onSnapshot(q,(querySnapshot) => {
        const tempMessages = []
  
        querySnapshot.forEach((doc) => {
          const messageObject = {
            id: doc.id,
            text: doc.data().text,
            //created: convertFirebaseTimeStampToJS(doc.data().created)
          }
          tempMessages.push(messageObject)
        })
        setNewMessage(tempMessages)
      })
  
      return () => {
        unsubscribe()
      }
     }, [])
    

  return (
    <View style={styles.container}>
      <ScrollView>
        {
          messages.map((message) => (
            <View style={styles.message} key={message.id}>
              <Text style={styles.messageInfo}>{message.created}</Text>
              <Text>{message.text}{message.uid}</Text>
            </View>
          ))
        }
      </ScrollView>
      <TextInput 
        placeholder='Enter new message here...'
        value={newMessage}
        onChangeText={text => setNewMessage(text)}  
      />
      <Button title="Save" onPress={save} />
    </View>
  );
}