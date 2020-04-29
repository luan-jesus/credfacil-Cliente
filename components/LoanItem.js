import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LoanItem({ emprestimo, navigation }) {
  const {
    id,
    valorPago,
    numParcelas,
    numParcelasPagas,
    dataInicio,
    status,
    valorEmprestimo
  } = emprestimo;

  function getStatus(status) {
    let x = '';
    switch (status) {
      case -1:
        x = 'Andamento';
        break;
      case 0:
        x = 'Não Pago';
        break;
      case 1:
        x = 'Pago';
        break;
      case 2:
        x = 'Pago';
        break;
      case 3:
        x = 'Pago';
        break;
      case 5:
        x = 'Solicitado'
    }
    return x;
  }

  const changeDateFormatTo = (date) => {
    const [yy, mm, dd] = date.substring(0, 10).split(/-/g);
    return `${dd}/${mm}/${yy}`;
  };

  function statusColor(status) {
    let x = '';
    switch (status) {
      case -1:
        x = '#f5f5f5';
        break;
      case 0:
        x = '#fdffa1';
        break;
      case 1:
        x = '#f5f5f5';
        break;
      case 2:
        x = '#fdffa1';
        break;
      case 3:
        x = '#fdffa1';
        break;
    }
    return x;
  }

  return (
    status == 5 ? (
      <View
      style={styles.loanItem}
    >
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[{ fontWeight: 'bold' }, styles.headerText]}>Emprestimo solicitado</Text>
          </View>
          <Text style={styles.headerText}>Aguardando retorno</Text>
        </View>
      </View>
      <View style={[styles.card, { backgroundColor: statusColor(status) }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 13, fontWeight: 'bold' }}>
            Valor:{' '}
            <Text style={{ fontWeight: 'normal' }}>
              R${parseFloat(valorEmprestimo).toFixed(2).replace('.', ',')}
            </Text>
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 13, fontWeight: 'bold' }}>
            Data solicitação:{' '}
            <Text style={{ fontWeight: 'normal' }}>
              {changeDateFormatTo(dataInicio)}
            </Text>
          </Text>
        </View>
      </View>
    </View>
    ) : (
      <TouchableOpacity
      style={styles.loanItem}
      onPress={() => {
        navigation.navigate('LoanDetailScreen', { loanId: id });
      }}
    >
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[{ fontWeight: 'bold' }, styles.headerText]}>Inicio: </Text>
            <Text style={[{ fontWeight: 'normal' }, styles.headerText]}>
              {changeDateFormatTo(dataInicio)}
            </Text>
          </View>
          <Text style={styles.headerText}>{getStatus(status)}</Text>
        </View>
      </View>
      <View style={[styles.card, { backgroundColor: statusColor(status) }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 13, fontWeight: 'bold' }}>
            Emprestado:{' '}
            <Text style={{ fontWeight: 'normal' }}>
              R${parseFloat(valorEmprestimo).toFixed(2).replace('.', ',')}
            </Text>
          </Text>
          <Text style={{ fontSize: 13, fontWeight: 'bold' }}>
            Parcelas:{' '}
            <Text style={{ fontWeight: 'normal' }}>{numParcelas}</Text>
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 13, fontWeight: 'bold' }}>
            Pago:{' '}
            <Text style={{ fontWeight: 'normal' }}>
              R${parseFloat(valorPago).toFixed(2).replace('.', ',')}
            </Text>
          </Text>
          <Text style={{ fontSize: 13, fontWeight: 'bold' }}>
            Pagas:{' '}
            <Text style={{ fontWeight: 'normal' }}>{numParcelasPagas}</Text>
          </Text>
        </View>
        <Text style={{fontSize: 12, marginTop: 10}}>Clique para mais informações</Text>
      </View>
    </TouchableOpacity>
    )
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loanItem: {
    borderBottomColor: 'gray',
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  header: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlign: 'left',
    backgroundColor: '#02983e',
  },
  headerText: {
    color: '#fff',
    fontSize: 17,
  },
  card: {
    paddingTop: 3,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});
