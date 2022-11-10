import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styles from './Styles';
import TopBar from './components/TopBar';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {getAuth, signInWithEmailAndPassword} from './firebase/Config'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Home from "./Home";


 
export default function App({navigation}) {
  const [email, setEmail] = useState('keijo.kekkila@keijonkoulu.fi');
  const [password, setPassword] = useState('Keijokekkila');
  const [loginLogin, setLoginLogin] = useState(false);


  const Stack = createNativeStackNavigator();

  const login = () => {
    const auth = getAuth()
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
        console.log(userCredential.user)
        setLoginLogin(true) 

    }).catch ((error) => {
        if (error.code === 'auth/wrong-password' || error.code === 'auth/user.not-found'){
            alert("Invalid credentials!")
        } else if (error.code === 'auth/too-many-requests'){
            alert("Too many attempts, you account will be locked temporarily")
        } else {
            console.log(error.code)
            console.log(error.message)
        }
    })
}
 if (loginLogin===true){
  return(
  <NavigationContainer style={styles.container}>
  <Stack.Navigator>
        <Stack.Screen
        name="Home"
        component={Home}
        />
      </Stack.Navigator>
      </NavigationContainer>
  );
 }
 else{
  return (
    <NavigationContainer style={styles.container}>
      
      <View style={styles.bar}><TopBar></TopBar></View>
      <StatusBar style="auto" />
      <View style={styles.container2}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="sähköposti"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="salasana"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Unohditko salasanasi?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={() => login()}>
        <Text style={styles.loginText}>KIRJAUDU SISÄÄN</Text>
      </TouchableOpacity>
      </View>
    </NavigationContainer>
  );
 }
}