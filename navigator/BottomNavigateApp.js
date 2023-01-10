import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon  from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import HomeScreen from '../Screen/HomeScreen';
import OrderAdmin from '../Screen/OrderAdmin';
import ProfileUser from '../Screen/ProfileUser';
import YourOrder from '../Screen/YourOrder';

const Tab = createBottomTabNavigator();

export function BottomNavigateApp() {
  const user = useSelector(state => state.user.user)
  return (
    <Tab.Navigator 
    screenOptions={{headerShown : false , tabBarInactiveTintColor : "#999" }}
    
>
      <Tab.Screen options={{tabBarIcon : ({color}) => <Icon name="home" size={22} color={color}/>}} name="Home" component={HomeScreen} />
      <Tab.Screen options={{tabBarIcon : ({color}) => <Icon name="wallet" size={22} color={color}/> , headerShown : true , headerTitleAlign : 'center'}} name="Order" component={user.isAdmin ? OrderAdmin : YourOrder} />
      <Tab.Screen options={{tabBarIcon : ({color} ) => <Icon name="user" size={22} color={color}/> }} name="Profile"  component={ProfileUser} />
      {/* <Tab.Screen options={{tabBarIcon : ({color}) => <EvilIcons name="location" size={22} color={color}/>}} name="Location" component={MyMap} /> */}
    </Tab.Navigator>
  );
}