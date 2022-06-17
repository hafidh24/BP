import React, { Component, useEffect } from 'react'
import {
StyleSheet, Text, View, Image,
TouchableWithoutFeedback, StatusBar, SafeAreaView,
Keyboard, TouchableOpacity, KeyboardAvoidingView, Button, TouchableHighlight, TextInput, ImageBackground
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { log2, } from '../../assets/icons'
import { sikaji1, background } from '../../assets/images'

const Splash = ({ navigation }) => {

    useEffect(() => {
        const _validasiSession = async () => {
            const isLogin = await AsyncStorage.getItem('token')
            if (isLogin) {
                setTimeout(() => {
                    navigation.replace("Home");
                }, 2000)
            } else {
                setTimeout(() => {
                    navigation.replace("Login");
                }, 2000)
            }
        }
        _validasiSession()
    }, [navigation]);

    return (
        <SafeAreaView style={style.container}>
            <StatusBar barStyle="light-content" />
            <ImageBackground source={background} style={style.header}>
            </ImageBackground>
            <View style={{ position: 'absolute', right: 0, left: 0, bottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 12, color: '#555', fontWeight: 'bold' }}>App version <Text style={{ fontSize: 12, color: '#555' }}>1.0.3</Text></Text>

            </View>

        </SafeAreaView>
    )
}

export default Splash

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0EBEDF',
        flexDirection: 'column',
    },
    header: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        // paddingHorizontal: 10,
    },
    logo: {
        width: '50%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5,
        fontFamily: 'SairaStencilOne-Regular',
    },
    si: {
        color: '#FBDB14',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5,
        fontFamily: 'SairaStencilOne-Regular',
    },
})

