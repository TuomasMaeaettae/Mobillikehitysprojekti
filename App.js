import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {StyleSheet,Text,View,Image,TextInput,Button,TouchableOpacity,ScrollView,} from "react-native";
import styles from './Styles';
import TopBar from './components/TopBar';
import Luokka from "./Luokka";
import Taulukko from "./components/Taulukko";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {getAuth, signInWithEmailAndPassword, firebase} from './firebase/Config'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Home from "./Home";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalDropdown from 'react-native-modal-dropdown';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import logo from './assets/logo.png'

export default function App() {
  const [email, setEmail] = useState('testi@testi.fi');
  const [password, setPassword] = useState('testi!');
  const [loginLogin, setLoginLogin] = useState(false);

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
            alert("Too many attempts, your account will be locked temporarily")
        } else {
            console.log(error.code)
            console.log(error.message)
        }
    })}
    function Dropdown (){
      const auth = getAuth()
      return ( 
          <ModalDropdown style={styles.dropdown_1}
      defaultValue={''} 
      options={['Kirjaudu ulos']} onSelect={() => setLoginLogin(false)}>
          <FontAwesomeIcon name="navicon" style={styles.bars}></FontAwesomeIcon>
      </ModalDropdown>
      )
    }
    function TopBar2() {
      return (
        <View style={Styles.container3}>
          <Dropdown ></Dropdown>
          <Image style={styles.logo} source={logo}></Image>
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
        <TextInput style={styles.TextInput} placeholder="sähköposti" placeholderTextColor="#003f5c" onChangeText={(email) => setEmail(email)}/>
      </View>
      <View style={styles.inputView}>
        <TextInput style={styles.TextInput} placeholder="salasana" placeholderTextColor="#003f5c" secureTextEntry={true} onChangeText={(password) => setPassword(password)}/>
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
  return (
    <NavigationContainer>
      <TopBar2></TopBar2>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Home" component={Home} options={{tabBarLabel: 'Etusivu',tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />),}}/>
      <Tab.Screen name="Luokka" component={Luokka} options={{tabBarLabel: 'Luokka',tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="google-classroom" color={color} size={26} />),}}/>
      <Tab.Screen name="LuokkaTaulukko" component={Taulukko} options={{tabBarLabel: 'Luokka',tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="google-classroom" color={color} size={26} />),}}/>
            </Tab.Navigator>
    </NavigationContainer>
  );
}

const Styles = StyleSheet.create({
container3: {
alignSelf: 'stretch',
height: 100,
flexDirection: 'row',
backgroundColor: 'pink',
alignItems: 'center',
justifyContent: 'space-between', 
paddingLeft: 10,
paddingRight: 10,
fontWeight:'bold',
}
});

