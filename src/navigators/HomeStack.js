import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";

import Home from '../screens/Home';
import Checkout from '../screens/Checkout';
import CarCompra from '../screens/CarCompra';

export default createAppContainer(createStackNavigator({
    Home:{
        screen:Home,
        title:'Principal',
        
    },
    Checkout:{
        screen:Checkout,
        title:'Checkout'
    }
},{
    defaultNavigationOptions:{
        headerShown:true,
    }
}));