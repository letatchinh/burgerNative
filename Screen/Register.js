import {Controller, useForm} from 'react-hook-form';
import {Button, StyleSheet, Text, TextInput, View , Alert, ActivityIndicator} from 'react-native';
import { log } from 'react-native-reanimated';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import {  RegisterService } from '../apis/service';
import { addUser } from '../redux/userSlice';
export default function Register({ navigation }) {
  const dispatch = useDispatch()
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      name : ''
    },
  });
  const {isLoading,mutate} = useMutation({
    mutationFn: Account => {
      return RegisterService(Account)
    },
    onError: (error, variables, context) => {
      Alert.alert(
            "Login Failed",
            `Email is Exist`,
            [
              { text: "OK" }
            ]
          );
    },
    onSuccess: (data, variables, context) => {
      dispatch(addUser(data.data))
        navigation.navigate('Home')
    },
  })
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
        <Text>Sing Up</Text>
        <Controller
          control={control}
          rules={{
            required: true,
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

        <Controller
          control={control}
          rules={{
            maxLength: 100,
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

<Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.border}
              onBlur={onBlur}
              placeholder="Name"
              onChangeText={onChange}
              value={value}
              autoCapitalize='none'
            />
          )}
          name="name"
        />
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
          title="Login"
          onPress={() =>  navigation.navigate('Login')}
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
    borderRadius: 10,
    marginTop: 20,
    minWidth: '100%',
    textTransform: 'uppercase'
  },
});
