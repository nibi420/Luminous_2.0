import * as Progress from 'react-native-progress';

import { StyleSheet, Text, View } from "react-native";

function DonationProgressBar (props) {
    const {collected,pledged,total} = props;
    
    return (
        <View>
        <Progress.Bar progress={collected/total} color="gold" width={250} height={20}/>
        <Text>Donated</Text>
        <Progress.Bar progress={(collected+pledged)/total} color="blue" width={250} height={15}/>
        <Text>Donated and pledged</Text>
        </View>
    )
}

export default DonationProgressBar;

/*
<ProgressBar 
        collected = {66} 
        pledged = {11}
        total={100} 
        />
*/