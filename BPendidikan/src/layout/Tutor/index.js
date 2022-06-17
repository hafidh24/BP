import { RefreshControl, Dimensions, ToastAndroid, Alert, Modal, TouchableOpacity, ScrollView, FlatList, SafeAreaView, Image, Text, View, TextInput, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { search, arrow } from '../../assets/images'
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

const numColumns = 3
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
export class Tutor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gambar: '',
      img: {
        0: {
          image: {
            name: '',
            type: '',
            uri: 'https://static.thenounproject.com/png/187803-200.png'
          },
        }
      },
      imgp: {
        0: {
          image: {
            name: '',
            type: '',
            uri: 'https://static.thenounproject.com/png/187803-200.png'
          },
        }
      },
      img1: null,
      img2: 0,
      img3: null,
      img4: 0,
      count: 1,
      Camera: '',
      nama: '',
      Tutor: [],
      search: [],
      detak: [],
      modaldetail: 'false',
      collapse: 'false',
      index: -1,
      modalTamAK: false,
      modalTamPel: false,
      pel: '',
      myd: '',
      materi: [],
      check: false,
      Pel: '',
      filter: [],
      refreshing: true,
    }
  }
  takePicAK(index) {
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
              prevState.img[index] = source
              //   prevState.tgl_lahir[index] != this.props.route.params.tgl_lahir[index] ? this.setState({tglmbuh : true}) : this.setState({tglmbuh : false});
              return {
                img: prevState.img
              }
            }, () => console.log(this.state.img));
            this.setState({
              img1: index,
              img2: index,
            });
            console.log('ini gambar = ', this.state.img);
          }
        },
      );
    }
  }
  takePicPel(index) {
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
              prevState.imgp[index
              ] = source
              //   prevState.tgl_lahir[index] != this.props.route.params.tgl_lahir[index] ? this.setState({tglmbuh : true}) : this.setState({tglmbuh : false});
              return {
                imgp: prevState.imgp
              }
            }, () => console.log(this.state.img));
            this.setState({
              img3: index,
              img4: index,
            });
            console.log('ini gambar = ', this.state.img);
          }
        },
      );
    }
  }
  getmateriAPi() {
    fetch('https://berbagipendidikan.org/sim/api/materi/getmateri').then(res => {
      if (res.status === 200)
        return res.json()
    }).then(resdata => {
      console.log(resdata.DATA)
      this.setState({
        materi: resdata.DATA,
        refreshing: false,
      })
    })
  }

  GetTutorAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/testo').then(res => {
      if (res.status === 200)
        return res.json()
    }).then(resdata => {
      console.log(resdata.data)
      this.setState({
        Tutor: resdata.data,
        filter: resdata.DATA,
        refreshing: false,

      })
    })
  }
  componentDidMount() {
    this.GetTutorAPi();
    this.getmateriAPi();
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    // Firebase.initializeApp(this);
    // this.requestCameraPermission();
    console.log(this.props);
  }
  componentWillUnmount() {
    this.mounted = false;
    // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  filterList(textToSearch) {
    this.setState({
      Tutor: this.state.Tutor.filter(i => i.nama.toLowerCase().includes(textToSearch)),
    });
  }
  onRefresh() {
    this.GetTutorAPi();
    this.setState({ refreshing: false });
  }
  // delete = (index) => {
  //   anak.splice(index, 1);
  //   this.setState({});
  // }
  displayModal(show) {
    this.setState({ modaldetail: show })
  }
  togleTamAK(show) {
    this.setState({ modalTamAK: show });
  }
  togleTamPel(show) {
    this.setState({ modalTamPel: show });
  }
  detail = () => {

  }
  render() {
    var Pel = [
      { label: 'Reguler', value: 'Reguler' },
      { label: 'Quran', value: 'Quran' }
    ];
    const { detak } = this.state
    var img = [];
    for (let i = 0; i <= this.state.img2; i++) {
      img.push(
        <Image
          style={{ width: 200, height: 200, resizeMode: 'contain' }}
          source={this.state.img[i].image}
        />
      )
    }
    var imgpel = [];
    for (let i = 0; i <= this.state.img4; i++) {
      imgpel.push(
        <Image
          style={{ width: 200, height: 200, resizeMode: 'contain' }}
          source={this.state.imgp[i].image}
        />
      )
    }
    return (
      <ScrollView contentContainer style={style.contentContainer} showsVerticalScrollIndicator={true}>
        <SafeAreaView >
          <View style={{ backgroundColor: '#0EBEDF' }}>
            <Text style={style.title1}>Daftar Pengajar </Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderColor: '#000',
            height: 40,
            width: '100%',
            marginTop: 10,
            marginBottom: 10,
            shadowColor: "#333",
            shadowOffset: {
              width: 1,
              height: 1,
            },
            shadowOpacity: 0.3,
            shadowRadius: 2,
            elevation: 3,
          }}>
            <TextInput
              placeholder='Cari Tutor' onChangeText={text => { this.filterList(text.toLowerCase()) }}
              style={style.searchBar}>
            </TextInput>
            <Image source={search} style={style.ImageStyle}></Image>
          </View>
          {/* <View style={{flexDirection:'row'}}> */}
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.onRefresh()}
              />
            }

            data={this.state.Tutor}
            renderItem={({ item }) => (
              <View >
                <TouchableOpacity  style={style.itemflat} onPress={() => { this.setState({ detak: item, modaldetail: true }) }}>
                  {/* <View tyle={{ justifyContent: 'row', alignItems: 'center', alignContent: 'center' }} > */}
                  <Image source={{ uri: 'https://www.kilauindonesia.org/datakilau/gambarDonatur/' + item.gambar_donatur }} style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: 90, width: 90, borderRadius: 45, }} />
                  <View  style={style.Label1}>
                  <Text>{item.nama} </Text>
                  <Text>{item.email}</Text>
                  {/* <Text>Mata Pelajaran</Text>
                      <Text>Tingkat</Text> */}
                  {/* <Text>{item.alamat}</Text> */}
                  </View>
                  {/* </View> */}
                </TouchableOpacity>
              </View>
            )}>
          </FlatList>
          {/* </View> */}
        </SafeAreaView>
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
              // flexDirection: 'row',
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
              <Text style={style.itemText}>Detail</Text>
              <ScrollView style={{ width: '100%', height: '100%' }}>
                <View style={style.detailgmbr}>
                  <Image source={{ uri: 'https://www.kilauindonesia.org/datakilau/gambarDonatur/' + detak.gambar_donatur }} style={{ justifyContent: 'center', alignItems: 'center', height: 200, width: '50%', }} />
                </View>
                <Collapse>
                  <CollapseHeader>
                    <View style={style.coltom}>
                      <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, textAlign: 'center' }}>Deskripsi</Text>
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
                      <Text style={{
                        padding: 10, fontSize: 12, fontWeight: 'bold',
                      }}>Nama Lengkap:{detak.nama} </Text>
                      <Text style={{
                        fontSize: 12, fontWeight: 'bold', padding: 10,
                      }}>Jenis Kelamin:{detak.jk}</Text>
                      <Text style={{
                        fontSize: 12, fontWeight: 'bold', padding: 10,
                      }}>Email:{detak.email}</Text>
                      <Text style={{
                        fontSize: 12, fontWeight: 'bold', padding: 10,
                      }}>Alamat:{detak.alamat}</Text>
                      <Text style={{
                        fontSize: 12, fontWeight: 'bold', padding: 10,
                      }}>Kota:{detak.kota}</Text>
                      <Text style={{
                        fontSize: 12, fontWeight: 'bold', padding: 10,
                      }}>Nomor HP:{detak.no_hp}</Text>
                    </View>
                  </CollapseBody>
                </Collapse>

                <Collapse>
                  <CollapseHeader>
                    <View style={style.coltom}>
                      <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, textAlign: 'center' }}>Aktifitas</Text>
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
                      <Text> detail aktifitas pengajar</Text>
                      <Image style={{
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
                  </CollapseBody>
                </Collapse>

                <Collapse>
                  <CollapseHeader>
                    <View style={style.coltom}>
                      <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, textAlign: 'center' }}>Pelatihan</Text>
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
                      <Text> detail Pelatihan pengajar</Text>
                    </View>
                  </CollapseBody>
                </Collapse>

                <Collapse>
                  <CollapseHeader>
                    <View style={style.coltom}>
                      <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, textAlign: 'center' }}>Tambah</Text>
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
                        // padding: 10,
                        // bottom: 20,
                        // right: 15,
                        // flexDirection: 'row',
                        // borderRadius: 5,
                        // // marginHorizontal: 5,
                        // height: 45,
                        // alignItems: 'center',
                        // justifyContent: 'center'
                      }}></Image>
                    </View>
                  </CollapseHeader>
                  <CollapseBody>
                    <TouchableOpacity onPress={() => { this.setState({ modalTamAK: true }) }}>

                      <View>
                        <Text style={style.coltom2}>Tambah Aktifitas</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { this.setState({ modalTamPel: true }) }}>

                      <View>
                        <Text style={style.coltom2}>Tambah Pelatihan Tutor</Text>
                      </View>
                    </TouchableOpacity>
                  </CollapseBody>
                </Collapse>
                <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', padding: 10, marginTop: 20, marginRight: 20, }}>
                  <Text
                    style={style.btnSimpanUn1}
                    onPress={() => {
                      this.setState({ detak: [], modaldetail: false })
                    }}>Kembali</Text>
                </View>

                {/* <TouchableOpacity style={style.refresh} onPress={() => this.togleTambah(true)}>
                  <Image source={search} style={style.tambah}></Image>
                </TouchableOpacity> */}
              </ScrollView>
            </View>
          </View>
        </Modal>

        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalTamAK}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}

          onRequestClose={() => {
            Alert.alert('Modal has now been closed.');
          }}>

          <View style={style.ModalCont2}>
            <View style={{
              paddingTop: 5,
              backgroundColor: '#ffffff',
              // flexDirection: 'row',
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
              <Text style={style.itemText}>Tambah Kegiatan Pekanan Tutor</Text>
              <ScrollView style={{ width: '100%', height: '100%' }}>
                <View>
                  <View>
                    <Text style={style.Label2}>Materi Yang Disampaikan</Text>
                    <Picker style={style.Textinputcss}
                      selectedValue={this.state.keg}
                      onValueChange={(itemValue) => this.setState({ keg: itemValue, show: 1 })}
                    >
                      <Picker.Item label="Pilih Kegiatan" value="" />
                      <Picker.Item label="Agama" value="Agama" />
                      <Picker.Item label="Qur'an(Non Shelter Tahfidz" value="Qur'an(Non Shelter Tahfidz" />
                      <Picker.Item label="Bimbel" value="Bimbel" />
                      <Picker.Item label="Lain-lain" value="Lain-lain" />
                    </Picker>
                  </View>
                  <View style={style.containerfoto}>
                    <ScrollView horizontal={true}>
                      <>
                        {img}
                      </>
                    </ScrollView>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={style.item}
                      onPress={() => this.takePicAK(this.state.img1 === null ? 0 : this.state.img1 + 1)}>
                      <Text style={style.text}>Pilih Foto</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10, }}>
                  <Text
                    style={style.btnSimpanUn}
                    onPress={() => {
                      this.setState({ modalTamAK: false })
                    }}>Kembali</Text>
                  <TouchableOpacity style={style.btnSimpanDark} >
                    <Text onPress={() => this.setState({ modalTamAK: false }, ToastAndroid.show('Data Telah Disimpan', ToastAndroid.SHORT))} style={{ color: 'white', fontWeight: 'bold' }}>Kirim</Text>
                  </TouchableOpacity>
                </View>


                {/* <TouchableOpacity style={style.refresh} onPress={() => this.togleTambah(true)}>
                  <Image source={search} style={style.tambah}></Image>
                </TouchableOpacity> */}
              </ScrollView>
            </View>
          </View>
        </Modal>

        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalTamPel}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}

          onRequestClose={() => {
            Alert.alert('Modal has now been closed.');
          }}>

          <View style={style.ModalCont2}>
            <View style={{
              paddingTop: 5,
              backgroundColor: '#ffffff',
              // flexDirection: 'row',
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
              <Text style={style.itemText}>Tambah Pelatihan Tutor</Text>
              <ScrollView style={{ width: '100%', height: '100%' }}>
                <View>
                  <Text style={style.Label2}>Nama Pelatihan </Text>
                  <TextInput
                    style={style.kotak2}
                    onChangeText={text => this.setState({ text })}
                    value={this.state.text}
                    placeholder="Nama Pelatihan"
                    placeholderTextColor='#7e7e7e'
                  />
                  <View>
                    <Text style={style.Label2}>Tingkat Pelatihan  </Text>
                    <Picker style={style.Textinputcss}
                      selectedValue={this.state.pel}
                      onValueChange={(itemValue) => this.setState({ pel: itemValue, show: 1 })}
                    >
                      <Picker.Item label="Pilih Tingkatan Pelatihan" value="" />
                      <Picker.Item label="Dasar" value="Agama" />
                      <Picker.Item label="Lanjut" value="Lanjut" />
                      <Picker.Item label="Mahir" value="Mahir" />
                    </Picker>
                  </View>
                  <Text style={style.Label2}>Jenis Pelatihan </Text>

                  <View style={style.checkbox}>
                    <RadioForm
                      radio_props={Pel}
                      onPress={(value) => { this.setState({ Pel: value }), ToastAndroid.show(value.toString(), ToastAndroid.SHORT) }}
                      initial={2}
                      buttonSize={10}
                      buttonOuterSize={20}
                      animation={true}
                      formHorizontal={true}
                    >
                    </RadioForm>
                  </View>

                  <View style={style.containerfoto}>
                    <ScrollView horizontal={true}>
                      <>
                        {imgpel}
                      </>
                    </ScrollView>

                  </View>
                  <View>
                    <TouchableOpacity
                      style={style.item}
                      onPress={() => this.takePicPel(this.state.img3 === null ? 0 : this.state.img3 + 1)}>
                      <Text style={style.text}>Pilih Foto</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10, }}>
                    <Text
                      style={style.btnSimpanUn}
                      onPress={() => {
                        this.setState({ modalTamPel: false })
                      }}>Kembali</Text>
                    <TouchableOpacity style={style.btnSimpanDark} >
                      <Text onPress={() => this.setState({ modalTamPel: false }, ToastAndroid.show('Data Telah Disimpan', ToastAndroid.SHORT))} style={{ color: 'white', fontWeight: 'bold' }}>Kirim</Text>
                    </TouchableOpacity>
                  </View>
                  {/* <TouchableOpacity style={style.refresh} onPress={() => this.togleTambah(true)}>
                  <Image source={search} style={style.tambah}></Image>
                </TouchableOpacity> */}
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </ScrollView>
    )
  }
}
const style = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  containerfoto: {
    marginTop: 40,
    multiline: true,
    marginLeft: 100,
    width: 200,
    height: 200,
    flex: 1,
    margin: 20,
    alignItems: 'center',
    alignContent: 'center',
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
    justifyContent: 'center', alignItems: 'center'
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
  tambah: {
    position: 'absolute',
    width: 50,
    height: 50,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  logo4: {
    width: 75,
    height: 75,
    marginLeft: 10,
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
    width: '100%',
    marginTop: 20,
    fontSize: 16,
    flexDirection: 'row',
    padding: 10,
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
    width: '90%',
    fontSize: 16,
    flexDirection: 'row',
    padding: 10,
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
  item2: {
    padding: 10,
    height: 120, width: '30%',
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  item1: {
    flex: 1,
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    borderWidth: 0.1,
    marginVertical: 1,
    marginHorizontal: 50,

  },
  picker: {
    color: 'F',
    marginTop: 10,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    borderRadius: 5,
    // marginHorizontal: 5,
    height: 30,
    width: '100%',
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,

    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgSmall: {
    position: 'absolute', flex: 1, alignItems: 'center', justifyContent: 'center'
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
  title2: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',

  },
  kotak2: {
    color: '#000000',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 2,
    borderWidth: 0.1,
    fontSize: 12,
    height: 52,
    backgroundColor: '#7e7e7',
  },
  Label: {
    padding: 5,
    color: '#000000',
    marginLeft: 10,
    marginTop: 20,
  },
  detailgmbr: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#7e7e7e',
  },
  detail: {
    // borderRadius: 2,
    // borderWidth: 0.1,
    width: '90%',
    padding: 10,
    marginLeft: 25,
    justifyContent: 'center',
    alignContent: 'center',
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
  Label1: {
    marginTop: 20,
    marginLeft:20,
    textAlign: 'center',
  },
  Label2: {
    marginTop: 5,
    marginLeft: 20,
    padding: 5,
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Textinputcss: {
    color: '#7e7e7e',
    marginLeft: 10,
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
  searchBar: {
    fontSize: 12,
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
    marginTop: 5,
  },
  itemText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    width: '100%',
    height: 50
  },
  item: {
    flex: 1,
    fontSize: 16,
    flexDirection: 'row',
    padding: 10,
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
  itemflat: {
    flex: 1,
    fontSize: 12,
    flexDirection: 'row',
    marginLeft:20,
    padding: 10,
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
  ModalLaporan: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#00000099',
    paddingHorizontal: '10%',
  },
  ModalCont2: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#00000079',
  },
  refresh: {
    padding: 10,
    position: 'absolute',
    bottom: 95,
    right: 15,
    flexDirection: 'row',
    borderRadius: 5,
    // marginHorizontal: 5,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkbox: {
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  list: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    numberOfLines: 2,
    flexDirection: 'column',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
    backgroundColor: '#fff',
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    borderColor: '#7e7e7e',
    height: width / numColumns,
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 20,
    width: 20,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
});


export default Tutor


// import { Text, View, StyleSheet, TextInput } from 'react-native'
// import { Picker } from '@react-native-picker/picker';
// import React, { Component } from 'react'
// import { search } from '../../assets/images'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { Searchbar } from 'react-native-paper';

// const Kegiatan = () => {
//     const [searchQuery, setSearchQuery] = React.useState('');

//     const onChangeSearch = query => setSearchQuery(query);

//     return (
//         <SafeAreaView >
//             <View style={{ backgroundColor: '#0EBEDF' }}>
//                 <Text style={style.title}>Pengajar</Text>
//             </View>
//             <Searchbar
//                 source="search"
//                 placeholder="Search"
//                 onChangeText={onChangeSearch}
//                 value={searchQuery}
//             />
//         </SafeAreaView>
//     );
// };

// export default Kegiatan

// const style = StyleSheet.create({
//     title: {
//         marginRight: 20,
//         marginLeft: 20,
//         marginTop: 15,
//         marginBottom: 15,
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: 'white',

//     },
//     kotak2: {
//         color: '#000000',
//         marginTop: 10,
//         marginLeft: 30,
//         marginRight: 10,
//         borderRadius: 5,
//         borderWidth: 1,
//         fontSize: 12,
//         height: 52,
//         width: 300,
//         padding: 20,
//     },
//     Label: {
//         padding: 5,
//         color: '#000000',
//         marginLeft: 10,
//         marginTop: 20,
//     },
//     Textinputcss: {
//         borderRadius: 2,
//         borderWidth: 2,
//         marginLeft: 10,
//         marginRight: 10,
//         height: 100,
//         color: '#000000',
//         borderColor: '#fff',
//         underlayColor: '#000'

//     },

// })



{/* <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                  <View style={{ width: '100%', marginTop: 20, }}>
                    <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, textAlign: 'center' }}>Deskripsi</Text>
                    <View style={style.detailgmbr}>
                      <Image source={{ uri: 'https://www.kilauindonesia.org/datakilau/gambarDonatur/' + detak.gambar_donatur }} style={{ justifyContent: 'center', alignItems: 'center', height: 100, width: '50%', }} />
                    </View>
                    <View style={style.detail}>
                      <Text style={{
                        padding: 10, fontSize: 12, fontWeight: 'bold',
                      }}>Nama Lengkap:{detak.nama} </Text>
                      <Text style={{
                        fontSize: 12, fontWeight: 'bold', padding: 10,
                      }}>Jenis Kelamin:{detak.jk}</Text>
                      <Text style={{
                        fontSize: 12, fontWeight: 'bold', padding: 10,
                      }}>Email:{detak.email}</Text>
                      <Text style={{
                        fontSize: 12, fontWeight: 'bold', padding: 10,
                      }}>Alamat:{detak.alamat}</Text>
                      <Text style={{
                        fontSize: 12, fontWeight: 'bold', padding: 10,
                      }}>Kota:{detak.kota}</Text>
                      <Text style={{
                        fontSize: 12, fontWeight: 'bold', padding: 10,
                      }}>Nomor HP:{detak.no_hp}</Text>
                    </View>
                  </View>
                </View> */}