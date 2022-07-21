import {atom} from "recoil";

export const drawing_bool_state = atom({
    key: 'drawing_bool_state', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});
export const pantomime_bool_state = atom({
    key: 'pantomime_bool_state', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});
export const speaking_bool_state = atom({
    key: 'speaking_bool_state', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});

export const count_teams_state = atom({
    key: 'count_teams_state', // unique ID (with respect to other atoms/selectors)
    default: 2, // default value (aka initial value)
});


export const teams_state = atom({
    key: 'teams_state', // unique ID (with respect to other atoms/selectors)
    default: [
        {
            "unique_name": "Heulende Wölfe",
            "image_path": require('../../assets/pictures/Heulende_Woelfe.png'),
            "count_correct_words": 0,
            "count_skipped_words": 0
        },
        {
            "unique_name": "Patriotische Hunde",
            "image_path": require('../../assets/pictures/Patriotische_Hunde.png'),
            "count_correct_words": 0,
            "count_skipped_words": 0
        },
        {
            "unique_name": "Souveräne Katzen",
            "image_path": require('../../assets/pictures/Souveraene_Katzen.png'),
            "count_correct_words": 0,
            "count_skipped_words": 0
        },
        {
            "unique_name": "Wütende Tiger",
            "image_path": require('../../assets/pictures/Wuetender_Tiger.png'),
            "count_correct_words": 0,
            "count_skipped_words": 0
        },

    ], // default value (aka initial value)
});

