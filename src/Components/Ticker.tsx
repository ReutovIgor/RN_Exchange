import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, FlatList } from "react-native";

import TickerItem from './TickerItem';

import { tickersStore } from '../Store/tickersStore';
import { observer } from 'mobx-react-lite';
import { TICKER_STORE_ERROR, TICKER_STORE_PENDING, TICKER_STORE_PENDING_ERROR } from '../const';
import { useNavigation } from '@react-navigation/native';
import { AppState } from 'react-native';
import { TickerStoreItem } from '../types';

const Ticker = observer(() => {
  const navigation = useNavigation();
  const isInFocus = useRef(false);

  useEffect(() => {
    const appStateSubscription = AppState.addEventListener("change", nextAppState => {
      if (isInFocus.current && nextAppState === "active") {
        tickersStore.startTimer()
      } else {
        tickersStore.stopTimer()
      }
    })

    return () => {
      appStateSubscription.remove()
    }
  }, [])

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", () => {
      isInFocus.current = true
      if (Array.isArray(tickersStore.tickers)) {
        tickersStore.startTimer()
      } else {
        tickersStore.fetchTickerData()
      }
    })
    const unsubscribeBlur = navigation.addListener("blur", () => {
      isInFocus.current = false
      tickersStore.stopTimer()
    })
    return () => {
      unsubscribeFocus()
      unsubscribeBlur()
    }
  }, [navigation])

  if (tickersStore.state === TICKER_STORE_PENDING && tickersStore.tickers === null) {
    return (
      <View style={styles.containerState}>
        <ActivityIndicator size="large" />
      </View>
    )
  } else {
    return (
      <>
        {(tickersStore.state === TICKER_STORE_ERROR || tickersStore.state === TICKER_STORE_PENDING_ERROR) && <Text style={styles.errorText}>Error</Text>}
        {Array.isArray(tickersStore.tickers)
          ?
          <FlatList<TickerStoreItem>
            data={tickersStore.tickers}
            initialNumToRender={6}
            renderItem={({ item }) => <TickerItem item={item} key={item.id} />}
            keyExtractor={item => item.id.toString()}
          />
          :
          <View>
            <Text>No Data</Text>
          </View>
        }
      </>
    )
  }
})

const styles = StyleSheet.create({
  containerState: {
    flex: 1,
    justifyContent: "center",
  },
  errorText: {
    backgroundColor: "red",
    fontSize: 20,
    textAlign: "center",
  },
});

export default Ticker;
