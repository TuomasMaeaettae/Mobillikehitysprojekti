import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {Text, View, ScrollView, TextInput, Button} from "react-native";
import styles from './Styles';
import { onSnapshot, query} from 'firebase/firestore';
import { firestore, collection, USERS, MESSAGES, VIESTI, orderBy, addDoc, getAuth } from './firebase/Config'

export default function Message({navigation}) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('')
  const user = query(collection(firestore,USERS));
  const auth = getAuth();
  const [uid, setUid] = useState(auth.currentUser.uid)
  const [name, setName] = useState([])
 
  const q = query(collection(firestore,USERS));
  
  const save = async() => {
    if(doc.data().uid == uid){
    const docRef = await addDoc(collection(firestore,VIESTI),{
      text: newMessage,
      //created: serverTimestamp(),
      sentBy: uid,
      sentTo: user.uid,
    }).catch (error => console.log(error))
    setNewMessage('')
   }
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