## rn-read-more-text

[![npm](https://img.shields.io/npm/v/rn-read-more-text.svg)](https://www.npmjs.com/package/rn-read-more-text)
[![npm](https://img.shields.io/npm/dm/rn-read-more-text.svg)](https://www.npmjs.com/package/rn-read-more-text)
[![npm](https://img.shields.io/npm/dt/rn-read-more-text.svg)](https://www.npmjs.com/package/rn-read-more-text)
[![npm](https://img.shields.io/npm/l/rn-read-more-text.svg)](https://github.com/ljunb/rn-read-more-text/blob/master/LICENSE)

这是一个支持设置行数的可折叠文本组件，具备以下功能：
 * 与 `Text` 组件使用方式一致，只是多了两个参数 `limitLines` 和 `renderFooter`
 * 如当前文本内容所显示的行数，与最大行数一致，则不显示控制折叠的 `footer` 组件
 * `renderFooter` 基于 `render props` 方式实现，自定义样式和事件响应更自由方便

 ## 安装

使用 `npm`：
```
npm install rn-read-more-text --save
```
用 `yarn`：
```
yarn add rn-read-more-text
```

## 使用示例
见 [example](https://github.com/ljunb/rn-read-more-text/blob/master/example/App.js)。

```javascript
import ReadMoreText from "rn-read-more-text";

export default class App extends Component {
  content = `    It is a nice evening. There is a curve moon in the sky. Those shining stars hang in the sky. They are winking and seem to be saying some things.
    The girl is doing her homework. So she is very tired. After a while, she says :“Oh, I have already finished my homework. l can go to bed now!” She goes into the bathroom and does some washing. And then she goes to bed. She is sleeping well. A nice sweet dream falls on her. Her pet Mimi also has a dream with her.
    They dream about visiting the space. The spaceship takes them to the moon……
    How wonderful the night and the dream are!
`;

  render1stFooter = ({ isShowingAll, fold, spread }) => (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#fff"
      }}
    >
      <Text onPress={() => (isShowingAll ? fold() : spread())}>
        {isShowingAll ? "Show less" : "Show more"}
      </Text>
    </View>
  );

  render2ndFooter = ({ isShowingAll, fold, spread }) => (
    <Text
      style={{ color: "blue", alignSelf: "flex-end" }}
      onPress={() => (isShowingAll ? fold() : spread())}
    >
      {isShowingAll ? "Show less" : "Show more"}
    </Text>
  );

  handleManualToggle = () => this.textRef && this.textRef.spread();

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
            style={{ color: "red", fontSize: 16 }}
            limitLines={2}
            renderFooter={this.render1stFooter}
          >
            {this.content}
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
            {this.content}
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
            This is one line, needn't show footer (limitLines={1})
          </ReadMoreText>
        </View>
      </View>
    );
  }
}
```

## 参数说明
名称             |类型    |默认值     |描述
---------------- | ---------------- | ----------------  | ----------------
limitLines    |数字 | 3 | 表示最大显示行数
renderFooter |函数 | 无 | 用于渲染文本展开，或是折叠时不同的底部组件，其回调参数为：`({ isShowingAll, fold, spread }) => React.Element<any>`。<br/>`isShowingAll` : `boolean`，代表文本实时状态，用于渲染不同状态组件<br/>`fold` : `func`，调用后折叠文本<br/>`spread` : `func`，调用后展开文本

## 其他
若需要手动控制折叠和展开状态，可通过 `ref` 引用来实现。如上述示例中的 `this.textRef.spread()`。
