import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
 
const {height: SCREEN_HEIGHT} = Dimensions.get('window');
 
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
 

 
const ParallaxHeader = ({title,imageHeader,renderNavBar,renderContent}) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ReactNativeParallaxHeader
        headerMinHeight={HEADER_HEIGHT}
        headerMaxHeight={250}
        extraScrollHeight={20}
        navbarColor="#3498db"
        titleStyle={styles.titleStyle}
        title={title()}
        backgroundImage={require(imageHeader)}
        backgroundImageScale={1.2}
        renderNavBar={renderNavBar}
        renderContent={renderContent}
        containerStyle={styles.container}
        contentContainerStyle={styles.contentContainer}
        innerContainerStyle={styles.container}
        scrollViewProps={{
          onScrollBeginDrag: () => console.log('onScrollBeginDrag'),
          onScrollEndDrag: () => console.log('onScrollEndDrag'),
        }}
      />
    </>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  navContainer: {
    height: HEADER_HEIGHT,
    marginHorizontal: 10,
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: 'transparent',
  },
  navBar: {
    height: NAV_BAR_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
 
export default ParallaxHeader;