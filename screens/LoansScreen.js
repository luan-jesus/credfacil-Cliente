import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AsyncStorage } from 'react-native';
import Axios from 'axios';

import Header from '../components/Header';
import LoadingScreen from '../components/LoadingScreen';
import LoanItem from '../components/LoanItem';
import api from '../services/api';

const CancelToken = Axios.CancelToken;
let cancel;

export default function Loans({ navigation }) {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const loginId = await AsyncStorage.getItem('customerId');
      await api
        .get('/emprestimos/cliente/' + loginId, {
          cancelToken: new CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancel = c;
          }),
        })
        .then((response) => setLoans(...loans, response.data))
        .catch((error) => {
          if (Axios.isCancel(error)) {
            console.log('Request canceled', error.message);
          } else {
            Alert.alert('Erro status: ' + error.response.status, error.response.data.error);
          }
        });
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <>
      <Header
        leftClick={() => {
          if (cancel) cancel();
        }}
        navigation={navigation}
        name="Seus emprestimos"
      />
      <LoadingScreen loading={loading} />
      <ScrollView style={styles.CustomerList}>
        {loans.map((loan) => (
          <LoanItem navigation={navigation} emprestimo={loan} key={Math.random()} />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.solButton} onPress={() => {navigation.navigate("LoanNewScreen")}}>
        <Text style={styles.solText}>Solicitar emprestimo</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  CustomerList: {
    marginTop: 10,
  },
  itemName: {
    fontSize: 16,
  },
  solButton: {
    paddingVertical: 14,
    backgroundColor: '#02983e',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    zIndex: 9999,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    zIndex: 70
  },
  solText: {
    color: '#fff',
    fontSize: 16
  }
});
