import React from "react";
import { View, StyleSheet } from "react-native";

const Card = (props) => {
  // console.log(props.children);
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    shadowOpacity: 0.26,
    backgroundColor: "white",
    padding: 29,
    borderRadius: 10,
  },
});
export default Card;
