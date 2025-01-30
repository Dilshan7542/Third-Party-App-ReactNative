import React, {useEffect, useState} from "react";
import {Alert, Button, StyleSheet, Text, TextInput, View} from "react-native";
import {IUser, userLogin} from "@/service/user-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRouter} from "expo-router";

const LoginScreen = () => {
  useEffect(() => {
    checkUserIfExist();
  }, []);
  const checkUserIfExist = async () => {
    const token = await AsyncStorage.getItem("token");
    const userString = await AsyncStorage.getItem("user");
    if (token && userString) {
        const user = JSON.parse(userString) as IUser;
        navigation.push({pathname:"/pages/[id]",params:{nic:user.nic,id:user.id,name:user.name}});
    } else {
      await AsyncStorage.clear();
    }
  }
  const [nic, setNic] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useRouter();
  const handleLogin = () => {
    alert("click")
    if (!nic || !password) {
      Alert.alert("Error", "Please fill out all fields!");
    } else {
      userLogin({nic: nic, password: password}).then(async resp => {
        await AsyncStorage.setItem("token", resp.content.access_token);
        const user:IUser={
          id:new Date().toString()+":user",
          nic:resp.content.nic || nic,
          name:resp.content.name || "Dev User"
        }
        await AsyncStorage.setItem("user", JSON.stringify(user));
        navigation.push({pathname: "/pages/[id]", params: {nic: nic, id: nic}});
      }).catch(e=>{
        alert("Error 500");
      });

    }
  };
  return (<View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="NIC"
        value={nic}
        onChangeText={setNic}
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin}/>
    </View>);
};

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5", padding: 20,
  }, title: {
    fontSize: 24, fontWeight: "bold", marginBottom: 20,
  }, input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    marginBottom: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default LoginScreen;
