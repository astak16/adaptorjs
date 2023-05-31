export enum ScaleType {
  scale,
  matrix,
}

class Adaptor {
  // 默认 designWidth = 1920, designHeight = 1080
  private designWidth: number = 1920;
  private designHeight: number = 1080;
  private dom: HTMLElement | null = null;
  // 默认 scale，可选 matrix
  private type: ScaleType | null = null;
  private pageScale = {
    scale: 1,
    x: 1,
    y: 1,
  };
  private observerDoms: Element[] = [];
  private extraQuerySelectors: string[] | null = null;
  private observer: MutationObserver | null = null;

  constructor(options: {
    querySelector: string;
    extraQuerySelectors?: string[];
    designWidth?: number;
    designHeight?: number;
    type?: ScaleType;
  }) {
    const dom = this.findQuerySelector(options.querySelector);
    if (!dom) {
      console.error(
        `error: querySelector ${options.querySelector} is not exist`
      );
      return;
    }
    this.designWidth = options.designWidth || 1920;
    this.designHeight = options.designHeight || 1080;
    this.dom = dom;
    this.type = options.type || ScaleType.scale;
    this.extraQuerySelectors = options.extraQuerySelectors || null;
    this.init();
  }
  private init() {
    this.onResize();
    this.extraQuerySelectors && this.observerDom(this.extraQuerySelectors);
    window.onresize = () => this.onResize();
  }
  destroy() {
    window.onresize = null;
    this.observer?.disconnect();
  }
  private findQuerySelector(id: string) {
    return document.querySelector(id) as HTMLElement | null;
  }
  private observerDom = (querySelectors: string[]) => {
    const observer = new MutationObserver((e) => {
      e.map((mutation) => {
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const dom = mutation.addedNodes[i] as HTMLElement;
          const matchesDom = dom.querySelector(querySelectors.join(","));
          if (matchesDom) {
            this.observerDoms.push(matchesDom);
            this.observerDomScaleFn();
          }
        }
      });
    });
    observer.observe(document.body, { childList: true });
    this.observer = observer;
  };
  private onResize = () => {
    const realWidth = window.document.body.clientWidth;
    const realHeight = window.document.body.clientHeight;
    const designScreenRatio = this.designWidth / this.designHeight;
    const realScreenRatio = realWidth / realHeight;
    if (realScreenRatio > designScreenRatio) {
      // 实际画面更宽
      this.pageScale = {
        scale: realHeight / this.designHeight,
        y: realHeight / this.designHeight,
        x: realWidth / this.designWidth,
      };
    } else {
      // 实际画面更窄
      this.pageScale = {
        scale: realWidth / this.designWidth,
        y: realHeight / this.designHeight,
        x: realWidth / this.designWidth,
      };
    }
    this.scaleFn(this.dom as HTMLElement);
    this.observerDomScaleFn();
  };
  private scaleFn = (dom: HTMLElement) => {
    const transform =
      this.type === ScaleType.scale
        ? `scale(${this.pageScale.x}, ${this.pageScale.y}) !important`
        : `matrix(${this.pageScale.x}, 0, 0, ${this.pageScale.y}, 0, 0) !important`;
    dom.style.cssText = `
      transform: ${transform};
      transform-origin: 0 0;
    `;
  };
  private observerDomScaleFn = () => {
    this.observerDoms.map((dom) => {
      if (dom instanceof HTMLElement) {
        this.scaleFn(dom);
      }
    });
  };
}
export default Adaptor;
