import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center"
      },
      container2: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      },
      logo: {
        alignItems: "center",
        width: "30%",
        height: "50%",
        resizeMode: 'stretch',
      },
     
      image: {
        flex: 1,
        width: 400,
        height: 0,
        resizeMode: 'contain',
    },
    bar: {
      backgroundColor: "#FFC0CB",
      borderRadius: 30,
      width: "100%",
      height: 45,
      marginBottom: 20,
      alignItems: "center",
    },
     
      inputView: {
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
      },
     
      TextInput: {
        height: 50,
        flex: 1,
        padding: 12,
        marginLeft: 20,
        fontWeight: "bold"
      },
     
      forgot_button: {
        height: 30,
        marginBottom: 30,
        fontWeight:"bold"
      },
     
      loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FF1493",
      },
      loginText: {
        fontWeight:"bold"
      },
      bars: {
        fontSize: 25
      },
      dropdown_1: {
        flex: 0,
        top: 0,
        left: 0,
      },
      user: {
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#f5f5f5',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 10
      },
      userInfo: {
        fontSize: 12
      },
      welcome: {
        fontSize: 30,
        fontWeight: "bold"
      }
      
    })