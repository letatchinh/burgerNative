export const getdataStored = async () => {
    try {
      const value = await AsyncStorage.getItem('listAddressUser');
      if (value !== null) {
        // We have data!!
        console.log(value);
        return value
      }
    } catch (error) {
      // Error retrieving data
    }
  };
