import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import React, {useState} from 'react'
import { firestore, collection, USERS, addDoc,} from '../firebase/Config'


export default function LuokanLuonti({route}) {

    const ebinTallennus = async() => {const docRef = await addDoc(collection(firestore, USERS), {
        fName: eNimi,
        lName: sNimi,
        luokka: luokka,
        role: "Student",
        hairinta: 0,
        miinus: 0,
        plussa: 0,
        sposti: (eNimi + "." + sNimi + "@oppilas.keijonkoulu.fi")
      });
      console.log("Document written with ID: ", docRef.id);}

    const [eNimi, onChangeeNimi] = useState('');
    const [sNimi, onChangesNimi] = useState('');
    const [luokka, onChangeluokka] = useState('')
    
  return (
    <View>
        <View>
      <Text style={Styles.texti}>Anna oppilaan etunimi</Text>
      <TextInput style={Styles.inPut}
                placeholder="etunimi"
                onChangeText={onChangeeNimi}
                value={eNimi}
                />
     <Text style={Styles.texti}>Anna oppilaan sukunimi</Text>
      <TextInput style={Styles.inPut}
                placeholder="sukunimi"
                onChangeText={onChangesNimi}
                value={sNimi}
                />
<Text style={Styles.texti}>Anna oppilaan luokka</Text>
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
    },
    texti:{
        fontWeight: "bold",
        fontSize: 20,
        marginLeft: 14,
        marginBottom: -10
    }

})