import { Text, View, ScrollView, SafeAreaView, StyleSheet, Image, TouchableOpacity, ImageBackground, Linking } from 'react-native'
import React, { Component } from 'react'
import { qr, read1, arrow, BB } from '../../assets/images'
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
export class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
    WA = () => {
        let url =
            'https://api.whatsapp.com/send?text=Berbagi%20Infak%0a%0aInfak%20adalah%20mengeluarkan%20harta%20yang%20Pokok.%20mencakup%20zakat%20(hukumnya%20wajib)dan%20non-zakat%20(hukumny...%0a%0ainformasi%20selengkapnya%20klik%20https://berbagibahagia.org/program/Infak'
        Linking.openURL(url)
            .then(data => {
                console.log("Opened successfully " + data);
            })
    };
    facebook = () => {
        let url =
            'https://www.facebook.com/sharer/sharer.php?u=https://berbagibahagia.org/program/Infak'
        Linking.openURL(url)
            .then(data => {
                console.log("Opened successfully " + data);
            })
    };
    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        }
        return 0;
    };
    render() {
        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
        return (
            <View style={style.contentContainer}>
                <View style={{ backgroundColor: '#0EBEDF' }}>
                    <Text style={style.title}>Infak</Text>
                </View>
                <View style={style.coltom2}>
                    <View style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image source={BB} style={{height: 110, width: 235, marginBottom: 10, }}></Image>
                    </View>
                    <View>
                        <View>
                            <Text style={{ marginLeft: 10 }}>Berbagi Infak</Text>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
                        <Text mar>Terkumpul Rp.</Text>
                        <Text>Goals</Text>

                    </View>
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
                    <View style={{ flexDirection: 'row', justifyContent:'flex-end', alignContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ marginTop:20,marginRight:10 }} onPress={() => this.props.navigation.navigate('donasi')}>
                            <Text style={style.btnSimpanDark}>Donasi Sekarang</Text>
                        </TouchableOpacity>

                    </View>
                </View>

                <View>
                    <Collapse>
                        <CollapseHeader>
                            <View style={style.coltom}>
                                <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, }}>Deskripsi</Text>
                                <Image source={arrow} style={{
                                    padding: 10,
                                    margin: 5,
                                    height: 20,
                                    width: 20,
                                    position: 'absolute',
                                    resizeMode: 'stretch',
                                    alignItems: 'center',
                                    right: 15,
                                    top: -5,
                                }}></Image>
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <View style={style.coltom1}>
                                <Text > Infak adalah mengeluarkan harta yang Pokok. mencakup zakat (hukumnya wajib) dan non-zakat (hukumnya sunnah). Infak wajib di antaranya zakat, kafarat, nazar, dan lain-lain. Infak sunnah di antaranya, infak kepada Fakir miskin sesama muslim, infak bencana alam, infak kemanusiaan, dan lain-lain. Terkait dengan infak ini Rasulullah SAW bersabda:

                                    "Ada malaikat yang senantiasa berdoa setiap pagi dan sore: "Ya Allah SWT berilah orang yang berinfak, gantinya dan berkata yang lain : "Ya Allah jadikanlah orang yang menahan infak, kehancuran". - Hadits Riwayat Bukhari dan Muslim
                                    {"\n"}

                                    (wikipedia.com)
                                </Text>
                            </View>
                        </CollapseBody>
                    </Collapse>

                    <Collapse>
                        <CollapseHeader>
                            <View style={style.coltom}>
                                <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, }}>Update terbaru</Text>
                                <Image source={arrow} style={{
                                    padding: 10,
                                    margin: 5,
                                    height: 20,
                                    width: 20,
                                    position: 'absolute',
                                    resizeMode: 'stretch',
                                    alignItems: 'center',
                                    right: 15,
                                    top: -5,
                                }}></Image>
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <View style={style.coltom1}>
                                <Text> test</Text>
                            </View>
                        </CollapseBody>
                    </Collapse>

                    <Collapse>
                        <CollapseHeader>
                            <View style={style.coltom}>
                                <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, }}>Donatur</Text>
                                <Image source={arrow} style={{
                                    padding: 10,
                                    margin: 5,
                                    height: 20,
                                    width: 20,
                                    position: 'absolute',
                                    resizeMode: 'stretch',
                                    alignItems: 'center',
                                    right: 15,
                                    top: -5,
                                }}></Image>
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <View style={style.coltom1}>
                                <Text> test</Text>
                            </View>
                        </CollapseBody>
                    </Collapse>

                    <Collapse>
                        <CollapseHeader>
                            <View style={style.coltom}>
                                <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, }}>Foundasier</Text>
                                <Image source={arrow} style={{
                                    padding: 10,
                                    margin: 5,
                                    height: 20,
                                    width: 20,
                                    position: 'absolute',
                                    resizeMode: 'stretch',
                                    alignItems: 'center',
                                    right: 15,
                                    top: -5,
                                }}></Image>
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <View style={style.coltom1}>
                                <Text> test</Text>
                            </View>
                        </CollapseBody>
                    </Collapse>

                </View>

                <View style={{
                    flexDirection: 'row',
                    width: '90%',
                    height: 100,
                    borderRadius: 10,
                    borderWidth: 1,
                    marginLeft: 20,
                    marginTop: 10,
                    borderColor: '#E9E9E9',
                    justifyContent: 'center', alignItems: 'center',
                    alignContent: 'center',
                    textAlign: 'center',
                    backgroundColor: '#00BFFF',
                }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ textAlign: 'center', marginBottom: 10, }}>
                            ayo sebarkan kebaikan dengan share
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <TouchableOpacity onPress={(this.facebook)}>
                                <Text style={style.btnSimpanUn}> Facebook</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={(this.WA)}>
                                <Text style={style.btnSimpanUn}> WhatsApp</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ImageBackground source={read1} style={{
                        marginLeft: 20,
                        marginTop: -10,
                        width: 80,
                        height: 100,
                    }}></ImageBackground>
                </View>
                <View style={{
                    flexDirection: 'row',
                    width: '90%',
                    height: 100,
                    borderRadius: 10,
                    borderWidth: 1,
                    marginLeft: 20,
                    marginTop: 10,
                    borderColor: '#E9E9E9',
                    justifyContent: 'center', alignItems: 'center',
                    alignContent: 'center',
                    textAlign: 'center',
                    backgroundColor: '#FFD700',
                }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ textAlign: 'center', marginBottom: 10, }}>
                            ayo jadi salah satu bagian {"\n"}Foundasier
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('tambahfou')}>
                                <Text style={style.btnSimpanUn}> Jadi Foundasier</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ImageBackground source={read1} style={{
                        marginLeft: 20,
                        marginTop: -10,
                        width: 80,
                        height: 100,
                    }}></ImageBackground>
                </View>
            </View>
        )
    }
}

export default index

const style = StyleSheet.create({
    contentContainer: {
        height: '100%',
        backgroundColor: '#fff'
    },
    title: {
        marginLeft: 20,
        marginTop: 15,
        marginBottom: 15,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    btnSimpanDark: {
        width: '100%',
        fontWeight: 'bold',
        backgroundColor: '#87cefa',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        textAlign: 'center',
        justifyContent: 'center', alignItems: 'center'
    },
    btnSimpanUn: {
        width: '100%',
        fontWeight: 'bold',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center', alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    coltom: {
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
    coltom1: {
        width: '90%',
        marginLeft: 20,
        fontSize: 16,
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
        textAlign: 'justify',
        justifyContent: 'center',
    },
    coltom2: {
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
        marginVertical: 8,
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
    controls: {
        backgroundColor: 'transparent',
        borderRadius: 5,
        position: 'absolute',
        bottom: 50,
        left: 10,
        right: 10,
    },
    generalControls: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 4,
        overflow: 'hidden',
        paddingBottom: 10,
    },
    trackingControls: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
        backgroundColor: '#f2f2f2',
    },
})