class myDeque {
    #arr
    #size
    #front

    constructor(cap = 8) {
        if (cap < 2) {
            throw new Error("Capacity must be at least 2")
        }

        this.#arr = new Array(cap)
        this.#front = 0
        this.#size = 0
    }

    size() { return this.#size }

    empty() { return this.#size === 0 }

    cap() { return this.#arr.length }

    full() { return this.#size === this.#arr.length }

    clear() {
        this.#arr = new Array(this.#arr.length)
        this.#front = 0
        this.#size = 0
    }

    #mod(i) {
        const cap = this.#arr.length
        return ((i % cap) + cap) % cap
    }

    #index(i) {
        return this.#mod(this.#front + i)
    }

    #resize(newCap = this.#arr.length * 2) {
        const newArr = new Array(newCap)

        for (let i = 0; i < this.#size; i++) {
            newArr[i] = this.#arr[this.#index(i)]
        }

        this.#arr = newArr
        this.#front = 0
    }

    reserve(newCap) {
        if (newCap > this.#arr.length) {
            this.#resize(newCap)
        }
    }

    shrinkToFit() {
        if (this.#size < this.#arr.length) {
            this.#resize(Math.max(2, this.#size))
        }
    }

    pushBack(val) {
        if (this.full()) this.#resize()

        const idx = this.#index(this.#size)
        this.#arr[idx] = val
        this.#size++
    }

    pushFront(val) {
        if (this.full()) this.#resize()

        this.#front = this.#mod(this.#front - 1)
        this.#arr[this.#front] = val
        this.#size++
    }

    popFront() {
        if (this.empty()) throw new Error("Deque is empty")

        const value = this.#arr[this.#front]
        this.#arr[this.#front] = undefined

        this.#front = this.#mod(this.#front + 1)
        this.#size--

        return value
    }

    popBack() {
        if (this.empty()) throw new Error("Deque is empty")

        const idx = this.#index(this.#size - 1)
        const value = this.#arr[idx]
        this.#arr[idx] = undefined

        this.#size--

        return value
    }

    at(i) {
        if (i < 0 || i >= this.#size)
            throw new Error("Index out of range")

        return this.#arr[this.#index(i)]
    }

    front() {
        if (this.empty()) throw new Error("Deque is empty")
        return this.#arr[this.#front]
    }

    back() {
        if (this.empty()) throw new Error("Deque is empty")
        return this.#arr[this.#index(this.#size - 1)]
    }

    rotate(k) {
        if (this.empty()) return

        k = k % this.#size
        this.#front = this.#mod(this.#front - k)
    }


    swap(other) {
        [this.#arr, other.#arr] = [other.#arr, this.#arr]
        [this.#size, other.#size] = [other.#size, this.#size]
        [this.#front, other.#front] = [other.#front, this.#front]
    }

    *[Symbol.iterator]() {
        for (let i = 0; i < this.#size; i++) {
            yield this.#arr[this.#index(i)]
        }
    }

    forEach(callback) {
        for (let i = 0; i < this.#size; i++) {
            callback(this.#arr[this.#index(i)], i)
        }
    }

    map(callback) {
        const result = new myDeque(this.#size || 2)
        for (let i = 0; i < this.#size; i++) {
            result.pushBack(callback(this.#arr[this.#index(i)], i))
        }
        return result
    }

    filter(callback) {
        const result = new myDeque()
        for (let i = 0; i < this.#size; i++) {
            const val = this.#arr[this.#index(i)]
            if (callback(val, i)) {
                result.pushBack(val)
            }
        }
        return result
    }

    toArray() {
        const result = []
        for (let i = 0; i < this.#size; i++) {
            result.push(this.#arr[this.#index(i)])
        }
        return result
    }

    toString() {
        return this.toArray().join(" ")
    }
}