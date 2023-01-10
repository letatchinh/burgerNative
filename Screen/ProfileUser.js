import { View, Text, Image,Dimensions,StatusBar, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import ItemInfoUser from '../components/ItemInfoUser';
import { useSelector } from 'react-redux';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import ParallaxHeader from '../components/ParallaxHeader';
 
const {height: SCREEN_HEIGHT} = Dimensions.get('window');
 
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
const IconEdit = <Icon size={22} color='black' name='edit'/>
const IconRight = <Icon size={18} color='black' name='right'/>
export default function ProfileUser() {
  const user = useSelector(state => state.user.user)
  const title = () => {
    return (
      <View style={styles.body}>
        <Text style={{color: 'white', fontSize: 25}}>Infomation User</Text>
      </View>
    );
  };
  const renderContent = () => {
    return (
      <View style={styles.body}>
         <View style={{backgroundColor : 'white'}}>
      <View style={{alignItems : 'center' , paddingVertical : 10 , backgroundColor : 'white'}}>
       {/* <Image style={{width : 100 , height : 100 , resizeMode : 'stretch'}} source={require("../assets/userAvatar.png")}/> */}
     </View>
     <ItemInfoUser title='Name' value={user.name} icon={IconEdit}/>
     <ItemInfoUser title='Phone Number' value='0905970965' icon={IconEdit}/>
     <ItemInfoUser title='Email' value={user.username} icon={IconEdit}/>
     <View style={styles.email}>
       <View style={{flexDirection : 'row' , alignItems : 'center'}}>
       <Image style={{width : 70 , height : 70 , resizeMode : 'stretch'}}  source={require("../assets/gifEmail.gif")}/>
       <Text style={{flex : 1}}>You will receive more couple when email verification </Text>
       </View>
       <TouchableOpacity style={styles.buttonVerification}>
       <Text style={styles.textEmailButotn}>Verification Email</Text>
       </TouchableOpacity>
     </View>
      </View>
     <TouchableOpacity style={{...styles.flexRowBetween,...styles.actionButton}}>
     <Text>Change Password</Text>
     <Text>{IconRight}</Text>
     </TouchableOpacity>
     <TouchableOpacity style={{...styles.flexRowBetween,...styles.actionButton}}>
     <Text>Delete Account</Text>
     <Text>{IconRight}</Text>
     </TouchableOpacity>
     <TouchableOpacity style={{...styles.flexRowBetween,...styles.actionButton,justifyContent : 'center'}}>
       <Text style={{color : 'red'}}>Log out</Text>
     </TouchableOpacity>
      </View>
    );
  };
  const renderNavBar = () => (
    <View style={styles.navContainer}>
      <View style={styles.statusBar} />
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.iconLeft} onPress={() => {}}>
          <Text style={{color: 'white'}}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconRight} onPress={() => {}}>
          <Text style={{color: 'white'}}>Me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
 <ParallaxHeader renderContent={renderContent} title={title} imageHeader={require("../assets/userAvatar.png")}/>
  )
}
const styles = StyleSheet.create({
  email : {
    marginHorizontal : 15,
paddingHorizontal : 10
  },
  buttonVerification:{
    backgroundColor : '#44C9C3',
    alignItems : 'center',
    paddingVertical : 10,
    borderRadius : 10,
    marginVertical : 10
  },
  textEmailButotn : {
    color : 'white',
    fontWeight : '600'
  },
  flexRowBetween : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between'
  },
  actionButton : {
    padding : 15,
    backgroundColor : 'white',
    marginTop : 10
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  navContainer: {
    height: HEADER_HEIGHT,
    marginHorizontal: 10,
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: 'transparent',
  },
  navBar: {
    height: NAV_BAR_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  }
})