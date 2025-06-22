import React, { useState, useEffect, useDebugValue } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addNewCardAction } from '../store/actions';
import { colors } from '../theme/colors';

interface AddNewCardModalProps {
  visible: boolean;
  onClose: () => void;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a random expiry date in the format "MM/YY"
 * between the next month and up to `yearsAhead` years from now.
 */
function generateExpiryDate(yearsAhead = 5) {
  const now = new Date();
  // Pick a future month offset between 1 and yearsAhead*12
  const offsetMonths = randomInt(1, yearsAhead * 12);
  const future = new Date(now.getFullYear(), now.getMonth() + offsetMonths);

  const month = String(future.getMonth() + 1).padStart(2, '0'); // 0-indexed
  const year  = String(future.getFullYear() % 100).padStart(2, '0'); // last two digits

  return `${month}/${year}`;
}

/**
 * Generate a random 3-digit CVV (string, zero-padded)
 */
function generateCVV() {
  return String(randomInt(0, 999)).padStart(3, '0');
}

export default function AddNewCardModal({
  visible,
  onClose,
}: AddNewCardModalProps) {
  const [name, setName] = useState('');
  const [cardNum, setCardNumber] = useState('');
  const dispatch = useDispatch();


  const handleSave = () => {
    dispatch(addNewCardAction({name, cardNum, id : Date.now().toString(), expiryDate: generateExpiryDate(), cvv: generateCVV(), isSpendingLimitEnabled : false, spendingLimit: 0, isCardFreezed: false }))
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Enter Card Details</Text>

          <TextInput
            style={styles.input}
            placeholder="Card Holder Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

          <TextInput
            style={styles.input}
            placeholder="Card Number"
            value={cardNum}
            onChangeText={setCardNumber}
            keyboardType="number-pad"
            maxLength={16}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={[styles.buttonText, { color: '#666' }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, !name || cardNum.length < 16 && styles.buttonDisabled]}
              onPress={handleSave}
              disabled={!name || cardNum.length < 16}
            >
              <Text style={{...styles.buttonText,  color : !name || cardNum.length < 16 ? colors.text.opaqueGrey : colors.text.green}}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: colors.background.primary,
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
    color: colors.text.green,
    fontFamily: 'AvenirDemiBold'
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    fontSize: 16,
    paddingVertical: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,

  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.green,
    fontFamily: 'AvenirDemiBold'
  },
});
