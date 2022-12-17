import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
/* eslint-disable */


import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';


import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import HomeScreen from './Screen/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Screen/Login';
import YourOrder from './Screen/YourOrder';
const Stack = createStackNavigator();

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
// const Section = ({children, title}) => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: ''
    }
  });
  const onSubmit = data => console.log(data);

  return (
    <>
      {/* <View style={{flex : 1 , justifyContent : 'center' , alignItems : 'center'}}>
      <View style={{justifyContent : 'center' , alignItems : 'center',width : '70%' , padding : 50 , backgroundColor: "white",
    borderWidth: 1, borderRadius : 20 }}>
        <Text>Sign In</Text>
      <Controller
        control={control}
        rules={{
         required: true,
        }}
        
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.border}
            onBlur={onBlur}
            placeholder="Email"
            onChangeText={onChange}
            value={value}
          />
        )}
        name="firstName"
      />

      <Controller
        control={control}
        rules={{
         maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.border}
            onBlur={onBlur}
            placeholder="PassWord"
            onChangeText={onChange}
            value={value}
            
          />

        )}
        name="lastName"
      />

      <Button style={{borderColor: 'gray', borderWidth : 1 , padding : 10}} title="Submit" onPress={handleSubmit(onSubmit)} />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
  <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
  <View>
    <Text style={{width: 50, textAlign: 'center'}}>Or</Text>
  </View>
  <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
</View>
    <Button style={{borderColor: 'gray', borderWidth : 1 , padding : 10}} title="Register" onPress={() => console.log("register")} />
    </View>
    </View> */}
    <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Awesome app',
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Awesome app',
        }}
      />
      <Stack.Screen
        name="YourOrder"
        component={YourOrder}
        options={{
          title: 'My profile',
        }}
      />
    </Stack.Navigator>
    {/* {<Login />} */}
    </NavigationContainer>
    </>
  );
};
export default App;
