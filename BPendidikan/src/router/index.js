import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, Text, View, StatusBar, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Login, Home, Splash, Kegiatan, Anak_Binaan, Tutor, Akun, Kegiatan2, Berita, Lapkeu, List_anak,Zakat,infak,Foundasier} from '../layout';
// import {List_anak} from '../layout/Anak_Binaan/List_anak';
import Web from '../layout/Home/Web';
import Web1 from '../layout/Home/Web1';
import Berita_info from '../layout/Berita/Berita_info';
import Tamrap from '../layout/Anak_Binaan/Tamrap';
import Histori from '../layout/Anak_Binaan/Histori';
import Presensi from '../layout/Anak_Binaan/Presensi';
import SuratAB from '../layout/Anak_Binaan/SuratAB';
import Absen from '../layout/Anak_Binaan/Absen';
import { Detail } from '../layout/Anak_Binaan/Detail';
import { Detkeu } from '../layout/Lapkeu/Detkeu';
import Detail_Artikel from '../layout/Berita/Detail_Artikel';
import tambahfou from '../layout/Foundasier/tambahfou';

// import Emas from '../layout/Zakat/Emas';
// import Propesi from '../layout/Zakat/Propesi';
// import Perdagangan from '../layout/Zakat/Perdagangan';
// import Simpan from '../layout/Zakat/Simpan';




// import { createDrawerNavigator } from '@react-navigation/drawer';

// const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainApp() {
  return (
    <>
      <StatusBar hidden={true} />
      <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
        {/* <Tab.Screen name="Profil" component={Profil} options={{headerShown: false}}/> */}
        <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Tab.Screen name="Logout" component={Logout} options={{ headerShown: false }} />
      </Tab.Navigator>
    </>
  );
}
const App = () => {
  return (
    <NavigationContainer initialRouteName="Splash">
      <StatusBar hidden />
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MainApp" component={MainApp} />
        <Stack.Screen name="Berita" component={Berita} />
        <Stack.Screen name="Lapkeu" component={Lapkeu} />
        <Stack.Screen name="Detkeu" component={Detkeu} />
        <Stack.Screen name="Kegiatan2" component={Kegiatan2} />
        <Stack.Screen name="Anak_Binaan" component={Anak_Binaan} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="List_anak" component={List_anak} />
        <Stack.Screen name="Tamrap" component={Tamrap} />
        <Stack.Screen name="Histori" component={Histori} />
        <Stack.Screen name="Presensi" component={Presensi} />
        <Stack.Screen name="SuratAB" component={SuratAB} />
        <Stack.Screen name="Absen" component={Absen} />
        <Stack.Screen name="Tutor" component={Tutor} />
        <Stack.Screen name="Akun" component={Akun} />
        <Stack.Screen name="Web" component={Web} />
        <Stack.Screen name="Web1" component={Web1} />
        <Stack.Screen name="Detail_Artikel" component={Detail_Artikel} />
        <Stack.Screen name="Berita_info" component={Berita_info} />
        {/* <Stack.Screen name="Emas" component={Emas} />
        <Stack.Screen name="Propesi" component={Propesi} />
        <Stack.Screen name="Perdagangan" component={Perdagangan} />
        <Stack.Screen name="Simpan" component={Simpan} /> */}
        <Stack.Screen name="Zakat" component={Zakat} />
        <Stack.Screen name="infak" component={infak} />
        <Stack.Screen name="Foundasier" component={Foundasier} />
        <Stack.Screen name="tambahfou" component={tambahfou} />



      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
const style = StyleSheet.create({
  bg: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: '#000',
    borderRadius: 15,
    height: 90
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#27D2F2",
    // position: "absolute",
    marginTop: -35,
    shadowColor: "#7F58FF",
    shadowRadius: 5,
    shadowOffset: { height: 1 },
    shadowOpacity: 0.3,
    // elevation: 3,
    borderWidth: 2,
    borderColor: "#f6f6f6"
  },
  container2: {
    alignItems: 'center'
  },
  container: {
    alignItems: 'center'
  },
  text: (isFocused) => ({
    fontSize: 13,
    color: isFocused ? '#51C9C2' : '#C8C8C8',
    marginTop: 8
  })
})

