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
import {orientation as sensor_orientation, orientation} from "react-native-sensors";
import Orientation from "react-native-orientation";
import {useRecoilState, useRecoilValue} from "recoil";
import {count_teams_state, teams_state} from "../recoil/atoms";
import {useFocusEffect} from "@react-navigation/native";


const TeamScore = function ({navigation}) {
    const {t} = useTranslation();

    let [count_teams, setcount_teams] = useRecoilState(count_teams_state);
    const teams = useRecoilValue(teams_state);

    function redirect() {
        navigation.navigate('ActualGame');
    }

    let arr = [];
    for (let i = 0; i < count_teams; i++) {
        arr.push(<Text style={styles.text}
                       key={i}>Team: {teams[i].unique_name} Points: {teams[i].count_correct_words}</Text>)
    }

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


    return (

        <View style={styles.container}>

            {arr}
            <Text style={styles.text}>Round: 1/5</Text>
            <Text style={styles.text}>Next Team: Katze</Text>

            <View>
                <TouchableOpacity activeOpacity={0.5}
                                  underlayColor="none" style={styles.button1}
                                  onPress={redirect}>
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
        color: 'rgb(0, 0, 0)',
        font: 'Arial',
        alignContent: 'center'
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

export default TeamScore;
