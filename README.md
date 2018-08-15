# simply-chart

The simply-chart is a canvas chart lib without fancy style.It only create the chart with number tendency. **It means the number from 0 to 100 and 0 to 1000 will be same in the simply-chart.**

## Installation

```js
npm install --save simply-chart
```

## Usage

```js
import Chart from 'simply-chart';

const basicConifg = {
    base: {
        width: 200,
        height: 100,
        renderType: 'none',
        renderTime: 200 / 60,
        framePerSecond: 60,
    },
    attr: {
        lineWidth: 2,
    },
};

// line chart
const chart = new Chart.line({
    ...basicConifg,
    base: {
        dom: document.getElementById('test'),
        renderType: 'point',
    },
});
chart.update([1, 2.5, 3, 2.5, 1]).render();
```

## Chart Support

The characteristics of simply-chart is simply, so it only support the simply chart syle now.

-   line
    ![line](https://ws4.sinaimg.cn/large/006tNbRwly1fuapqjsia1j305p034jra.jpg)
-   bar
    ![bar](https://ws3.sinaimg.cn/large/006tNbRwly1fuapq53bvgj305s036wed.jpg)

## API

- Chart.line(class Line)

  - ```constructor(conifg: IConfig)```

  - methods:

    - ```update(data: number[]): Line```
      update the data in chart.
    - ```render(): Line```
      render chart.

  - Config: 

    ```js
    interface IConfig {
        base: BaseConfig;
        attr: LineConfig;
    }
    ```

- Chart.bar

  - ```constructor(conifg: IConfig)```

  - methods:

    - ```update(data: number[]): Line```
      update the data in chart.
    - ```render(): Line```
      render chart.

  - Config: 

    ```Js
    interface IConfig {
        base: BaseConfig;
        attr: BarConfig;
    }
    ```





- Config

  - BaseConfig

    | key             | type                                     | default     | explain                                  |
    | --------------- | ---------------------------------------- | ----------- | ---------------------------------------- |
    | dom             | string(dom selector) \| HTMLElement      |             | canvas init dom.                         |
    | width?          | nubmer                                   | 200         | canvas width.                            |
    | height?         | number                                   | 200         | canvas height.                           |
    | renderType?     | string(enums) ['none', 'total', 'point'] | none        | canvas animation type.<br />none: no animation<br />point: animation in point to point<br />total: animation in total line. |
    | renderTime?     | number                                   | 2           | animation time.                          |
    | renderCurve?    | string                                   | ease-in-out | canvas animation bezier-curve. could be a string or point string. Etc: '.68,0 ,1, 1'. |
    | framePerSecond? | number                                   | 60          | canvas animation frame in 1 second.      |

  - LineConfig

    | key        | type   | default | explain    |
    | ---------- | ------ | ------- | ---------- |
    | color?     | string | 'blue'  | line color |
    | lineWidth? | number | 5       | line width |

  - BarConfig

    | key        | type     | Default                                  | explain                                  |
    | ---------- | -------- | ---------------------------------------- | ---------------------------------------- |
    | barWdith?  | number   | computed width width and data number.    | each bar width.                          |
    | barRadius? | number   | 5                                        | border-radius at top.                    |
    | colors?    | string[] | ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple'] | color for each bar,(The length must more than the data length) |

    ​