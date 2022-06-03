import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import {Heading} from 'native-base';
import Colors from '../theme/Colors';
import Dimension from '../theme/Dimension';
import Fonts from '../theme/Fonts';
import {useNavigation} from '@react-navigation/native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import Button from '../components/Button';

const ProductDetails = () => {
  const scrollX = new Animated.Value(0);
  const [orderItems, setOrderItems] = React.useState([]);
  const navigation = useNavigation();
  const data = [
    {
      id: '1',
      ProductName: 'Bánh mì thịt',
      Price: 40,
      description: 'Bánh mì thịt kẹp thịt bò',
      Rate: 4.5,
      avatarUrl: require('../../assets/images/crispy-chicken-burger.jpg'),
    },
  ];
  function editOrder(action, id, price) {
    let orderList = orderItems.slice();
    let item = orderList.filter(a => a.id == id);

    if (action == '+') {
      if (item.length > 0) {
        let newQty = item[0].qty + 1;
        item[0].qty = newQty;
        item[0].total = item[0].qty * price;
      } else {
        const newItem = {
          id: id,
          qty: 1,
          price: price,
          total: price,
        };
        orderList.push(newItem);
      }

      setOrderItems(orderList);
    } else {
      if (item.length > 0) {
        if (item[0]?.qty > 0) {
          let newQty = item[0].qty - 1;
          item[0].qty = newQty;
          item[0].total = newQty * price;
        }
      }

      setOrderItems(orderList);
    }
  }

  function getOrderQty(id) {
    let orderItem = orderItems.filter(a => a.id == id);

    if (orderItem.length > 0) {
      return orderItem[0].qty;
    }

    return 0;
  }

  function sumOrder() {
    let total = orderItems.reduce((a, b) => a + (b.total || 0), 0);
    return total;
  }
  function renderheader() {
    return (
      <View style={{flexDirection: 'row'}}>
        <Heading fontSize="xl" p="4" pb="3">
          Bánh mì thịt
        </Heading>
      </View>
    );
  }
  function renderfood() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}>
        {data.map((item, index) => (
          <View key={`id-${index}`} style={{alignItems: 'center'}}>
            <View style={{height: Dimension.height * 0.3}}>
              <Image
                source={item.avatarUrl}
                resizeMode="cover"
                style={{
                  width: Dimension.width,
                  height: '100%',
                }}
              />
            </View>
            <View
              style={{
                width: Dimension.width,
                alignItems: 'center',
                margintop: 25,
                paddingHorizontal: Dimension.padding * 2,
              }}>
              <Text style={{margintop: 50, textAlign: 'center', ...Fonts.h2}}>
                {item.ProductName}
              </Text>
              <Text style={{...Fonts.body3}}>{item.description}</Text>
            </View>
            <View style={{flexDirection: 'row'}} paddingTop={90}>
              <View
                style={{
                  width: 100,
                  height: 50,
                  padding: 10,
                  backgroundColor: Colors.gray,
                  alignItems: 'center',
                  borderRadius: Dimension.radius,
                  flexDirection: 'row',
                  marginRight: 20,
                }}>
                <Image
                  source={require('../../assets/icons/star.png')}
                  resizeMode="cover"
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
                <Text style={{color: Colors.yellow, ...Fonts.h4}}>
                  {' '}
                  {item.Rate} sao
                </Text>
              </View>
              <View
                style={{
                  width: 200,
                  height: 50,
                  padding: 10,
                  backgroundColor: Colors.lightGray2,
                  alignItems: 'center',
                  borderRadius: Dimension.radius,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={require('../../assets/icons/money.png')}
                    resizeMode="cover"
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                  <Text style={{color: Colors.gray, width: 120, ...Fonts.h4}}>
                    {' '}
                    {item.Price} K
                  </Text>
                  <View
                    style={{
                      justifyContent: 'center',
                      flexDirection: 'row',
                      flex: 1,
                      paddingHorizontal: 20,
                      paddingRight: 400,
                      paddingLeft: -70,
                      // marginRight: -20,
                    }}>
                    <TouchableOpacity
                      style={{
                        width: 30,
                        backgroundColor: Colors.lightgray,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderTopLeftRadius: 25,
                        borderBottomLeftRadius: 25,
                      }}
                      onPress={() => editOrder('-', item.id, item.Price)}>
                      <Text style={{...Fonts.body1}}>-</Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        width: 30,
                        backgroundColor: Colors.lightgray,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{...Fonts.h2}}>{getOrderQty(item.id)}</Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        width: 30,
                        backgroundColor: Colors.lightgray,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderTopRightRadius: 25,
                        borderBottomRightRadius: 25,
                      }}
                      onPress={() => editOrder('+', item.id, item.Price)}>
                      <Text style={{...Fonts.body1}}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    );
  }
  function renderDots() {
    const dotPosition = Animated.divide(scrollX, Dimension.width);

    return (
      <View style={{height: 30}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: Dimension.padding,
          }}>
          {data.map((item, index) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [Dimension.base * 0.8, 10, Dimension.base * 0.8],
              extrapolate: 'clamp',
            });

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [Colors.darkgray, Colors.primary, Colors.darkgray],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={`dot-${index}`}
                opacity={opacity}
                style={{
                  borderRadius: Dimension.radius,
                  marginHorizontal: 6,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }

  function renderOrder() {
    return (
      <View>
        {renderDots()}
        <View
          style={{
            backgroundColor: Colors.white,
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: Dimension.padding * 2,
              paddingHorizontal: Dimension.padding * 3,
            }}>
            <Text style={{...Fonts.h3}}>Tổng tiền</Text>
            <Text style={{...Fonts.h3}}>${sumOrder()}</Text>
          </View>

          <View
            style={{
              padding: Dimension.padding * 2,
              paddingLeft: 180,
              justifyContent: 'center',
            }}>
            <Button
              title={'Đặt ngay'}
              style={{marginBottom: 20}}
              onPress={() => navigation.replace('Cart')}></Button>
            <Button
              title={'Xem đánh giá'}
              style={styles.marginButton}
              onPress={() => navigation.replace('ProductReview')}></Button>
          </View>
        </View>

        {isIphoneX() && (
          <View
            style={{
              position: 'absolute',
              bottom: -34,
              left: 0,
              right: 0,
              height: 34,
              backgroundColor: Colors.white,
            }}></View>
        )}
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {renderheader()}
      {renderfood()}
      {renderOrder()}
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightgray,
  },
});
