import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component-2';
 
export default class Punktetabelle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Team', 'Punkte'],
      tableData: [
        [props.teamName0, props.punkteTeam0],
        [props.teamName1, props.punkteTeam1],
        [props.teamName2, props.punkteTeam2],
        [props.teamName3, props.punkteTeam3]
      ]
    }
  }
 
  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 5, borderColor: 'green'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={state.tableData} textStyle={styles.text}/>
        </Table>
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'blue' , height: 220},
  head: { width: 180, height: 40, backgroundColor: 'darkblue'},
  text: { height: 40, color: "white", textAlign : "center"}
});