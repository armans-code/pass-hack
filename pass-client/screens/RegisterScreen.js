import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  TextInput,
  Image,
  View,
  ScrollView,
} from "react-native";
import { Button, Checkbox } from "react-native-ui-lib";

const POST_STUDENT = gql`
  mutation registerStudent($registerUserInput: RegisterUserInput!) {
    registerStudent(registerUserInput: $registerUserInput) {
      id
      firstName
      lastName
      email
      phone
    }
  }
`;

const POST_TEACHER = gql`
  mutation registerTeacher($registerUserInput: RegisterUserInput!) {
    registerTeacher(registerUserInput: $registerUserInput) {
      id
      firstName
      lastName
      email
      phone
    }
  }
`;

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isTeacher, setIsTeacher] = useState(false);

  const [value, setValue] = useState("");
  const [phone, setPhone] = useState("");

  const [postStudent, { data, loading, error }] = useMutation(POST_STUDENT);
  const [postTeacher, { tData, tLoading, tError }] = useMutation(POST_TEACHER);

  if (loading) console.log("Submitting...");
  if (error) console.log(`Submission error! ${error.message}`);

  if (tLoading) console.log("Loading...");
  if (tError) console.log(`Submission error! ${tError.message}`);

  const handleRegister = () => {
    if (isTeacher) {
      postTeacher({
        variables: {
          registerUserInput: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            phone: phone,
          },
        },
      }).then((res) => {
        if (!res.errors) navigation.navigate("Login");
        else console.log(res.errors);
      });
    } else {
      postStudent({
        variables: {
          registerUserInput: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            phone: phone,
          },
        },
      }).then((res) => {
        if (!res.errors) navigation.navigate("Login");
        else console.log(res.errors);
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: "https://filecabinet9.eschoolview.com/BD53F91C-A441-4AF7-A363-7965D9164D14/fefaec7a-b4c0-4c9d-a9b1-2e7c31ff9574.png",
        }}
      />
      <Text style={styles.heading}>Register</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={"gray"}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="First Name"
        onChangeText={(text) => setFirstName(text)}
        secureTextEntry={false}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={"gray"}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Last Name"
        onChangeText={(text) => setLastName(text)}
        secureTextEntry={false}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={"gray"}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        secureTextEntry={false}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={"gray"}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Phone"
        onChangeText={(text) => setPhone(text)}
        secureTextEntry={false}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={"gray"}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <View style={styles.checkboxContainer}>
        <Text style={styles.text}>I am a teacher</Text>
        <Checkbox
          color="#167FE0"
          style={styles.checkboxItem}
          value={isTeacher}
          onValueChange={() => setIsTeacher(!isTeacher)}
        />
      </View>
      <Button label="Register" style={styles.button} onPress={handleRegister} />
      <Pressable onPress={() => navigation.navigate("Login")}>
        <Text style={styles.label}>Have an Account?</Text>
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
  text: {
    textAlign: "center",
    color: "#167FE0",
    opacity: 50,
  },
  checkboxContainer: {
    marginTop: 20,
    marginLeft: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxItem: {
    marginLeft: 15,
  },
});

export default RegisterScreen;
