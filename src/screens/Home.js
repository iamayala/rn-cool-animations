import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	Image,
	Dimensions,
} from "react-native";
import Animated from "react-native-reanimated";
import Svg, { Rect } from "react-native-svg";
import Genres from "../components/Genres";
import Rating from "../components/Rating";
import Screen from "../components/Screen";
import fonts from "../constants/fonts";
import { data } from "../service/api";
const { width, height } = Dimensions.get("screen");

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const ITEM_SIZE = width * 0.72;
const SPACING = 10;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.6;

const Backdrop = ({ movies, scrollX }) => {
	return (
		<View style={{ position: "absolute", width, height: BACKDROP_HEIGHT }}>
			<FlatList
				data={movies}
				keyExtractor={(item, index) => index}
				renderItem={({ item, index }) => {
					if (!item.image_url) {
						return null;
					}

					const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE];

					const translateX = scrollX.interpolate({
						inputRange,
						outputRange: [-width, 0],
					});

					return (
						<MaskedView
							style={{ position: "absolute" }}
							maskElement={
								<AnimatedSvg
									width={width}
									height={height}
									viewBox={`0 0 ${width} ${height}`}
									style={{ transform: [{ translateX }] }}
								>
									<Rect x="0" y="0" width={width} height={height} fill="red" />
								</AnimatedSvg>
							}
						>
							<Image
								source={{ uri: item?.image_url }}
								style={{ width, height: BACKDROP_HEIGHT }}
								resizeMode="cover"
							/>
						</MaskedView>
					);
				}}
			/>
			<LinearGradient
				colors={["transparent", "white"]}
				style={{
					width,
					height: BACKDROP_HEIGHT,
					position: "absolute",
					bottom: 0,
				}}
			/>
		</View>
	);
};

function Home() {
	const [movies, setMovies] = useState([
		{ key: "left-spacer" },
		...data,
		{ key: "right-spacer" },
	]);
	const scrollX = React.useRef(new Animated.Value(0)).current;

	return (
		<View style={{ flex: 1 }}>
			<Backdrop movies={movies} scrollX={scrollX} />
			<Animated.FlatList
				data={movies}
				keyExtractor={(item, index) => index}
				horizontal
				contentContainerStyle={{ alignItems: "center" }}
				snapToInterval={ITEM_SIZE}
				showsHorizontalScrollIndicator={false}
				decelerationRate={0}
				bounces={false}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{ useNativeDriver: true }
				)}
				scrollEventThrottle={16}
				renderItem={({ item, index }) => {
					if (!item.title) {
						return <View style={{ width: SPACER_ITEM_SIZE }} />;
					}
					const inputRange = [
						(index - 2) * ITEM_SIZE,
						(index - 1) * ITEM_SIZE,
						index * ITEM_SIZE,
					];
					const translateY = scrollX.interpolate({
						inputRange,
						outputRange: [100, 50, 100],
					});
					return (
						<View
							style={{
								width: ITEM_SIZE,
							}}
						>
							<Animated.View
								style={{
									marginHorizontal: SPACING,
									padding: SPACING * 2,
									alignSelf: "center",
									backgroundColor: "white",
									borderRadius: 34,
									alignItems: "center",
									transform: [{ translateY }],
								}}
							>
								<Image
									source={{ uri: item?.image_url }}
									style={{
										height: width * 0.8,
										width: width * 0.6,
										marginBottom: 10,
										borderRadius: 15,
									}}
									resizeMode="cover"
								/>
								<Text
									style={{
										fontSize: 18,
										textAlign: "center",
										fontFamily: fonts.bold,
									}}
								>
									{item.title}
								</Text>
								<Rating rating={item?.rating} />
								<Genres genres={item?.genres} />
								<Text
									numberOfLines={3}
									style={{ textAlign: "center", fontFamily: fonts.regular }}
								>
									{item.plot}
								</Text>
							</Animated.View>
						</View>
					);
				}}
			/>
		</View>
	);
}

export default Home;
