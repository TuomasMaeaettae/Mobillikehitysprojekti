import { StatusBar } from "expo-status-bar";
import React, {useEffect, useState} from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Text, ScrollView, TouchableOpacity, Button } from 'react-native';
import styles from './Styles';
import { onSnapshot, query, where} from 'firebase/firestore';
import { firestore, collection, USERS,} from './firebase/Config'


export default function Home({navigation}) {
  const [selectedId, setSelectedId] = useState(null);
  const [luokat, addNewLuokka] = useState([])
  const [luokka2, addNewLuokka2] = useState([])
  const [testi, addTesti] = useState([])

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

  console.log(luokat , "Home näkymä")
  
  
 

  return(
      <View style={styles.container}> 
          <StatusBar style="auto" />
          <Text style={styles.welcome}>Tervetuloa Lissuun!</Text>
          <Text> Luo uusi luokka painamalla plussaa!</Text>
          <Text> Alla näet listan loukistasi</Text>
          <Text> Klikkaamalla pääset antamaan palautetta</Text>
          
          <View  >
              {luokat.map((luokka, index) =>(
              <TouchableOpacity style={{borderWidth : 1}} key={index}  onPress={() => (navigation.navigate('LuokkaTaulukko', {luokka}), console.log(luokka, "juujuu"))}><Text>{luokka.luokka}</Text></TouchableOpacity>
              ))}
          </View>
      </View>
  );
}




//<Button title="Loukka 7a" onPress={() => navigation.navigate('LuokanLuonti')}/>

/*  function luonti(num) {
    const isEqual = (first, second) => {
      return JSON.stringify(first) === JSON.stringify(second);
  }
  
  const result = luokat.some(e => isEqual(e, {
      'luokka': num.luokka,
  }))

  console.log(result, "wataa")
    if(!result){
      return ;
    }else {
      return num.luokka
    }
    
  }

  const luokka = luokat.map(luonti)
console.log(luokka , "rrrrr")*/

/* 
<View  >
              {luokat.map((luokka, index) =>(
               (luokka.includes(luokka.luokka)
             ? (<TouchableOpacity style={{borderWidth : 1}} key={index}  onPress={() => (navigation.navigate('LuokkaTaulukko', {luokka}), console.log(luokka, "juujuu"))}><Text>{luokka.luokka}</Text></TouchableOpacity>)
             : null)
               ))}
          </View>*/


/**luokat.map((luokka) =>{
   if (luokka.includesOnce(testi.luokka))
   {
      addNewLuokka2(luokka.luokka)
   }
   }) */