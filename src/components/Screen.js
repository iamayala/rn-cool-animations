import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import SafeAreaView, { SafeAreaProvider } from "react-native-safe-area-view";

const Screen = ({ children, backgroundColor }) => (
	<SafeAreaProvider>
		<SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor }}>
			{/* <StatusBar barStyle="dark-content" /> */}
			<View style={{ flex: 1, marginTop: 0 }}>{children}</View>
		</SafeAreaView>
	</SafeAreaProvider>
);

export default Screen;
