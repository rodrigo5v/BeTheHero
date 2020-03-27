import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
//stacknavigation é quando a sua aplicação tem a maior parte de suas funcionalidades ligadas a botões
import {createStackNavigator} from '@react-navigation/stack';
//criando a aplicação
const AppStack = createStackNavigator();

import Incidents from './pages/Incidents';
import Detail from './pages/Detaill';

export default function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Incidents" component={Incidents} />
                <AppStack.Screen name="Detaill" component={Detail} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}