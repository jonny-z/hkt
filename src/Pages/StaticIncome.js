import React, { Component } from 'react';
import { ImageBackground, Text, View, StyleSheet, TextInput, Alert, Image } from 'react-native';
import { appBg, theme, miner } from '../Index';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
	container: {
        flex: 1,
    },
	content: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
	inputContent: {
		flex: 1,
		flexDirection: 'column',
      	justifyContent: "center",
		alignItems: "center",
		height: '100%'
	},
	text: {
		color: '#333',
		fontSize: 16
	},
	specialText: {
		fontWeight: 'bold',
		fontSize: 40
	},
	topInfo: {
		flexDirection: 'row',
      	justifyContent: "space-between",
		padding: 10,
		backgroundColor: '#49AAF0'
	}
});

class StaticIncome extends Component {
    static navigationOptions = {
        title: '静态收益',
    }
	constructor (props) {
	    super(props);
	}
	render () {
		const { machine_specifications,frozen_money } = this.props;
		const currentGet = Number(machine_specifications) * 0.015;
		console.log(this.props);
		return (
			<View style={styles.container}>
				<View style={styles.content}>
					<View style={styles.topInfo}>
						<Text style={[styles.text, {color: '#fff'}]}>矿机规格: {machine_specifications}</Text>
						<Text style={[styles.text, {color: '#fff'}]}>总收益: {frozen_money}</Text>
					</View>
					<View style={styles.inputContent}>
						<Text style={[styles.text, styles.specialText]}>每日收益</Text>
						<Text style={[styles.text, styles.specialText]}>{currentGet}</Text>
					</View>
					<Image source={miner}/>
				</View>
			</View>
		)
	}
}
export default connect((state)=>{return state})(StaticIncome)
