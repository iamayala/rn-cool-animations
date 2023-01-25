import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import fonts from "../constants/fonts";

const Progress = ({ step, steps, height }) => {
	const [width, setWidth] = useState(0);

	const animatedValue = React.useRef(new Animated.Value(-1000)).current;
	const reactive = React.useRef(new Animated.Value(-1000)).current;

	React.useEffect(() => {
		Animated.timing(animatedValue, {
			toValue: reactive,
			duration: 300,
			useativeDriver: true,
		}).start();
	}, []);

	React.useEffect(() => {
		reactive.setValue(-width + (width * step) / steps);
	}, [step, width]);

	return (
		<>
			<Text
				style={{ fontFamily: fonts.medium, marginBottom: 10, fontSize: 16 }}
			>
				{step}/{steps}
			</Text>
			<View
				style={{
					height,
					backgroundColor: "rgba(0,0,0,.1)",
					borderRadius: height,
					overflow: "hidden",
				}}
			>
				<Animated.View
					onLayout={(ev) => {
						const newWidth = ev.nativeEvent.layout.width;
						setWidth(newWidth);
					}}
					style={{
						height,
						width: "100%",
						borderRadius: height,
						backgroundColor: "rgba(0,0,0,.5)",
						position: "absolute",
						left: 0,
						top: 0,
						transform: [{ translateX: animatedValue }],
					}}
				/>
			</View>
		</>
	);
};

function Home() {
	const [index, setIndex] = useState(0);

	React.useEffect(() => {
		const interval = setInterval(() => {
			setIndex((index + 1) % (10 + 1));
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [index]);

	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<Progress step={index} steps={10} height={20} />
		</View>
	);
}

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
		padding: 20,
	},
});
