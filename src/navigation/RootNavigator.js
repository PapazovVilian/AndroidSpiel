import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ActualGameScreen from '../screens/4ActualGame';
import AuswahlScreen from '../screens/1SelectGames';
import TeamsScreen from '../screens/2SelectTeams';
import EinstellungenScreen from '../screens/0Settings';
import {Button, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity} from 'react-native';

import '../constants/IMLocalize';
import {useTranslation} from 'react-i18next';

import Sound from 'react-native-sound';

Sound.setCategory('Playback');
import {Provider} from 'react-redux';
import {Store} from '../recoil/atoms'
const Stack = createNativeStackNavigator();

import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';
import TeamScore from "../screens/5TeamScore";



//https://reactnavigation.org/docs/navigation-container
const MyStack = () => {
    //Multi Language Support
    const {t} = useTranslation();

    return (
        //Hier wird der Store von redux übergeben damit er überall zugänglich ist
        <RecoilRoot>
            <NavigationContainer>
                <Stack.Navigator>

                    <Stack.Screen name={t('common:chooseGames')} component={AuswahlScreen}
                                  options={setting_option_icon}/>
                    <Stack.Screen name="Teams" component={TeamsScreen} options={setting_option_icon}/>
                    <Stack.Screen name="ActualGame" component={ActualGameScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="TeamScore" component={TeamScore} options={{headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </RecoilRoot>
    );
};


// Schaue wie ein echtes Layout funktioniert
////Todo add Category Page for every gametype
//Todo Add sounds last 5 seconds countdown,first three second start countdown sound,
// button click sound, background music sound, Sound für richtiges Wort, Sound für skipped Wort
// Benutze Rotation vom Handy https://stackoverflow.com/questions/64378665/how-can-i-detect-that-the-device-was-rotated-360deg-given-x-y-z-gyroscope

//TODO Support ALL Sizes of Android Devices https://stackoverflow.com/questions/38715028/how-to-handle-different-screen-sizes-in-react-native
//https://medium.com/@shanerudolfworktive/7-tips-to-develop-react-native-uis-for-all-screen-sizes-7ec5271be25c
//TODO Offer Multi-language Support https://www.crowdbotics.com/blog/how-to-offer-multi-language-support-in-a-react-native-app
const styles = StyleSheet.create({
    text: {
        color: 'rgb(0, 0, 0)',
        font: 'Arial',
        alignContent: 'center'
    },
    image1: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
    },
    touch: {
        width: 40,
        height: 40
    }
});

const setting_option_icon = ({
    headerTitleAlign: 'center',
    //TODO link to settings page where you can change language, sound etc...
    headerRight: () => (
        <TouchableHighlight activeOpacity={0.5}
                            underlayColor="none" onPress={null} style={styles.touch}>
            <Image
                style={styles.image1 }
                source={require('../../assets/pictures/Group.png')}
            />
        </TouchableHighlight>),
});

export default MyStack;
