import React from "react";
import RingLoader from "./src/components/RingLoader";
import Home from "./src/screens/Home";

import {
	useFonts,
	DMSans_400Regular,
	DMSans_500Medium,
	DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

export default function App() {
	let [fontsLoaded] = useFonts({
		DMSans_400Regular,
		DMSans_500Medium,
		DMSans_700Bold,
	});

	if (!fontsLoaded) {
		return null;
	}

	return <Home />;
}
