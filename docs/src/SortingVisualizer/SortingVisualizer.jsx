import React from 'react';
import './SortingVisualizer.css';
import {getMergeSortAnimations} from '../SortingAlgorithms.js';
import {getQuickSortAnimations} from '../SortingAlgorithms.js';
import {getHeapSortAnimations} from '../SortingAlgorithms.js';



// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 160;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'teal';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
constructor(props) {
    super(props);

    this.state = {
    array: [],
    };
}

componentDidMount() {
    this.resetArray();
}

resetArray() {
    const array = [];
    // const array = [40, 100, 30, 50, 10];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
        array.push(randomIntFromInterval(5, 730));
    }

    // for (let i = 8; i > 0; i--) {
    //     array.push(i*10);
    // }
    this.setState({array});
}

mergeSort() {
   // We leave it as an exercise to the viewer of this code to implement this method.
   const animations = getMergeSortAnimations(this.state.array);
   console.log(animations);
   for (let i = 0; i < animations.length; i++) {
       const arrayBars = document.getElementsByClassName('array-bar');
       const isColorChange = i % 3 !== 2;
       if (isColorChange) {
           const [barOneIdx, barTwoIdx] = animations[i];
           const barOneStyle = arrayBars[barOneIdx].style;
           const barTwoStyle = arrayBars[barTwoIdx].style;
           const color = (i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR);
           setTimeout(() => {
               barOneStyle.backgroundColor = color;
               barTwoStyle.backgroundColor = color;
               }, i * ANIMATION_SPEED_MS);
       } else {
           setTimeout(() => {
           const [barOneIdx, newHeight] = animations[i];
           const barOneStyle = arrayBars[barOneIdx].style;
           barOneStyle.height = `${newHeight}px`;
           }, i * ANIMATION_SPEED_MS);
       }
   }
}

quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const [barOneIdx, barTwoIdx, flag1, flag2] = animations[i];
        const go = flag1 === true;
        if (!go) {
            const [barOneIdx, barTwoIdx, flag1, flag2] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = (flag2 === true ? PRIMARY_COLOR : SECONDARY_COLOR);
            setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
        } else {
            setTimeout(() => {
            const [barOneIdx, newHeight, flag] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
        }
    }
}

heapSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
    const animations = getHeapSortAnimations(this.state.array);
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const [barOneIdx, barTwoIdx, flag1, flag2] = animations[i];
        const go = flag1 === true;
        if (!go) {
            const [barOneIdx, barTwoIdx, flag1, flag2] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = (flag2 === true ? PRIMARY_COLOR : SECONDARY_COLOR);
            setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
        } else {
            setTimeout(() => {
            const [barOneIdx, newHeight, flag] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
        }
    }
}

bubbleSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
}

// NOTE: This method will only work if your sorting algorithms actually return
// the sorted arrays; if they return the animations (as they currently do), then
// this method will be broken.
// test() {
//     for (let i = 0; i < 50; i++) {
//     const array = [];
//     const length = randomIntFromInterval(1, 1000);
//     for (let i = 0; i < length; i++) {
//         array.push(randomIntFromInterval(-1000, 1000));
//     }
//     const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
//     // const mergeSortedArray = getMergeSortAnimations(array.slice());
//     const quickSortedArray = getQuickSortAnimations(array.slice());
//     // const heapSortedArray = getHeapSortAnimations(array.slice());
//     // const bubbleSortedArray = getBubbleSortAnimations(array.slice());
//     console.log(arraysAreEqual(javaScriptSortedArray, quickSortedArray));
//     }
// }

render() {
    const {array} = this.state;

    return (
    <div className="array-container">
        {array.map((value, idx) => (
        <div
            className="array-bar"
            key={idx}
            style={{
            backgroundColor: PRIMARY_COLOR,
            height: `${value}px`,
            }}></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        {/* <button onClick={() => this.test()}>
        Test Sorting Algorithms (BROKEN)
        </button> */}
    </div>
    );
}
}

function randomIntFromInterval(min, max) {
// min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length){
        return false;
    }
    for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]) {
            return false;
        }
    }
    return true;
}