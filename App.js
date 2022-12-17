import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {StyleSheet,Text,View,Image,TextInput,Button,TouchableOpacity,ScrollView,} from "react-native";
import styles from './Styles';
import TopBar from './components/TopBar';
import Luokka from "./Luokka";
import Message from "./Message";
import Taulukko from "./components/Taulukko";
import LuokanLuonti from './components/LuokanLuonti'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {getAuth, signInWithEmailAndPassword, firebase} from './firebase/Config'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Home from "./Home";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalDropdown from 'react-native-modal-dropdown';
import logo from './assets/logo.webp'
import { onSnapshot, query} from 'firebase/firestore';
import { firestore, collection, USERS,} from './firebase/Config'

export default function App() {
  const [email, setEmail] = useState('testi@testi.fi');
  const [password, setPassword] = useState('testi!');
  const [loginLogin, setLoginLogin] = useState(false);
  const auth = getAuth()

  const login = () => {
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
        console.log(userCredential.user)
        setLoginLogin(true)
        console.log(auth.currentUser.uid)
    }).catch ((error) => {
        if (error.code === 'auth/wrong-password' || error.code === 'auth/user.not-found'){
            alert("Käyttäjätunnus tai salasana väärin")
        } else if (error.code === 'auth/too-many-requests'){
            alert("Too many attempts, your account will be locked temporarily")
        }else if (email === '' || password === ''){
          alert("Aloita kirjoittamalla sähköposti ja salasana")
        }else {
            console.log(error.code)
            console.log(error.message)
            alert("Käyttäjätunnus tai salasana väärin")
        }
    })}
    function Dropdown (){
      return ( 
          <ModalDropdown
          dropdownTextStyle = {{fontWeight:'bold', textAlign: 'left', fontSize: 18, color: "black", marginTop:-10, backgroundColor: "#9370db"}}
          dropdownStyle={{width:160, borderColor: "black", borderWidth: 2, height: 30, marginTop: -60}}
      defaultValue={''} 
      options={['KIRJAUDU ULOS']} onSelect={() => {setLoginLogin(false), setEmail(''), setPassword('') }}>
          <MaterialCommunityIcons style={styles.menu} name="menu" color="black" size={40} />
      </ModalDropdown>
      )
    }

    function TopBar2() {
      return (
        <View style={Styles.container3}>
          <Dropdown ></Dropdown>
          <Image style={styles.logo2} source={logo}></Image>
          <Text></Text>
        </View>
      );
    }
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  if (loginLogin==false) {
    return (
        <View style={styles.container}>
      <View style={styles.bar}><TopBar></TopBar></View>
      <StatusBar style="auto" />
      <View style={styles.container2}>
      <View style={styles.inputView}>
        <TextInput style={styles.TextInput} placeholder="sähköposti" placeholderTextColor="black" onChangeText={(email) => setEmail(email)}/>
      </View>
      <View style={styles.inputView}>
        <TextInput style={styles.TextInput} placeholder="salasana" placeholderTextColor="black" secureTextEntry={true} onChangeText={(password) => setPassword(password)}/>
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Unohditko salasanasi?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={login}>
        <Text style={styles.loginText}>KIRJAUDU SISÄÄN</Text>
      </TouchableOpacity>
      </View>
    </View>
    );
  }

  if(auth.currentUser.email.includes("oppilas")){
  return (
    <NavigationContainer>
      <TopBar2></TopBar2>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Home" component={Home} options={{tabBarLabel: 'Etusivu',tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />),}}/>
            </Tab.Navigator>
    </NavigationContainer>
  );}

  return (
    <NavigationContainer>
      <TopBar2></TopBar2>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Home" component={Home} options={{tabBarLabel: 'Etusivu',tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />),}}/>
      <Tab.Screen name="Luokka" component={Luokka} options={{tabBarLabel: 'Palautteenanto',tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="google-classroom" color={color} size={26} />),}}/>
            <Tab.Screen name="LuokkaTaulukko" component={Taulukko} options={{tabBarLabel: 'Luokka',tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="google-classroom" color={color} size={26} />),}}/>
            <Stack.Screen name="Message" component={Message} options={{tabBarLabel: 'Viesti',tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="message" color={color} size={26} />),}}/>
      <Tab.Screen name="LuokanLuonti" component={LuokanLuonti} options={{tabBarLabel: 'Luo oppilas',tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus" color={color} size={26} />),}}/>
            </Tab.Navigator>
    </NavigationContainer>
  );
}

const Styles = StyleSheet.create({
container3: {
alignSelf: 'stretch',
height: 80,
flexDirection: 'row',
backgroundColor: '#ff69b4',
alignItems: 'center',
justifyContent: 'space-between', 
paddingLeft: 10,
paddingRight: 10,
fontWeight:'bold',
}
});

