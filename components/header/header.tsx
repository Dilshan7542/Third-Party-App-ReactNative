import {ThemedView} from "@/components/ThemedView";
import {StyleSheet, TouchableOpacity} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRouter} from "expo-router";
interface Header {
  name:string
}
const AppHeader=(header:Header)=>{
  const navigation = useRouter();
  const logOut=()=>{
    AsyncStorage.clear().then(()=>{
      navigation.push({pathname:"/pages/login"});
    });
  }
  return (<ThemedView>
<ThemedView style={style.container} lightColor={"black"} darkColor={"white"}>
  <ThemedText>{header.name}</ThemedText>
  <TouchableOpacity onPress={logOut}>
<ThemedText lightColor={"white"} darkColor={"black"} style={{padding:10}}>LogOut</ThemedText>
  </TouchableOpacity>
</ThemedView>
  </ThemedView>);

}

const style=StyleSheet.create({
container:{
  display:"flex",
  flexDirection:"row",
  justifyContent:"space-between",
  flex:1,
  width:"100%",
  height:30,


}

});

export default AppHeader;
