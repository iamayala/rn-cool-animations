import React from "react";
import {
	StatusBar,
	FlatList,
	Image,
	Animated,
	Text,
	View,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	Easing,
	SafeAreaViewBase,
	SafeAreaView,
} from "react-native";
import Screen from "../components/Screen";
import fonts from "../constants/fonts";
const { width, height } = Dimensions.get("screen");
import { users } from "../service/api";

const DATA = users;

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

function Home() {
	const scrollY = React.useRef(new Animated.Value(0)).current;
	return (
		<Screen>
			<View style={{ flex: 2, backgroundColor: "#FFF" }}>
				<Animated.FlatList
					data={DATA}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { y: scrollY } } }],
						{ useNativeDriver: true }
					)}
					keyExtractor={(item, i) => i}
					renderItem={({ item, index }) => {
						const inputRange = [
							-1,
							0,
							ITEM_SIZE * index,
							ITEM_SIZE * (index + 2),
						];

						const scale = scrollY.interpolate({
							inputRange,
							outputRange: [1, 1, 1, 0],
						});

						// About the opacity
						const opacityInputRange = [
							-1,
							0,
							ITEM_SIZE * index,
							ITEM_SIZE * (index + 1),
						];

						const opacity = scrollY.interpolate({
							inputRange: opacityInputRange,
							outputRange: [1, 1, 1, 0],
						});

						return (
							<Animated.View
								style={{
									flexDirection: "row",
									alignItems: "center",
									backgroundColor: "#E2E2E2",
									marginHorizontal: SPACING,
									marginBottom: SPACING,
									padding: SPACING,
									borderRadius: SPACING,
									transform: [{ scale }],
									opacity,
								}}
							>
								<Image
									source={{ uri: item.picture.large }}
									style={{
										height: AVATAR_SIZE,
										width: AVATAR_SIZE,
										borderRadius: AVATAR_SIZE,
										marginRight: SPACING,
									}}
								/>
								<View>
									<Text style={{ fontFamily: fonts.bold, fontSize: 17 }}>
										{item.name.first}
									</Text>
									<Text style={{ fontFamily: fonts.medium, fontSize: 15 }}>
										{item.location.city}
									</Text>
									<Text style={{ fontFamily: fonts.regular }}>
										{item.phone}
									</Text>
								</View>
							</Animated.View>
						);
					}}
				/>
			</View>
		</Screen>
	);
}

export default Home;
