/* @flow */
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

type ToggleFinishResult = {
  isShowingAll: boolean
};

type RenderProps = {
  isShowingAll: boolean,
  toggle: () => void
};

type ReadMoreProps = {
  limitLines?: number,
  renderFooter?: (props: RenderProps) => React.Element<any>,
  onToggleFinish: (result: ToggleFinishResult) => void
};

type ReadMoreState = {
  isShowingAll: boolean,
  shouldFoldText: boolean
};

export default class ReadMoreText extends Component<ReadMoreProps,ReadMoreState> {
  static defaultProps = {
    limitLines: 3
  };

  state: ReadMoreState = {
    isShowingAll: false,
    shouldFoldText: false
  };
  eachLineHeight: number = 0;
  totalHeight: number = 0;

  toggle = () =>
    this.setState(
      preState => ({ isShowingAll: !preState.isShowingAll }),
      this.handleToggleFinish
    );

  handleToggleFinish = () =>
    this.props.onToggleFinish &&
    this.props.onToggleFinish({ isShowingAll: this.state.isShowingAll });

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

  handlePress = () => this.setState({ isShowingAll: !this.state.isShowingAll });

  renderFooter = () => {
    const { renderFooter } = this.props;
    const { isShowingAll } = this.state;
    const props: RenderProps = {
      isShowingAll,
      toggle: this.toggle
    };
    if (renderFooter) {
      return renderFooter(props);
    }
    return null;
  };

  render() {
    const { style, children, limitLines, ...restProps } = this.props;
    const { isShowingAll, shouldFoldText } = this.state;

    return (
      <View>
        <View pointerEvents="none">
          <Text
            {...restProps}
            style={[style, styles.transparentText]}
            numberOfLines={1}
            onLayout={this.handleEachLineTextLayout}
          >
            {"1Line"}
          </Text>
          <Text
            {...restProps}
            style={[style, styles.transparentText]}
            onLayout={this.handleAllTextLayout}
          >
            {children}
          </Text>
        </View>
        <Text
          {...restProps}
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
