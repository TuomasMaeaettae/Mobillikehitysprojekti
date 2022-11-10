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
import TopBar2 from './components/TopBar2';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {getAuth, signInWithEmailAndPassword} from './firebase/Config'
import { NavigationContainer } from "@react-navigation/native";
import App from './App'

export default function Home() {
    const [login, setLogin] = useState(true)

    const Stack = createNativeStackNavigator();

    const logout = () => {
        setLogin(false)
    }

    if (login==true){
        return(
            <View style={styles.container}> 
                <View style={styles.bar}><TopBar2></TopBar2></View>
                <StatusBar style="auto" />
                <View style={styles.container2}>
                <Button title='Kirjaudu ulos' onPress={() => logout()}></Button>
                </View>
            </View>
        );
    }
    else{
        
       }
    

}