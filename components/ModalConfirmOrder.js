import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { useSelector } from "react-redux";
import EvilIcons  from 'react-native-vector-icons/EvilIcons';
const IconLocaltion =  <EvilIcons name="location" size={30} color="#1E90FF"/>

const ModalConfirmOrder = ({modalVisible,setModalVisible,navigation,confirmOrder}) => {
const address = useSelector(state=> state.user.address) || ""
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{IconLocaltion}</Text>
            <Text style={[styles.modalText]}>Bạn có muốn ship đến địa chỉ này : {  ""}</Text>
            <Text style={[styles.modalText,styles.TextAddress]}>{address.place || "Loading"}</Text>
            <View style={{flexDirection : 'row'}}>
            <Pressable
              style={[styles.button, styles.buttonClose,{marginHorizontal : 10}]}
              onPress={() => {setModalVisible(!modalVisible) ; confirmOrder()}}
            >
              <Text style={styles.textStyle}>Đúng rồi!</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible)
                navigation.navigate("SearchAddress")
              }}
            >
              <Text style={styles.textStyle}>Sai địa chỉ</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color : 'black'
  },
  TextAddress : {
    fontWeight : '700'
  }
});

export default ModalConfirmOrder;