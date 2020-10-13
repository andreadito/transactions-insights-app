import React, {useState} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  FlatList,
  TextInput,
} from 'react-native';
import {QueryCache, ReactQueryCacheProvider, useQuery} from 'react-query';
import {getInsights} from './services/getInsights';

declare const global: {HermesInternal: null | {}};

const queryCache = new QueryCache();

interface Insight {
  type: 'incomeAndOutgoings' | 'spendByCategory' | 'spendingComparison';
  message: string;
}

const Item = ({item}: {item: Insight}) => {
  const {type, message} = item;
  const itemTypeStyle = item && item.type && ItemStyle[type];
  return (
    <View style={{...ItemStyle.container, ...itemTypeStyle}}>
      <Text>{message}</Text>
    </View>
  );
};

const Insights = ({customerID}: {customerID: string}) => {
  const {isLoading, isError, data} = useQuery(
    ['insights', customerID],
    getInsights,
  );

  if (isLoading) {
    return (
      <View style={InsightsStyle.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={InsightsStyle.container}>
        <Text>GAME OVER...</Text>
      </View>
    );
  }

  const renderItem = ({item}: {item: Insight}) => <Item item={item} />;

  return (
    <View style={InsightsStyle.container}>
      {data && data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.type}_${index}`}
        />
      ) : (
        <Text>No Insights</Text>
      )}
    </View>
  );
};

const App = () => {
  const [customerID, setCustomerID] = useState('customerID1');

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <TextInput
          style={AppStyle.textInput}
          onChangeText={(text) => setCustomerID(text)}
          value={customerID}
        />
        <Insights customerID={customerID} />
      </SafeAreaView>
    </ReactQueryCacheProvider>
  );
};

const AppStyle = {
  textInput: {
    padding: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 20,
  },
};

const InsightsStyle = {
  container: {
    padding: 20,
  },
};

const ItemStyle = {
  incomeAndOutgoings: {
    borderLeftColor: 'orange',
  },
  spendByCategory: {
    borderLeftColor: 'blue',
  },
  spendingComparison: {
    borderLeftColor: 'brown',
  },
  container: {
    borderLeftWidth: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'gray',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },
};

export default App;
