import React from "react";
import { Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import fonts from "../constants/fonts";

function Rating({ rating }) {
	const filledStars = Math.floor(rating / 2);
	const maxStars = Array(5 - filledStars).fill("staro");
	const r = [...Array(filledStars).fill("star"), ...maxStars];
	return (
		<View
			style={{ flexDirection: "row", alignItems: "center", marginVertical: 5 }}
		>
			<Text style={{ fontFamily: fonts.medium, marginRight: 5 }}>{rating}</Text>
			{r.map((type, index) => {
				return (
					<AntDesign
						key={index}
						name={type}
						size={14}
						color="orange"
						style={{ marginHorizontal: 0.5 }}
					/>
				);
			})}
		</View>
	);
}

export default Rating;
