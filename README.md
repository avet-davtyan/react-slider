# React Slider Component

### Slider Props

| Prop                | Value                                                                                                                                        |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| predefinedPositions | number[], An optional array of positions to display on the slider, given as percentages. Example: [10, 30, 50, 70, 90]                       |
| minValue            | number, The minimum value of the slider range. Default is 0                                                                                  |
| maxValue            | number, The maximum value of the slider range. Default is 100                                                                                |
| initialValue        | number The initial value of the slider when it first renders. Must be between minValue and maxValue                                          |
| onChange            | (index: number) => void, Optional callback function that is called when the slider value changes. Receives the current index as a parameter. |

### Usage

```jsx
<Slider
    initialValue={40}
    minValue={20}
    maxValue={70}
    predefinedPositions={[30, 50]}
    onChange={(index) => {
        console.log(index);
    }}
/>
```
