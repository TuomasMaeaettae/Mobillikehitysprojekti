import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from './Styles';
import Luokanluonti from './components/LuokanLuonti'


export default function Home() {
  return(
      <View style={styles.container}> 
          <StatusBar style="auto" />
          <Text style={styles.welcome}>Tervetuloa Lissuun!</Text>
          <Text> Luo uusi luokka painamalla plussaa!</Text>
      </View>
  );
}