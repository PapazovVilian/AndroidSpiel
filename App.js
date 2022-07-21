import React from 'react';

import RootNavigator from './src/navigation/RootNavigator';
import './src/constants/IMLocalize';


//TODO Add a subscription to the Root Navigator so it can re render when going back and forth
//TODO change .js to typescript, change all functions to class components, use eslintr correctly?, delete all unused packages
//TODO Distribute app releases to specific countries
// https://support.google.com/googleplay/android-developer/answer/7550024?hl=en#zippy=%2Cadd-or-remove-a-country-to-tracks-synced-with-production
export default function App() {
    return <RootNavigator />;
}
