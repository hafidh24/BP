import { ScrollView, Text, View,StyleSheet} from 'react-native'
import React, { Component } from 'react'

export class Absen extends Component {
  render() {
    return (
      <ScrollView>
        <View style={{ backgroundColor: '#0EBEDF' }}>
              <Text style={style.title1}>Absen Anak Binaan</Text>
            </View>
            
      </ScrollView>
    )
  }
}
const style = StyleSheet.create({
  contentContainer: {
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
})
export default Absen