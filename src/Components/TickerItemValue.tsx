import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from "react-native";
import { TickerItemValueProps } from '../interfaces';

const TickerItemValue = React.memo((props: TickerItemValueProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
    return () => {
      fadeAnim.setValue(0)
    }
  })

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <Animated.Text style={[styles.value, {opacity: fadeAnim}]}>{props.value}</Animated.Text>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    margin: 5,
  },
  label: {
    flex: 1,
  },
  value: {
    flex: 1,
    textAlign: "right",
    // transform: "tra"
  }
});

export default TickerItemValue;