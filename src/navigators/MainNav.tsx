import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import useColorsChangedByDarkMode from '../hooks/useColorsChangedByDarkMode';
import Calendar from '../screens/Calendar';
import Home from '../screens/Home';
import Library from '../screens/Library';
import MyPage from '../screens/MyPage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

const MainNav = () => {

  const {
    borderTopColor,
    tabBarActiveTintColor,
    backgroundColor,
  } = useColorsChangedByDarkMode();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown:false,
        tabBarStyle:{
          backgroundColor,
          borderTopColor,
        },
        tabBarActiveTintColor,
        tabBarShowLabel:false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon:({focused,color})=>
          <Ionicons name={focused ? "home-sharp" : "home-outline"} size={24} color={color} />
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarIcon:({focused, color})=>
          <Ionicons name={focused ? "calendar" : "calendar-outline"} size={24} color={color} />
        }}
      />

      <Tab.Screen
        name="Library"
        component={Library}
        options={{
          tabBarIcon:({focused,color})=>
          <FontAwesome5 name="dumbbell" size={24} color={color} />
        }}
      />
      <Tab.Screen
        name="My Page"
        component={MyPage}
        options={{
          tabBarIcon:({focused,color})=>
          <Ionicons name={focused ? "person" : "person-outline"} size={24} color={color}/>
        }}
      />
    </Tab.Navigator>
  )
};

export default MainNav;