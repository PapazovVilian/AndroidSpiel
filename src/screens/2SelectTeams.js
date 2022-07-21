import React, {useEffect, useState} from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    Button, TouchableHighlight, Dimensions,
} from 'react-native';
import Orientation from "react-native-orientation";
import {Cache} from "react-native-cache";
import {useSelector} from "react-redux";
import {useRecoilState, useRecoilValue} from "recoil";
import {
    count_teams_state,
    drawing_bool_state,
    pantomime_bool_state,
    speaking_bool_state,
    teams_state
} from "../recoil/atoms";
import {useFocusEffect} from "@react-navigation/native";


const Teams = function ({navigation}) {

    let [count_teams, setcount_teams] = useRecoilState(count_teams_state);
    const teams = useRecoilValue(teams_state);
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

    function redirect() {
        navigation.navigate('ActualGame');
    }

    //Beim verwenden von useState wird alles neu gerendert sobald setpayments aufgerufen wird
    //
    let [showTeamViews, setshowTeamViews] = useState([]);

    function HandleTeamViews(count_teams) {
        let arr = [];
        let end_result= [];
        for (let i = 0; i < count_teams; i++) {
            console.log("inside start");
            arr.push(
                <View key={teams[i].unique_name}>
                    <TouchableHighlight activeOpacity={0.5}
                                        underlayColor="none" onPress={onPressTeamPicture} style={styles.touch}>
                        <Image
                            style={styles.image1}
                            source={teams[i].image_path}
                        />

                    </TouchableHighlight>
                    <Text style = {styles.text}>{teams[i].unique_name}</Text>
                </View>);

            if((((i+1)  % 2 === 0) || ((i+1) === count_teams)) && i !== 0 ){
                console.log("inside end");
                end_result.push(<View key={i} style={styles.rowContainer}>{arr}</View>)
                arr = [];
            }
        }
        setshowTeamViews(end_result);
    }

   // HandleTeamViews(count_teams);

    //https://youtu.be/0ZJgIjIuY7U?t=185 Tutorial Hooking
    useEffect(function () {
        HandleTeamViews(count_teams);

    }, [count_teams])


    function OnPressPlus() {

        if (count_teams === 4) {
            return;
        }

        setcount_teams(count_teams + 1);
    }

    function OnPressMinus() {
        if (count_teams === 2) {

            return;
        }
        setcount_teams(count_teams - 1);
    }

    function onPressTeamPicture() {

    }


    return (
        <View style={styles.container}>

                {showTeamViews}


            <View style={styles.rowContainer}>

                <TouchableOpacity activeOpacity={0.5}
                                  underlayColor="none" style={styles.minus_button}
                                  onPress={OnPressMinus}>
                    <Text style={styles.text}>-</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5}
                                  underlayColor="none" style={styles.button1}
                                  onPress={redirect}>
                    <Text style={styles.text}>Weiter</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5}
                                  underlayColor="none" style={styles.plus_button}
                                  onPress={OnPressPlus}>
                    <Text style={styles.text}>+</Text>
                </TouchableOpacity>


            </View>


        </View>
    );
};

//anzahl der Teams
var anzahl;

const screen_dimensions = Dimensions.get('window');

const styles = StyleSheet.create({
    button1: {
        backgroundColor: 'rgb(255, 66, 132)',
        width: screen_dimensions.width * 0.50,
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
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'Rotunda Medium',
    },
    image1: {
        width: screen_dimensions.width / 3 - 3 * 5,
        height: screen_dimensions.height / 6,
        borderRadius: Math.round(screen_dimensions.width + screen_dimensions.height) / 2,

    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 40,
        backgroundColor: 'rgb(240, 240, 255)',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: "space-evenly"
    },
    touch: {

        paddingHorizontal: 5,
    },
    minus_button: {
        backgroundColor: 'rgb(255, 66, 132)',
        width: screen_dimensions.width * 0.10,
        height: screen_dimensions.height * 0.10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Math.round(screen_dimensions.width + screen_dimensions.height) / 2,
        marginTop: screen_dimensions.height / 2 - (screen_dimensions.height * 0.10) - 70,

    },
    plus_button: {
        backgroundColor: 'rgb(255, 66, 132)',
        width: screen_dimensions.width * 0.10,
        height: screen_dimensions.height * 0.10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Math.round(screen_dimensions.width + screen_dimensions.height) / 2,
        marginTop: screen_dimensions.height / 2 - (screen_dimensions.height * 0.10) - 70,

    }

});

export default Teams;
