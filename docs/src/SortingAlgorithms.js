// export const mergeSort = array => {
//     if(array.length === 1){
//         return array;
//     }

//     const midIndex = Math.floor(array.length / 2);
//     const firstHalf = mergeSort(array.slice(0, midIndex));
//     const secondHalf = mergeSort(array.slice(midIndex));
//     const sortedArray = [];

//     let i = 0;
//     let j = 0;

//     while(i < firstHalf.length && j < secondHalf.length){
//         if(firstHalf[i] < secondHalf[j]){
//             sortedArray.push(firstHalf[i++]);
//         }else{
//             sortedArray.push(secondHalf[j++]);
//         }
//     }

//     while(i < firstHalf.length){
//         sortedArray.push(firstHalf[i++]);
//     }
//     while(j < secondHalf.length){
//         sortedArray.push(secondHalf[j++]);
//     }
//     return sortedArray;
// };

export function getBubbleSortAnimations(array){
    let animations = [];
    let n = array.length; 
    for (let i = 0; i < n-1; i++){ 
        for (let j = 0; j < n-i-1; j++){
            animations.push([j, j+1, false, false]);
            animations.push([j, j+1, false, true]);
            if (array[j] > array[j+1]) 
            { 
                animations.push([j, j+1, true, true]);
                animations.push([j, j+1, true, true]);
                swap(array, j, j + 1);
            } 
        }
    }
    return animations;      
}

export function getHeapSortAnimations(array){
    let animations = [];
    if (array.length <= 1){
        return array;
    } 
    getHeapSortHelper(array,animations);
    console.log(array);
    return animations;
}

function getHeapSortHelper(mainArray, animations){
    let n = mainArray.length;
    //Build Heap
    for(let i = Math.floor(n / 2) -1; i >= 0; i--){
        heapify(mainArray, n, i, animations);
    }
    // One by one extract an element from heap 
    for(let j = n-1; j >= 0; j--){
        animations.push([0, mainArray[j], true, true]);
        animations.push([j, mainArray[0], true, true]);
        swap(mainArray, 0, j );
        heapify(mainArray, j,  0, animations);
    }
}

function heapify(mainArray, n, i, animations){
    let largest = i; // Initialize largest as root 
    let l = 2*i + 1; // left = 2*i + 1 
    let r = 2*i + 2; // right = 2*i + 2 

    if(l < mainArray.length){
        animations.push([largest, l, false, false]);
        animations.push([largest, l, false, true]);
    }
    // If left child is larger than root 
    if (l < n && mainArray[l] > mainArray[largest]) {
        largest = l; 
    }

    if(r < mainArray.length){   
        animations.push([largest, r, false, false]);
        animations.push([largest, r, false, true]);
    }
    // If right child is larger than largest so far 
    if (r < n && mainArray[r] > mainArray[largest]){
        largest = r; 
    }   
    // If largest is not root 
    if (largest != i){ 
        animations.push([i, mainArray[largest], true, true]);
        animations.push([largest, mainArray[i], true, true]);
        swap(mainArray, i, largest);
        // Recursively heapify the affected sub-tree 
        heapify(mainArray, n, largest, animations); 
    } 
}

export function getQuickSortAnimations(array){
    let animations = [];
    if (array.length <= 1){
        return array;
    } 
    getQuickSortHelper(array, 0, array.length - 1, animations);
    console.log(array);
    return animations;
}

function getQuickSortHelper(mainArray, low, high, animations){
    if(low < high){
        let pi = partition(mainArray, low, high, animations);
        console.log(pi);
        getQuickSortHelper(mainArray, low, pi-1, animations); 
        getQuickSortHelper(mainArray, pi+1, high, animations); 
    }
}

function partition(mainArray, low, high, animations){
    let pivot = mainArray[high];
    let i = low - 1;
    let j = low;

    for(j = low; j < high; j ++){
        animations.push([j,high, false, false]);
        animations.push([j,high, false, true]);
        if(mainArray[j] < pivot){
            i++;
            animations.push([i, mainArray[j], true, true]);
            animations.push([j, mainArray[i], true, true]);
            swap(mainArray, i, j)
        }
    }
    animations.push([i+1, mainArray[high], true, true]);
    animations.push([high, mainArray[i+1], true, true]);
    swap(mainArray, i+1, high)

    return i + 1;
}

function swap(array, x , y){
    // animations.push([x, high, false, false]);
    // animations.push([x, high, false, true]);
    // animations.push([x, array[y], true, true]);
    // animations.push([y, array[x], true, true]);
    let temp = array[x];
    array[x] = array[y];
    array[y] = temp;
}

export function getMergeSortAnimations(array) {
    let animations = [];
    if (array.length <= 1){
        return array;
    } 
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
    if (startIdx === endIdx){
        return;
    }
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;

    while (i <= middleIdx && j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, j]);

        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // We overwrite the value at index k in the original array with the
            // value at index i in the auxiliary array.
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k] = auxiliaryArray[i];
            k++;
            i++;
        } else {
            // We overwrite the value at index k in the original array with the
            // value at index j in the auxiliary array.
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k] = auxiliaryArray[j];
            k++;
            j++;
        }
    }
    while (i <= middleIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, i]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, i]);
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k] = auxiliaryArray[i];
        k++;
        i++;
    }
    while (j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([j, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([j, j]);
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k] = auxiliaryArray[j];
        k++;
        j++;
    }
}