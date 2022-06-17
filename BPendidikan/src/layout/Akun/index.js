
import { Modal, BackHandler, ScrollView, Linking, TextInput, Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Alert, ToastAndroid, Image } from 'react-native'
import { arrow, rec, email, phone, Group, Banner, akun, logout, anak } from '../../assets/images'
import React, { Component } from 'react';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { connect } from 'react-redux';

export class Akun extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gambar: '',
      image: {
        name: '',
        type: '',
        uri: "...",
        id: 0,
      },
      count: 1,
      Camera: '',
      nama: '',
      text: '',
      email: '',
      alamat: '',
      dosa: [],
      selectedValue: '',
      show: 0,
      index: 0,
      Kegiatan: [],
      id_kegiatan: '',
      nama_kegiatan: '',
      keg: '',
      modaleditprofil: false,
      modaleditpassword: false,
    }
  }



  componentDidMount() {
    this.GetDataAPi();
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    // Firebase.initializeApp(this);
    // this.requestCameraPermission();
    console.log(this.props);
  }

  componentWillUnmount() {
    this.mounted = false;
    // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);

  }

  // handleBackButton = () => {
  //   if (this.props.navigation.isFocused()) {
  //     Alert.alert(
  //       'Keluar',
  //       'Anda yakin akan keluar aplikasi ?', [{
  //         text: 'TIDAK',
  //         onPress: () => ToastAndroid.show("Batal Keluar", ToastAndroid.SHORT)
  //       }, {
  //         text: 'YA',
  //         onPress: () => BackHandler.exitApp()
  //       },], {
  //       cancelable: true
  //     }
  //     )
  //     return true;
  //   } else {
  //     return this.state.canBeClosed = false;
  //   }
  // };
  GetDataAPi() {
    fetch('https://berbagipendidikan.org/sim/api/Kegiatan/getkegiatan').then(res => {
      if (res.status === 200)
        return res.json()
    }).then(resdata => {
      console.log(resdata.DATA)
      this.setState({
        Kegiatan: resdata.DATA
      })
    })
  }
  Update() {
    this.Kegiatan();
  }
  youtube = () => {
    let url =
      'https://www.youtube.com/'
    Linking.openURL(url)
      .then(data => {
        console.log("Opened successfully " + data);
      })
  };
  onPressButton() {
    alert('You clicked the button!')
  }
  displayModal(show) {
    this.setState({ modaleditprofil: show })
  }
  displayModal(show) {
    this.setState({ modaleditpassword: show })
  }

  render() {
    const requestCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "App Camera Permission",
            message: "App needs access to your camera ",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Camera permission given");
        } else {
          console.log("Camera permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    };

    return (
      <ScrollView contentContainerStyle={style.contentContainer} showsVerticalScrollIndicator={false}>
        {this.props.user.presensi === 'karyawan' ?
          <><><View style={{ backgroundColor: '#0EBEDF' }}>
            <Text style={style.title}>Akun</Text>
          </View>

            <Text style={style.Label1}>Nama</Text>
            <TextInput
              style={style.kotak2}
              placeholder="Nama "
              placeholderTextColor='#7e7e7e' />

            <Text style={style.Label}>Password</Text>
            <TextInput
              style={style.kotak2}
              placeholder="Password "
              placeholderTextColor='#7e7e7e' />

            <Text style={style.Label}>Nama 2</Text>
            <TextInput
              style={style.kotak2}
              placeholder="Nama "
              placeholderTextColor='#7e7e7e' />
            <Text style={style.Label}>password 2</Text>

            <TextInput
              style={style.kotak2}
              placeholder="Password "
              placeholderTextColor='#7e7e7e' /></>

            <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}>
              <TouchableOpacity onPress={() => this.youtube()}>
                <Image source={Banner} style={{ marginTop: 30, height: '100%', width: '100%', height: 60, justifyContent: 'center', alignItems: 'center' }} />
                <Text style={{ fontWeight: 'bold', color: '#000', marginLeft: 20, marginRight: 10, marginTop: -30, justifyContent: 'center', alignItems: 'center', paddingRight: 35, }}>Tutorial</Text>
              </TouchableOpacity>
            </View>

            <View style={{
              position: 'absolute',
              flexDirection: 'row',
              backgroundColor: '#0EBEDF',
              justifyContent: 'space-between',
              paddingRight: 30,
              paddingLeft: 15,
              paddingVertical: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 7,
              },
              shadowOpacity: 0.43,
              shadowRadius: 9.51,

              elevation: 15,
              bottom: 0,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              left: 0, right: 0,
              height: 70
            }}>
              <TouchableOpacity onPress={() => this.props.navigation.replace('Akun')} style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                backgroundColor: '#fff',
                borderRadius: 15,
                paddingLeft: 15,
                paddingRight: 15,
                marginRight: -30
              }}>
                <View>
                  <Image source={akun} style={style.logo5}>
                  </Image>
                  <Text style={{
                    color: '#000', fontSize: 13, marginLeft: 5, fontWeight: 'bold'
                  }}>Profil </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.replace('Home')} style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                backgroundColor: '#0EBEDF',
                borderRadius: 15,
                paddingLeft: 15,
                paddingRight: 15,
                marginRight: -30
              }}>

                <View>
                  <Image source={Group} style={style.logo4}>
                  </Image>
                  <Text style={{
                    color: '#000', fontSize: 13, marginLeft: 5, fontWeight: 'bold'
                  }}></Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.logout} style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                backgroundColor: '#fff',
                borderRadius: 15,
                paddingLeft: 15,
                paddingRight: 15,
                marginRight: -10,
              }}>
                <View>
                  <Image source={logout} style={style.logo3}>
                  </Image>
                  <Text style={{
                    color: '#000', fontSize: 13, marginLeft: 5, fontWeight: 'bold'
                  }}>Logout </Text>
                </View>
              </TouchableOpacity>
            </View></>
          :
          <View />
        }
        {this.props.user.presensi === 'admin' ?
          <ScrollView contentContainerStyle={style.contentContainer} showsVerticalScrollIndicator={false}>
            <View style={{ backgroundColor: '#0EBEDF' }}>
              <Text style={style.title}>Akun</Text>
            </View>
            <View style={style.col}>
              <View style={style.groupdatetime}>
                <Image source={akun} style={style.foto}></Image>
                <View style={{ flexDirection: 'column', marginLeft: 15, marginTop: -10, flex: 1, }}>
                  <Text style={style.Label1}> Nama</Text>
                  <Text style={style.Label1}> Test Donatur </Text>
                  <View style={{ marginVertical: 10 }}></View>
                  <Text style={style.Label1}> Alamat</Text>
                  <Text style={style.Label1}> Sumedang </Text>

                </View>
              </View>
            </View>
            <Collapse style={{ marginBottom: 10, }}>
              <CollapseHeader>
                <View style={style.coltom}>
                  <Text style={style.Label1}>Kontak</Text>
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

                <View style={style.col}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image source={phone} style={style.ImageStyle}></Image>
                    <View style={{ flexDirection: 'column', padding: 10, }}>
                      <Text style={style.Label1}> No.TLP</Text>
                      <Text style={style.Label1}> 08981021039</Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <Image source={rec} style={style.ImageStyle}></Image>
                    <View style={{ flexDirection: 'column', padding: 10, }}>
                      <Text style={style.Label1}> Rekening</Text>
                      <Text style={style.Label1}> 03234345235623</Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <Image source={email} style={style.ImageStyle}></Image>
                    <View style={{ flexDirection: 'column', padding: 10, }}>
                      <Text style={style.Label1}> Email</Text>
                      <Text style={style.Label1}> Test@gmail.com</Text>
                    </View>
                  </View>

                </View>
              </CollapseBody>
            </Collapse>
            <Collapse style={{ marginBottom: 10, }}>
              <CollapseHeader>
                <View style={style.coltom}>
                  <Text style={style.Label1}>Campaign Saya</Text>
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

                <View style={style.col}>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Foundasier')}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image source={rec} style={style.ImageStyle}></Image>
                    <View style={{ flexDirection: 'column', padding: 15, }}>
                      <Text style={style.Label1}> jumlah</Text>
                    </View>
                  </View>
                    </TouchableOpacity>

                </View>
              </CollapseBody>
            </Collapse>


            <Collapse>
              <CollapseHeader>
                <View style={style.coltom}>
                  <Text style={style.Label1}>Edit</Text>
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
                  <TouchableOpacity onPress={() => { this.setState({ modaleditpassword: true }) }} style={style.coltom2} >
                    <View>
                      <Text style={style.Label1}>Edit Password</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => { this.setState({ modaleditprofil: true }) }} style={style.coltom2}>
                    <View>
                      <Text style={style.Label1}>Edit Profil</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </CollapseBody>
            </Collapse>
            {/* <Text style={style.Label}>Nama</Text>
            <TextInput
              style={style.kotak2}
              placeholder="Nama "
              placeholderTextColor='#7e7e7e' />
              <Text style={style.Label}>Wilayah</Text>
              <TextInput
              style={style.kotak2}
              placeholder="Password "
              placeholderTextColor='#7e7e7e' />
              <Text style={style.Label}>Kota</Text>
              <TextInput
              style={style.kotak2}
              placeholder="Nama "
              placeholderTextColor='#7e7e7e' />
              <Text style={style.Label}>password 2</Text>
              <TextInput
              style={style.kotak2}
              placeholder="Password "
              placeholderTextColor='#7e7e7e' /> */}

            {/* <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}>
              <TouchableOpacity onPress={() => this.youtube()}>
                <Image source={Banner} style={{ marginTop: 30, height: '100%', width: '100%', height: 60, justifyContent: 'center', alignItems: 'center' }} />
                <Text style={{ fontWeight: 'bold', color: '#000', marginLeft: 20, marginRight: 10, marginTop: -30, justifyContent: 'center', alignItems: 'center', paddingRight: 35, }}>Tutorial</Text>
              </TouchableOpacity>
            </View> */}

          </ScrollView>
          :
          <View />
        }
        <Modal animationType={"slide"} transparent={true}
          visible={this.state.modaleditprofil}
          onRequestClose={() => { console.log("Modal has been closed.") }}>
          <SafeAreaView style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            marginTop: 100,
          }}>
            <View style={{
              paddingTop: 5,
              marginHorizontal: 10,
              backgroundColor: '#ffffff',
              // flexDirection: 'row',
              borderRadius: 20,
              height: 450,
              width: 350,
              shadowColor: "#333",
              shadowOffset: {
                width: 1,
                height: 1,
              },
              shadowOpacity: 0.3,
              shadowRadius: 2,
              elevation: 3,
              flexDirection: 'row',
            }}>
              <SafeAreaView style={{ flex: 1 }}>
                <View >
                  <Text style={style.Labeledit}>Edit Profil</Text>
                  <View style={{ margin: 15 }}>
                    <Text style={style.Label1}>Alamat</Text>
                    <TextInput
                      style={style.colin}
                      placeholder="Alamat"
                      placeholderTextColor='#7e7e7e' />

                    <Text style={style.Label1}>No.Tlp</Text>
                    <TextInput
                      style={style.colin}
                      placeholder="No.Tlp "
                      placeholderTextColor='#7e7e7e' />

                    <Text style={style.Label1}>No.Rekening</Text>
                    <TextInput
                      style={style.colin}
                      placeholder="No.Rekening "
                      placeholderTextColor='#7e7e7e' />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 30, }}>
                      <TouchableOpacity onPress={() => this.setState({ modaleditprofil: false })} style={style.btnSimpanUn1} >
                        <Text style={{ fontWeight: 'bold' }}>Kembali</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.setState({ modaleditprofil: false }, ToastAndroid.show('Data Telah Disimpan', ToastAndroid.SHORT))} style={style.btnSimpanDark} >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Simpan</Text>
                      </TouchableOpacity>
                    </View>

                  </View>
                </View>
              </SafeAreaView>
            </View>
          </SafeAreaView>
        </Modal>

        <Modal animationType={"fade"} transparent={true}
          visible={this.state.modaleditpassword}
          onRequestClose={() => { console.log("Modal has been closed.") }}>
          <SafeAreaView style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            marginTop: 100,
          }}>
            <View style={{
              paddingTop: 5,
              marginHorizontal: 10,
              backgroundColor: '#ffffff',
              // flexDirection: 'row',
              borderRadius: 20,
              height: 450,
              width: 350,
              shadowColor: "#333",
              shadowOffset: {
                width: 1,
                height: 1,
              },
              shadowOpacity: 0.3,
              shadowRadius: 2,
              elevation: 3,
              flexDirection: 'row',
            }}>
              <SafeAreaView style={{ flex: 1 }}>
                <View >
                  <Text style={style.Labeledit}>Ganti Kata Sandi</Text>
                  <View style={{ margin: 15 }}>
                    <Text style={style.Label1}>Kata Sandi Lama</Text>
                    <TextInput
                      style={style.colin}
                      placeholder="Kata Sandi Lama"
                      placeholderTextColor='#7e7e7e' />

                    <Text style={style.Label1}>Kata Sandi baru</Text>
                    <TextInput
                      style={style.colin}
                      placeholder="Kata Sandi Baru "
                      placeholderTextColor='#7e7e7e' />

                    <Text style={style.Label1}> Konfirmasi Kata Sandi Baru</Text>
                    <TextInput
                      style={style.colin}
                      placeholder=" Konfirmasi Kata Sandi Baru"
                      placeholderTextColor='#7e7e7e' />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 30, }}>
                      <TouchableOpacity onPress={() => this.setState({ modaleditpassword: false })} style={style.btnSimpanUn1} >
                        <Text style={{ fontWeight: 'bold' }}>Kembali</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.setState({ modaleditpassword: false }, ToastAndroid.show('Data Telah Disimpan', ToastAndroid.SHORT))} style={style.btnSimpanDark} >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Simpan</Text>
                      </TouchableOpacity>
                    </View>

                  </View>
                </View>
              </SafeAreaView>
            </View>
          </SafeAreaView>
        </Modal>
      </ScrollView >
    )
  }
}


const style = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: -5,
    width: '100%',
    hoght: '100%',
  },
  Label: {
    fontSize: 20,
    color: '#000000',
    marginLeft: 10,
  },
  Label1: {
    fontSize: 16,
    color: '#000000',
    marginLeft: 10,
  },
  Labelkon: {
    fontSize: 20,
    color: '#000000',
    marginLeft: 30,
    marginTop: 20,
    marginBottom: 20,
  },
  kotak2: {
    color: '#000',
    marginLeft: 20,
    marginRight: 20,
    marginTop: -5,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 12,
    height: 47,
    backgroundColor: '#fff',
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderColor: '#f2f2f2',
    elevation: 3,
  },
  logo: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  texttop: {
    fontSize: 12,
    color: '#000',
    marginTop: 0,
    backgroundColor: '#fff'

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
  cardtop: {
    backgroundColor: '#0EBEDF',
    marginLeft: 20,
    marginTop: -60,
    width: '90%',
    borderRadius: 10,
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 1,
    }
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
  contentContainer: {
    flex: 1,
  },
  title: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  texttop: {
    fontSize: 12,
    color: '#000',
    marginTop: 0,
  },
  logo5: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  logo4: {
    width: 75,
    height: 75,
    marginLeft: 10,
  },
  logo3: {
    width: 25,
    height: 19,
    marginLeft: 15,
  },
  foto: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    width: 125,
    height: 125,
    borderRadius: 50,
    marginLeft: 10,
  },
  groupdatetime: {
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  btnSimpanUn1: {
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
  col: {
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
  coltom2: {
    width: '95%',
    marginLeft: 10,
    fontSize: 16,
    flexDirection: 'row',
    padding: 10,
    marginVertical: 4,
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
  coltom: {
    width: '95%',
    marginLeft: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    fontSize: 16,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
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
  ImageStyle: {
    marginTop: 10,
    marginLeft: 20,
    height: 45,
    width: 45,
  },

  detail: {
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
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
    marginTop: 10,
  },
  Labeledit: {
    fontSize: 20,
    color: '#000000',
    marginLeft: 10,
    marginTop: 10,
  },
  colin: {
    width: '80%',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    fontSize: 16,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
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
    backgroundColor: '#0EBEDF',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    textAlign: 'center',
    justifyContent: 'center', alignItems: 'center'
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
export default connect(mapStateToProps, mapDispatchToProps)(Akun);
