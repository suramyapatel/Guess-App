import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text, Alert, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NumberContainer from "../component/NumberContainer";
import Card from "../component/Card";
import MainButton from "../component/MainButton";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = (props) => {
  // ScreenOrientation.lockAysnc(ScreenOrientation.OrientationLoack.PORTRAIT);
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);

  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  const [pastGuess, setPastGuess] = useState([initialGuess]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuess.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHamdler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie", "You know that this is wrong...!", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    //setRounds((curRounds) => curRounds + 1);
    setPastGuess((pastGuess) => [nextNumber, ...pastGuess]);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHamdler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={21} color="white"></Ionicons>
        </MainButton>
        <MainButton onPress={nextGuessHamdler.bind(this, "greater")}>
          <Ionicons name="md-add" size={21} color="white"></Ionicons>
        </MainButton>
      </Card>
      <Text>Your Guesses:</Text>
      <Card style={styles.box}>
        <ScrollView>
          {pastGuess.map((guess) => (
            <View key={guess}>
              <Text>{guess}</Text>
            </View>
          ))}
        </ScrollView>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
  box: {
    height: 200,
  },
});
export default GameScreen;
