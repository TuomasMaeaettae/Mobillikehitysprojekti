import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import React, {useState} from 'react'
import { firestore, collection, USERS, addDoc,} from '../firebase/Config'


export default function LuokanLuonti({route}) {

    const ebinTallennus = async() => {const docRef = await addDoc(collection(firestore, USERS), {
        fName: eNimi,
        lName: sNimi,
        luokka: luokka,
        role: "Student"
      });
      console.log("Document written with ID: ", docRef.id);}

    const [eNimi, onChangeeNimi] = useState('');
    const [sNimi, onChangesNimi] = useState('');
    const [luokka, onChangeluokka] = useState('')
    
  return (
    <View>
        <View>
      <Text>Anna oppilaan etunimi</Text>
      <TextInput style={Styles.inPut}
                placeholder="etunimi"
                onChangeText={onChangeeNimi}
                value={eNimi}
                />
     <Text>Anna oppilaan sukunimi</Text>
      <TextInput style={Styles.inPut}
                placeholder="sukunimi"
                onChangeText={onChangesNimi}
                value={sNimi}
                />
<Text>Anna oppilaan luokka</Text>
      <TextInput style={Styles.inPut}
                placeholder="luokka"
                onChangeText={onChangeluokka}
                value={luokka}
                />
    </View>
    <Button 
        onPress={() => {console.log(eNimi, sNimi, luokka), alert("Oppilas tallennettu"), ebinTallennus() }}
        title="Tallenna oppilas"
        color="#841584">
    </Button>
    </View>
  )
}

const Styles = StyleSheet.create({
    inPut: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }

})