function bubbleSort(arr){
for(let i = 0; i < arr.length; ++i){
    let flag = false
    for(let j = 0; j < arr.length - 1 - i; ++j){
        if(arr[j] > arr[j + 1]){
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            flag = true
        }
    }
    if(!flag) break;
}
}

function selectionSort(arr){
    let n = arr.length
    for(let i = 0; i < n - 1; ++i){
        let minIndex = i
        for(let j = i + 1; j < n; ++j){
            if(arr[minIndex] > arr[j]){
                minIndex = j
            }
        }
        let tmp = arr[minIndex]
        arr[minIndex] = arr[i]
        arr[i] = tmp
    }
}

function insertionSort(arr){
    let n = arr.length
    for(let i = 1; i < n; ++i){
        let key = arr[i]
        let j = i - 1
    while(j >= 0 && arr[j] > key){
            arr[j + 1] = arr[j]
            --j
        }
        arr[j + 1] = key
    }
}

function insertionSort2(arr) {
    let n = arr.length
    for (let i = 1; i < n; ++i) {
        let key = arr[i]
        let j = i - 1
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j]
            arr[j] = key
            --j
        }
    }
    return arr
}

function countingSort(arr){
    let res = []
    let max = Math.max(...arr)
    let arr1 = new Array(max + 1).fill(0)
    for(let i = 0; i < arr.length; ++i){
        arr1[arr[i]]++
    }
    for(let i = 0; i < arr1.length; ++i){
        while(arr1[i] > 0){
            res.push(i)
            --arr1[i]
        }
    }
    return res;
}

function cumulativecountingSort(arr){
    let max = Math.max(...arr)
    let min = Math.min(...arr)
    let range = max - min + 1
    let count = new Array(range).fill(0)
    let output = new Array(arr.length)

    for(let i = 0; i < arr.length; ++i){
        count[arr[i] - min]++
    }
    for(let i = 1; i < count.length; ++i){
        count[i] += count[i - 1]
    }
    for(let i = arr.length - 1; i >= 0; --i){
        let index = arr[i] - min
        let position = count[index] - 1
        output[position] = arr[i]
        count[index]--
    }
    return output
}

function margeSort(arr){
    let mid = Math.floor(arr.length / 2)
    if(arr.length < 2) return arr
    const left = margeSort(arr.slice(0 , mid))
    const right = margeSort(arr.slice(mid))
    return margehelper(left,right)
}
function margehelper(left,right){
    let res = []
    let i = 0
    let j = 0
    while(i < left.length && j < right.length){
        if(left[i] > right[j]){
            res.push(right[j++])
        }else{
            res.push(left[i++])
        }
    }
    while(i < left.length){
        res.push(left[i++])
    }
    while(j < right.length){
        res.push(right[j++])
    }
    return res
}

function quickSortlastPivot(arr,p = 0,r = arr.length - 1){
    if(p < r){
        let q = helperquick(arr,p,r)
        quickSortlastPivot(arr,p, q - 1)
        quickSortlastPivot(arr,q + 1, r)
    }
    return arr
}

function helperquick(arr,p,r){
    let x = arr[r]
    let i = p - 1
    for(let j = p; j <= r - 1; j++){
        if(arr[j] <= x){
            i++
            [arr[i], arr[j]] = [arr[j], arr[i]]
        }
    }
    [arr[i + 1],arr[r]] = [arr[r],arr[i + 1]]
    return i + 1
}
