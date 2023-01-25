import React from "react";
import {
	Vibration,
	StatusBar,
	Easing,
	TextInput,
	Dimensions,
	Animated,
	TouchableOpacity,
	FlatList,
	Text,
	View,
	StyleSheet,
} from "react-native";
const { width, height } = Dimensions.get("window");
const colors = {
	black: "#323F4E",
	red: "#F76A6A",
	text: "#ffffff",
};

const timers = [...Array(13).keys()].map((i) => (i === 0 ? 1 : i * 5));
const ITEM_SIZE = width * 0.38;
const ITEM_SPACING = (width - ITEM_SIZE) / 2;

function Home() {
	const scrollX = React.useRef(new Animated.Value(0)).current;
	const [duration, setDuration] = React.useState(timers[0]);
	const timerAnimation = React.useRef(new Animated.Value(height)).current;
	const animation = React.useCallback(() => {
		Animated.sequence([
			Animated.timing(timerAnimation, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true,
			}),
			Animated.timing(timerAnimation, {
				toValue: height,
				duration: duration * 1000,
				useNativeDriver: true,
			}).start(() => {}),
		]);
	}, [duration]);

	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<Animated.View
				style={[
					StyleSheet.absoluteFillObject,
					{
						height,
						width,
						backgroundColor: colors.red,
						transform: [{ translateY: timerAnimation }],
					},
				]}
			/>
			<Animated.View
				style={[
					StyleSheet.absoluteFillObject,
					{
						justifyContent: "flex-end",
						alignItems: "center",
						paddingBottom: 100,
					},
				]}
			>
				<TouchableOpacity onPress={animation}>
					<View style={styles.roundButton} />
				</TouchableOpacity>
			</Animated.View>
			<View
				style={{
					position: "absolute",
					top: height / 3,
					left: 0,
					right: 0,
					flex: 1,
				}}
			>
				<Animated.FlatList
					data={timers}
					keyExtractor={(item) => item.toString()}
					horizontal
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { x: scrollX } } }],
						{ useNativeDriver: true }
					)}
					onMomentumScrollEnd={(ev) => {
						const index = Math.round(
							ev.nativeEvent.contentOffset.x / ITEM_SIZE
						);
						setDuration(timers[index]);
					}}
					bounces={false}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
					style={{ flexGrow: 0 }}
					snapToInterval={ITEM_SIZE}
					decelerationRate="fast"
					renderItem={({ item, index }) => {
						const inputRange = [
							(index - 1) * ITEM_SIZE,
							index * ITEM_SIZE,
							(index + 1) * ITEM_SIZE,
						];

						const opacity = scrollX.interpolate({
							inputRange,
							outputRange: [0.4, 1, 0.4],
						});

						const scale = scrollX.interpolate({
							inputRange,
							outputRange: [0.7, 1, 0.7],
						});

						return (
							<View
								style={{
									width: ITEM_SIZE,
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Animated.Text
									style={[styles.text, { opacity, transform: [{ scale }] }]}
								>
									{item}
								</Animated.Text>
							</View>
						);
					}}
				/>
			</View>
		</View>
	);
}

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.black,
	},
	roundButton: {
		width: 80,
		height: 80,
		borderRadius: 80,
		backgroundColor: colors.red,
	},
	text: {
		fontSize: ITEM_SIZE * 0.8,
		fontFamily: "Menlo",
		color: colors.text,
		fontWeight: "900",
	},
});
