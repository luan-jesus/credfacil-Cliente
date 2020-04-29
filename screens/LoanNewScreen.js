import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Axios from 'axios';

import Header from '../components/Header';
import LoadingScreen from '../components/LoadingScreen';
import SaveButton from '../components/SaveButton';
import TextField from '../components/TextField';
import api from '../services/api';

const CancelToken = Axios.CancelToken;
let cancel;

export default function CustomerDetailScreen({ navigation, route }) {
  const [loan, setLoan] = useState({
    idCliente: 0,
    valorEmprestimo: 0
  });
  const [loading, setLoading] = useState(false);

  const changeDateFormatTo = (date) => {
    if (date) {
      const [dd, mm, yy] = date.substring(0,10).split(/-/g);
      return `${mm}/${dd}/${yy}`;
    }
  };

  async function ApiPost() {
    setLoading(true);
    await api
      .post('/emprestimos/solicitar', {
        idCliente: 7,
        valorEmprestimo: loan.valorEmprestimo
      }, {
        cancelToken: new CancelToken(function executor(c) {
          cancel = c;
        }),
      })
      .then(() => {
        Alert.alert('Sucesso', 'Solicitação feita com sucesso!');
        navigation.navigate('Login');
      })
      .catch((error) => {
        if (Axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          Alert.alert('Erro status: ' + error.response.status, error.response.data.error);
        }
      });
  }

  function SaveChanges() {
    Alert.alert('Aviso', 'Caso ja tenha uma solicitação em aberto esta será sobreposta, deseja continuar?', [
      { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      { text: 'OK', onPress: () => ApiPost() },
    ]);
  }

  return (
    <>
      <Header
        leftClick={() => {
          if (cancel) cancel();
        }}
        navigation={navigation}
        name="Solicitar"
      />
      <LoadingScreen loading={loading} />
      <ScrollView style={styles.container}>
        <Text>Entre com o valor do emprestimo, entraremos em contato o mais cedo possível.</Text>
        <TextField
          label="Valor Emprestimo:"
          value={loan.valorEmprestimo.toFixed(2).replace('.', ',')}
          editable={true}
          keyboardType="decimal-pad"
          onChange={(text) => {
            setLoan({
              ...loan,
              valorEmprestimo: parseFloat(text.replace(',', '')) / 100,
            });
          }}
        />
      </ScrollView>
      <SaveButton
        display={loan.valorEmprestimo > 1}
        onClick={() => SaveChanges()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
  },
  textField: {
    backgroundColor: '#fff',
    fontSize: 15,
    textAlign: 'left',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
  },
});
