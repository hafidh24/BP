import React, { Component } from 'react'
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar, SafeAreaView,
    Keyboard, TouchableOpacity, KeyboardAvoidingView, Button, TouchableHighlight, TextInput,
    ToastAndroid, BackHandler, PermissionsAndroid, ImageBackground
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { hide } from '../../assets/images'
import { SikajiLogin, background } from '../../assets/images'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // data: {},
            email: '',
            password: '',
            show: false,
            visible: true,
        }
    }
    state = {
        canBeClosed: false
    };
    requestStoragePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: "Izin Penyimpanan Untuk Aplikasi",
                    message:
                        "Aplikasi membutuhkan akses ke penyimpanan Anda",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Izin Kamera Untuk Aplikasi",
                    message:
                        "Aplikasi membutuhkan akses ke kamera Anda",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    componentDidMount() {
        this.requestStoragePermission();
        this.requestCameraPermission();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    handleBackButton = () => {
        if (this.props.navigation.isFocused()) {
            BackHandler.exitApp()
            return true;
        } else {
            return this.state.canBeClosed = false;
        }
    };

    saveLocalToken(token) {
        AsyncStorage.setItem('token', token, () =>
            this.props.navigation.replace('Home'),
        ).catch((err) => console.log(err));
    }
    // login = () => {
    // let dataToSend = {
    //     // no_hp: this.state.NoHP,
    //     username: this.state.username,
    //     password: this.state.password,
    //     token: 'fghadbnclajcakgeaeyfsdjafvjaca'
    // };
    // let data = new FormData();

    // for (let key in dataToSend) {
    //     data.append(key, dataToSend[key]);
    // }


    // https://berbagipendidikan.org/sim/api/login/loginUser
    //     fetch(' https://kilauindonesia.org/datakilau/api/loginkar', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'multipart/form-data'
    //         },
    //         body: data,
    //     })
    //         .then((res) => res.json())
    //         .then((resJson) => {
    //             console.log('berhasil === ', resJson);
    //             if (resJson.token) {
    //                 this.saveLocalToken(resJson.token);
    //                 ToastAndroid.show('Login Berhasil, Selamat Bertugas', ToastAndroid.LONG);
    //             } else {
    //                 ToastAndroid.show(
    //                     'email atau Password yang anda masukan salah !!!',
    //                     ToastAndroid.LONG,
    //                 );
    //             }
    //         })
    //         .catch((err) => console.log(err));

    // }

    login = () => {
        let data = new FormData();

        for (let key in this.state) {
            data.append(key, this.state[key]);
        }
        console.log(data);
        fetch('https://kilauindonesia.org/datakilau/api/loginkar', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            body: data,
        })
            .then((res) => res.json())
            .then((resJson) => {
                console.log('berhasil === ', resJson);
                if (resJson.token) {
                    this.saveLocalToken(resJson.token);
                    ToastAndroid.show('Login Berhasil, Selamat Bertugas', ToastAndroid.LONG);
                } else {
                    ToastAndroid.show(
                        'Email atau Password yang anda masukan salah !!!',
                        ToastAndroid.LONG,
                    );
                }
            })
            .catch((err) => console.log(err));

    }
    render() {
        const { email, password, show, visible } = this.state;
        const { navigation } = this.props;

        return (
            <>
                <SafeAreaView style={style.container}>
                    <StatusBar barStyle="light-content" />
                    <ImageBackground source={background} style={style.logoContainer}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View>
                                <View >
                                    <Text style={style.logoContainer}>Logo </Text>
                                </View>
                                <View style={style.infoContainer}>
                                    <TextInput style={style.inputText}
                                        placeholderTex
                                        tColor='#A9A9A9'
                                        placeholder={'email'} value={email} onChangeText={email => this.setState({ email })}
                                        keyboardType="email-address"
                                        returnKeyType='next'
                                        onSubmitEditing={() => this.refs.txtPassword.focus()}
                                        autoCorrect={false}

                                    ></TextInput>
                                </View>
                                <View style={style.infoContainer}>
                                    <TextInput style={style.inputText}
                                        placeholderTextColor='#A9A9A9'
                                        placeholder={'Password'} value={password} onChangeText={password => this.setState({ password })}
                                        secureTextEntry={visible}
                                        returnKeyType='next'
                                        autoCorrect={false}
                                        ref={"txtPassword"}
                                    ></TextInput>
                                    <View style={style.btnEye}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (show === false) {
                                                    this.setState({ visible: false })
                                                    this.setState({ show: true })
                                                } else {
                                                    this.setState({ visible: true })
                                                    this.setState({ show: false })
                                                }
                                            }}
                                        >
                                            <View>
                                                {show === false ? <Image source={hide} style={style.ImageStyle}></Image> : <Image source={hide} style={style.ImageStyle}></Image>}
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={style.infobtn}>
                                    <TouchableOpacity onPress={this.login}
                                        style={style.btnlogin}
                                        underlayColor='#fff'>
                                        <Text style={style.submitText}>Login</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ top: 220, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 12, color: '#555', fontWeight: 'bold' }}> App version Beta</Text>
                                </View>
                            </View>

                        </TouchableWithoutFeedback>
                    </ImageBackground>
                </SafeAreaView>
            </>

        )
    }

}



const style = StyleSheet.create({
    btnEye: {
        position: 'absolute',
        padding: 10,
        right: 0
    },
    submitText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    inputIcon: {
        position: 'absolute',
        padding: 10,
        top: 13,
        left: 25
    },
    searchIcon: {
        padding: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    logoContainer: {
        justifyContent: 'center',
        flex: 1,
    },

    logo: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#51C9C2',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5,
        fontFamily: 'SairaStencilOne-Regular',
    },
    si: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5,
        fontFamily: 'SairaStencilOne-Regular',
    },
    infoContainer: {
        zIndex: 0,
        width: '75%',
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginTop: 20,
        marginLeft: 40,
        height: 50,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E9E9E9',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        shadowOpacity: 1.0,
        elevation: 5,
    },
    infopass: {
        width: 300,
        left: 0,
        right: 0,
        paddingTop: 15,
        paddingBottom: 20,
        paddingRight: 20,
        paddingLeft: 20
    },
    infobtn: {
        width: '75%',
        left: 0,
        right: 0,
        marginTop: 30,
        marginLeft: 40,
        color: '#fff',
    },

    inputText: {
        color: '#2E3E5C',
        fontSize: 14,
        width: '100%',
    },
    input: {
        height: 45,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 20,
        borderColor: '#E9E9E9',
        color: '#000',
        paddingHorizontal: 15,
    },
    inputpass: {
        height: 45,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 15,
        borderColor: '#E9E9E9',
        color: '#000',
        paddingHorizontal: 15

    },
    btnlogin: {
        paddingTop: 13,
        paddingBottom: 13,
        backgroundColor: '#0EBEDF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        shadowOpacity: 1.0,
        elevation: 5,
    },
    header: {
        width: '100%',
        height: '100%',

        // paddingHorizontal: 10,
    },
    ImageStyle: {
        padding: 10,
        margin: 5,
        height: 20,
        width: 20,
        resizeMode: 'stretch',
        alignItems: 'center',
    },

})