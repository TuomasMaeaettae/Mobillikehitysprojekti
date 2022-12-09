import { StatusBar } from "expo-status-bar";
import React from "react";
import {View, Text} from "react-native";
import styles from './Styles';


export default function Home() {
  return(
      <View style={styles.container}> 
          <StatusBar style="auto" />
          <Text style={styles.welcome}>Tervetuloa Lissuun!</Text>
      </View>
  );
}