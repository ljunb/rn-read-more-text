import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default class ReadMoreText extends Component {
  static propTypes = {
    ...Text.propTypes,
    limitLines: PropTypes.number,
    renderFoldFooter: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    renderSpreadFooter: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
  };

  static defaultProps = {
    limitLines: 3
  };

  constructor(props) {
    super(props);
    this.state = {
      isShowingAllContent: false,
      shouldFoldText: false
    };
    this.eachLineHeight = 0;
    this.totalHeight = 0;
  }

  foldContent = () => {
    if (!this.state.isShowingAllContent) return;
    this.setState({ isShowingAllContent: false });
  };

  spreadContent = () => {
    if (this.state.isShowingAllContent) return;
    this.setState({ isShowingAllContent: true });
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
    this.setState({ isShowingAllContent: !this.state.isShowingAllContent });

  componentBuilder = component => {
    if (Object.prototype.toString.call(component) === "[object Function]") {
      return component();
    } else if (React.isValidElement(component)) {
      return component;
    }
    return null;
  };

  renderFooter = () => {
    const { renderFoldFooter, renderSpreadFooter } = this.props;
    const { isShowingAllContent } = this.state;
    return isShowingAllContent
      ? this.componentBuilder(renderSpreadFooter)
      : this.componentBuilder(renderFoldFooter);
  };

  render() {
    const { style, children, limitLines } = this.props;
    const { isShowingAllContent, shouldFoldText } = this.state;

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
        <Text style={style} numberOfLines={isShowingAllContent ? 0 : limitLines}>
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
