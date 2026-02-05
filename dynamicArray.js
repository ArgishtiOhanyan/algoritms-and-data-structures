class DArray {
    #size = 0;
    #capacity = 0;
    #arr = null;
    static CAP_EXPONENT = 2;

    constructor(initialCapacity) {
        if (!(Number.isInteger(initialCapacity) && initialCapacity > 0)) {
            throw new TypeError('initialCapacity must be a positive integer');
        }

        this.#capacity = initialCapacity;
        this.#arr = new Uint32Array(initialCapacity);
    }

    resize(newCapacity, fill = 0) {
        const tmp = new Uint32Array(newCapacity);

        for (let i = 0; i < this.#size; ++i) {
            tmp[i] = this.#arr[i];
        }

        for (let i = this.#size; i < newCapacity; ++i) {
            tmp[i] = fill;
        }

        this.#capacity = newCapacity;
        this.#arr = tmp;
    }

    push_back(elem) {
        if (this.#size === this.#capacity) {
            this.resize(this.#capacity * DArray.CAP_EXPONENT);
        }

        this.#arr[this.#size++] = elem;
    }

    pop_back() {
        if (this.#size === 0) {
            return;
        }
        --this.#size;
    }

    erase(index) {
        if (index < 0 || index >= this.#size) {
            throw new Error('Index out of range:');
        }

        for (let i = index; i < this.#size - 1; ++i) {
            this.#arr[i] = this.#arr[i + 1];
        }

        --this.#size;
    }

    at(index) {
        if (index < 0 || index >= this.#size) {
            throw new Error('Index out of range');
        }

        return this.#arr[index];
    }

    empty() {
        return this.#size === 0;
    }

    clear() {
        this.#size = 0;
    }

    setValue(i, value) {
        if (i >= 0 && i < this.#size) {
            this.#arr[i] = value;
        }
    }

    front() {
        return this.#arr[0];
    }

    back() {
        return this.#arr[this.#size - 1];
    }

    capacity() {
        return this.#capacity;
    }

    [Symbol.iterator]() {
        const collection = this.#arr;
        const collection_length = this.#size;
        let index = 0;

        return {

            next() {
                if (index < collection_length) {

                    return {
                        value: collection[index++],
                        done: false,
                    };

                }

                return { value: undefined, done: true };
            },
            [Symbol.iterator]() {
                return this;
            }
        };
    }
    reserve(n) {
        if (n > this.#capacity) {
            this.resize(n);

        }
    }

    shrinkToFit() {
        this.resize(this.#size);
    }

    toArray() {
        let res = [];
        for (let i = 0; i < this.#size; ++i) {
            res[i] = this.#arr[i];
        }

        return res;
    }

    insert(pos, value) {
        if (pos > this.#size || pos < 0) {
            throw new Error('Position out of range:');
        } else if (this.#size === this.#capacity) {
            this.resize(DArray.CAP_EXPONENT * this.#capacity);
        }

        ++this.#size;

        for (let i = this.#size - 1; i > pos; --i) {
            this.#arr[i] = this.#arr[i - 1];
        }
        this.#arr[pos] = value;
    }

    swap(i, j) {
        if (i < 0 || j < 0 || i >= this.#size || j >= this.#size) {
            throw new RangeError('Index out of range');
        }
        if (i === j) return;
        const temp = this.#arr[i];
        this.#arr[i] = this.#arr[j];
        this.#arr[j] = temp;
    }


    values() {
        const val = this.#arr;
        const size = this.#size;
        let index = 0;

        return {

            next() {
                if (index < size) {
                    return {
                        value: val[index++], done: false,
                    }
                };

                return {
                    value: undefined, done: true,
                };

            },

            [Symbol.iterator]() {
                return this;
            }

        }
    }

    keys() {
        const size = this.#size;
        let index = 0;

        return {
            next() {
                if (index < size) {
                    return {
                        value: index++, done: false,
                    }
                }

                return {
                    value: undefined, done: true,
                }
            },

            [Symbol.iterator]() {
                return this;
            }
        }
    }

    entries() {
        const collection = this.#arr;
        const size = this.#size;
        let index = 0;

        return {

            next() {
                if (index < size) {
                    return {
                        value: [index, collection[index++]], done: false,
                    }
                }

                return {
                    value: undefined, done: true,
                };

            },

            [Symbol.iterator]() {
                return this;
            }
        }
    }
    forEach(callback, thisArg) {
        if (typeof callback !== "function") {
            throw new TypeError(callback + " is not a function");
        }

        for (let i = 0; i < this.#size; i++) {
            callback.call(thisArg, this.#arr[i], i, this);
        }
    }

    map(callback, thisArg) {
        const result = new DArray(this.#size || 2);

        for (let i = 0; i < this.#size; i++) {
            result.push_back(callback.call(thisArg, this.#arr[i], i, this));
        }

        return result;
    }

    filter(callback, thisArg) {
        const result = new DArray(2);

        for (let i = 0; i < this.#size; i++) {
            if (callback.call(thisArg, this.#arr[i], i, this)) {
                result.push_back(this.#arr[i]);
            }
        }
        return result;
    }

    reduce(callback, initialValue) {
        if (this.#size === 0 && initialValue === undefined) {
            throw new TypeError("Reduce of empty array with no initial value");
        }

        let acc, start;

        if (initialValue !== undefined) {
            acc = initialValue;
            start = 0;
        } else {
            acc = this.#arr[0];
            start = 1;
        }

        for (let i = start; i < this.#size; i++) {
            acc = callback(acc, this.#arr[i], i, this);
        }

        return acc;
    }

    some(callback, thisArg) {
        for (let i = 0; i < this.#size; i++) {
            if (callback.call(thisArg, this.#arr[i], i, this)) return true;
        }

        return false;
    }

    every(callback, thisArg) {
        for (let i = 0; i < this.#size; i++) {
            if (!callback.call(thisArg, this.#arr[i], i, this)) return false;
        }

        return true;
    }

    find(callback, thisArg) {
        for (let i = 0; i < this.#size; i++) {
            if (callback.call(thisArg, this.#arr[i], i, this)) return this.#arr[i];
        }

        return undefined;
    }

    findIndex(callback, thisArg) {
        for (let i = 0; i < this.#size; i++) {
            if (callback.call(thisArg, this.#arr[i], i, this)) return i;
        }

        return -1;
    }

    includes(value) {
        for (let i = 0; i < this.#size; i++) {
            if (this.#arr[i] === value) return true;
        }
        return false;
    }

}

const da = new DArray(2);
console.log(da.capacity()); // 2
da.push_back(10);
console.log(da.front()); // 10
console.log(da.back()); // 10
da.push_back(20);
da.push_back(30);

console.log(da.front()); // 10
console.log(da.back()); // 30
console.log(da.capacity()); // 6
console.log(da.toArray()); // [10, 20, 30]