## 主要解决的问题

大屏适配主要是解决屏幕尺寸比和设计稿尺寸比不一致的问题，采用的方法是：`scale`

虽然这种方案并不完美，但也是目前比较好的解决方案

在使用 `scale` 缩放时，主要有 3 个问题

1. 地图上的点位会出现偏移/点击位置不准
2. 使用到 `overflow: scroll` 的地方，文本可能会出现模糊
3. 在使用第三方组件时，比如下拉框等不会缩放

## 使用

1. 安装

```bash
npm i adaptorjs
# 或
yarn add adaptorjs
# 或
pnpm i adaptorjs
```

2. 引入

```ts
import Adaptor from "adaptorjs";
```

3. 快速使用

```ts
const adaptor = new Adaptor({
  designHeight: 1080,
  designWidth: 1920,
  querySelector: "#app",
  extraSelectors: [".xxx"],
});
```

### 注意事项

要在 `dom` 加载完成后再初始化

1. `react` 中使用

```ts
useEffect(() => {
  const adaptor = new Adaptor({
    designHeight: 1080,
    designWidth: 1920,
    querySelector: "#app",
    extraSelectors: [".xxx"],
  });
  return () => {
    adaptor.destroy();
  };
}, []);
```

2. `vue` 中使用

```ts
let adaptor;
onMounted(() => {
  adaptor = new Adaptor({
    designHeight: 1080,
    designWidth: 1920,
    querySelector: "#app",
    extraSelectors: [".xxx"],
  });
});

onUnmounted(() => {
  adaptor.destroy();
});
```

3. 参数说明

```ts
querySelector: string // 大屏根选择器，必选
extraQuerySelectors?: string[]; // 需要额外缩放的 dom 选择器，可选
designWidth?: number; // 设计稿宽度，可选，默认 1920
designHeight?: number; // 设计稿高度，可选，默认 1080
type?: ScaleType; // 缩放类型，可选，默认 scale
```

### 最终实现效果

![Jietu20230530-200728-HD.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9555be058447421da9588463b1aef2e4~tplv-k3u1fbpfcp-watermark.image?)

## 开发计划

目前只提供了方案一的实现，后续会提供方案二、方案三的实现
