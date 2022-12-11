import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, FlatList, TextInput } from 'react-native';
import styles from './Styles';
import TopBar2 from './components/TopBar2.js';
import { NewClassPopup } from './components/NewClassPopup';
import React, { useEffect, useState } from 'react';
import { addDoc, CLASSES, collection, firestore, USERS } from './firebase/Config';
import { async } from '@firebase/util';
import { onSnapshot, query, QuerySnapshot } from 'firebase/firestore';

export default function App() {

  const [newClasses, setNewClasses] = useState('');
  
  //esimerkkinä mihin luokat listautuis
  const ClassList = [
    {
      id: 1,
      name: 'Matematiikka 10'
    },
    {
      id: 2,
      name: 'Äidinkieli 5'
    },
  ]

  let popupRef = React.createRef()

  const onShowPopup = () => {
    popupRef.show()
  }
  const onClosePopup = () => {
    popupRef.close()
  }

  return (
    <View style={styles.container}> 
                <View style={styles.bar}><TopBar2></TopBar2></View>
                <StatusBar style="auto" />
                <View style={styles.containerClasses}>
                <FlatList data={ClassList}
                renderItem={({item})=> <Text>{item.name}</Text>}
                keyExtractor={item => item.id}
                style={{
                  margin: 10,
                }}/>
                <NewClassPopup
                title="LUOKAN LUONTI" 
                ref={(target) => popupRef = target} 
                onTouchOutside={onClosePopup}/>
                </View>
                <View style={styles.container3}>
                <Button title='Lisää uusi luokka' onPress={onShowPopup}></Button>
                </View>
            </View>
  );
}
