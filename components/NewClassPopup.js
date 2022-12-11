import { Modal, Dimensions, TouchableWithoutFeedback, View, Text, FlatList, TextInput, Button, TouchableOpacity, } from 'react-native'
import React, { useState } from 'react';
import { addDoc, CLASSES, collection, firestore, USERS } from '../firebase/Config';
import App, { newClasses, setNewClasses} from '../App';

const deviceHeight = Dimensions.get("window").height

export class NewClassPopup extends React.Component {

    //ei toimi en tiiä miks............
    save = async() => {
    const docRef = await addDoc(collection(firestore,CLASSES),{
      text: newClasses
    })
    setNewClasses('')
    this.close
  }
    
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }
    show = () => {
        this.setState({show: true})
    }
    close = () => {
        this.setState({show: false})
    }
    renderOutsideTouchable( onTouch) {
        const view = <View style={{flex: 1, width: '100%'}}/>
        if (!onTouch) return view

        return (
            <TouchableWithoutFeedback onPress={onTouch} style={{flex: 1, width: '100%'}}>
                {view}
            </TouchableWithoutFeedback>
        )
    }
    renderTitle = () => {
        return (
            <View>
                <Text style={{
                    color: '#182E44',
                    fontSize: 20,
                    fontWeight: '500',
                    margin: 20
                }}>
                 LUOKAN LUONTI</Text>
            </View>
        )
    }

    renderContent = () => {
        
        return (
            <View>
                <View style={{
                    backgroundColor: "#FFC0CB",
                    borderRadius: 30,
                    width: "100%",
                    height: 45,
                    marginBottom: 10,
                    alignItems: "center",
                    alignSelf: "center"
                }}>
                <TextInput style={{
                    height: 50,
                    flex: 1,
                    padding: 10,
                    marginLeft: 20,
                }}
                placeholder="LUOKAN NIMI"
                placeholderTextColor="#003f5c"
                value={newClasses}
                onChangeText={text => setNewClasses(text)}
                />
                </View>
                <View style={{
                    paddingBottom: 20
                }}>
                    <TouchableOpacity style={{
                    width: "100%",
                    borderRadius: 25,
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 20,
                    backgroundColor: "#FF1493",
                }}
                onPress={this.save()}>
                        <Text>LUO LUOKKA</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderSeparator = () => {
        <View
            style={{
                opacity: 0.1,
                backgroundColor: "#182E44",
                height: 1,
            }}
        />
    }

    render() {
        let {show} = this.state
        const {onTouchOutside} = this.props

        return (
            <Modal animationType={'fade'} transparent={true} visible={show} onRequestClose={this.close}>
                <View style={{
                    flex: 1, 
                    backgroundColor: '#000000AA', 
                    justifyContent: 'flex-end'
                    }}>
                   {this.renderOutsideTouchable(onTouchOutside)}
                    <View style={{
                        backgroundColor: '#FFFFFF',
                        width: '100%',
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        paddingHorizontal: 10,
                        maxHeight: deviceHeight * 0.4,
                    }}>
                    {this.renderTitle()}
                    {this.renderContent()}
                    </View>
                </View>
            </Modal>
        )
    }
}