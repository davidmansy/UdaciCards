import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function UCardTextInput({ text, onChangeText, placeholder }) {
  return (
    <TextInput
      style={styles.input}
      value={text}
      onChangeText={onChangeText}
      placeholder={placeholder}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: '#757575',
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 30,
    height: 44,
    padding: 8,
    margin: 20,
    textAlign: 'center',
    width: 300
  }
});
