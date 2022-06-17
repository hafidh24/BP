import { Text, View, StyleSheet, ScrollView, } from 'react-native'
import React, { Component } from 'react'
// import { Picker } from '@react-native-picker/picker';

export class Detkeu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            semester: '',
            keg: '',
            Kegiatan: [],
        }
    }
    componentDidMount() {
        this.GetDataAPi();
        console.log(this.props);
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
    render() {
        return (
            <ScrollView contentContainerStyle={style.contentContainer} showsVerticalScrollIndicator={false}>

                <View style={{ backgroundColor: '#0EBEDF' }}>
                    <Text style={style.title}>Laporan Keuangan</Text>
                </View>
                <View style={style.title}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, }}>Total Pengeluaran Rp.</Text>
                </View>
                <Picker style={style.Textinputcss} mode="dropdown"
                    selectedValue={this.state.keg}
                    onValueChange={(itemValue) => {
                        this.setState({
                            keg: itemValue
                        })
                    }}>
                    <Picker.Item style={{ fontSize: 12 }} label={'Semester'} value={'0'} key={'0'} />
                    {/* {
                        this.state.Kegiatan.map((keg) =>
                            <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label={keg.nama_kegiatan.toString()} value={keg.nama_kegiatan.toString()} key={keg.id_kegiatan.toString()} />
                        )} */}
                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label='1' value='1' key='1' />
                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label='2' value='2' key='1' />
                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label='3' value='3' key='1' />
                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label='4' value='4' key='1' />
                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label='5' value='5' key='1' />
                    <Picker.Item style={{ height: '100%', width: '100%', fontSize: 12, }} label='6' value='6' key='1' />

                </Picker>
            </ScrollView>
        )
    }
}

export default Detkeu
const style = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: '#fff',
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
    itemflat: {
        flex: 1,
        fontSize: 12,
        flexDirection: 'row',
        marginLeft: 20,
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
    Label1: {
        marginTop: 15,
        marginLeft: 15,
        textAlign: 'center',
        color: '#000000',
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
})