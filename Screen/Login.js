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

export default function Login() {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
          firstName: '',
          lastName: ''
        }
      });
      const onSubmit = data => console.log(data);
  return (
     <View style={{flex : 1 , justifyContent : 'center' , alignItems : 'center'}}>
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
    </View> 
  )
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
    border:{
       borderColor: 'gray', borderWidth: 1 ,padding : 8 ,borderRadius : 10 , marginTop : 20 , minWidth : '100%',
    }
  });