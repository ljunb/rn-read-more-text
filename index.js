/* @flow */
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

type RenderProps = {
  isShowingAll: boolean,
  fold: () => void,
  spread: () => void
}

type ReadMoreProps = {
  limitLines?: number,
  renderFooter?: (props: RenderProps) => React.Element<any>
}

type ReadMoreState = {
  isShowingAll: boolean,
  shouldFoldText: boolean
}

export default class ReadMoreText extends Component<ReadMoreProps, ReadMoreState> {
  static defaultProps = {
    limitLines: 3
  };

  state: ReadMoreState = {
    isShowingAll: false,
    shouldFoldText: false
  };
  eachLineHeight: number = 0;
  totalHeight: number = 0;

  fold = () => {
    if (!this.state.isShowingAll) return;
    this.setState({ isShowingAll: false });
  };

  spread = () => {
    if (this.state.isShowingAll) return;
    this.setState({ isShowingAll: true });
  };

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
    if (
      Math.round(this.totalHeight / this.eachLineHeight) > this.props.limitLines
    ) {
      this.setState({ shouldFoldText: true });
    }
  };

  handlePress = () =>
    this.setState({ isShowingAll: !this.state.isShowingAll });

  renderFooter = () => {
    const { renderFooter } = this.props;
    const { isShowingAll } = this.state;
    const props: RenderProps = {
      isShowingAll,
      fold: this.fold,
      spread: this.spread,
    };
    if (renderFooter) {
      return renderFooter(props);
    }
    return null;
  };

  render() {
    const { style, children, limitLines } = this.props;
    const { isShowingAll, shouldFoldText } = this.state;

    return (
      <View>
        <View pointerEvents="none">
          <Text
            style={[style, styles.transparentText]}
            numberOfLines={1}
            onLayout={this.handleEachLineTextLayout}
          >
            {"1Line"}
          </Text>
          <Text
            style={[style, styles.transparentText]}
            onLayout={this.handleAllTextLayout}
          >
            {children}
          </Text>
        </View>
        <Text
          style={style}
          numberOfLines={isShowingAll ? 0 : limitLines}
        >
          {children}
        </Text>
        {shouldFoldText && this.renderFooter()}
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
