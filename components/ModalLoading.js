import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Animated,
} from 'react-native';
import Modal from 'react-native-modal';

const ModalLoading = ({loading}) => {
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (loading) {
      setModalVisible(true);
      fadeIn();
    } else {
      setModalVisible(false);
      fadeOut();
    }
  }, [loading]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  console.log(fadeAnim,"fadeAnim");
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds

    Animated.timing(fadeAnim ,{
        toValue : 1 ,
        duration : 2000,
        useNativeDriver : true
    }).start();
  };
  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{...styles.centeredView,opacity : 0}}>
      <Modal visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <ActivityIndicator
              color="#0000ff"
              style={{marginVertical: 16}}
              size="large"
            />
          </View>
        </View>
      </Modal>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ModalLoading;
