import React, { Component } from 'react';
import { Image, Text, View, ScrollView, ImageBackground, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import { connect } from 'react-redux';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import My from './Pages/My';
import UserProfile from './Components/Account/UserProfile';
import Navigation from './Components/Navigation';
import { appBg, theme, apiUri } from './Index';
import Api from "./Api/Api";
import MyButton from './Components/Form/MyButton';

const Styles = {
    backgroundImage:{
        flex: 1,
        resizeMode: 'cover',
        width: null,
    },
    header: {
        backgroundColor: '#49AAF0',
        paddingBottom: 10
    },
    home: {
        userProfile: {
            container: {
                marginTop: theme.appTopHeight,
            },
            avatar: {
                marginLeft: 15.
            },
            name: {
                color: '#fff',
            }
        },
        main: {
            backgroundColor: '#EEE'
        },
        balanceAndCredit: {
            container: {
                marginTop: 20,
                paddingTop: 5,
                paddingBottom: 5,
                backgroundColor: '#49AAF0',
                flexDirection: 'row',
            },
            text: {
                flex: 1,
                paddingTop: 5,
                paddingBottom: 5,
                textAlign: 'center',
                fontSize: 16,
                color: '#fff',
            },
            balance: {
                flex: 1,
                justifyContent: 'center',
            },
            machineBuy: {
                flex: 1,
                justifyContent: 'center',
            },
            credit: {
                flex: 1,
            }
        },
        outBtnWrapper: {
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: '#fff',
            paddingLeft: 40,
            paddingRight: 40,
            paddingTop: 20,
            paddingBottom: 20,
            marginTop: 15
        }
    },
    quitWrapper: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    businessWrapper: {
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 20,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    businessItem: {
        width: '48%',
        backgroundColor: theme.opacityWhite,
        borderRadius: 5,
        marginBottom: 15,
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    businessInfo: {
        flex: 0,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    businessText: {
        fontSize: 16,
        color: '#fff',
        marginTop: 10
    },
    businessImg: {
        width: '100%',
        height: 0,
        paddingBottom: '100%',
        borderRadius: 5
    },
    quit: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#000',
        marginRight: 20
    },
    quitText: {
        fontSize: 20,
    }
}
const business = [
    {
        title: '话费充值',
        img: require( '../assets/hengtai/phone-charge.png'),
        money: '1000'
    },
    {
        title: 'iphone',
        img: require( '../assets/hengtai/iphone.png'),
        money: '5999'
    },
    {
        title: 'gucci皮包',
        img: require( '../assets/hengtai/gucci.png'),
        money: '108888'
    },
    {
        title: '油卡',
        img: require( '../assets/hengtai/oil-card.png'),
        money: '1000'
    },
]
const navigateList = [
    {
        title: '矿机记录',
        id: 'BuyHistory',
        icon: 'history'
    },
    {
        title: '静态收益',
        id: 'StaticIncome',
        icon: 'bar-chart'
    },
    {
        title: '动态收益',
        id: 'DynamicIncome',
        icon: 'line-chart'
    },
    {
        title: '总账明细',
        id: 'TotalDetail',
        icon: 'list-alt'
    },
    {
        title: '邀请链接',
        id: 'ShareLink',
        icon: 'share-alt'
    },
    {
        title: '我的粉丝',
        id: 'Team',
        icon: 'users'
    },
    {
        title: '矿机维护',
        id: 'Maintain',
        icon: 'wrench'
    },
    {
        title: '我的状态',
        id: 'MyOrder',
        icon: 'exchange'
    },
    {
        title: '保本还息',
        id: '',
        icon: 'percent'
    }
]
//editable控制编辑按钮显示，customStyle 自定义样式，对应组件里的style，详情查看UserProfile.js
//barStyle: light-content、dark-content
class Home extends Component {
    static navigationOptions = {
        title: '主页',
        headerMode: 'none',
    }
    componentWillMount() {
        let fd = new FormData();
        fd.append('id', this.props.id);
        fd.append('token', this.props.token);
        Api.request(apiUri.getUserInfo, 'POST', fd).then((resData)=>{
            this.props.update(resData.data);
        });
    }

    render() {
        const { mine_balance, machine_specifications, frozen_money, navigation, is_real_name, out_money, id, token } = this.props
        return (
            <ScrollView style={Styles.home.main}>
                <View style={Styles.header}>
                    <UserProfile editable={false} style={Styles.home.userProfile}/>
                    <View style={Styles.home.balanceAndCredit.container}>
                        <View style={Styles.home.balanceAndCredit.machineBuy}>
                            <TouchableOpacity onPress={() => {
                                if(is_real_name == '1'){
                                    if(machine_specifications == '0'){
                                        navigation.navigate('Buy')
                                    }else{
                                        Alert.alert('您已经拥有矿机')
                                    }
                                }else{
                                    Alert.alert('您的身份信息尚未完善，请前往我的页面完善个人信息，完成实名认证审核')
                                }
                            }}>
                                <View style={{flex: 1, alignItems: 'center'}}>
                                    <MaterialCommunityIcons name={'cart-plus'} size={40} color="#FFF" />
                                </View>
                                <Text style={Styles.home.balanceAndCredit.text}>获得矿机</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={Styles.home.balanceAndCredit.balance}>
                            <TouchableOpacity onPress={() => navigation.navigate('HangUp')}>
                                <View style={{flex: 1, alignItems: 'center'}}>
                                    <MaterialCommunityIcons name={'currency-cny'} size={40} color="#FFF" />
                                </View>
                                <Text style={Styles.home.balanceAndCredit.text}>HKT: {mine_balance}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={Styles.home.balanceAndCredit.credit}>
                            <View style={{flex: 1, alignItems: 'center'}}>
                                <MaterialCommunityIcons name={'database-lock'} size={40} color="#FFF" />
                                {/* <Image style={{width: 60, height: 60}} source={require('../assets/hengtai/gucci.png')} /> */}
                            </View>
                            <Text style={Styles.home.balanceAndCredit.text}>冻结HKT: {frozen_money}</Text>
                        </View>
                    </View>
                </View>
                <Navigation list={navigateList} nav={navigation} id={id} token={token} out_money={out_money}/>
                <TouchableWithoutFeedback 
                    onPress={() => {
                        this.props.reset();
                        global.toast.show('已退出');
                        navigation.navigate('SignIn');
                    }}>
                    <View style={Styles.home.outBtnWrapper}>
                        <View style={Styles.quitWrapper}>
                            <Image style={Styles.quit} source={require('../assets/hengtai/gucci.png')} />
                            <Text style={Styles.quitText}>退出登陆</Text>
                        </View>
                        <FontAwesome name={'angle-right'} size={30} color="#BBB" />
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        );
    }
  }

class Info extends Component {
    static navigationOptions = {
        title: '资讯',
    }
    render() {
        return (
            <ImageBackground source={appBg} style={Styles.backgroundImage}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{color: '#fff',fontSize:18}}>该功能暂未开放,敬请期待</Text>
                </View>
            </ImageBackground>
        );
    }
}

class HKTShoppingCenter extends Component {
    static navigationOptions = {
        title: 'HKT商城',
    }
    render() {
        return (
            <ImageBackground source={appBg} style={Styles.backgroundImage}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{color: '#fff',fontSize:18}}>该功能暂未开放,敬请期待</Text>
                </View>
            </ImageBackground>
        );
    }
}

class ShoppingCenter extends Component {
    static navigationOptions = {
        title: '商城',
    }
    render() {
        return (
            <ImageBackground source={appBg} style={Styles.backgroundImage}>
                <ScrollView>
                    <View style={Styles.businessWrapper}>
                        {business.map((item, index) => (
                            <View style={Styles.businessItem} key={index}>
                                <Image
                                    style={Styles.businessImg}
                                    source={item.img}
                                />
                                <View style={Styles.businessInfo}>
                                    <Text style={Styles.businessText}>{item.title}</Text>
                                    <Text style={Styles.businessText}>¥ {item.money}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }
}

const TabNavigator = createBottomTabNavigator({
    Home: connect(
        (state)=>state,
        (dispatch) => {
            return {
                update: (userInfo) => {
                    console.log('update user info');
                    dispatch({
                        type: 'UPDATE_USER_INFO',
                        userInfo,
                    })
                },
                reset: () => {
                    console.log('reset user state');
                    dispatch({
                        type: 'RESET_USER_STATE',
                    })
                }
             }
        })(Home),
    Info,
    HKTShoppingCenter,
    ShoppingCenter,
    My,
},{
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            switch(routeName) {
                case 'Home':
                    iconName = 'ios-home';
                    break;
                case 'Info':
                    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                    break;
                case 'HKTShoppingCenter':
                    iconName = 'md-card';
                    break;
                case 'ShoppingCenter':
                    iconName = 'md-cart';
                    break;
                case 'My':
                    iconName = 'md-person';
                    break;
            }
            return <Ionicons name={iconName} size={25} color={tintColor} />;
        },
    }),
    tabBarOptions: {
        activeTintColor: '#49AAF0',
        inactiveTintColor: 'gray',
        style: {
            paddingTop: 10,
            paddingBottom: 10
        }
    },
});
export default createAppContainer(TabNavigator);
