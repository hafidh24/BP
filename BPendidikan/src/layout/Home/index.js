
import {
    Image, ImageBackground, TouchableOpacity, View, Text, StyleSheet,
    Modal, SafeAreaView, TextInput, Picker, Box, TextArea, ScrollView,
    Alert, BackHandler, ToastAndroid, Linking, TurboModuleRegistry, Dimensions,
    FlatList, ProgressBarAndroid, Animated, TouchableHighlight,
    TouchableWithoutFeedback,
    Button,
} from 'react-native'
import 'react-native-gesture-handler';
import React, { Component } from 'react'
import { AB, read1, tamak, news1, arrow, x, WA, massage, report, Group, Banner, Calendar, kegiatan, Bgbg1, tutor, Tutor2, pel, pulangmerah, home1, akun, logout, anak, berita } from '../../assets/images'
// import {IconHouse} from '../../assets/icons'
import { Group_1 } from '../../assets/icons'
import ButtonIcon from '../../components/ButtonIcon';
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { MenuProvider, MenuOptions, MenuOption, MenuTrigger, Menu } from 'react-native-popup-menu';
import { WebView } from 'react-native-webview';
class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            file: {
                name: '',
                type: '',
                uri: '',
                size: '',
            },
            modalpesan: false,
            riwayat: [],
            presnowid: [],
            lapnowid: [],
            reqnowid: [],
            reqnowjab: [],
            reqreq: [],
            feedbackNow: [],
            getreq: [],
            filacc: [],
            laporan: [],
            rekap: [],
            text2: '',
            cek_in: '',
            cek_out: '',
            id_req: '',
            status1: '',
            jumlah1: '',
            status2: '',
            jumlah2: '',
            status3: '',
            jumlah3: '',
            status4: '',
            jumlah4: '',
            status5: '',
            jumlah5: '',
            status6: '',
            jumlah6: '',
            status7: '',
            jumlah7: '',
            refreshing: true,
            date_api: '',
            belumLap: [],
            belumFeed: [],
            pesan: '',
            id_kar: '',
            nama: '',
            nohp: '',
            index: 0,
            modalImg: false,
            imgSee: '',
            getLapBaw: [],
            perubahan: [],
            pressStat: [],
            hadirbaw: '',
            sakitbaw: '',
            bolosbaw: '',
            modalTema: false,
            tema: '',
            mode: '',
            color: '',

            tambah: [],
            kurang: [],
            getget: [],
            satu: 0,
            dua: 0,
            tiga: 0,
            empat: 0,
            lima: 0,
            enam: 0,
            berita: [],
            isOpen: false,
            selectedItem: 'About',
            terkumpul: 0.0,
            deskripsi: '',
            id_category: 0.0,
            Touchable: Button,
            visible: false,
            modaldetail: 'false',
            detbe: [],
            anakren: []


        }
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }
    displayModal(show) {
        this.setState({ modaldetail: show })
    }
    onMenuItemSelected = item =>
        this.setState({
            isOpen: false,
            selectedItem: item,
        });
    GetBeritaAPi() {
        fetch('https://berbagibahagia.org/api/getcampung').then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.data)
            this.setState({
                berita: resdata.data,
                filter: resdata.data,
                refreshing: false,
            })
        })
    }
    GetanakrenAPi() {
        fetch('https://berbagibahagia.org/api/getanakrand').then(res => {
            if (res.status === 200)
                return res.json()
        }).then(resdata => {
            console.log(resdata.data)
            this.setState({
                anakren: resdata.data,
                filter: resdata.data,
                refreshing: false,

            })
        })
    }

    getProfile(token) {
        console.log('mulai getProfile...');
        setTimeout(() => {
            this.setState({ loading: true });
        }, 500);
        const endpoint = 'https://kilauindonesia.org/datakilau/api/getprofilekar';
        fetch(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((resjson) => {
                console.log('ini resjson getprofile', resjson);
                if (resjson.data) {
                    this.updateState(resjson.data);
                }
            })
            .catch((err) => {
                console.log('error dari splash profile', err);
            });
    }
    async updateState(data) {
        this.props.changeUser(data);
        this.Update();
        console.log('ini email', this.props.user.email);
    }


    async tokenCheck() {
        AsyncStorage.getItem('token').then((res) => {
            console.log('ini token ', res);
            if (res) {
                this.getProfile(res);
            }
        });
    }

    state = {
        curHours: null,
        curMinutes: null,
        curSecound: null,

    };

    toggleModalSebelumPulang(visible) {
        this.setState({ modalSebelumPulang: visible });
    }
    toggleModalSetelahPulang(visible) {
        this.setState({ modalSetelahPulang: visible });
    }
    getRiwayat() {
        AsyncStorage.getItem('token').then((token) => {
            fetch('https://kilauindonesia.org/datakilau/api/presmonthnow/' + this.props.user.id_karyawan, {
                headers: {
                    Authorization: 'Bearer ' + token,
                    // 'Accept': 'application/json',
                    // 'Content-Type': 'application/json'
                },
            })
                .then((res) => res.json())
                .then((resJson) => {
                    console.log('ini resjson getsaa', resJson);
                    const length = resJson.data.length;
                    this.setState({
                        lima: 2
                    });
                    if (length > 0) {
                        this.setState({
                            text2: 'Belum Ada Presensi Bulan ini',
                            riwayat: resJson.data,
                            refreshing: false,
                        });
                    } else {
                        this.setState({
                            text2: 'Belum Ada Presensi Bulan ini',
                            riwayat: resJson.data,
                            refreshing: false,
                        });
                    }
                })
                .catch((err) => console.log('error catch home', err));
        });
    }

    getPerubahan() {
        AsyncStorage.getItem('token').then((token) => {
            fetch('https://kilauindonesia.org/datakilau/api/getwar_naik', {
                headers: {
                    Authorization: 'Bearer ' + token,
                    // 'Accept': 'application/json',
                    // 'Content-Type': 'application/json'
                },
            })
                .then((res) => res.json())
                .then((resJson) => {
                    console.log('ini resjson getsaa', resJson);
                    const length = resJson.data.length;
                    this.setState({
                        enam: 2
                    });
                    if (length > 0) {
                        this.setState({
                            text2: 'Belum Ada Presensi Bulan ini',
                            perubahan: resJson.data,
                            refreshing: false,
                        });
                    } else {
                        this.setState({
                            text2: 'Belum Ada Presensi Bulan ini',
                            perubahan: resJson.data,
                            refreshing: false,
                        });
                    }
                })
                .catch((err) => console.log('error catch home', err));
        });
    }

    getPresnowid() {
        AsyncStorage.getItem('token').then((token) => {
            fetch('https://kilauindonesia.org/datakilau/api/presnowid/' + this.props.user.id_karyawan, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
                .then((res) => res.json())
                .then((resJson) => {
                    const length = resJson.data.length;
                    this.setState({
                        dua: 2
                    });
                    if (length > 0) {
                        this.setState({
                            presnowid: resJson.data,
                            cek_in: resJson.data[0].cek_in,
                            cek_out: resJson.data[0].cek_out,
                        });
                    } else {
                        this.setState({
                            presnowid: resJson.data,
                            cek_in: resJson.data[0].cek_in,
                            cek_out: resJson.data[0].cek_out,
                        });
                    }
                })
                .catch((err) => console.log('error catch home', err));
        });
    }

    getReqnowid() {
        AsyncStorage.getItem('token').then((token) => {
            fetch('https://kilauindonesia.org/datakilau/api/reqnowid/' + this.props.user.id_karyawan, {
                headers: {
                    Authorization: 'Bearer ' + token
                },
            })
                .then((res) => res.json())
                .then((resJson) => {
                    console.log('oke');
                    const length = resJson.data.length;
                    if (length > 0) {
                        this.setState({
                            reqnowid: resJson.data,
                        });
                    } else {
                        this.setState({
                            reqnowid: resJson.data,
                        });
                    }
                })
                .catch((err) => console.log('error catch home', err));
        });
    }

    getLapnowid() {
        AsyncStorage.getItem('token').then((token) => {
            fetch('https://kilauindonesia.org/datakilau/api/lapnowid/' + this.props.user.id_karyawan, {
                headers: {
                    Authorization: 'Bearer ' + token
                },
            })
                .then((res) => res.json())
                .then((resJson) => {
                    const length = resJson.data.length;
                    if (length > 0) {
                        this.setState({
                            lapnowid: resJson.data,

                        });
                    } else {
                        this.setState({
                            lapnowid: resJson.data,
                        });
                    }
                })
                .catch((err) => console.log('error catch home', err));
        });
    }

    getReqnowjab() {
        const api = this.props.user.presensi === 'kacab' ? 'reqnowkan/' : this.props.user.presensi === 'admin' ? 'reqnowall' : 'reqnowjab/'
        const id = this.props.user.presensi === 'kacab' ? this.props.user.id_kantor : this.props.user.presensi === 'admin' ? '' : this.props.user.id_jabatan
        AsyncStorage.getItem('token').then((token) => {
            fetch('https://kilauindonesia.org/datakilau/api/' + api + id, {
                headers: {
                    Authorization: 'Bearer ' + token
                },
            })
                .then((res) => res.json())
                .then((resJson) => {
                    const length = resJson.data.length;
                    this.setState({
                        empat: 2
                    });
                    if (length > 0) {
                        this.setState({
                            reqnowjab: resJson.data,
                            reqreq: resJson.data.filter(i => i.acc.includes('0') | i.acc.includes('2')),
                        });
                    } else {
                        this.setState({
                            reqnowjab: resJson.data,
                            reqreq: resJson.data.filter(i => i.acc.includes('0') | i.acc.includes('2')),
                        });
                    }
                })
                .catch((err) => console.log('error catch home', err));
        });
    }

    getFeedNow() {
        AsyncStorage.getItem('token').then((token) => {

            fetch('https://kilauindonesia.org/datakilau/api/listfeedbackid/' + this.props.user.id_karyawan, {
                headers: {
                    Authorization: 'Bearer ' + token,
                    // 'Accept': 'application/json',
                    // 'Content-Type': 'application/json'
                },
            })
                .then((res) => res.json())
                .then((resJson) => {
                    console.log('ini resjson getsaa', resJson);
                    const length = resJson.data.length;
                    if (length > 0) {
                        this.setState({
                            feedbackNow: resJson.data,
                            refreshing: false,

                        });
                    } else {
                        this.setState({
                            feedbackNow: resJson.data,
                            refreshing: false,
                        });
                    }
                })
                .catch((err) => console.log('error catch home', err));
        });
    }

    getLaporan() {
        AsyncStorage.getItem('token').then((token) => {
            const api = this.props.user.presensi === 'kacab' ? 'lapnowkan/' : this.props.user.presensi === 'admin' ? 'lapnowall' : 'lapnowjab/'
            const id = this.props.user.presensi === 'kacab' ? this.props.user.id_kantor : this.props.user.presensi === 'admin' ? '' : this.props.user.id_jabatan

            fetch('https://kilauindonesia.org/datakilau/api/' + 'lapnowjab/' + this.props.user.id_jabatan, {
                headers: {
                    Authorization: 'Bearer ' + token,
                    // 'Accept': 'application/json',
                    // 'Content-Type': 'application/json'
                },
            })
                .then((res) => res.json())
                .then((resJson) => {
                    console.log('ini resjson getsaa', resJson);
                    const length = resJson.data.length;
                    if (length > 0) {
                        this.setState({
                            laporan: resJson.data,
                            refreshing: false,

                        });
                    } else {
                        this.setState({
                            laporan: resJson.data,
                            refreshing: false,
                        });
                    }
                })
                .catch((err) => console.log('error catch home', err));
        });
    }
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
    logout = async () => {
        await AsyncStorage.clear()
        this.props.navigation.navigate('Login')
        ToastAndroid.show('Logout Berhasil', ToastAndroid.LONG);
    }

    componentDidMount() {
        this.requestCameraPermission();
        this.GetBeritaAPi();
        this.GetanakrenAPi();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        this.tokenCheck();


        var now = new Date();
        var date = ((now.getDate() < 10) ? '0' : '') + now.getDate(); //Current Date
        var month = (((now.getMonth() + 1) < 10) ? '0' : '') + (now.getMonth() + 1);  //Current Month
        var year = new Date().getFullYear(); //Current Year
        this.setState({
            date_api:
                date + '-' + month + '-' + year,
        });

        setInterval(() => {
            this.setState({
                curHours: new Date().getHours(),
                curMinutes: new Date().getMinutes(),
                curSecound: new Date().getSeconds(),
            })
        }, 1000)

    }
    async docPicker() {
        // Pick a single file
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            const source = {
                uri: res[0].uri,
                type: res[0].type,
                name: res[0].name,
                size: res[0].size,
            };
            this.setState({
                file: source,
            });
            console.log('ini file', this.state.file);//here you can call your API and send the data to that API
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log("error -----", err);
            } else {
                throw err;
            }
        }
    }

    componentWillUnmount() {

        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        if (this.props.navigation.isFocused()) {
            Alert.alert(
                'Keluar',
                'Anda yakin akan keluar ?', [{
                    text: 'TIDAK',
                    onPress: () => ToastAndroid.show("Batal Keluar", ToastAndroid.SHORT)
                }, {
                    text: 'YA',
                    onPress: () => BackHandler.exitApp()
                },], {
                cancelable: true
            }
            )
            return true;
        } else {
            return this.state.canBeClosed = false;
        }
    };

    onRefresh() {
        this.tokenCheck();
    }
    getJamker() {
        const date = new Date();
        const days = moment(date).format("dddd");
        console.log("HARI : " + days);
        AsyncStorage.getItem('token').then((token) => {

            fetch('https://kilauindonesia.org/datakilau/api/getjamker/' + days, {
                headers: {
                    Authorization: 'Bearer ' + token,
                    // 'Accept': 'application/json',
                    // 'Content-Type': 'application/json'
                },
            })
                .then((res) => res.json())
                .then((resJson) => {
                    console.log('ini resjson getsaa', resJson);
                    const length = resJson.data.length;
                    this.setState({
                        satu: 2
                    });
                    if (length > 0) {
                        this.setState({
                            jam_cek_in: resJson.data[0].cek_in,
                            jam_cek_out: resJson.data[0].cek_out,
                            jam_break_out: resJson.data[0].break_out,
                            jam_break_in: resJson.data[0].break_in,
                            refreshing: false,
                        });
                    } else {
                        this.setState({
                            jam_cek_in: resJson.data[0].cek_in,
                            jam_cek_out: resJson.data[0].cek_out,
                            jam_break_out: resJson.data[0].break_out,
                            jam_break_in: resJson.data[0].break_in,
                            refreshing: false,
                        });
                    }
                })
                .catch((err) => console.log('error catch home', err));
        });
    }
    getLapBaw() {
        AsyncStorage.getItem('token').then((token) => {
            const api = this.props.user.presensi === 'kacab' ? 'presatasankacab/' : this.props.user.presensi === 'admin' ? 'presatasanadm' : 'presatasan/'
            const id = this.props.user.presensi === 'kacab' ? this.props.user.id_kantor : this.props.user.presensi === 'admin' ? '' : this.props.user.id_jabatan

            fetch('https://kilauindonesia.org/datakilau/api/' + api + id, {
                headers: {
                    Authorization: 'Bearer ' + token
                },
            })
                .then((res) => res.json())
                .then((resJson) => {
                    const length = resJson.data.length;
                    if (length > 0) {
                        this.setState({
                            getLapBaw: resJson.data,
                            enam: 2
                        });
                    } else {
                        this.setState({
                            getLapBaw: resJson.data,
                        });
                    }
                })
                .catch((err) => console.log('error catch home', err));
        });
    }
    getRekap() {
        const api = this.props.user.presensi === 'kacab' ? 'kacab/' : this.props.user.presensi === 'admin' ? 'admin/' : 'karyawan/'
        const id = this.props.user.presensi === 'kacab' ? this.props.user.id_kantor : this.props.user.presensi === 'admin' ? 1 : this.props.user.id_jabatan
        AsyncStorage.getItem('token').then((token) => {
            fetch('https://kilauindonesia.org/datakilau/api/stat/' + api + id + '/' + this.state.date_api + '/' + this.state.date_api, {
                headers: {
                    Authorization: 'Bearer ' + token,
                    // 'Accept': 'application/json',
                    // 'Content-Type': 'application/json'
                },
            })
                .then((res) => res.json())
                .then((resJson) => {
                    console.log('ini resjson getsaa', resJson);
                    const length = resJson.data.length;
                    this.setState({
                        tiga: 2
                    });
                    if (length > 0) {
                        this.setState({
                            rekap: resJson.data,
                            status1: resJson.data[0].status,
                            jumlah1: resJson.data[0].jumlah,
                            status2: resJson.data[1].status,
                            jumlah2: resJson.data[1].jumlah,
                            status3: resJson.data[2].status,
                            jumlah3: resJson.data[2].jumlah,
                            status4: resJson.data[3].status,
                            jumlah4: resJson.data[3].jumlah,
                            status5: resJson.data[4].status,
                            jumlah5: resJson.data[4].jumlah,
                            status6: resJson.data[5].status,
                            jumlah6: resJson.data[5].jumlah,
                            status7: resJson.data[6].status,
                            jumlah7: resJson.data[6].jumlah,
                            refreshing: false,
                        }),
                            this.getPerson();
                    } else {
                        this.setState({
                            rekap: resJson.data,
                            status1: resJson.data[0].status,
                            jumlah1: resJson.data[0].jumlah,
                            status2: resJson.data[1].status,
                            jumlah2: resJson.data[1].jumlah,
                            status3: resJson.data[2].status,
                            jumlah3: resJson.data[2].jumlah,
                            status4: resJson.data[3].status,
                            jumlah4: resJson.data[3].jumlah,
                            status5: resJson.data[4].status,
                            jumlah5: resJson.data[4].jumlah,
                            status6: resJson.data[5].status,
                            jumlah6: resJson.data[5].jumlah,
                            status7: resJson.data[6].status,
                            jumlah7: resJson.data[6].jumlah,
                            refreshing: false,
                        }),
                            this.getPerson();
                    }
                })
                .catch((err) => console.log('error catch home', err));
        });
    }

    getBelumLaporan() {
        // + this.props.user.id_jabatan
        AsyncStorage.getItem('token').then((token) => {
            fetch('https://kilauindonesia.org/datakilau/api/belap/' + this.props.user.id_jabatan, {
                headers: {
                    Authorization: 'Bearer ' + token,
                    // 'Accept': 'application/json',
                    // 'Content-Type': 'application/json'
                },
            })
                .then((res) => res.json())
                .then((resJson) => {
                    console.log('ini resjson getsaa', resJson);
                    const length = resJson.data.length;
                    if (length > 0) {

                        this.setState({
                            belumLap: resJson.data,
                            refreshing: false,

                        }),
                            this.getPerson();
                    } else {
                        this.setState({
                            belumLap: resJson.data,
                            refreshing: false,
                        }),
                            this.getPerson();
                    }
                })
                .catch((err) => console.log('error catch home', err));
        });
    }


    getBelumFeed() {
        AsyncStorage.getItem('token').then((token) => {
            fetch('https://kilauindonesia.org/datakilau/api/belfeed/' + this.props.user.id_karyawan + '/' + this.props.user.id_jabatan, {
                headers: {
                    Authorization: 'Bearer ' + token,
                    // 'Accept': 'application/json',
                    // 'Content-Type': 'application/json'
                },
            })
                .then((res) => res.json())
                .then((resJson) => {
                    console.log('ini resjson getsaa', resJson);
                    const length = resJson.data.length;
                    if (length > 0) {
                        this.setState({
                            belumFeed: resJson.data,
                            refreshing: false,
                        }),
                            this.getPerson();
                    } else {
                        this.setState({
                            belumFeed: resJson.data,
                            refreshing: false,
                        }),
                            this.getPerson();
                    }
                })
                .catch((err) => console.log('error catch home', err));
        });
    }

    statPress() {
        AsyncStorage.getItem('token').then((token) => {
            fetch('https://kilauindonesia.org/datakilau/api/statpresid/' + this.props.user.id_karyawan, {
                headers: {
                    Authorization: 'Bearer ' + token,
                    // 'Accept': 'application/json',
                    // 'Content-Type': 'application/json'
                },
            })
                .then((res) => res.json())
                .then((resJson) => {
                    console.log('ini resjson getsaa', resJson);
                    const length = resJson.data.length;
                    if (length > 0) {
                        this.setState({
                            pressStat: resJson.data,
                            hadirbaw: resJson.data[0].Hadir,
                            terlambatbaw: resJson.data[0].Terlambat,
                            bolosbaw: resJson.data[0].Bolos,
                            refreshing: false,
                        }),
                            this.getPerson();
                    } else {
                        this.setState({
                            pressStat: resJson.data,
                            hadirbaw: resJson.data[0].Hadir,
                            terlambatbaw: resJson.data[0].Terlambat,
                            bolosbaw: resJson.data[0].Bolos,
                            refreshing: false,
                        }),
                            this.getPerson();
                    }
                })
                .catch((err) => console.log('error catch home', err));
        });
    }
    daftaraccreq() {
        AsyncStorage.getItem('token').then((token) => {
            fetch('https://kilauindonesia.org/datakilau/api/daftareq/' + this.props.user.id_karyawan, {
                headers: {
                    Authorization: 'Bearer ' + token
                },
            })
                .then((res) => res.json())
                .then((resJson) => {
                    console.log(resJson);
                    const length = resJson.data.length;
                    if (length > 0) {
                        this.setState({
                            filacc: resJson.data.filter(i => i.acc.includes('0') | i.acc.includes('2')),
                            refreshing: false,
                        });
                    } else {
                        this.setState({
                            filacc: resJson.data.filter(i => i.acc.includes('0') | i.acc.includes('2')),
                            refreshing: false,
                        });
                    }
                })
                .catch((err) => console.log('error catch home', err));
        });
    }

    gettambah() {
        AsyncStorage.getItem('token').then((token) => {
            fetch('https://kilauindonesia.org/datakilau/api/listbayarupgaji/tambah', {
                headers: {
                    Authorization: 'Bearer ' + token
                },
            })
                .then((res) => res.json())
                .then((resJson) => {
                    const length = resJson.data.length;
                    if (length > 0) {
                        this.setState({
                            tambah: resJson.data,
                            refreshing: false,
                        });
                    } else {
                        this.setState({
                            tambah: resJson.data,
                            refreshing: false,
                        });
                    }
                })
                .catch((err) => console.log('error catch home', err));
        });
    }
    getkurang() {
        AsyncStorage.getItem('token').then((token) => {
            fetch('https://kilauindonesia.org/datakilau/api/listbayarupgaji/kurang', {
                headers: {
                    Authorization: 'Bearer ' + token
                },
            })
                .then((res) => res.json())
                .then((resJson) => {
                    const length = resJson.data.length;
                    if (length > 0) {
                        this.setState({
                            kurang: resJson.data,
                            refreshing: false,
                        });
                    } else {
                        this.setState({
                            kurang: resJson.data,
                            refreshing: false,
                        });
                    }
                })
                .catch((err) => console.log('error catch home', err));
        });
    }

    Update() {
        this.getReqnowid();
        this.getPresnowid();
        this.getLapnowid();
        this.getReqnowjab();
        this.getRiwayat();
        this.getLaporan();
        this.getFeedNow();
        this.getJamker();
        this.getRekap();
        this.getBelumLaporan();
        this.getBelumFeed();
        this.getLapBaw();
        this.getPerubahan();
        this.statPress();
        this.getnotifeed();
        this.daftaraccreq();
        this.gettambah();
        this.getkurang();
        this.getget();
        this.getkon();
        this.getkonkon();
    }

    renderBreakOut() {
        return this.state.presnowid.map((map, index) => {
            // const { id_karyawan, nama } = map
            const date = new Date();
            const { jamker } = this.state;
            const presnowid = this.state.presnowid.filter(item => item.break_in != 'null')
            const { modalSebelumPulang, modalSetelahPulang, deskripsi, reqnowid, reqnowjab } = this.state;
            var hms = moment().format('HH:mm:ss');    // your input string
            var a = hms.split(':'); // split it at the colons
            // minutes are worth 60 seconds. Hours are worth 60 minutes.
            var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
            //if you want hours
            var minutes = (seconds) / 60;

            //kondisi dari database untuk break out
            var hh = moment().format(this.state.jam_break_out);
            var as = hh.split(':');
            var ss = (+as[0]) * 60 * 60 + (+as[1]) * 60 + (+as[2]);
            var break_out_min = (ss) / 60;

            //kondisi dari database untuk break in
            var hhi = moment().format(this.state.jam_break_in);
            var asa = hhi.split(':');
            var ssa = (+asa[0]) * 60 * 60 + (+asa[1]) * 60 + (+asa[2]);
            var break_in_min = (ssa) / 60;

            //kondisi dari database untuk cekin
            var hhis = moment().format(this.state.jam_cek_in);
            var asas = hhis.split(':');
            var ssas = (+asas[0]) * 60 * 60 + (+asas[1]) * 60 + (+asas[2]);
            var cek_in_min = (ssas) / 60;




            return (
                <TouchableOpacity onPress={() => minutes > cek_in_min && minutes <= break_out_min ? alert(`Belum waktunya istirahat `) : minutes > break_out_min && minutes <= break_in_min ? this.props.navigation.navigate('BreakOut', { kar: map, status: 'breakout' }) : alert(`Tidak bisa `)}>
                    <ButtonIcon style={{ backgroundColor: 'white' }} title="Istirahat" type="layanan" tema={this.props.user.tema} />
                </TouchableOpacity>
            )
        })
    }

    renderBreakIn() {
        var hms = moment().format('HH:mm:ss');    // your input string
        var a = hms.split(':'); // split it at the colons
        // minutes are worth 60 seconds. Hours are worth 60 minutes.
        var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
        //if you want hours
        var minutes = (seconds) / 60;

        //kondisi dari database untuk break out
        var hh = moment().format(this.state.jam_break_out);
        var as = hh.split(':');
        var ss = (+as[0]) * 60 * 60 + (+as[1]) * 60 + (+as[2]);
        var break_out_min = (ss) / 60;

        //kondisi dari database untuk break in
        var hhi = moment().format(this.state.jam_break_in);
        var asa = hhi.split(':');
        var ssa = (+asa[0]) * 60 * 60 + (+asa[1]) * 60 + (+asa[2]);
        var break_in_min = (ssa) / 60;

        //kondisi dari database untuk cekin
        var hhis = moment().format(this.state.jam_cek_in);
        var asas = hhis.split(':');
        var ssas = (+asas[0]) * 60 * 60 + (+asas[1]) * 60 + (+asas[2]);
        var cek_in_min = (ssas) / 60;
        return this.state.presnowid.map((map) => {
            const presnowidIs = this.state.presnowid.filter(item => item.break_out != null)
            return (
                <TouchableOpacity onPress={() =>
                    presnowidIs.length > 0 ?
                        (
                            minutes > break_out_min && minutes <= break_in_min
                                ?
                                this.props.navigation.navigate('BreakOut', { kar: map, status: 'breakin' })
                                :
                                alert(`Tidak bisa istirahat masuk`)
                        )
                        :
                        alert('Absensi Istirahat Terlebih Dahulu!')}>
                    <ButtonIcon style={{ backgroundColor: 'white' }} title="Masuk" type="layanan" tema={this.props.user.tema} />
                </TouchableOpacity>
            )
        })
    }

    renderReqNow() {
        return this.state.reqnowid.map((map) => {
            return (
                <TouchableOpacity onPress={() =>
                    this.props.navigation.navigate('EditRequest', {
                        item: map,
                        stat: map.status === 'Dinas Luar' | map.status === 'Pulang Awal' ? 'presnow' : 'izin'
                    })
                }>
                    <ButtonIcon title="Update" type="layanan" tema={this.props.user.tema} />
                </TouchableOpacity>
            )
        })
    }
    renderReqPresNow() {
        return this.state.presnowid.map((map) => {
            return (
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Request', {
                    stat: 'presnow', idpresnow: map.id_presensi
                })}>
                    <ButtonIcon title="Request" type="layanan" tema={this.props.user.tema} />
                </TouchableOpacity>
            )
        })
    }

    renderPulang() {
        return this.state.presnowid.map((map) => {
            var hms = moment().format('HH:mm:ss');    // your input string
            var a = hms.split(':'); // split it at the colons
            // minutes are worth 60 seconds. Hours are worth 60 minutes.
            var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
            //if you want hours
            var minutes = (seconds) / 60;

            //kondisi dari database untuk break in
            var hhi = moment().format(this.state.jam_cek_out);
            var asa = hhi.split(':');
            var ssa = (+asa[0]) * 60 * 60 + (+asa[1]) * 60 + (+asa[2]);
            var cekout = (ssa) / 60;
            // 960
            return (
                <TouchableOpacity onPress={() => {
                    this.state.lapnowid.length <= 0 ? this.props.navigation.navigate('Laporan', alert('Anda belum membuat laporan'))
                        : minutes <= cekout ? alert('Belum waktunya pulang!')
                            : this.state.belumLap.length > 0 & this.state.belumFeed.length > 0 ? this.setState({ modalLaporan: true }) : this.props.navigation.navigate('MapOut', {
                                idpresnow: map.id_presensi
                            })
                }}>
                    <ButtonIcon title="Pulang" type="layanan" tema={this.props.user.tema} />
                </TouchableOpacity>
            )
        })
    }

    openWhatsApp = () => {
        let msg = "Assalamualaikum Developer App Berbagi Pendidikan, ";
        let url =
            "whatsapp://send?text=" +
            msg +
            "&phone=6282119237558"
            ;
        Linking.openURL(url)
            .then(data => {
                console.log("WhatsApp Opened successfully " + data);
            })
            .catch(() => {
                alert("Make sure WhatsApp installed on your device");
            });


    };
    openWhatsAppBawahan = (namas, nohp, msg) => {
        // let msg = "Assalamualaikum " + namas;
        let url =
            "whatsapp://send?text=" +
            msg +
            "&phone=62" + nohp
            ;
        Linking.openURL(url)
            .then(data => {
                console.log("WhatsApp Opened successfully " + data);
            })
            .catch(() => {
                alert("Make sure WhatsApp installed on your device");
            });


    };
    sendPesan() {
        // console.log('Mulai send Data');

        AsyncStorage.getItem('token').then((token) => {
            let dataToSend = {
                id_karyawan: this.state.id_kar,
                pesan: this.state.pesan,
            };
            let data = new FormData();

            for (let key in dataToSend) {
                data.append(key, dataToSend[key]);
            }
            console.log('Presensi masuk: ', data);
            fetch('https://kilauindonesia.org/datakilau/api/posthub', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                body: data,
            })
                .then((res) => res.json())
                .then((resJson) => {
                    console.log(resJson);
                    if (resJson.status === 'sukses') {
                        this.openWhatsAppBawahan(this.state.nama, this.state.nohp, this.state.pesan);
                    } else {
                        alert(`Data Pesan gagal disimpan !!!`);
                    }
                })
                .catch((err) => console.log('dari catch send Data ===', err));
        });
    }

    sendTema() {
        // console.log('Mulai send Data');

        AsyncStorage.getItem('token').then((token) => {
            let dataToSend = [];
            if (this.state.mode === 'mode') {
                dataToSend = {
                    tema: this.state.tema,
                    mode: this.state.mode
                };
            } else {
                dataToSend = {
                    color: this.state.color,
                    mode: this.state.mode
                };

            }

            let data = new FormData();

            for (let key in dataToSend) {
                data.append(key, dataToSend[key]);
            }
            console.log('Presensi masuk: ', data);
            fetch('https://kilauindonesia.org/datakilau/api/uptema/' + this.props.user.id, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                body: data,
            })
                .then((res) => res.json())
                .then((resJson) => {
                    console.log(resJson);
                    if (resJson.status === 'sukses') {
                        this.props.navigation.replace('Home');
                    } else {
                        alert(`Data tema gagal disimpan !!!`);
                    }
                })
                .catch((err) => console.log('dari catch send Data ===', err));
        });
    }

    change(nativeEvent) {
        // console.log("nativeEvent:", nativeEvent)
        if (nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if (slide !== this.state.active) {
                this.setState({
                    active: slide
                })
            }
        }
    }
    onProgress = (data) => {
        this.setState({ terkumpul: data.terkumpul.toString() });
    };
    renderDrawer = () => {
        return (
            <View style={style.contentContainer}>
                <View style={style.nama}>
                    <>
                        <Image source={akun} style={style.foto}></Image>
                        <View style={style.grouptop}>
                            <Text style={style.texttop1}>Hello,</Text>
                            <Text style={style.texttop2}>{this.props.user.name}</Text>
                        </View>
                    </>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('List_anak')} style={style.itemflat1}>
                        <View >
                            {/* <Image source={anak} style={style.logo}>
                                </Image> */}
                            <Text style={style.texttop5}> Anak Asuh</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Lapkeu')} style={style.itemflat1}>
                        <View>
                            {/* <Image source={report} style={style.logo}>
                                </Image> */}
                            <Text style={style.texttop5}> Laporan Keuangan</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { this.setState({ modalpesan: true }) }} style={style.itemflat1}>
                        <View >
                            {/* <Image source={massage} style={style.logo}>
                                </Image> */}
                            <Text style={style.texttop5}> Kirim Pesan</Text>
                        </View>
                    </TouchableOpacity>

                    <Collapse>
                        <CollapseHeader>
                            <View style={style.itemflat1}>
                                <Text style={style.texttop5}>Berbagi Bahagia</Text>
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

                            <View style={style.detail}>

                                {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Berita')} style={style.itemflat1}>
                                    <View >
                                       
                                        <Text style={style.texttop5}> Berita</Text>
                                    </View>
                                </TouchableOpacity> */}

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Berita_info')} style={style.itemflat1}>
                                    <View>
                                        {/* <Image source={report} style={style.logo}>
                                </Image> */}
                                        <Text style={style.texttop5}>Artikel</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Zakat')} style={style.itemflat1}>
                                    <View>
                                        {/* <Image source={report} style={style.logo}>
                                </Image> */}
                                        <Text style={style.texttop5}> Zakat</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('infak')} style={style.itemflat1}>
                                    <View>
                                        {/* <Image source={report} style={style.logo}>
                                </Image> */}
                                        <Text style={style.texttop5}> Infak</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </CollapseBody>

                    </Collapse>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Akun')} style={style.itemflat1}>
                        <View>
                            {/* <Image source={report} style={style.logo}>
                                </Image> */}
                            <Text style={style.texttop5}>Tentang Saya</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.logout} style={style.itemflat1}>
                        <Text style={style.texttop5}> Logout</Text>
                    </TouchableOpacity>
                </View>

            </View>

        );
    };

    getCurrentTimePercentage() {
        if (this.state.terkumpul.toString() > 0) {
            return parseFloat(this.state.terkumpul.toString()) / parseFloat(this.state.id_category);
        }
        return 0;
    };

    BB = () => {
        let url =
            'https://berbagibahagia.org/semuadonasi'
        Linking.openURL(url)
            .then(data => {
                console.log("Opened successfully " + data);
            })
    };
    render() {
        const touchableOpacityProps = {
            activeOpacity: 0.6,
        };

        const touchableHighlightProps = {
            activeOpacity: 0.5,
            underlayColor: 'green',
        };

        const getDisplayName = Component => (
            Component.displayName ||
            Component.name ||
            (typeof Component === 'string' ? Component : 'Component')
        );
        // ini untuk animasi memakasi TouchableWithoutFeedback
        // const pinStyle={
        //     transform:[{
        //         scale:this.animation.interpolate({
        //             translateY:[0,1],
        //             outputRange:[0,-80]
        //         })
        //     }]
        // }
        // const rotation = {
        //     transform:[{
        //         rotate: this.animation.interpolate({
        //             inputRange:[0,1],
        //             outputRange:['0deg','45deg']
        //         })
        //     }]
        // }
        // const Drawer = createDrawerNavigator();
        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
        const { Touchable } = this.state;
        const { detbe } = this.state
        const buttonText = 'Select ' + (Touchable ? (getDisplayName(Touchable)) : 'default');
        const { active } = this.state;
        const date = new Date()
        var ca = moment().format('HH:mm:ss');
        var c = ca.split(':');
        var secondss = (+c[0]) * 60 * 60 + (+c[1]) * 60 + (+c[2]);
        var sekarang = (secondss) / 60;
        const images = [
            'https://www.omipharma.vn/files/banner/2020-07/xit-chong-nang-lishan-nhat-ban-spf-50-pa-huong-tinh-dau-thien-nhien.jpg',
            'https://www.omipharma.vn/files/banner/2020-06/omi-pharma-thau-hieu-hon-moi-ngay.jpg',
            'https://www.omipharma.vn/files/banner/2020-06/omi-pharma-thau-hieu-nhu-cau-dan-dau-lua-chon.jpg'
        ]
        return (
            <ScrollView contentContainerStyle={style.contentContainer} showsVerticalScrollIndicator={true}>
                <View>
                    {/* user.presensi itu di dapat di redux/store */}
                    {this.props.user.presensi === 'admin' ?
                        <ScrollView contentContainerStyle={style.contentContainer} showsVerticalScrollIndicator={true}>
                            <>
                                <DrawerLayout
                                    drawerWidth={250}
                                    drawerStyle={{ borderTopRightRadius: 10, borderBottomRightRadius: 10, }}
                                    drawerPosition={DrawerLayout.positions.Left}
                                    drawerType="front"
                                    drawerBackgroundColor="#ddd"
                                    renderNavigationView={this.renderDrawer}
                                    onDrawerSlide={this.handleDrawerSlide}>
                                    <View>
                                        <View style={style.presensi1}>
                                            <Text style={{ position: 'absolute', top: 0, left: 30, color: '#353739', marginBottom: 10, marginTop: 5, }}> Total Donasi: </Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ position: 'absolute', top: 20, left: 30, color: '#353739' }}> Rp. </Text>
                                                <Text style={{ position: 'absolute', top: 20, left: 50, color: '#353739', fontSize: 25, }}> 100000000 </Text>
                                            </View>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Lapkeu')} style={{ position: 'absolute', top: 40, left: 250, bottom: 0, right: 0, }}>
                                                <Text > Rincian
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
                                                </Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10, marginHorizontal: 10, }}>
                                            <View style={style.detail}>
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Berita')} style={style.itemflat}>
                                                    <View >
                                                        <Image source={news1} style={style.logo3}>
                                                        </Image>
                                                    </View>
                                                    <Text style={style.texttop5}>Berita</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Lapkeu')} style={style.itemflat}>
                                                    <View>
                                                        <Image source={report} style={style.logo3}>
                                                        </Image>
                                                        <Text style={style.texttop5}> Laporan{"\n"}Keuangan </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={style.detail}>
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate('List_anak')} style={style.itemflat}>
                                                    <View >
                                                        <Image source={anak} style={style.logo3}>
                                                        </Image>
                                                        <Text style={style.texttop5}>Anak Asuh</Text>
                                                    </View>
                                                </TouchableOpacity>

                                                <TouchableOpacity onPress={() => { this.setState({ modalpesan: true }) }} style={style.itemflat}>
                                                    <View>
                                                        <Image source={massage} style={style.logo3}>
                                                        </Image>
                                                        <Text style={style.texttop5}> Kirim Pesan </Text>
                                                    </View>
                                                </TouchableOpacity>

                                            </View>
                                        </View>

                                        <View >
                                            <View style={style.presensi}>
                                                <Text style={{ position: 'absolute', top: 0, left: 30, color: '#353739' }}>Jumlah Anak Asuh</Text>
                                                <View style={{ position: 'absolute', top: 10, right: 30 }}>
                                                </View>
                                                <View style={{ marginTop: 25, marginLeft: 20, marginRight: 20, padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ color: '#51C95D', fontWeight: 'bold' }}>{this.state.hadirbaw}</Text>
                                                        <Text style={{ fontSize: 11, color: '#353739' }}> Laki-laki</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ color: '#FFB63E', fontWeight: 'bold' }}>{this.state.terlambatbaw}</Text>
                                                        <Text style={{ fontSize: 11, color: '#353739' }}> Perempuan </Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ color: '#FF845D', fontWeight: 'bold' }}>{this.state.hadirbaw}</Text>
                                                        <Text style={{ fontSize: 11, color: '#353739' }}> Jumlah</Text>
                                                    </View>

                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'column', marginTop: 20, marginBottom: 20, }}>

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
                                                        Apa yang Menarik hari ini
                                                    </Text>
                                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Web1')}>
                                                        <Text style={style.btnSimpanUn}> Lihat Artikel</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <ImageBackground source={read1} style={{
                                                    marginLeft: 60,
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
                                                marginBottom: 50,
                                                borderColor: '#E9E9E9',
                                                justifyContent: 'center', alignItems: 'center',
                                                alignContent: 'center',
                                                textAlign: 'center',
                                                backgroundColor: '#87CEEB',
                                            }}>
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Text style={{ textAlign: 'center', margin: 10, }}>
                                                        Ayo menjadi orang tua asuh
                                                    </Text>
                                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('List_anak')}>
                                                        <Text style={{
                                                            width: '90%',
                                                            fontWeight: 'bold',
                                                            backgroundColor: '#fff',
                                                            borderRadius: 10,
                                                            padding: 10,
                                                            justifyContent: 'center', alignItems: 'center',
                                                            alignContent: 'center',
                                                            textAlign: 'center',
                                                            fontWeight: 'bold',
                                                            marginLeft: 20,
                                                        }}> Tambah Anak Asuh</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <ImageBackground source={tamak} style={style.banner}></ImageBackground>
                                            </View>
                                        </View>

                                    </View>

                                </DrawerLayout>
                            </>
                        </ScrollView>
                        :
                        <View />
                    }
                    {this.props.user.presensi === 'karyawan' ?
                        <ScrollView contentContainerStyle={style.contentContainer} showsVerticalScrollIndicator={false}>
                            <View style={{ marginTop: 15, flexDirection: 'row', marginBottom: 20, alignItems: 'center', justifyContent: 'center', }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Kegiatan2')} style={style.logo}>
                                    <View style={style.icons}>
                                        <Image source={kegiatan} style={style.logo}>
                                        </Image>
                                        <Text style={style.texttop3}> Tambah Kegiatan</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Anak_Binaan')} style={style.logo}>
                                    <View style={style.icons2}>
                                        <Image source={anak} style={style.logo}>
                                        </Image>
                                        <Text style={style.texttop3}> Anak Binaan</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 40, alignItems: 'center', justifyContent: 'center', }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Tutor')} style={style.logo}>
                                    <View style={style.icons3}>
                                        <Image source={tutor} style={style.logo}>
                                        </Image>
                                        <Text style={style.texttop4}> Pengajar</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.logout} style={style.itemflat1}>
                                    <Text style={style.texttop5}> Logout</Text>
                                </TouchableOpacity>
                                {/* <TouchableOpacity onPress={this.logout} style={style.logo}>
                        <View style={style.icons3}>
                            <Image source={logout} style={style.logo}>
                            </Image>
                            <Text style={style.texttop3}> Logout</Text>
                        </View>
                    </TouchableOpacity>  */}
                            </View>
                            <View style={style.presensi}>
                                <Text style={{ position: 'absolute', top: 0, left: 30, color: '#353739' }}>Jumlah Anak Binaan</Text>
                                <View style={{ position: 'absolute', top: 10, right: 30 }}>
                                </View>
                                <View style={{ marginTop: 25, marginLeft: 20, marginRight: 20, padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: '#51C95D', fontWeight: 'bold' }}>{this.state.hadirbaw}</Text>
                                        <Text style={{ fontSize: 11, color: '#353739' }}>  Laki-laki</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: '#FFB63E', fontWeight: 'bold' }}>{this.state.terlambatbaw}</Text>
                                        <Text style={{ fontSize: 11, color: '#353739' }}> Perempuan </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: '#FF845D', fontWeight: 'bold' }}>{this.state.bolosbaw}</Text>
                                        <Text style={{ fontSize: 11, color: '#353739' }}>  Jumlah</Text>
                                    </View>

                                </View>
                            </View>
                        </ScrollView>
                        :
                        <View />
                    }

                    <Modal animationType={"fade"} transparent={true}
                        visible={this.state.modalpesan}
                        onRequestClose={() => { console.log("Modal has been closed.") }}>

                        <SafeAreaView style={{

                            backgroundColor: '#ffffff',
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignContent: 'center',
                        }}>
                            <TouchableOpacity activeOpacity={1.0} onPress={() => this.setState({ modalpesan: false })} style={style.ModalCont}>
                                <View style={{
                                    paddingTop: 5,
                                    marginHorizontal: 10,
                                    marginTop: 500,
                                    backgroundColor: '#ffffff',
                                    // flexDirection: 'row',
                                    borderRadius: 20,
                                    height: 250,
                                    width: 250,
                                    shadowColor: "#333",
                                    shadowOffset: {
                                        width: 1,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 2,
                                    elevation: 3,
                                    alignItems: 'center',
                                    flexDirection: 'row',

                                }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home', this.setState({ modalpesan: false }))} style={{ position: 'absolute', right: 20, top: 20 }}>
                                        <Image source={x}
                                            style={{
                                                height: 30,
                                                width: 30, alignItems: 'center',
                                            }}></Image>
                                    </TouchableOpacity>

                                    <SafeAreaView style={{ marginLeft: 60 }}>
                                        <TouchableOpacity onPress={() => this.openWhatsApp()}>
                                            <View style={style.form}>
                                                <Image source={WA} style={style.logo}>
                                                </Image>
                                                <Text style={{
                                                    fontSize: 14,
                                                    fontWeight: 'bold',
                                                    marginVertical: 5,
                                                    marginLeft: 20,
                                                    width: 100,
                                                    color: '#000'
                                                }}>WhatsApp</Text>
                                            </View>
                                        </TouchableOpacity>

                                    </SafeAreaView>
                                </View>
                            </TouchableOpacity>
                        </SafeAreaView>
                    </Modal>
                </View>
            </ScrollView >

        )
    }
}
const style = StyleSheet.create({
    presensi: {
        flexDirection: 'column',
        borderRadius: 1,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 0.51,
        elevation: 5,
        bottom: 0,
        left: 0, right: 0,
        height: 75,
    },
    presensi1: {
        flexDirection: 'column',
        borderRadius: 1,
        width: '90%',
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
        bottom: 0,
        left: 0, right: 0,
        height: 70,
        marginTop: 20,
        marginLeft: 20,
        borderRadius: 10,
    },
    example: {
        marginVertical: 10,
        flexDirection: 'row',
        marginLeft: 10,
        justifyContent: 'space-between',
    },
    example1: {
        flexDirection: 'row',
        marginLeft: 10,
        justifyContent: 'space-between',
    },
    logo4: {
        width: 75,
        height: 75,
        marginLeft: 10,
    },
    logo5: {
        width: 25,
        height: 25,
        marginLeft: 10,
    },
    logo3: {
        marginTop: 0,
        marginBottom: 10,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        backgroundColor: '#f2f2f2'
    },
    logo: {
        marginTop: 20,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
    },
    banner: {
        marginLeft: 30,
        width: 100,
        height: 120,

    },

    cardtop: {
        width: '90%',
        marginLeft: 20,
        marginTop: -60,
        borderRadius: 50,
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1,
        },
    },
    nama: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        borderRadius: 1,
        backgroundColor: '#0EBEDF',
    },

    foto: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 7,
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        borderRadius: 50,
    },
    icons: {
        marginTop: 10,
        marginBottom: 10,
        paddingRight: 30,

    },
    icons2: {
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 30,

    },
    icons3: {
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 30,
    },

    grouptop: {
        marginTop: -10,
        marginLeft: 5,
        border: 1,

    },
    texttop: {
        fontSize: 12,
        color: '#000',
        marginTop: 0,

    },
    texttop1: {
        fontSize: 12,
        color: '#fff',
        marginTop: 15,
    },

    texttop2: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        width: '100%',
        marginTop: -5,
        flexDirection: 'row',

    },
    texttop3: {
        fontSize: 12,
        color: '#353739',
        paddingLeft: 30,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    texttop4: {
        fontSize: 12,
        color: '#000',
        paddingLeft: 30,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    texttop5: {
        fontSize: 16,
        color: '#353739',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    boxtop: {
        flex: 1,
        borderRadius: 10,
        width: '80%',
        padding: 20,
        color: '#51C9C2',
        padding: 5,
        marginRight: 20,
        marginLeft: 20,
    },
    button: {
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: "#DDDDDD",
        padding: 10,
        width: '30%',
        justifyContent: 'center'
    },
    countContainer: {
        color: '#000000',
        alignItems: "center",
        padding: 5,
        justifyContent: 'center'
    },
    input: {
        color: '#000000',
        height: 100,
        borderRadius: 5,
    },
    Textinputcss: {
        borderRadius: 5,
        borderWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        height: 100,
        color: '#000000',
        borderColor: '#000000'
    },
    kotak1: {
        marginLeft: 30,
        marginTop: 10,
        marginRight: 10,
        borderRadius: 5,
        borderWidth: 1,
        height: 100,
        width: 300,
        padding: 20,
        color: '#000000',
    },
    kotak2: {
        color: '#000000',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5,
        borderWidth: 1,
        fontSize: 12,
        height: 52,
        width: 300,
        padding: 20,
        borderColor: '#000000',
    },
    Label: {
        padding: 5,
        color: '#000000',
        marginTop: -10,
        fontSize: 7,
    },
    Label1: {
        padding: 5,
        color: '#000000',
        fontSize: 7,
    },
    contentContainer: {
        backgroundColor: '#fff',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    },
    tmblogout: {
        backgroundColor: '#0EBEDF',
        borderRadius: 10,
        fontSize: 12,
        width: 90,
        height: 30,
        paddingLeft: 25,
        marginHorizontal: 20,
        marginTop: 10,
    },
    tmbl: {
        backgroundColor: '#0EBEDF',
        borderRadius: 10,
        fontSize: 12,
        width: 90,
        height: 40,
        paddingLeft: 25,
        marginHorizontal: 20,
        marginTop: 10,
    },

    cardtop2: {
        width: '80%',
        height: '50%',
        height: 150,
        alignItems: 'center',
        marginLeft: 60,
    },
    texttime: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textdate: {
        fontSize: 14,
        color: '#fff',
        justifyContent: 'center',
        alignItems: 'center',


    },
    kotak3: {
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ModalCont2: {
        flex: 1,
        // alignItems: 'center',
        backgroundColor: '#00000079',
    },

    groupdatetime: {
        marginTop: 30,
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: -50,
    },
    form: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    ModalCont: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#00000099',
        paddingHorizontal: 10,
    },
    wrap: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.25 // 25% window
    },
    itemflat: {
        fontSize: 16,
        flexDirection: 'column',
        marginVertical: 8,
        borderColor: '#7e7e7e',
    },

    itemflat1: {
        fontSize: 16,
        flexDirection: 'column',
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
        elevation: 1,
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
        marginLeft: 20,
        fontWeight: 'bold',
    },
    btnSimpanUn2: {
        flexDirection: 'row',
        width: '80%',
        height: 100,
        borderRadius: 10,
        borderWidth: 1,
        marginLeft: 50,
        marginTop: 10,
        borderColor: '#E9E9E9',
        justifyContent: 'center', alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        backgroundColor: '#FFD700',
    },
    innerProgressCompleted: {
        height: 10,
        backgroundColor: '#0EBEDF',
    },
    innerProgressRemaining: {
        height: 10,
        backgroundColor: '#f2f2f2',
    },
    controls: {
        backgroundColor: 'transparent',
        borderRadius: 5,
        position: 'absolute',
        bottom: -5,
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
    wrap: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.25 // 25% window
    },
    detail: {
        justifyContent: 'center',
        textAlign: 'center',
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);





//     getProfile(token) {
//         console.log('mulai getProfile...');
//         setTimeout(() => {
//             this.setState({ loading: true });
//         }, 500);
//         const endpoint = 'https://kilauindonesia.org/datakilau/api/getprofilekar';
//         fetch(endpoint, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         })
//             .then((res) => res.json())
//             .then((resjson) => {
//                 console.log('ini resjson getprofile', resjson);
//                 if (resjson.data) {
//                     this.updateState(resjson.data);
//                 }
//             })
//             .catch((err) => {
//                 console.log('error dari splash profile', err);
//             });

//     }
//           async updateState(data) {
//         this.props.changeUser(data);
//         this.Update();
//         console.log('ini email', this.props.user.email);
//     }
//     async tokenCheck() {
//         AsyncStorage.getItem('token').then((res) => {
//             console.log('ini token ', res);
//             if (res) {
//             this.getProfile(res);
//             }
//         });
//     }
//     state = {
//         curHours: null,
//         curMinutes: null,
//         curSecound: null,

//     };






// render() {
//     return (
// <ScrollView contentContainerStyle={style.contentContainer} showsVerticalScrollIndicator={true}>
//     <View>
//         <>
//         <View style={style.grouptop}>
//         <Text style={style.texttop1}>HELLO,</Text>
//         <Text style={{fontSize:18,
//         fontWeight: 'bold',
//         color: this.props.user.tema === 0 ? '#777777' : '#00CED1',
//         width:'75%',
//         marginTop:-5}}>{this.props.user.name}</Text>
//     </View>
//     <View style={{height: 7, backgroundColor: this.props.user.tema === 0 ? '#000000' : '#0EBEDF', marginTop:10}} />
//     {/* <View style={{backgroundColor:WARNA_UTAMA, height:20, width:'50%', position:'absolute', top:0, right:0, borderBottomLeftRadius:50}}></View> */}
//     <ScrollView style={{marginBottom:20}}
//     vertical={true}
//     />
//         </>
//     </View>
//     <TouchableOpacity onPress={this.logout} style={style.tmblogout}>
//                     <View>
//                     <Text style={style.texttop}>Logout</Text>
//                     </View>
//                 </TouchableOpacity>
// </ScrollView>



//         );

//     };

// };



