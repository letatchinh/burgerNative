import AsyncStorage from '@react-native-async-storage/async-storage';
import {Controller, useForm} from 'react-hook-form';
import {Button, StyleSheet, Text, TextInput, View , Alert, ActivityIndicator} from 'react-native';
import { HelperText } from 'react-native-paper';
import { log } from 'react-native-reanimated';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { LoginService } from '../apis/service';
import { RegexEmail } from '../Constan/Regex';
import { addUser } from '../redux/userSlice';
export default function Login({ navigation }) {
  const dispatch = useDispatch()
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: 'letatchinh1@gmail.com',
      password: '123123',
    },
  });
  const {isLoading,mutate} = useMutation({
    mutationFn: newTodo => {
      return LoginService(newTodo)
    },
    onError: (error, variables, context) => {
      Alert.alert(
            "Login Failed",
            `Invalid Email or Password`,
            [
              { text: "OK" }
            ]
          );
    },
    onSuccess: async(data, variables, context) => {
      await AsyncStorage.setItem('userBurger', JSON.stringify(data.data))
      dispatch(addUser(data.data))
        navigation.navigate('Home')
    },
  })
  console.log(errors.username);
  const onSubmit = async(data) => {
    mutate(data)
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '70%',
          padding: 50,
          backgroundColor: 'white',
          borderWidth: 1,
          borderRadius: 20,
        }}>
        <Text style={{marginBottom : 10}}>Sign In</Text>
        <Controller
          control={control}
          rules={{
            required: true,
            pattern : {
              value : RegexEmail,
              message : "Invalid Type Email"
            }
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.border}
              onBlur={onBlur}
              placeholder="Email"
              onChangeText={onChange}
              value={value}
              autoCapitalize='none'
              
            />
          )}
          name="username"
        />
 {errors.username &&  <HelperText type="error" visible={errors.username !== undefined}>
      {errors.username.message}
      </HelperText>}
        <Controller
          control={control}
          rules={{
            maxLength: 100,
            required : true
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.border}
              onBlur={onBlur}
              placeholder="PassWord"
              onChangeText={onChange}
              value={value}
              autoCapitalize='none'
              secureTextEntry={true}
            />
          )}
          name="password"
        />
         <HelperText type="error" visible={errors.password !== undefined}>
        password is Require!
      </HelperText>
  {isLoading ?  <ActivityIndicator size="large" /> : <Button
          style={{borderColor: 'gray', borderWidth: 1, padding: 10}}
          title="Submit"
          onPress={handleSubmit(onSubmit)}
        /> }
       
       
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          <View>
            <Text style={{width: 50, textAlign: 'center'}}>Or</Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>
        <Button
          style={{borderColor: 'gray', borderWidth: 1, padding: 10}}
          title="Register"
          onPress={() =>  navigation.navigate('Register')}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  border: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
    marginBottom : 5,
    borderRadius: 10,
    minWidth: '100%',
    textTransform: 'uppercase'
  },
});
