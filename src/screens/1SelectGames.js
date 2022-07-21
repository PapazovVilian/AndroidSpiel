import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Image,
    Dimensions, TouchableOpacity,
} from 'react-native';

import {useTranslation} from 'react-i18next';

// Import the react-native-sound module
import Sound from 'react-native-sound';
import Orientation from 'react-native-orientation';
import {atom, useRecoilState} from "recoil";

import {drawing_bool_state, pantomime_bool_state, speaking_bool_state} from "../recoil/atoms";
import {useFocusEffect} from "@react-navigation/native";
// Enable playback in silence mode
Sound.setCategory('Playback');



// Load the sound file 'whoosh.mp3' from the app bundle
// See notes below about preloading sounds within initialization code below.
let whoosh = new Sound('sound1.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        console.log('failed to load the sound', error);
        return;
    }
    // loaded successfully
    console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

    // Play the sound with an onEnd callback
    whoosh.play((success) => {
        if (success) {
            console.log('successfully finished playing');
        } else {
            console.log('playback failed due to audio decoding errors');
        }
    });
});

const Auswahl = function ({navigation}) {
    const {t} = useTranslation();

    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused

            Orientation.lockToPortrait();
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [])
    );
    /*
    ding.setVolume(1);

    ding.play(success => {
        if (success) {
            console.log('successfully finished playing');
        } else {
            console.log('playback failed due to audio decoding errors');
        }
    });

     */


    let [button_constraint, SetButtonConstraint] = useState(false);
    const [drawing_boolean, setDrawing_boolean] = useRecoilState(drawing_bool_state);
    const [speaking_boolean, setSpeaking_boolean] = useRecoilState(speaking_bool_state);
    const [pantomime_boolean, setPantomime_boolean] = useRecoilState(pantomime_bool_state);

    function HandleButtonChange(status) {
        SetButtonConstraint(status);
    }

    //https://youtu.be/0ZJgIjIuY7U?t=185 Tutorial Hooking
    useEffect(function () {
        HandleButtonChange(drawing_boolean || speaking_boolean || pantomime_boolean);
    }, [drawing_boolean, speaking_boolean, pantomime_boolean])


    function onPressWrite() {
        setDrawing_boolean(!drawing_boolean);
    }

    function onPressSpeak() {
        setSpeaking_boolean(!speaking_boolean);
    }

    function onPressPantomime() {
        setPantomime_boolean(!pantomime_boolean);
    }

    function redirect() {
        navigation.navigate('Teams');
    }

    return (

        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <TouchableHighlight activeOpacity={0.5}
                                    underlayColor="none" style={styles.touch} onPress={onPressWrite}>
                    <Image
                        style={styles.image1}
                        source={require('../../assets/pictures/bleistift.png')}
                    />
                </TouchableHighlight>

                <TouchableHighlight activeOpacity={0.5}
                                    underlayColor="none" onPress={onPressPantomime} style={styles.touch}>
                    <Image
                        style={styles.image1}
                        source={require('../../assets/pictures/pantomime.png')}
                    />
                </TouchableHighlight>
                <TouchableHighlight activeOpacity={0.5}
                                    underlayColor="none" style={styles.touch} onPress={onPressSpeak}>
                    <Image
                        style={styles.image1}
                        source={require('../../assets/pictures/sprechblase.png')}
                    />
                </TouchableHighlight>


            </View>

            <View>
                <TouchableOpacity activeOpacity={button_constraint ? 0.5 : 1}
                                  underlayColor="none" style={button_constraint ? styles.button1 : styles.button2}
                                  onPress={button_constraint ? redirect : null}>
                    <Text style={styles.text}>{t('common:continue')}</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
};
//Todo Add Animation once you click a picture it becomes smaller and selected with a green mark top right


const screen_dimensions = Dimensions.get('window');


const styles = StyleSheet.create({
    button1: {
        backgroundColor: 'rgb(255, 66, 132)',
        width: screen_dimensions.width * 0.90,
        height: screen_dimensions.height * 0.10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderBottomColor: 'black',
        //TODO Keine ahnung wie andere das hier machen hab flex-End gemacht bei Container damit es ganz unten anfängt
        // dann -20 weil ich bei Container paddingbottom 20 nehme und nochmal
        // paar minus wegen dem header oben und minus height von diesem Button so das ich die mitte erwische
        marginTop: screen_dimensions.height / 2 - (screen_dimensions.height * 0.10) - 70,

    },
    button2: {
        backgroundColor: 'grey',
        width: screen_dimensions.width * 0.90,
        height: screen_dimensions.height * 0.10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderBottomColor: 'black',
        //TODO Keine ahnung wie andere das hier machen hab flex-End gemacht bei Container damit es ganz unten anfängt
        // dann -20 weil ich bei Container paddingbottom 20 nehme und nochmal
        // paar minus wegen dem header oben und minus height von diesem Button so das ich die mitte erwische
        marginTop: screen_dimensions.height / 2 - (screen_dimensions.height * 0.10) - 70,

    },
    text: {
        color: 'rgb(255, 255, 255)',
        textAlign: 'center',
        fontSize: 25,
        fontFamily: 'Rotunda Medium',
    },
    image1: {
        width: screen_dimensions.width / 3 - 3 * 5,
        height: screen_dimensions.height / 6,
        borderRadius: 10,

    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 40,
        backgroundColor: 'rgb(240, 240, 255)',
    },
    rowContainer: {
        flexDirection: 'row',
    },
    touch: {

        paddingHorizontal: 5,
    },
});

export default Auswahl;
