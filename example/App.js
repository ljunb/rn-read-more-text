/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import ReadMoreText from "rn-read-more-text";

export default class App extends Component {
  content = `    It is a nice evening. There is a curve moon in the sky. Those shining stars hang in the sky. They are winking and seem to be saying some things.
    The girl is doing her homework. So she is very tired. After a while, she says :“Oh, I have already finished my homework. l can go to bed now!” She goes into the bathroom and does some washing. And then she goes to bed. She is sleeping well. A nice sweet dream falls on her. Her pet Mimi also has a dream with her.
    They dream about visiting the space. The spaceship takes them to the moon……
    How wonderful the night and the dream are!
`;

  render1stFooter = ({ isShowingAll, toggle }) => (
    <View
      style={{
        position: "absolute",
        bottom: 10,
        right: 0,
        backgroundColor: "#fff"
      }}
    >
      <Text onPress={() => toggle()}>
        {isShowingAll ? "Show less" : "Show more"}
      </Text>
    </View>
  );

  render2ndFooter = ({ isShowingAll, toggle }) => (
    <Text
      style={{ color: "blue", alignSelf: "flex-end" }}
      onPress={() => toggle()}
    >
      {isShowingAll ? "Show less" : "Show more"}
    </Text>
  );

  handleManualToggle = () => this.textRef && this.textRef.toggle();

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ backgroundColor: "rgba(1,1,1,0.1)", padding: 10 }}
          onPress={this.handleManualToggle}
        >
          <ReadMoreText
            ref={r => (this.textRef = r)}
            style={{ color: "red", fontSize: 16, lineHeight: 40 }}
            limitLines={3}
            renderFooter={this.render1stFooter}
            onToggleFinish={({ isShowingAll }) => alert(`isShowingAll: ${isShowingAll}`)}
          >
            {`limitLines = 3: ${this.content}`}
          </ReadMoreText>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: "rgba(1,1,1,0.1)",
            marginTop: 10,
            padding: 10
          }}
        >
          <ReadMoreText limitLines={5} renderFooter={this.render2ndFooter}>
            {`limitLines = 5: ${this.content}`}
          </ReadMoreText>
        </View>
        <View
          style={{
            backgroundColor: "rgba(1,1,1,0.1)",
            marginTop: 10,
            padding: 10
          }}
        >
          <ReadMoreText limitLines={1} renderFooter={this.render2ndFooter}>
            limitLines = 1: This is one line, needn't show footer
          </ReadMoreText>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
