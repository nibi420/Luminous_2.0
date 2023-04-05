import * as Progress from 'react-native-progress';

import { StyleSheet, Text, View } from "react-native";

function DonationProgressBar (props) {
    const {collected,pledged,total} = props;
    
    return (
        <View >
        <View style={styles.bannerInfo}>
        <Text style={styles.bannerTitle}>Donated</Text>
        <Progress.Bar progress={collected/total} color="gold" height={20}/>
        
        <Text>Donated</Text>
        <Text style={styles.bannerTitle}>Donated and pledged</Text>
        <Progress.Bar progress={(collected+pledged)/total} color="blue"  height={15}/>
       
        </View>
        </View>
    )
}
const styles = StyleSheet.create({bannersContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },bannerInfo: {
    marginLeft: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    flex: 1,
  },bannerTitle: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  }})
export default DonationProgressBar;

/*
<ProgressBar 
        collected = {66} 
        pledged = {11}
        total={100} 
        />
*/