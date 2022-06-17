import { Modal, FlatlList, Dimensions, video, SafeAreaView, ScrollView, Text, View, Image, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { Component } from 'react'
import * as ImagePicker from 'react-native-image-picker';
// import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { search, arrow, } from '../../assets/images'
import { r6 } from '../../assets/vid'
// import Video from 'react-native-video'
import { connect } from 'react-redux'
import { Calendar } from '../../assets/images'


// import ImagePicker from 'react-native-image-crop-picker';

class SuratAB extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gambar: '',
            psnimg: {
                0: {
                    image: {
                        name: '',
                        type: '',
                        uri: 'https://static.thenounproject.com/png/187803-200.png'
                    },
                }
            },
            video: {
                0: {
                    v: {
                        name: '',
                        type: '',
                        uri: 'https://static.thenounproject.com/png/187803-200.png'
                    },
                }
            },
            img1: null,
            img2: 0,
            vid: null,
            vid1: 0,
            text: '',
            pesan: '',
            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            paused: true,
            modaldetail: false,
        }
    }
    onLoad = (data) => {
        this.setState({ duration: data.duration });
    };

    onProgress = (data) => {
        this.setState({ currentTime: data.currentTime });
    };

    onEnd = () => {
        this.setState({ paused: true })
        this.video.seek(0)
    };

    onAudioBecomingNoisy = () => {
        this.setState({ paused: true })
    };


    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        }
        return 0;
    };

    renderResizeModeControl(resizeMode) {
        const isSelected = (this.state.resizeMode === resizeMode);

        return (
            <TouchableOpacity onPress={() => { this.setState({ resizeMode }) }}>
                <Text style={[style.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
                    {resizeMode}
                </Text>
            </TouchableOpacity>
        )
    }

    // renderVideo(video) {
    //     console.log('rendering video');
    //     return (
    //         <View style={{ height: 300, width: 300 }}>
    //             <Video
    //                 source={{ uri: video.uri, type: video.mime }}
    //                 style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
    //                 rate={1}
    //                 paused={false}
    //                 volume={1}
    //                 muted={false}
    //                 resizeMode={'cover'}
    //                 onError={(e) => console.log(e)}
    //                 onLoad={(load) => console.log(load)}
    //                 repeat={true}
    //             />
    //         </View>
    //     );
    // }

    takeVidGal(index) {
        {
            ImagePicker.launchImageLibrary(
                {
                    mediaType: 'video',
                    videoQuality: 'high',
                    noData: true,
                    saveToPhotos: true,
                    title: 'Video',
                    maxWidth: 720,
                    maxHeight: 360,
                    compressImageQuality: 0.5,
                    storageOptions: {
                        skipBackup: false,
                        path: 'Video',
                    },
                },
                (response) => {
                    console.log('Response = ', response);

                    if (response.didCancel) {
                        console.log('User cancelled video picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else {
                        const source = {
                            v: {
                                uri: response.assets[0].uri,
                                name: response.assets[0].fileName,
                                type: response.assets[0].type,
                            }
                            //   id: 0,
                        };
                        console.log('ini gambar = ', source);
                        this.setState(prevState => {
                            prevState.video[index] = source
                            //   prevState.tgl_lahir[index] != this.props.route.params.tgl_lahir[index] ? this.setState({tglmbuh : true}) : this.setState({tglmbuh : false});
                            return {
                                video: prevState.video
                            }
                        }, () => console.log(this.state.video));
                        this.setState({
                            vid: index,
                            vid1: index,
                        });
                        console.log('ini gambar = ', this.state.video);
                    }
                },
            );
        }
    }
    takeVid(index) {
        {
            ImagePicker.launchCamera(
                {
                    mediaType: 'video',
                    videoQuality: 'high',
                    noData: true,
                    saveToPhotos: true,
                    title: 'Video',
                    maxWidth: 720,
                    maxHeight: 360,
                    compressImageQuality: 0.5,
                    storageOptions: {
                        skipBackup: false,
                        path: 'Video',
                    },
                },
                (response) => {
                    console.log('Response = ', response);

                    if (response.didCancel) {
                        console.log('User cancelled video picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else {
                        const source = {
                            v: {
                                uri: response.assets[0].uri,
                                name: response.assets[0].fileName,
                                type: response.assets[0].type,
                            }
                            //   id: 0,
                        };
                        console.log('ini gambar = ', source);
                        this.setState(prevState => {
                            prevState.video[index] = source
                            //   prevState.tgl_lahir[index] != this.props.route.params.tgl_lahir[index] ? this.setState({tglmbuh : true}) : this.setState({tglmbuh : false});
                            return {
                                video: prevState.video
                            }
                        }, () => console.log(this.state.video));
                        this.setState({
                            vid: index,
                            vid1: index,
                        });
                        console.log('ini gambar = ', this.state.video);
                    }
                },
            );
        }
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
                            prevState.psnimg[index] = source
                            //   prevState.tgl_lahir[index] != this.props.route.params.tgl_lahir[index] ? this.setState({tglmbuh : true}) : this.setState({tglmbuh : false});
                            return {
                                psnimg: prevState.psnimg
                            }
                        }, () => console.log(this.state.psnimg));
                        this.setState({
                            img1: index,
                            img2: index,
                        });
                        console.log('ini gambar = ', this.state.psnimg);
                    }
                },
            );
        }
    }
    displayModal(show) {
        this.setState({ modaldetail: show })
    }
    render() {
        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
        var psnimg = [];
        for (let i = 0; i <= this.state.img2; i++) {
            psnimg.push(
                <Image
                    style={{ width: 200, height: 200, resizeMode: 'contain' }}
                    source={this.state.psnimg[i].image}
                />
            )
        }
        var video = [];
        for (let i = 0; i <= this.state.vid1; i++) {
            video.push(
                <Image
                    style={{ width: 200, height: 200, resizeMode: 'contain' }}
                    source={this.state.video[i].v}
                />
            )
        }

        return (
            <ScrollView contentContainer style={style.contentContainer} showsVerticalScrollIndicator={true}>
                {this.props.user.presensi === 'karyawan' ?
                    <SafeAreaView >
                        <View style={{ backgroundColor: '#0EBEDF' }}>
                            <Text style={style.title1}>Tambah Surat Anak Binaan </Text>
                        </View>
                        <View>
                            <Text style={style.Label2}>Pesan </Text>
                            <View style={{
                                width: '85%',
                                backgroundColor: '#ffffff',
                                borderRadius: 10,
                                marginTop: 5,
                                borderWidth: 1,
                                borderColor: '#E9E9E9',
                                justifyContent: 'center',
                                alignContent: 'center',
                                marginLeft: 30,

                            }} >
                                <TextInput style={{
                                    color: '#c7c7c7',
                                    fontSize: 12,
                                    paddingLeft: 5,
                                    textAlign: 'justify',
                                    height: 100,
                                    marginHorizontal: 15
                                }} placeholder="Isi Pesan"
                                    placeholderTextColor='#A9A9A9'
                                    onChangeText={(pes) => this.setState({ pesan: pes })}
                                    multiline={true}
                                    numberOfLines={5}
                                    returnKeyType='next'
                                ></TextInput>
                            </View>
                            <View style={style.container}>
                                <ScrollView horizontal={true}>
                                    <>
                                        <View style={{ flexDirection: 'row' }}>{psnimg}{video}</View>
                                        <View>
                                            <TouchableOpacity
                                                style={style.container}
                                                onPress={() => this.setState({ paused: !this.state.paused })}
                                            >
                                                <Video
                                                    ref={(ref) => { this.video = ref }}
                                                    /* For ExoPlayer */

                                                    // source={{ uri: 'https://youtu.be/iZnLZFRylbs.mp4' }}
                                                    source={r6}// Can be a URL or a local file.
                                                    style={style.fullScreen}
                                                    rate={this.state.rate}
                                                    paused={this.state.paused}
                                                    volume={this.state.volume}
                                                    muted={this.state.muted}
                                                    canPlayFastForward={true}
                                                    canStepForward={true}
                                                    resizeMode={this.state.resizeMode}
                                                    onLoad={this.onLoad}

                                                    onProgress={this.onProgress}
                                                    onEnd={this.onEnd}
                                                    onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                                                    onAudioFocusChanged={this.onAudioFocusChanged}
                                                    repeat={false}
                                                />
                                                <View style={style.controls}>
                                                    <View style={style.generalControls}>
                                                        <View style={style.trackingControls}>
                                                            <View style={style.progress}>
                                                                <View style={[style.innerProgressCompleted, { flex: flexCompleted }]} />
                                                                <View style={[style.innerProgressRemaining, { flex: flexRemaining }]} />
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                </ScrollView>
                            </View>

                            <Collapse>
                                <CollapseHeader>
                                    <View style={style.coltom1}>
                                        <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, textAlign: 'center' }}>Pilih</Text>
                                        <Image source={arrow} style={{
                                            padding: 10,
                                            margin: 5,
                                            height: 20,
                                            width: 20,
                                            position: 'absolute',
                                            resizeMode: 'stretch',
                                            alignItems: 'center',
                                            right: 15,
                                            top: 5,
                                        }}></Image>
                                    </View>
                                </CollapseHeader>
                                <CollapseBody>
                                    <TouchableOpacity
                                        style={style.item}
                                        onPress={() => this.takePic(this.state.img1 === null ? 0 : this.state.img1 + 1)}>
                                        <Text style={style.text}>Foto</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={style.item}
                                        onPress={() => this.takeVid(this.state.vid === null ? 0 : this.state.vid + 1)}>
                                        <Text style={style.text}>Ambil Video</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={style.item}
                                        onPress={() => this.takeVidGal(this.state.vid === null ? 0 : this.state.vid + 1)}>
                                        <Text style={style.text}>Video Dari Galeri</Text>
                                    </TouchableOpacity>
                                </CollapseBody>
                            </Collapse>


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
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={{ backgroundColor: '#0EBEDF' }}>
                            <Text style={style.title1}>Surat Anak Asuh</Text>

                        </View>
                        <View >
                            <TouchableOpacity style={style.itemflat} onPress={() => { this.setState({ modaldetail: true }) }}>
                                <View style={{ flexDirection: 'row' }}>
                                <Image source={{ uri: 'https://www.kilauindonesia.org/datakilau/gambarDonatur/'  }}style={{ height: 100, width: 150, }} />
                                    <View style={{ flexDirection: 'column', marginTop: 20 }}>
                                        <Text numberOfLines={3} style={style.itemText}> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry </Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image style={style.Labeltgl} source={Calendar}></Image>
                                        </View>
                                    </View>
                                </View>


                            </TouchableOpacity>

                        </View>
                        <View >
                            <View>

                            </View>
                        </View>
                    </SafeAreaView>
                    :
                    <View />
                }
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modaldetail}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <View style={style.ModalCont2}>
                        <View style={{
                            paddingTop: 5,
                            backgroundColor: '#ffffff',
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            height: '100%',
                            shadowColor: "#333",
                            shadowOffset: {
                                width: 1,
                                height: 1,
                            },
                            shadowOpacity: 0.3,
                            shadowRadius: 2,
                            elevation: 3,
                            alignItems: 'center',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                        }}>
                            <Text>Detail</Text>
                            <SafeAreaView style={{ width: '100%', height: '100%' }}>
                                <View style={style.wrap}>
                                    <ScrollView
                                        onScroll={({ nativeEvent }) => this.change(nativeEvent)}
                                        showsHorizontalScrollIndicator={false}
                                        pagingEnabled
                                        horizontal
                                        style={style.wrap}
                                    >
                                        <View>
                                            <TouchableOpacity
                                                style={style.container}
                                                onPress={() => this.setState({ paused: !this.state.paused })}
                                            >
                                                <Video
                                                    ref={(ref) => { this.video = ref }}
                                                    /* For ExoPlayer */

                                                    // source={{ uri: 'https://youtu.be/iZnLZFRylbs.mp4' }}
                                                    source={r6}// Can be a URL or a local file.
                                                    style={style.fullScreen}
                                                    rate={this.state.rate}
                                                    paused={this.state.paused}
                                                    volume={this.state.volume}
                                                    muted={this.state.muted}
                                                    canPlayFastForward={true}
                                                    canStepForward={true}
                                                    resizeMode={this.state.resizeMode}
                                                    onLoad={this.onLoad}

                                                    onProgress={this.onProgress}
                                                    onEnd={this.onEnd}
                                                    onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                                                    onAudioFocusChanged={this.onAudioFocusChanged}
                                                    repeat={false}
                                                />
                                                <View style={style.controls}>
                                                    <View style={style.generalControls}>
                                                        <View style={style.trackingControls}>
                                                            <View style={style.progress}>
                                                                <View style={[style.innerProgressCompleted, { flex: flexCompleted }]} />
                                                                <View style={[style.innerProgressRemaining, { flex: flexRemaining }]} />
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </ScrollView>
                                </View>
                                {/* <View style={style.detailgmbr}>
                      <Image source={{ uri: 'https://www.kilauindonesia.org/datakilau/gambarDonatur/' + detbe.gambar_donatur }} style={{ justifyContent: 'center', alignItems: 'center', height: 150, width: '95%', marginLeft: 10, }} />
                    </View> */}
                                <ScrollView>
                                    <View>
                                        <TouchableOpacity onLongPress={() => {this.setState({ detak: [], modaldetail: false })}}>
                                        <Text style={{
                                            marginTop: 10,
                                            marginBottom: 10,
                                            textAlign: 'center',
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                        }}>Isi Pesan</Text>
                                        <Text style={{
                                            margin: 15,
                                            textAlign: 'justify',

                                        }}>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                                            Why do we use it?
                                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions
                                        </Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 50, flexDirection: 'row' }}>
                                        <Text
                                            style={style.btnSimpanUn1}
                                            onPress={() => {
                                                this.setState({ detak: [], modaldetail: false })
                                            }}>Kembali</Text>
                                    </View> */}
                                </ScrollView>
                            </SafeAreaView>
                        </View>
                    </View>
                </Modal>
            </ScrollView >

        )
    }
}
const style = StyleSheet.create({

    contentContainer: {
    },
    Label1: {
        flex: 1,
        fontSize: 12,
        padding: 5,
        color: '#000000',
        flexDirection: 'column',
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
        backgroundColor: '#7e7e7',
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
    Labeltgl: {
        marginTop: 5,
        position: 'absolute',
        top: 0, left: 10, right: 0, bottom: 0,
        height: 25, width: 25,
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
    backgroundVideo: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    controls: {
        backgroundColor: 'transparent',
        borderRadius: 5,
        position: 'absolute',
        bottom: -5,
        left: 10,
        right: 10,
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
    },
    innerProgressCompleted: {
        height: 10,
        backgroundColor: '#B22222',
    },
    innerProgressRemaining: {
        height: 10,
        backgroundColor: '#2C2C2C',
    },
    generalControls: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 4,
        overflow: 'hidden',
        paddingBottom: 10,
    },
    rateControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    volumeControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    resizeModeControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlOption: {
        alignSelf: 'center',
        fontSize: 11,
        color: 'white',
        paddingLeft: 2,
        paddingRight: 2,
        lineHeight: 12,
    },
    trackingControls: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemflat: {
        flex: 1,
        marginVertical: 8,
        marginLeft: 10,
        backgroundColor: '#fff',
        // shadowColor: "#333",
        // shadowOffset: {
        //   width: 1,
        //   height: 1,
        // },
        // shadowOpacity: 0.3,
        // shadowRadius: 2,
        // borderColor: '#7e7e7e',
        // elevation: 3,
    },
    ModalCont2: {
        flex: 1,
        backgroundColor: '#00000079',
    },
    wrap: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.25 // 25% window
    },
    itemText: {
        textAlign: 'justify',
        marginLeft: 10,
        fontSize: 12,
        width: '35%',
        height: 43,
    },
});
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
export default connect(mapStateToProps, mapDispatchToProps)(SuratAB);