class Node{
    #value
    #next = null
    
    constructor(value = 0){
        this.#value = value
        this.#next = null
    }

    get value(){
        return this.#value
    }

    set value(val){
        return this.#value = val
    }

    get next(){
        return this.#next 
    }

    set next(new_done){
        if(new_done != null && !(new_done instanceof Node)){
            throw new Error("next must be a Node or null")
        }
        this.#next = new_done
    }
}

class SinglyList{
    #head
    #size
    constructor(value){
        this.#head = value ? new Node(value) : null
        this.#size = value ? 1 : 0
    }

    size(){
        return this.#size
    }

    isEmpty(){
        return this.#size === 0
    }

    clear(){
        this.#head = null
        this.#size = 0
    }

    front(){
        if(!this.#head) return undefined
        return this.#head.value
    }

    push_front(val){
        const newNode = new Node(val)
        newNode = this.#head
        this.#head = newNode
        this.#size++
    }

    push_back(val){
        const newNode = new Node(val)
        if(this.#head === null){ 
            this.#head = newNode  
            this.#size ++
            return
        }
        
        let current = this.#head
        while(current.next !== null){
            current = current.next
        }
        current.next = newNode
        return this.#size++
    }

    pop_front(){
        if(this.#head == null){
            throw new Error("list is empty")
    }
        let current = this.#head.value
        this.#head = this.#head.next
        this.#size--
        return current
    }

    pop_back() {
        if (this.#head === null) {
            throw new Error("list is empty")
        }

        if (this.#head.next === null) {
            const value = this.#head.value
            this.#head = null
            this.#size--
            return value
        }
        
        let current = this.#head
        while (current.next.next !== null) {
            current = current.next
        }

        const value = current.next.value
        current.next = null
        this.#size--
        return value
    }
    
    at(index){
        if(index < 0 || index >= this.#size){
            throw new Error("You passed the wrong index")
        }
        let current = this.#head
        let count = 0
        while(count < index){
            current = current.next
            ++count
        }
        return current.value
    }

    insert(index, val) {
        if (index < 0 || index > this.#size) {
            throw new Error("You passed the wrong index")
        }

        if (index === 0) {
            this.push_front(val)
            return
        }

        if (index === this.#size) {
            this.push_back(val)
            return
        }

        const newNode = new Node(val)

        let current = this.#head
        let count = 0
        while (count < index - 1) {
            current = current.next
            count++
        }
        
        newNode.next = current.next
        current.next = newNode

        this.#size++
    }

    erase(index){
        if(index < 0 || index >= this.#size){
            throw new Error("You passed the wrong index")
        }
        if(index === 0){
            return this.pop_front()
        }
        if(index === this.#size - 1){
            return this.pop_back()
        }

        let current = this.#head
        let count = 0
        while (count < index - 1) {
            current = current.next
            count++
        }

        const value = current.next.value
        current.next = current.next.next

        this.#size--
        return value
    }
    
    remove(value) {
        let count = 0

        while (this.#head !== null && this.#head.value === value) {
            this.#head = this.#head.next
            this.#size--
            count++
        }

        let current = this.#head

        while (current !== null && current.next !== null) {
            if (current.next.value === value) {
                current.next = current.next.next
                this.#size--
                count++
            } else {
                current = current.next
            }
        }

        return count
    }
    reverse(){
        let current = this.#head
        let next = null
        let prev = null

        while(current){
            next = current.next
            current.next = prew
            prev = current
            current = next
        }
        this.#head = prev
    }
    
    toArray(){
        let arr = []
        let current = this.#head
        while(current){
            arr.push(current.value)
            current = current.next
        }
        return arr
    }
    static fromArray(arr){
        let list = new SinglyList()
        for(let i = 0; i < arr.length; ++i){
            list.push_back(arr[i])
        }
        return list
    }
    
    [Symbol.iterator]() {
        let current = this.#head

        return {
            next() {
                if (current) {
                    let value = current.value
                    current = current.next
                    return { value: value, done: false }
                } else {
                    return { done: true }
                }
            }
        }
    }
    
    sort(cmp = (a, b) => a - b) {
        this.#head = this.#mergeSort(this.#head, cmp)
    }
    
    #mergeSort(head, cmp) {
        if (!head || !head.next) return head

        let slow = head
        let fast = head.next

        while (fast && fast.next) {
            slow = slow.next
            fast = fast.next.next
        }

        let rightHead = slow.next
        slow.next = null

        let left = this.#mergeSort(head, cmp)
        let right = this.#mergeSort(rightHead, cmp)

        return this.#merge(left, right, cmp)
    }
    
    #merge(l1, l2, cmp) {
        let dummy = new Node()
        let tail = dummy

        while (l1 && l2) {
            if (cmp(l1.value, l2.value) <= 0) {
                tail.next = l1
                l1 = l1.next
            } else {
                tail.next = l2
                l2 = l2.next
            }
            tail = tail.next
        }

        tail.next = l1 ? l1 : l2

        return dummy.next
    }
}