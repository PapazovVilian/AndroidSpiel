import React, {useState} from 'react';
import {
    Text,
    View, Dimensions,

} from 'react-native';

import {LogBox} from 'react-native';
import cloneDeep from 'lodash/cloneDeep';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
import produce from "immer"
import Orientation from 'react-native-orientation';
import EStyleSheet from "react-native-extended-stylesheet";

const {width} = Dimensions.get('window');
const rem = width > 340 ? 18 : 17;
EStyleSheet.build({$rem: rem,});

import {
    orientation as sensor_orientation,
    setUpdateIntervalForType,
    SensorTypes,
} from 'react-native-sensors';
import {List, Item} from 'linked-list'
import {useRecoilState, useRecoilValue} from "recoil";
import {teams_state} from "../recoil/atoms";
import {useFocusEffect} from "@react-navigation/native";

setUpdateIntervalForType(SensorTypes.orientation, 100);


const ActualGame = ({navigation}) => {


    let [background_color, setBackground_color] = useState("blue");
    let [middle_text, setmiddle_text] = useState("Johnny Depp");
    let [phone_horizontal, setphone_horizontal] = useState(false);

    const [teams, setteams] = useRecoilState(teams_state);

    let [x, setX] = useState(0.0);
    x = x.toFixed();
    let [y, setY] = useState(0.0);
    y = y.toFixed();
    let [z, setZ] = useState(0.0);
    z = z.toFixed();


    function quaternionToAngles(q) {
        let data = q;

        let ysqr = data.y * data.y;
        let t0 = -2.0 * (ysqr + data.z * data.z) + 1.0;
        let t1 = +2.0 * (data.x * data.y + data.w * data.z);
        let t2 = -2.0 * (data.x * data.z - data.w * data.y);
        let t3 = +2.0 * (data.y * data.z + data.w * data.x);
        let t4 = -2.0 * (data.x * data.x + ysqr) + 1.0;

        t2 = t2 > 1.0 ? 1.0 : t2;
        t2 = t2 < -1.0 ? -1.0 : t2;

        const toDeg = 180 / Math.PI;

        const euler = {};
        euler.pitch = Math.asin(t2) * toDeg;
        euler.roll = Math.atan2(t3, t4) * toDeg;
        euler.yaw = Math.atan2(t1, t0) * toDeg;

        return euler;
    }


    const [time, setTime] = React.useState(60);
    const timerRef = React.useRef(time);


    const [timer_running, settimer_running] = React.useState(true);
    useFocusEffect(
        React.useCallback(() => {

            Orientation.lockToLandscapeRight();
            timerRef.current = 60;
            const timerId = setInterval(() => {
                if (timerRef.current < 1) {

                    clearInterval(timerId);
                    subscription.unsubscribe();
                    //Before navigating make sure to unsubscribe to everything!
                    navigation.navigate('TeamScore');
                } else if (timer_running) {
                    timerRef.current -= 1;
                    setTime(timerRef.current);
                }
            }, 1000);

            const subscription = sensor_orientation.subscribe(({qx, qy, qz, qw}) => {

                    let q = {
                        "x": qx,
                        "y": qy,
                        "z": qz,
                        "w": qw
                    };

                    let euler = quaternionToAngles(q);

                    setZ(euler.yaw);
                    setY(euler.pitch);
                    setX(euler.roll);
                }
            );

            return () => {
                clearInterval(timerId);
                subscription.unsubscribe();
            };
        }, [])
    );


    const words = ["Laufen", "Schlafen", "Rennen", "Poledance",
        "Skispringer",
        "Blähungen",
        "Schaukelpferd",
        "Seekuh",
        "Baby",
        "Zahnarzt"];
    let [current_indexx, setcurrent_index] = React.useState(0);


    const sleep = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );
    let [aaa, setaaa] = useState(false);


    React.useEffect(() => {
        return () => {

            async function fetchData() {

                if (aaa) {
                    return;
                }

                let horizontal = (y >= 70 && y <= 95);
                if (horizontal) {
                    setphone_horizontal(true);
                    setBackground_color("purple");
                    setmiddle_text(words[current_indexx]);
                } else if (phone_horizontal && (y >= 20 && y <= 60)) {
                    if (Math.abs(x) > 170) {

                        setBackground_color("green");
                        setmiddle_text("Richtig");

                        //TODO currently its deep cloning to change one value? cant find another way with states on google?
                        let clone_list = cloneDeep(teams);
                        clone_list[0].count_correct_words = clone_list[0].count_correct_words + 1;
                        setteams(clone_list);


                        setphone_horizontal(false);
                        setcurrent_index(current_indexx + 1);
                        console.log('start');
                        setaaa(true);
                        settimer_running(false);
                        await sleep(1000);
                        setaaa(false);
                        settimer_running(true);
                        console.log('end');
                    } else if (Math.abs(x) < 10) {

                        setBackground_color("#B80F0A");
                        setmiddle_text("Überspringe Wort");
                        setphone_horizontal(false);
                        setcurrent_index(current_indexx + 1);
                        console.log('start');
                        setaaa(true);
                        await sleep(1000);
                        setaaa(false);
                        console.log('end');
                    }
                } else if (!phone_horizontal) {
                    setBackground_color("purple");
                    setmiddle_text("Legen Sie das Telefon auf ihre Stirn, um fortzufahren");
                }


            }

            fetchData().then(r => {
            });


        };
    }, [y, x, z]);

    useFocusEffect(
        React.useCallback(() => {
        }, [x, y, z])
    );



    return (
        <View style={[styles.parentView, {
            backgroundColor: background_color
        }]}>
            <View style={styles.childView}>
                <Text style={styles.test}></Text>
                <Text style={styles.top}>{timerRef.current}'</Text>
            </View>
            <Text style={styles.mid}>{middle_text}</Text>
            <Text style={styles.bottom}>{teams[0].count_correct_words} Wörter Richtig</Text>
        </View>
    );
}


const styles = EStyleSheet.create({
    parentView: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
    },
    test: {},
    childView: {
        paddingTop: "1rem",
        flexDirection: "row",
        justifyContent: "flex-start",

    },
    top: {
        fontSize: "1.5rem"
    },
    mid: {
        fontSize: "4rem"
    },
    bottom: {
        paddingBottom: "1rem",
        fontSize: "1.5rem"
    }
});
export default ActualGame;
