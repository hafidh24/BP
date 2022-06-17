import { RefreshControl, Modal, Video, ToastAndroid, Alert, ScrollView, Text, View, StyleSheet, TextInput, TouchableOpacity, Image, FlatList, BackHandler, Dimensions, } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import React, { Component } from 'react'
import { search, arrow } from '../../assets/images'
import * as ImagePicker from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context'
import CheckBox from '@react-native-community/checkbox';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';


const width = Dimensions.get('window').width;
const openCamera = () => {
  const [imageCamera, setImageCamera] = useState(null)
  const option = {
    mediaType: 'photo',
    quality: 1
  }
}

export class Kegiatan2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
      keg: '',
      filelist: [],
      resourcePath: {},
      taimage: {
        0: {
          image: {
            name: '',
            type: '',
            uri: 'https://static.thenounproject.com/png/187803-200.png'
          },
        }
      },
      images: [],
      foto: [],
      del: [],
      materi: [],
      anak: [],
      ab: '',
      list: '',
      visible: false,
      setVisible: false,
      isVisible: false,
      selected: 0,
      selectedIndex: 0,
      totol: null,
      tot: 0,
      isChecked: false,
      check: false,
      search: [],
      p: '',
      filterList: '',
      toggle: true,
      selected: null,
      mat: '',
      pel: '',
      tur:'',
      Refreshing: true,
      buka: false,
      imgsee: '',
      ife: [],
      pilih: 1,
      kel: '',
      level: '',
      lv: '',
      myd: '',
    }
  }
  getIndex = (selectedIndex) => {
    this.setState({ selectedIndex: selectedIndex })
  }

  displayModal(show) {
    this.setState({ isVisible: show })
  }
  displayModal1(show) {
    this.setState({ buka: show })
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
              prevState.taimage[index] = source
              //   prevState.tgl_lahir[index] != this.props.route.params.tgl_lahir[index] ? this.setState({tglmbuh : true}) : this.setState({tglmbuh : false});
              return {
                taimage: prevState.taimage
              }
            }, () => console.log(this.state.taimage));
            this.setState({
              totol: index,
              tot: index,
            });
            console.log('ini gambar = ', this.state.taimage);
          }
        },
      );
    }
  }

  // handleBackButton = () => {
  //   if (this.props.navigation.isFocused()) {
  //     Alert.alert(
  //       'Keluar',
  //       'Anda yakin akan keluar ?', [{
  //         text: 'TIDAK',
  //         onPress: () => ToastAndroid.show("Batal Keluar", ToastAndroid.SHORT)
  //       }, {
  //         text: 'YA',
  //         onPress: () => BackHandler.exitApp()
  //       },], {
  //       cancelable: true
  //     }
  //     )
  //     return true
  //   } else {
  //     return this.state.canBeClosed = false
  //   }
  // };

  componentDidMount() {
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    // this.getProfile();
    // this.tokenCheck();
    this.GetAnakAPi();
    this.GetDataAPi();
    this.getmateriAPi();
    console.log(this.props);
  }


  componentWillUnmount() {
    // this.mounted = false;
    // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  onRefresh() {
    this.tokenCheck();
  }
  GetAnakAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/testo').then(res => {
      if (res.status === 200)
        return res.json()
    }).then(resdata => {
      console.log(resdata.data)
      this.setState({
        anak: resdata.data,
        Refreshing: false,
      })
    })
  }
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
  getmateriAPi() {
    fetch('https://berbagipendidikan.org/sim/api/materi/getmateri').then(res => {
      if (res.status === 200)
        return res.json()
    }).then(resdata => {
      console.log(resdata.DATA)
      this.setState({
        materi: resdata.DATA,
        Refreshing: false,
      })
    })
  }

  Update() {
    this.Kegiatan();
  }

  cleanupImages() {
    let taimage =
      this.state.taimage ||
      (this.state.taimage && this.state.taimage.length
        ? this.state.taimage[0]
        : null);
    console.log('will cleanup image', taimage);

    ImagePicker.cleanSingle(taimage ? taimage.uri : null)
      .then(() => {
        console.log(`removed tmp taimage ${taimage.uri} from tmp directory`);
        this.setState({
          taimage: [],
        });
      })
      .catch((e) => {
        alert(e);
      });
  }

  cleansingleImage(index) {
    let helperArray = this.state.taimag;
    helperArray.splice(index, 1);
    this.setState({ taimag: helperArray });
  }
  scaledHeight(oldW, oldH, newW) {
    return (oldH / oldW) * newW;
  }

  checklis = (index) => {
    anak[this.state.index].check = !anak[this.state.index].check
    this.setState({});
  }

  onPressAction = () => {
    this.setState((mat) => {
      const selected = new Map(state.selected);
      this.state.selected.has(key) ? selected.delete() : selected.set(key, !selecteditem.get(key));
      return { selected };
    });
  }
  selectionHandler = (nama_materi) => {
    const { materi } = this.state
    materi.forEach((elem) => {
      elem.toggle = false
      if (elem.nama_materi === nama_materi) {
        elem.toggle = true
      }
    })
    this.setState({ nama_materi })
  }
  // ini fungsi untuk checkbox tetapi masih belum berfungsi
  //  isChecked = (itemId) => {
  //   const isThere = this.state.ids.includes(itemId);
  //   return isThere;
  // };

  // toggleChecked = (itemId) => {
  //   const ids = [...this.state.ids, itemId];

  //   if (this.isChecked(itemId)) {
  //     this.setState({
  //       ...this.state,
  //       ids: this.state.ids.filter((id) => id !== itemId),
  //     });
  //   } else {
  //     this.setState({
  //       ...this.state,
  //       ids,
  //     });
  //   }
  // };
  handleRefresh = () => {
    this.setState({
      page: 1,
      Refreshing: true,
      seed: this.state.seed + 1,
    }, () => {
      this.getmateriAPi();
    })
  };
  onRefresh() {
    this.anak();
    this.setState({ Refreshing: false });
  }

  // filterList(textToSearch) {
  //   this.setState({
  //     anak: this.state.anak.filter(i =>i.nama.toLowerCase().includes(textToSearch.toLowerCase()),), });
  // }
  filterList(textToSearch){
    this.setState({
        anak:this.state.anak.filter(i => i.nama.toLowerCase().includes(textToSearch)),
    });
    // | i.jabatan.toLowerCase().includes(textToSearch)
  }
  render() {
    const inputbutton = [];
    for (let i = 0; i < this.state.count; i++) {
      <><View key={i}>
        <Text>{i + 1}.</Text>
        <Picker style={style.Textinputcss} mode="dropdown"
          selectedValue={this.state.keg}
          value={this.state.ife[i]}
          onValueChange={(itemValue) => {
            this.setState({
              keg: itemValue
            })
          }}>
          <Picker.Item style={{ fontSize: 12 }} label={'Pilih Unit Kerja'} value={'0'} key={'0'} />
          {
            this.state.Kegiatan.map((keg) =>
              <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={keg.nama_kegiatan.toString()} value={keg.nama_kegiatan.toString()} key={keg.id_kegiatan.toString()} />
            )}
        </Picker>
      </View></>
    }
    // const c = this.state.materi.filter((p) => p.id_level_anak_binaan === 1);
    const renderItem = ({ item, index }) => (
      <item id={item.id_level_anak_binaan}
        id_materi={item.id_materi}
        pelajaran={item.mata_pelajaran}
        nama={item.nama_materi}
        gambar={item.gambar_donatur} />

    );

    var taimag = [];
    for (let i = 0; i <= this.state.tot; i++) {
      taimag.push(
        <Image
          style={{ width: 200, height: 200, resizeMode: 'contain' }}
          source={this.state.taimage[i].image}
        />
      )
    }
    return (
      <ScrollView contentContainer style={style.contentContainer} showsVerticalScrollIndicator={true}>
        <SafeAreaView>
          <View style={{ backgroundColor: '#0EBEDF' }}>
            <Text style={style.title}>Tambah Kegiatan Anak Binaan  </Text>
          </View>
          <>
            {inputbutton}
            <View>
              <Text style={style.Label1}>Jenis Kegiatan</Text>
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

            {this.state.show === 1 && this.state.keg === 'Agama' ?
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
              :
              this.state.show === 1 && this.state.keg === "Qur'an(Non Shelter Tahfidz" ?
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
                  :
                this.state.show === 1 && this.state.keg === 'Lain-lain' ?
                    <View>
                    <Text style={style.Label1}>Nama Aktifitas</Text>
                    <TextInput
                      style={style.kotak2}
                      onChangeText={text => this.setState({ text })}
                      value={this.state.text}
                      placeholder="Nama Aktivitas"
                      placeholderTextColor='#7e7e7e'
                    />
                    </View>
                    :
                    this.state.show === 1 && this.state.keg === 'Bimbel' ?
                    <View>
                      <Text style={style.Label1}>Level Anak Binaan</Text>
                      <Picker style={style.Textinputcss} mode="dropdown"
                        selectedValue={this.state.lv}
                        onValueChange={(itemValue) => {
                          this.setState({
                            lv: itemValue
                          })
                        }}>
                        <Picker.Item style={{ fontSize: 12 }} label={'Pilih'} value={'0'} key={'0'} />
                        {
                          this.state.materi.map((lv) =>
                            <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={lv.id_level_anak_binaan.toString()} value={lv.id_level_anak_binaan.toString()} key={lv.id_level_anak_binaan.toString()} />
                          )}
                      </Picker>

                      <Text style={style.Label1}>Kelompok</Text>
                      <Picker style={style.Textinputcss}
                        selectedValue={this.state.kel}
                        onValueChange={(itemValue) => this.setState({ kel: itemValue, show: 1 })}
                      >
                        <Picker.Item label="Pilih" value="" />
                        <Picker.Item label="Agama" value="Agama" />
                        <Picker.Item label="Qur'an(Non Shelter Tahfidz)" value="Qur'an(Non Shelter Tahfidz)" />
                        <Picker.Item label="Bimbel" value="Bimbel" />
                        <Picker.Item label="Lain-lain" value="Lain-lain" />
                      </Picker>

                      <Text style={style.Label1}>Materi yang Disampaikan</Text>
                      <Picker style={style.Textinputcss} mode="dropdown"
                        selectedValue={this.state.myd}
                        onValueChange={(itemValue) => {
                          this.setState({
                            myd: itemValue
                          })
                        }}>
                        <Picker.Item style={{ fontSize: 12 }} label={'Pilih'} value={'0'} key={'0'} />
                        {
                          this.state.materi.map((myd) =>
                            <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={myd.nama_materi.toString()} value={myd.nama_materi.toString()} key={myd.nama_materi.toString()} />
                          )}
                      </Picker>
                    </View>

                    :
                    <></>}

            <View style={style.container}>
              <ScrollView horizontal={true}>
                <>
                  {taimag}
                  {/* {this.state.image taikon ? this.renderImage(this.state.image) : null} */}
                  {/* {inputfoto} */}
                  {/* {this.state.images ? this.state.images.map((i) => (
                  <View key={i.uri}>{this.renderImage(i)}</View>)) : null} */}
                </>
              </ScrollView>

            </View>
            <View>
              <TouchableOpacity
                style={style.item}
                onPress={() => this.takePic(this.state.totol === null ? 0 : this.state.totol + 1)}>
                <Text style={style.text}>Pilih Foto</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.cleanupImages.bind(this)}
                style={style.item}
              >
                <Text style={style.text}>Hapus Semua Gambar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={style.item}
                onPress={() => {
                  this.displayModal(true);
                }}>
                <Text style={style.text}>{this.state.tur != '' ? this.state.tur : 'Absen Tutor'}</Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
                style={style.item}
                onPress={() => {
                  this.displayModal1(true);
                }}>
                <Text style={style.text}>{this.state.ab != '' ? this.state.ab : 'Pilih Anak Binaan'}</Text>
              </TouchableOpacity> */}
            </View>
            <Modal
              animationType={"slide"}
              transparent={true}
              visible={this.state.isVisible}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{ marginLeft: 40, marginTop: 60, height: '70%', width: '80%', justifyContent: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#f2f2f2', borderRadius: 5 }}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  borderWidth: 0.5,
                  borderColor: '#000',
                  height: 40,
                  borderRadius: 5,
                  margin: 10,
                }}>
                  <TextInput
                    placeholder='Cari Tutor'onChangeText={text=>{this.filterList(text.toLowerCase())}}
                    style={style.searchBar}>
                  {/* <Image source={search} style={style.ImageStyle}></Image> */}
                  </TextInput>
                </View>

                <FlatList
                  // extraData={this.state.selectedId}
                  // keyExtractor={(materi, index) => String(index)}
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.Refreshing}
                      onRefresh={() => this.onRefresh()}
                    />
                  }
                   data={this.state.anak}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => this.setState({ tur: item.nama, mat: item.nama_materi, isVisible: false })}>
                      <View style={style.item1}>
                        <View style={{ flexDirection: 'row' }}>
                          <Image source={{ uri: 'https://www.kilauindonesia.org/datakilau/gambarDonatur/' + item.gambar_donatur }} style={{ height: 50, width: '20%' }} />
                          <View style={style.Label}>
                            <Text>{item.nama}</Text>
                            <Text>{item.email}</Text>
                            {/* <Text>{item.alamat}</Text> */}
                          </View>
                        </View>
                        </View>
                    </TouchableOpacity>
                  )}>
                </FlatList>
                <Text
                  style={style.item1}
                  onPress={() => {
                    this.displayModal(!this.state.isVisible);
                  }}>Kembali</Text>
              </View>
            </Modal>

            <Collapse>
              <CollapseHeader>
                <View style={style.item}>
                  <Text style={style.detail}>Pilih Anak Binaan</Text>
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
                  <FlatList
                    // extraData={this.state.selectedId}
                    // keyExtractor={(materi, index) => String(index)}
                    //   refreshControl={
                    //     <RefreshControl
                    //         refreshing={this.state.Refreshing}
                    //         onRefresh={() => this.onRefresh()}
                    //     />
                    // }
                    data={this.state.anak}
                    renderItem={({ item }) => (
                      <View style={style.item1}>
                        <View style={{ flexDirection: 'row' }}>
                          {/* <Image source={{ uri: 'https://www.kilauindonesia.org/datakilau/gambarDonatur/' + item.gambar_donatur }} style={{ height: 50, width: '20%' }} /> */}
                          <View style={style.Label}>
                            <Text>{item.nama}</Text>
                            <Text>{item.email}</Text>
                            {/* <Text>{item.alamat}</Text> */}
                          </View>

                        </View>
                        <View style={style.checkboxbtn}>
                          <Text>Kehadiran</Text>
                          <CheckBox
                            disabled={false}
                            value={this.state.check}
                            onPress={() => this.setState({ anak: !this.state.anak })}
                            onValueChange={(newValue) => this.setState({ check: newValue }, () => {
                              console.log(this.state.check);
                            })}
                          ></CheckBox>
                        </View>
                      </View>
                    )}>
                  </FlatList>
                </View>
              </CollapseBody>
            </Collapse>
          </>
        </SafeAreaView>
      </ScrollView >


    )

  }
}
{/* <TouchableOpacity
          onPress={this.cleanupSingleImage.bind(this)}
          style={style.button}
        >
          <Text style={style.text}>Cleanup Single Image</Text>
        </TouchableOpacity>


           <View style={style.container1}>
                        <TouchableOpacity
                            onPress={() => this.pickSingleWithCamera(true)}
                            style={style.tmbl}
                             >
                          <Text style={style.text}>
                            Pilih Masukan Foto
                          </Text>
                            </TouchableOpacity>
                          
                            <TouchableOpacity 
                            onPress={this.pickMultiple.bind(this)}
                            style={style.tmbl}
                            >
                            <Text style={style.text}>Pilih Foto</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                          onPress={this.deleteRule.bind(this)}
                          style={style.tmbl}
                        >
                          <Text style={style.text}>Hapus Semua Gambar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={this.cleanupSingleImage()}
                          style={style.tmbl}
                        >
                          <Text style={style.text}>Hapus Gambar</Text>
                        </TouchableOpacity>
                       
                          <View style={style.container2}>
                          <TouchableOpacity onPress={() => console.log('Berhasil di simpan')} style={style.tmbl}>
                          <Text style={style.text}>Simpan</Text>
                          </TouchableOpacity>
                          </View>
                        </View> */}





export default Kegiatan2

const style = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  checkboxbtn: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  closeText: {
    fontSize: 24,
    color: '#00479e',
    textAlign: 'center',
  },
  containerLaporanPesan: {
    paddingTop: 5,
    marginHorizontal: 10,
    backgroundColor: 'white',
    // flexDirection: 'row',
    borderRadius: 20,
    height: 280,
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    alignItems: 'center'
  },
  containerSafe: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  containermodal: {
    flex: 0,
    // shadowColor: "#333",
    // shadowOffset: {
    //   width: 1,
    //   height: 1,
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 2,
    // borderColor: '#7e7e7e',
    // elevation: 3,
    marginTop: 200,
    marginBottom: 400,
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 20,
    width: 20,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  ImageStyle1: {
    padding: 10,
    height: 20,
    width: 20,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '100%',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
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
  item1: {
    fontSize: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 20,
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
    textAlign: 'center',
    fontWeight: 'bold',

  },
  container: {
    marginTop:40,
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
  container2: {
    backgroundColor: '#fff',
  },
  container1: {
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3
  },
  btn: {
    backgroundColor: '#0080ff',
    height: 50,
    width: width - 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ModalCont: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#00000099',
    paddingHorizontal: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#000'
  },
  logo4: {
    width: 75,
    height: 75,
    marginLeft: 10,
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
  title: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
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
  tmbl: {
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#0EBEDF', borderRadius: 10, fontSize: 12, width: 150, height: 60, marginTop: 10, fontWeight: 'bold', marginLeft: 120,
  },
  tmbl1: {
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#0EBEDF', borderRadius: 10, fontSize: 12, width: 150, height: 60, marginTop: 10, fontWeight: 'bold', paddingLeft: 50,
  },
  tmbl2: {
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    fontSize: 24,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0EBEDF',
    borderRadius: 10,
    fontSize: 12,
    width: 150,
    height: 60,
    marginTop: 10,
    marginLeft: 120,
  },
  tmbl3: {
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    fontSize: 24,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0EBEDF',
    borderRadius: 10,
    fontSize: 12,
    width: 150,
    height: 60,
    marginTop: 10,
    marginLeft: 120,
    paddingTop: 2,
  },
  Label: {
    fontSize: 12,
    padding: 5,
    color: '#000000',
    marginLeft: 5,
  },
  Label2: {
    marginTop: 10,
    marginLeft: 25,
    marginBottom: -10,
    padding: 5,
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Label1: {
    marginTop: 5,
    marginLeft: 25,
    padding: 5,
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: '50%',
    width: '50%',
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
  containerBtn: {
    borderRadius: 10,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 40,
    position: 'absolute',
    justifyContent: 'center', alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 0,
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    alignItems: "center",
    justifyContent: "center"
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: "#98CFB6"
  },
  searchBar: {
    fontSize: 12,
    width: '70%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
    marginTop: 5,
  },
})



//flatlist

// <FlatList
//                     data={this.state.Kegiatan}
//                     keyExtractor={(item, index) => index.toString()}
//                     renderItem={({ item }) =>
//                  <Picker
//                          enabled={true}
//                         mode="dropdown"
//                           placeholder="Pilih Kegiatan"
//                       >
//                           {Kegiatan.map((item) => {
//                                return
//                                <Picker.Item
//                                  label={item.nama_kegiatan.toString()}
//                                     value={item.nama_kegiatan.toString()}
//                                     key={item.id_kegiatan.toString()} />
//                            })}
//                       </Picker>
//                   <Picker style={{ width: '80%', color: '#7e7e7e', fontWeight: 'bold', marginLeft: 30, borderRadius: 5, borderColor: '#000', }}>
//                          <Picker.Item label="Pilih Jenis Kegiatan" value="" />
//                         <Picker.Item Label={item.id_kegiatan, item.nama_kegiatan} value='' />
//                         </Picker>
//                         </FlatList>

                    //     const openCamera =() =>{
                    //      const option = {
                    //     mediaType:'photo',
                    //      quality:1
                    //      }
                    //   ImagePicker.launchCamera(option,(res)=>{
                    //     if(res.didCancel){
                    //             console.log('user cancel')
                    //        }else if (res.errorCode){
                    //           console.log(res.errorMessage)
                    //         }else{
                    //            const data = res.assets
                    //          console.log(data)
                    //        }
                    //       })
                    //  }

                    // cleansingleImage(index) {
                    // let helperArray=this.state.image;
                    // helperArray.splice(index,1);
                    // this.setState({images:helperArray});
                    // }

                  //   <CheckBox
                  //   style={{ alignContent: 'center', justifyContent: 'center', }}
                  //   disabled={false}
                  //   value={this.state.check}
                  //   onPress={() => this.setState({ check: !this.state.check })}
                  //   onValueChange={(newValue) => this.setState({ check: newValue }, () => {
                  //     console.log(this.state.check);
                  //   })}
                  // ></CheckBox>
