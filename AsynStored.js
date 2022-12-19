export const _retrieveData = async () => {
    let v 
    try {
      const value = await AsyncStorage.getItem('userBurger');
      if (value !== null) {
       v = JSON.parse(value)
      }
    } catch (error) {
    }
    return v
  }
 export const removeItem = async () => {
    try {
      await AsyncStorage.removeItem('userBurger');
    } catch (error) {
    }
  }