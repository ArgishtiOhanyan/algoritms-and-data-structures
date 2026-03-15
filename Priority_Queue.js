class Priority_Queue {
    #heap
    #cmp
    #size

    #min_heap
    #max_heap

    constructor(cmp = (a, b) => a - b) {
        if (typeof cmp !== "function") {
            throw new Error("Comparator must be a function")
        }
        this.#cmp = cmp

        this.#heap = []

        this.#size = 0

        if (cmp(1, 2) <= 0) {
            this.#min_heap = true
            this.#max_heap = false
        } else {
            this.#min_heap = false
            this.#max_heap = true
        }
    }
    size(){
        return this.#size
    }

    is_empty(){
        return this.#size === 0
    }

    clear(){
        this.#heap = []
        this.#size = 0
    }

    comparator(){
        return this.#cmp
    }

    peek(){
        if(this.is_empty()) return undefined
        return this.#heap[0] 
    }

    add(value) {
        this.#heap.push(value)

        this.#size++     
        let index = this.#size - 1

        if (this.#min_heap) {
            this.#shift_up_for_min_heap(index)
        } else {
            this.#shift_up_for_max_heap(index)
        }
    }

    #shift_up_for_min_heap(index) {
        while (index > 0) {
            let parent = this.#get_parent(index)
            
            if (this.#heap[index] < this.#heap[parent]) {
                this.#swap(index, parent)
                index = parent
            }
            else {
                break
            }
        }
    }
    
    #swap(i,j){
        [this.#heap[i],this.#heap[j]] = [this.#heap[j],this.#heap[i]]
    }

    #get_parent(index){
        return Math.floor((index - 1) / 2)
    }

    pop() {

        if (this.is_empty()) return undefined

        const root = this.#heap[0]

        this.#swap(0, this.#size - 1)

        this.#heap.pop()

        this.#size--

        if (this.#min_heap) {
            this.#shift_down_for_min_heap(0)
        } else {
            this.#shift_down_for_max_heap(0)
        }
        return root
    }

    #get_left_child(i) {
        return 2 * i + 1
    }

    #get_right_child(i) {
        return 2 * i + 2
    }

    #shift_down_for_min_heap(index) {

        while (true) {

            let left = this.#get_left_child(index)
            let right = this.#get_right_child(index)

            let smallest = index

            if (left < this.#size &&
                this.#heap[left] < this.#heap[smallest]) {
                smallest = left
            }

            if (right < this.#size &&
                this.#heap[right] < this.#heap[smallest]) {
                smallest = right
            }

            if (smallest === index) break

            this.#swap(index, smallest)

            index = smallest
        }
    }

    #shift_up_for_max_heap(index) {

        while (index > 0) {

            let parent = this.#get_parent(index)

            if (this.#heap[index] > this.#heap[parent]) {
                this.#swap(index, parent)
                index = parent
            } else {
                break
            }
        }
    }

    #shift_down_for_max_heap(index) {

        while (true) {

            let left = this.#get_left_child(index)
            let right = this.#get_right_child(index)

            let largest = index

            if (left < this.#size && this.#heap[left] > this.#heap[largest]) 
            {
                largest = left
            }

            if (right < this.#size && this.#heap[right] > this.#heap[largest]) 
            {
                largest = right
            }

            if (largest === index) break

            this.#swap(index, largest)

            index = largest
        }
    }
    
    toArray() {
        return [...this.#heap]
    }

    contains(value) {
        return this.#indexOf(value) !== -1
    }

    #indexOf(value) {

        for (let i = 0; i < this.#size; i++) {
            if (this.#heap[i] === value) {
                return i
            }
        }

        return -1
    }

    remove(value) {

        let index = this.#indexOf(value)

        if (index === -1) return

        this.#swap(index, this.#size - 1)

        this.#heap.pop()

        this.#size--

        if (index < this.#size) {

            if (this.#min_heap) {
                this.#shift_up_for_min_heap(index)
                this.#shift_down_for_min_heap(index)
            } else {
                this.#shift_up_for_max_heap(index)
                this.#shift_down_for_max_heap(index)
            }

        }
    }

    heapify(array) {
        if (!Array.isArray(array)) throw new Error("Argument must be array")

        this.#heap = array.slice()
        this.#size = array.length

        let start = Math.floor(this.#size / 2) - 1

        for (let i = start; i >= 0; i--) {
            if (this.#min_heap) {
                this.#shift_down_for_min_heap(i)
            } else {
                this.#shift_down_for_max_heap(i)
            }
        }
    }
    
    [Symbol.iterator]() { 
        return this.#heap[Symbol.iterator]() 
    }
    
    values() {
        return this.#heap.values() 
    }
    
    entries() { 
        return this.#heap.entries() 
    }
}