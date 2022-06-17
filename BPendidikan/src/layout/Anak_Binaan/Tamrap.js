import { Text, View, StyleSheet, TextInput, Image, ScrollView, SafeAreaView, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { Component } from 'react'
import CheckBox from '@react-native-community/checkbox';
import * as ImagePicker from 'react-native-image-picker';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { connect } from 'react-redux';

class Tamrap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gambar: '',
      rapimg: {
        0: {
          image: {
            name: '',
            type: '',
            uri: 'https://static.thenounproject.com/png/187803-200.png'
          },
        }
      },
      count: 1,
      tr: [],
      rap: '',
      img1: null,
      img2: 0,
      text: '',
      text1: '',
      text2: '',
      show: 0,
      pel: '',
      peltinggi: '',
      pelrendah: '',
      Ganjil: false,
      Genap: false,
      kelas: '',
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
              prevState.rapimg[index] = source
              //   prevState.tgl_lahir[index] != this.props.route.params.tgl_lahir[index] ? this.setState({tglmbuh : true}) : this.setState({tglmbuh : false});
              return {
                rapimg: prevState.rapimg
              }
            }, () => console.log(this.state.rapimg));
            this.setState({
              img1: index,
              img2: index,
            });
            console.log('ini gambar = ', this.state.rapimg);
          }
        },
      );
    }
  }
  render() {
    var rapimg = [];
    var semester = [
      { label: 'Ganjil ', value: 'Ganjil' },
      { label: 'Genap', value: 'Genap' }
    ];
    for (let i = 0; i <= this.state.img2; i++) {
      rapimg.push(
        <Image
          style={{ width: 200, height: 200, resizeMode: 'contain' }}
          source={this.state.rapimg[i].image}
        />
      )
    }
    const inputbutton = [];
    for (let i = 0; i < this.state.count; i++) {
      <><View key={i}>
        <Text>{i + 1}.</Text>
        <Picker style={style.Textinputcss}
          selectedValue={this.state.rap}
          value={this.state.tr[i]}
          onValueChange={(itemValue) => this.setState({ rap: itemValue, show: 1 })}
        >
          <Picker.Item label="Pilih" value="" />
          <Picker.Item label="SD/MI" value="SD/MI" />
          <Picker.Item label="SMP/MTS" value="SMP/MTS" />
          <Picker.Item label="SMA/SMK/MA" value="SMA/SMK/MA" />
        </Picker>
      </View></>
    }
    return (
      <ScrollView contentContainer style={style.contentContainer} showsVerticalScrollIndicator={true}>
        {this.props.user.presensi === 'karyawan' ?
          <SafeAreaView >
            <View style={{ backgroundColor: '#0EBEDF' }}>
              <Text style={style.title1}>Tambah Rapot </Text>
            </View>
            <>
              <View>

                {inputbutton}
                <View>
                  <Text style={style.Label2}>Tingkat</Text>
                  <Picker style={style.Textinputcss}
                    selectedValue={this.state.rap}
                    onValueChange={(itemValue) => this.setState({ rap: itemValue, show: 1 })}
                  >
                    <Picker.Item label="Pilih" value="" />
                    <Picker.Item label="SD/MI" value="SD/MI" />
                    <Picker.Item label="SMP/MTS" value="SMP/MTS" />
                    <Picker.Item label="SMA/SMK/MA" value="SMA/SMK/MA" />
                  </Picker>
                </View>

                {this.state.show === 1 && this.state.rap === 'SD/MI' ?
                  <View>
                    <Text style={style.Label2}>Kelas</Text>
                    <Picker style={style.Textinputcss}
                      selectedValue={this.state.kelas}
                      onValueChange={(itemValue) => this.setState({ kelas: itemValue, show: 1 })}
                    >
                      <Picker.Item label="Pilih" value="" />
                      <Picker.Item label="I" value="I" />
                      <Picker.Item label="II" value="II" />
                      <Picker.Item label="III" value="III" />
                      <Picker.Item label="IV" value="IV" />
                      <Picker.Item label="V" value="V" />
                      <Picker.Item label="VI" value="VI" />
                    </Picker>
                  </View>
                  :
                  this.state.show === 1 && this.state.rap === "SMP/MTS" ?
                    <View>
                      <Text style={style.Label2}>Kelas</Text>
                      <Picker style={style.Textinputcss}
                        selectedValue={this.state.kelas}
                        onValueChange={(itemValue) => this.setState({ kelas: itemValue, show: 1 })}
                      >
                        <Picker.Item label="Pilih" value="" />
                        <Picker.Item label="VII" value="VII" />
                        <Picker.Item label="VIII" value="VIII" />
                        <Picker.Item label="IX" value="XI" />

                      </Picker>
                    </View>
                    :
                    this.state.show === 1 && this.state.rap === 'SMA/SMK/MA' ?
                      <View>
                        <Text style={style.Label2}>Tingkat</Text>
                        <Picker style={style.Textinputcss}
                          selectedValue={this.state.kelas}
                          onValueChange={(itemValue) => this.setState({ kelas: itemValue, show: 1 })}
                        >
                          <Picker.Item label="Pilih" value="" />
                          <Picker.Item label="X" value="X" />
                          <Picker.Item label="XI" value="XI" />
                          <Picker.Item label="XII" value="XII" />
                        </Picker>
                      </View>
                      :
                      <></>}
                <Text style={style.Label3}>Semester</Text>
                <View style={style.checkbox}>
                  <RadioForm
                    radio_props={semester}
                    onPress={(value) => { ToastAndroid.show(value.toString(), ToastAndroid.SHORT) }}
                    initial={2}
                    buttonSize={10}
                    buttonOuterSize={20}
                    animation={true}
                    formHorizontal={true}
                  >
                  </RadioForm>
                </View>



                <Text style={style.Label2}>Nilai Tertinggi</Text>
                <View style={style.colnilai}>
                  <Picker style={style.nilai}
                    selectedValue={this.state.peltinggi}
                    onValueChange={(itemValue) => this.setState({ peltinggi: itemValue, show: 1 })}
                  >
                    <Picker.Item label="Pilih Mata Pelajaran" value="" />
                    <Picker.Item label="Bahasa Indonesia" value="Bahasa Indonesia" />
                    <Picker.Item label="Matematika" value="Matematika" />
                    <Picker.Item label="IPA" value="IPA" />
                    <Picker.Item label="IPS" value="IPS" />
                    <Picker.Item label="Bahasa Inggris" value="Bahasa Inggris" />
                    <Picker.Item label="Kimia" value="Kimia" />
                    <Picker.Item label="Fisika" value="Fisika" />
                    <Picker.Item label="Biologi" value="Biologi" />
                    <Picker.Item label="Lain-lain" value="Lain-lain" />
                  </Picker>
                  <TextInput
                    style={style.kotak3}
                    onChangeText={text => this.setState({ text })}
                    value={this.state.text}
                    keyboardType="numeric"
                    placeholder="Nilai"
                    placeholderTextColor='#7e7e7e'
                  />
                </View>
                <Text style={style.Label2}>Nilai Terendah</Text>
                <View style={style.colnilai}>
                  <Picker style={style.nilai}
                    selectedValue={this.state.pelrendah}
                    onValueChange={(itemValue) => this.setState({ pelrendah: itemValue, show: 1 })}
                  >
                    <Picker.Item label="Pilih Mata Pelajaran" value="" />
                    <Picker.Item label="Bahasa Indonesia" value="Bahasa Indonesia" />
                    <Picker.Item label="Matematika" value="Matematika" />
                    <Picker.Item label="IPA" value="IPA" />
                    <Picker.Item label="IPS" value="IPS" />
                    <Picker.Item label="Bahasa Inggris" value="Bahasa Inggris" />
                    <Picker.Item label="Kimia" value="Kimia" />
                    <Picker.Item label="Fisika" value="Fisika" />
                    <Picker.Item label="Biologi" value="Biologi" />
                    <Picker.Item label="Lain-lain" value="Lain-lain" />
                  </Picker>
                  <TextInput
                    style={style.kotak3}
                    onChangeText={text1 => this.setState({ text1 })}
                    value={this.state.text1}
                    keyboardType="numeric"
                    placeholder="Nilai"
                    placeholderTextColor='#7e7e7e'
                  />
                </View>

                <Text style={style.Label2}>Nilai Rata-rata </Text>
                <TextInput
                  style={style.kotak3}
                  onChangeText={text2 => this.setState({ text2 })}
                  value={this.state.text2}
                  keyboardType="numeric"
                  placeholder="Nilai"
                  placeholderTextColor='#7e7e7e'
                />
                <View style={style.container}>
                  <ScrollView horizontal={true}>
                    <>
                      {rapimg}
                    </>
                  </ScrollView>
                </View>
                <View>
                  <TouchableOpacity
                    style={style.item}
                    onPress={() => this.takePic(this.state.img1 === null ? 0 : this.state.img1 + 1)}>
                    <Text style={style.text}>Pilih Foto</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Anak_Binaan')} style={style.btnSimpanUn1} >
                  <Text style={{ fontWeight: 'bold' }}>Kembali</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Anak_Binaan', ToastAndroid.show('Data Telah Disimpan', ToastAndroid.SHORT))}
                  style={style.btnSimpanDark} >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>Kirim</Text>
                </TouchableOpacity>
              </View>
            </>
          </SafeAreaView>
          :
          <View />
        }

        {this.props.user.presensi === 'admin' ?
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ backgroundColor: '#0EBEDF' }}>
              <Text style={style.title1}>Rapot Anak Asuh</Text>
            </View>
          </SafeAreaView>
          :
          <View />
        }
      </ScrollView >

    )
  }
}
const style = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  colnilai: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
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
  nilai: {
    color: '#7e7e7e',
    fontSize: 12,
    height: 35,
    width: '60%',
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
    width: '100%',
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Label3: {
    marginTop: 5,
    marginBottom: -25,
    marginLeft: 25,
    padding: 5,
    width: '100%',
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
    width: '15%',
    backgroundColor: '#7e7e7',
  },
  kotak3: {
    color: '#000000',
    marginTop: 10,
    marginLeft: 30,
    marginRight: 10,
    borderRadius: 2,
    borderWidth: 0.1,
    fontSize: 12,
    height: 52,
    width: '15%',
    textAlign: 'center',
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
  checkbox: {
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
    marginLeft: 30,
    margin: 20,
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
  btnEye: {
    position: 'absolute',
    padding: 10,
    right: 0
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
export default connect(mapStateToProps, mapDispatchToProps)(Tamrap);



// { inputbutton }
// <View>
//   <Text style={style.Label2}>Tingkat </Text>
//   <Picker style={style.Textinputcss}
//     selectedValue={this.state.rap}
//     onValueChange={(itemValue) => this.setState({ rap: itemValue, show: 1 })}
//   >
//     <Picker.Item label="Pilih" value="" />
//     <Picker.Item label="SD/MI" value="SD/MI" />
//     <Picker.Item label="SMP/MTS" value="SMP/MTS" />
//     <Picker.Item label="SMA/SMK/MA" value="SMA/SMK/MA" />
//   </Picker>
// </View>

// {
//   this.state.show === 1 && this.state.rap === 'SD/MI' ?
//   <View>
//     <Text style={style.Label2}>Tingkat</Text>
//     <Picker style={style.Textinputcss}
//       selectedValue={this.state.rap}
//       onValueChange={(itemValue) => this.setState({ rap: itemValue, show: 1 })}
//     >
//       <Picker.Item label="Pilih" value="" />
//       <Picker.Item label="I" value="I" />
//       <Picker.Item label="II" value="II" />
//       <Picker.Item label="III" value="III" />
//       <Picker.Item label="IV" value="IV" />
//       <Picker.Item label="V" value="V" />
//       <Picker.Item label="VI" value="VI" />
//     </Picker>
//   </View>
//   :
//   this.state.show === 1 && this.state.rap === "SMP/MTS" ?
//     <View>
//       <Text style={style.Label2}>Tingkat</Text>
//       <Picker style={style.Textinputcss}
//         selectedValue={this.state.rap}
//         onValueChange={(itemValue) => this.setState({ rap: itemValue, show: 1 })}
//       >
//         <Picker.Item label="Pilih" value="" />
//         <Picker.Item label="VII" value="VII" />
//         <Picker.Item label="VIII" value="VIII" />
//         <Picker.Item label="IX" value="IX" />
//       </Picker>
//     </View>
//     :
//     this.state.show === 1 && this.state.rap === 'SMA/SMK/MA' ?
//       <View>
//         <Text style={style.Label2}>Tingkat</Text>
//         <Picker style={style.Textinputcss}
//           selectedValue={this.state.rap}
//           onValueChange={(itemValue) => this.setState({ rap: itemValue, show: 1 })}
//         >
//           <Picker.Item label="Pilih" value="" />
//           <Picker.Item label="X" value="X" />
//           <Picker.Item label="XI" value="XI" />
//           <Picker.Item label="XII" value="XII" />
//         </Picker>
//       </View>
//       :
//       <></>
// }