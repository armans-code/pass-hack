import React, { useState, useEffect } from "react";
import {
  Pressable,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "react-native-ui-lib";
import { auth } from "../config/firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: "https://filecabinet9.eschoolview.com/BD53F91C-A441-4AF7-A363-7965D9164D14/fefaec7a-b4c0-4c9d-a9b1-2e7c31ff9574.png",
        }}
      />
      <Text style={styles.heading}>Login</Text>
      <TextInput
        style={styles.input}
        value={email}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor={"gray"}
        placeholder={"Enter Email"}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholderTextColor={"gray"}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={"Enter Password"}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <Button label="Login" style={styles.button} onPress={handleLogin} />
      <Pressable onPress={() => navigation.navigate("Register")}>
        <Text style={styles.label}>Create an Account</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginLeft: 30,
    marginRight: 30,
    marginTop: "auto",
    marginBottom: "auto",
  },
  logo: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 75,
    height: 75,
  },
  heading: {
    fontStyle: "normal",
    fontWeight: "700",
    color: "#383838",
    lineHeight: 44,
    fontSize: 30,
    marginTop: 15,
    textAlign: "center",
  },
  input: {
    marginTop: 20,
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    height: 40,
    padding: 10,
    borderColor: "#b8b8b8",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    height: 40,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "#167FE0",
  },
  label: {
    marginTop: 20,
    textAlign: "center",
    color: "#167FE0",
    opacity: 50,
  },
});

export default LoginScreen;
