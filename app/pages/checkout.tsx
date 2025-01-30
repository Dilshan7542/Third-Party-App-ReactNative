import {StyleSheet} from "react-native";
import {ThemedView} from "@/components/ThemedView";
import AppHeader from "@/components/header/header";
import {ThemedText} from "@/components/ThemedText";

const Purchase=()=>{


  return (
    <ThemedView style={{flex:1}}>
    <ThemedView style={style.container}>
      <ThemedText>Payment Checkout Page</ThemedText>
      <ThemedText>Price: 5000.00</ThemedText>
    </ThemedView>
    </ThemedView>

  )
}

const style=StyleSheet.create({
  container:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  }

});
