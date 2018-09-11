import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class ReadMoreText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingMore: false,
      shouldFoldText: false
    };
    this.eachLineHeight = 0;
    this.totalHeight = 0;
  }

  handleEachLineTextLayout = evt => {
    const { height } = evt.nativeEvent.layout;
    if (height !== this.eachLineHeight) {
      this.eachLineHeight = height;
      this.foldTextWithLimitLinesIfNeed();
    }
  };

  handleAllTextLayout = evt => {
    const { height } = evt.nativeEvent.layout;
    if (height !== this.totalHeight) {
      this.totalHeight = height;
      this.foldTextWithLimitLinesIfNeed();
    }
  };

  foldTextWithLimitLinesIfNeed = () => {
    if (this.totalHeight === 0 || this.eachLineHeight === 0) return;
    if (Math.round(this.totalHeight / this.eachLineHeight) > this.props.limitLines) {
      this.setState({ shouldFoldText: true });
    }
  };

  handlePress = () => this.setState({ isShowingMore: !this.state.isShowingMore });

  render() {
    const { textStyle, children, limitLines } = this.props;
    const { isShowingMore, shouldFoldText } = this.state;

    return (
      <View>
        <View pointerEvents="none">
          <Text
            style={[textStyle, styles.transparentText]}
            numberOfLines={1}
            onLayout={this.handleEachLineTextLayout}
          >
            {"1Line"}
          </Text>
          <Text
            style={[textStyle, styles.transparentText]}
            onLayout={this.handleAllTextLayout}
          >
            {children}
          </Text>
        </View>
        <Text style={textStyle} numberOfLines={isShowingMore ? 0 : limitLines}>
          {children}
        </Text>
        {
          shouldFoldText && <Text style={{ color: 'blue' }} onPress={this.handlePress}>More</Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  transparentText: {
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0
  }
});
