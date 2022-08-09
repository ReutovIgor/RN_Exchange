import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { TickerItemProps } from '../interfaces';
import TickerItemValue from './TickerItemValue';

const TickerItem = ({item}: TickerItemProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
      <TickerItemValue label="Last" value={item.last}/>
      <TickerItemValue label="Highest bid" value={item.highestBid}/>
      <TickerItemValue label="Percent change" value={item.percentChange}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
  },
})


export default TickerItem;