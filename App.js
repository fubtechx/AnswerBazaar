import React,{useState,useEffect} from 'react';
import { WebView } from 'react-native-webview';
import * as Permissions from 'expo-permissions';
import { SafeAreaView,StyleSheet, View,ActivityIndicator } from 'react-native';
import * as Linking from 'expo-linking';
import { Camera } from 'expo-camera';

export default function App() {


  useEffect(() => {
    const askForCameraPermission = async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();

        if (status !== 'granted') {
          console.log('Camera permission not granted!');
          // Handle the case when permission is not granted
        }
      } catch (error) {
        console.error('Error asking for camera permission:', error);
        // Handle the error as needed
      }
    };

    askForCameraPermission();
  }, []);


  const [visible,setVisible]=useState(false);
  const ActivityIndicatorElement=()=>{

    return(

      <View style={styles.activityIndicatorStyle}>
        <ActivityIndicator color="#ff530d" size="large"/>
      </View>
    )
  }
  return (
  <SafeAreaView style={styles.container}>    
  
  <WebView 
      allowsBackForwardNavigationGestures={true}
      style={{flex:1}}
      source={{ uri: 'https://answerbazaar.com/'}}
      // source={{uri:'http://192.168.18.38:4200/'}}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      

      onShouldStartLoadWithRequest={(request) => {
        // alert("preeee")
        const url = request.url;
        console.log('Download request detected');

        console.log(url);
        const custom = 'Attachment/download/';

        if (url.includes(custom)) {
          console.log('Download request detected');
          Linking.openURL(url);
          return false;
      }
    return true;
    }
      }

      
      allowFileAccess={true}
      onLoadStart={()=>setVisible(true)}
      onLoad={()=>setVisible(false)}
  
      />
      {/* <Button title='Scan QR CODE' onPress={()=> navigation.navigate('')}/> */}

      
      {visible?<ActivityIndicatorElement/>:null}
      </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
       
       backgroundColor:'#FFFFFF',
       paddingTop:25

  },
  activityIndicatorStyle:{

    flex:1,
    position:'absolute',
    marginLeft:'auto',
    marginRight:'auto',
    marginTop:'auto',
    marginBottom:'auto',
    left:0,
    right:0,
    top:0,
    bottom:0,
    justifyContent:'center'
  }
});
