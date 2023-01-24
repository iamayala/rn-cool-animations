import React from "react";
import { Text, View } from "react-native";
import fonts from "../constants/fonts";

function Genres({ genres }) {
	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				flexWrap: "wrap",
				marginVertical: 5,
			}}
		>
			{genres?.map((genre, i) => {
				return (
					<View
						key={i}
						style={{
							borderColor: "#E2E2E2",
							borderWidth: 1.2,
							height: 30,
							paddingHorizontal: 15,
							borderRadius: 40,
							alignItems: "center",
							justifyContent: "center",
							marginRight: 3,
							marginBottom: 5,
						}}
					>
						<Text
							style={{
								color: "#757575",
								fontFamily: fonts.medium,
								fontSize: 14,
								textTransform: "capitalize",
							}}
						>
							{genre}
						</Text>
					</View>
				);
			})}
		</View>
	);
}

export default Genres;
