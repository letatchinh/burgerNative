import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { color } from 'react-native-reanimated';
import Icon  from 'react-native-vector-icons/AntDesign';
import EvilIcons  from 'react-native-vector-icons/EvilIcons';
import HomeScreen from '../Screen/HomeScreen';
import MyMap from '../Screen/MyMap';
import ProfileUser from '../Screen/ProfileUser';
import YourOrder from '../Screen/YourOrder';

const Tab = createBottomTabNavigator();

export function BottomNavigateApp() {
  return (
    <Tab.Navigator 
    screenOptions={{headerShown : false , tabBarInactiveTintColor : "#999" }}
    
>
      <Tab.Screen options={{tabBarIcon : ({color}) => <Icon name="home" size={22} color={color}/>}} name="Home" component={HomeScreen} />
      <Tab.Screen options={{tabBarIcon : ({color}) => <Icon name="wallet" size={22} color={color}/>}} name="My Order" component={YourOrder} />
      <Tab.Screen options={{tabBarIcon : ({color}) => <Icon name="user" size={22} color={color}/>}} name="Profile" component={ProfileUser} />
      <Tab.Screen options={{tabBarIcon : ({color}) => <EvilIcons name="location" size={22} color={color}/>}} name="Location" component={MyMap} />
    </Tab.Navigator>
  );
}