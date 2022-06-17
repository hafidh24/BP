import { Dimensions, Modal, TouchableOpacity, Text, View, StyleSheet, Image, ScrollView, SafeAreaView, TextInput, ToastAndroid } from 'react-native'
import React, { Component } from 'react'
import * as ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux'
import { Calendar } from '../../assets/images'

class Presensi extends Component {
    constructor(props) {
        super(props)
        this.state = {
            presimg: {
                0: {
                    image: {
                        name: '',
                        type: '',
                        uri: 'https://static.thenounproject.com/png/187803-200.png'
                    },
                }
            },
            pres: '',
            level: '',
            total: null,
            tat: 0,
        }

    }
    pickMultiple(index) {
        ImagePicker.launchImageLibrary(
            {
                noData: true,
                saveToPhotos: true,
                title: 'Select Photo',
                maxWidth: 300,
                maxHeight: 400,
                compressImageQuality: 0.5,
                storageOptions: {
                    skipBackup: false,
                    path: 'images',
                },
            },
            (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else {
                    const source = {
                        image: {
                            uri: response.assets[0].uri,
                            name: response.assets[0].fileName,
                            type: response.assets[0].type,
                        }
                        //   id: 0,
                    };
                    console.log('ini gambar = ', source);
                    this.setState(prevState => {
                        prevState.presimg[index] = source
                        //   prevState.tgl_lahir[index] != this.props.route.params.tgl_lahir[index] ? this.setState({tglmbuh : true}) : this.setState({tglmbuh : false});
                        return {
                            presimg: prevState.presimg
                        }
                    }, () => console.log(this.state.presimg));
                    this.setState({
                        total: index,
                        tat: index,
                    });
                    console.log('ini gambar = ', this.state.presimg);
                }
            },
        );
    }

    takePic(index) {
        {
            ImagePicker.launchCamera(
                {
                    noData: true,
                    saveToPhotos: true,
                    title: 'Select Photo',
                    maxWidth: 300,
                    maxHeight: 400,
                    compressImageQuality: 0.5,
                    storageOptions: {
                        skipBackup: false,
                        path: 'images',
                    },
                },
                (response) => {
                    console.log('Response = ', response);

                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else {
                        const source = {
                            image: {
                                uri: response.assets[0].uri,
                                name: response.assets[0].fileName,
                                type: response.assets[0].type,
                            }
                            //   id: 0,
                        };
                        console.log('ini gambar = ', source);
                        this.setState(prevState => {
                            prevState.presimg[index] = source
                            //   prevState.tgl_lahir[index] != this.props.route.params.tgl_lahir[index] ? this.setState({tglmbuh : true}) : this.setState({tglmbuh : false});
                            return {
                                presimg: prevState.presimg
                            }
                        }, () => console.log(this.state.presimg));
                        this.setState({
                            total: index,
                            tat: index,
                        });
                        console.log('ini gambar = ', this.state.presimg);
                    }
                },
            );
        }
    }
    render() {
        var presimg = [];
        for (let i = 0; i <= this.state.tat; i++) {
            presimg.push(
                <Image
                    style={{ width: 200, height: 200, resizeMode: 'contain' }}
                    source={this.state.presimg[i].image}
                />

            )
        }
        const images = [
            'https://www.kla.id/wp-content/uploads/2018/11/image049-5.jpg'
        ]
        return (

            <ScrollView contentContainerStyle={style.contentContainer} showsVerticalScrollIndicator={false}>
                {this.props.user.presensi === 'karyawan' ?
                    <SafeAreaView >
                        <View style={{ backgroundColor: '#0EBEDF' }}>
                            <Text style={style.title1}>Tambah Prenstasi </Text>
                        </View>
                        <View>
                            <Text style={style.Label2}>Jenis Prestasi</Text>
                            <Picker style={style.Textinputcss}
                                selectedValue={this.state.pres}
                                onValueChange={(itemValue) => this.setState({ pres: itemValue, show: 1 })}
                            >
                                <Picker.Item label="Pilih" value="" />
                                <Picker.Item label="Akademik" value="Akademik" />
                                <Picker.Item label="Ekstrakulikuler/Non-Akademik" value="Ekstrakulikuler/Non-Akademik" />
                                <Picker.Item label="Lain-lain" value="Lain-lain" />
                            </Picker>

                            <Text style={style.Label2}>Level Presensi</Text>
                            <Picker style={style.Textinputcss}
                                selectedValue={this.state.level}
                                onValueChange={(itemValue) => this.setState({ level: itemValue, show: 1 })}
                            >
                                <Picker.Item label="Pilih" value="" />
                                <Picker.Item label="Sekolah" value="Akademik" />
                                <Picker.Item label="Kecamatan" value="Kecamatan" />
                                <Picker.Item label="Kabupaten/Kota" value="Kabupaten/Kota" />
                                <Picker.Item label="Provinsi" value="Provinsi" />
                                <Picker.Item label="Nasional" value="Nasional" />
                                <Picker.Item label="Internasional" value="Internasional" />
                            </Picker>

                            <View>
                                <Text style={style.Label2}>Nama Aktifitas</Text>
                                <TextInput
                                    style={style.kotak2}
                                    onChangeText={text => this.setState({ text })}
                                    value={this.state.text}
                                    placeholder="Nama Aktivitas"
                                    placeholderTextColor='#7e7e7e'
                                />
                            </View>
                            <View style={style.container}>
                                <ScrollView horizontal={true}>
                                    <>
                                        {presimg}
                                    </>
                                </ScrollView>

                            </View>

                            <TouchableOpacity
                                style={style.item}
                                onPress={() => this.takePic(this.state.total === null ? 0 : this.state.total + 1)}>
                                <Text style={style.text}>Pilih Foto</Text>
                            </TouchableOpacity>

                            {/* <TouchableOpacity
                  style={style.item}
                  onPress={() => this.pickMultiple()}>
                  <Text style={style.text}>Pilih Di Galeri</Text>
              </TouchableOpacity> */}


                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Anak_Binaan')} style={style.btnSimpanUn1} >
                                    <Text style={{ fontWeight: 'bold' }}>Kembali</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Anak_Binaan', ToastAndroid.show('Data Telah Disimpan', ToastAndroid.SHORT))} style={style.btnSimpanDark} >
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Kirim</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </SafeAreaView>

                    :
                    <View />
                }
                
                {this.props.user.presensi === 'admin' ?
                    <ScrollView contentContainerStyle={style.contentContainer} showsVerticalScrollIndicator={false}>
                        <View style={{ backgroundColor: '#0EBEDF' }}>
                            <Text style={style.title1}>Prestasi Anak Asuh </Text>
                        </View>
                        <TouchableOpacity>
                        <View style={style.coltom1}>
                            {
                                images.map((e, index) =>
                                    <Image
                                        key={e}
                                        resizeMode="stretch"
                                        style={style.wrap}
                                        source={{ uri: e }}
                                    />
                                )
                            }
                            {/* <Image source={{ uri: 'https://www.kilauindonesia.org/datakilau/gambarDonatur/' + detbe.gambar_donatur }} style={style.wrap} /> */}
                            <Image style={style.Labeltgl} source={Calendar}></Image>
                            <Text></Text>
                            
                        </View>
                        </TouchableOpacity>
                    </ScrollView>
                    :
                    <View />
                }
            </ScrollView >
        )
    }
}
const style = StyleSheet.create({
    wrap: {
        width: Dimensions.get('window').width * 0.90,
        height: Dimensions.get('window').height * 0.25 // 25% window
    },
    Labeltgl: {
        position: 'absolute',
        top: 160, left: 10, right: 0, bottom: 0,
        height: 30, width: 30,
    },
    contentContainer: {
        flex: 1,
    },
    Label1: {
        flex: 1,
        fontSize: 12,
        padding: 5,
        color: '#000000',
        flexDirection: 'column',
    },
    btnSimpanUn: {
        width: '40%',
        fontWeight: 'bold',
        backgroundColor: '#C6C6C6',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        justifyContent: 'center', alignItems: 'center',
        textAlign: 'center',
    },
    Textinputcss: {
        color: '#7e7e7e',
        marginLeft: 30,
        marginRight: 10,
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 12,
        height: 52,
        backgroundColor: '#fff',
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderColor: '#7e7e7e',
        elevation: 3,
    },
    Label2: {
        marginTop: 5,
        marginLeft: 25,
        padding: 5,
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    kotak2: {
        color: '#000000',
        marginTop: 10,
        marginLeft: 30,
        marginRight: 10,
        borderRadius: 2,
        borderWidth: 0.1,
        fontSize: 12,
        height: 52,
        backgroundColor: '#fff',
    },
    title1: {
        marginRight: 20,
        marginLeft: 20,
        marginTop: 15,
        marginBottom: 15,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    item: {
        flex: 1,
        fontSize: 16,
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 17,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderColor: '#7e7e7e',
        elevation: 3,
    },
    container: {
        marginTop: 40,
        marginLeft: 75,
        multiline: true,
        width: 250,
        height: 250,
        flex: 1,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderColor: '#7e7e7e',
        elevation: 3,
    },
    btnSimpanDark: {
        width: '40%',
        fontWeight: 'bold',
        backgroundColor: '#87cefa',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        textAlign: 'center',
        justifyContent: 'center', alignItems: 'center'
    },
    btnSimpanUn1: {
        width: '40%',
        fontWeight: 'bold',
        backgroundColor: '#C6C6C6',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        justifyContent: 'center', alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
    },
    coltom1: {
        width: '90%',
        marginLeft: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        fontSize: 16,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderColor: '#7e7e7e',
        elevation: 3,
    },
})
const mapStateToProps = (state) => {
    return {
        user: state,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeUser: (data) => dispatch({ type: 'CHANGE/USER', payload: data }),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Presensi);