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
简单示例：
```javascript
<ReadMoreText
  limitLines={2}
  renderFooter={this.renderFooter}
>
  {this.content}
</ReadMoreText>

// render footer
renderFooter = ({ isShowingAll, fold, spread }) => (
  <Text
    style={{ color: "blue", alignSelf: "flex-end" }}
    onPress={() => (isShowingAll ? fold() : spread())}
  >
    {isShowingAll ? "Show less" : "Show more"}
  </Text>
);
```
`renderFooter` 接收一个带有参数的函数，该参数将包含以下属性：`isShowingAll`、`fold` 和 `spread`。`isShowingAll` 代表当前组件是否展开，可用于控制渲染不同状态下的UI；`fold` 和 `spread` 分别用于控制组件折叠、展开操作，按需调用。

当最终文本内容的行数与设置的最大行数相等时，将不显示 `footer`，如以下情况：
```javascript
<ReadMoreText limitLines={1} renderFooter={this.renderFooter}>
  This is one line, need not show footer
</ReadMoreText>

// 文本内容搞好一行，与 limitLines 相等，将不显示 footer
renderFooter = () => <View />
```

另可通过 `ref` 引用主动控制组件折叠和展开：
```javascript
<TouchableOpacity
  activeOpacity={0.8}
  style={{ backgroundColor: "rgba(1,1,1,0.1)", padding: 10 }}
  onPress={this.handleManualToggle}
>
  <ReadMoreText
    ref={r => (this.textRef = r)}
    style={{ color: "red", fontSize: 16 }}
    limitLines={2}
    renderFooter={this.renderFooter}
  >
    {this.content}
  </ReadMoreText>
</TouchableOpacity>

// click event
handleManualToggle = () => this.textRef && this.textRef.spread();

// render footer
renderFooter = ({ isShowingAll, fold, spread }) => <View />
```

完整示例见 [example](https://github.com/ljunb/rn-read-more-text/blob/master/example/App.js)。

## 参数说明
名称|类型|默认值|描述
---|---|---|---
limitLines|数字|3|表示最大显示行数
renderFooter|函数|无|用于渲染文本展开，或是折叠时不同的底部组件，其回调参数为：`({ isShowingAll, fold, spread }) => React.Element<any>`。<br/><br/>`isShowingAll` : `boolean`，代表文本实时状态，用于渲染不同状态组件<br/>`fold` : `func`，调用后折叠文本<br/>`spread` : `func`，调用后展开文本
