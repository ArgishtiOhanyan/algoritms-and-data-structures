class Node {
    constructor(value){
    this.value = value
    this.left = null
    this.right = null
    }
}

class BST {
    #root
    #size
    constructor(){
        this.#root = null
        this.#size = 0
    }
    size(){
        return this.#size
    }
    
    is_empty(){
        return this.#size === 0
    }

    clear(){
        this.#root = null
        this.#size = 0
    }

    insert(value){
        this.#root = this.#insert(this.#root,value)
    }

    #insert(node,value){
        if(!node) {
        this.#size++
        return new Node(value)
        }
        if(value > node.value){
            node.right = this.#insert(node.right,value)
        }
        else if(value < node.value){
            node.left = this.#insert(node.left, value)
        }
        return node
    }

    delete(value){
        this.#root = this.#delete(this.#root,value)
    }

    #delete(node,value){
        if(!node) return null
        if(value > node.value){
            node.right = this.#delete(node.right,value)
        }
        else if(value < node.value){
            node.left = this.#delete(node.left,value)
        }
        else {
            if(!node.left && !node.right){
                this.#size--
                return null
            }
            if(!node.left || !node.right){
                this.#size--
                return node.left || node.right
            }
            else {
                const min = this.#findMin(node.right)
                node.value = min.value
                node.right = this.#delete(node.right,min.value)
            }
        }
        return node
    }

    find_min() {
        if (!this.#root) return null
        return this.#findMin(this.#root).value
    }
    
    #findMin(node) {
        while (node.left) {
            node = node.left
        }
        return node
    }

    find_max(){
        if(!this.#root) return null
        return this.#findMax(this.#root).value
    }

    #findMax(node){
        while(node.right){
            node = node.right
        }
        return node
    }

    contains(value){
        if(!this.#root) return false
        let curr = this.#root
        while(curr !== null){
            if(value > curr.value){
                curr = curr.right
            }
            else if(value < curr.value){
                curr = curr.left
            }
            else{
                return true
            }
        }
        return false
    }
    preorder() {
        if (!this.#root) return []
        let stack = [this.#root]
        let res = []
        while (stack.length) {
            let node = stack.pop()
            res.push(node.value)
            if (node.right) stack.push(node.right)
            if (node.left) stack.push(node.left)
        }
        return res
    }

    inorder() {
        if (!this.#root) return []
        let stack = []
        let res = []
        let curr = this.#root
        while (curr || stack.length) {
            while (curr) {
            stack.push(curr)
            curr = curr.left
        }
        curr = stack.pop()
        res.push(curr.value)
        curr = curr.right
    }
    return res
}

    postorder() {
        if (!this.#root) return []
        let stack1 = [this.#root]
        let stack2 = []
        let result = []
        while (stack1.length) {
            let node = stack1.pop()
            stack2.push(node)
            if (node.left) stack1.push(node.left)
            if (node.right) stack1.push(node.right)
    }
        while (stack2.length) {
            result.push(stack2.pop().value)
    }
    return result
    }

    get_height(){
        return this.#getHight(this.#root)
    }

    #getHight(node){
        if(!node) return 0     
       
        let leftHeight = this.#getHight(node.left)
        let rightHeight = this.#getHight(node.right)

        return Math.max(leftHeight,rightHeight) + 1
    }

    get_depth(value) {
        return this.#getDepth(this.#root, value, 0)
}

    #getDepth(node, value, depth) {
        if (!node) return -1    
        
        if (node.value === value) return depth
        if (value < node.value) return this.#getDepth(node.left, value, depth + 1)
        else return this.#getDepth(node.right, value, depth + 1)
}

    level_oreder(){
        if(!this.#root) return []

        let res = []
        let queue = [this.#root]

        while(queue.length){
            let node = queue.shift()
            res.push(node.val)
        }
        if(node.left) queue.push(node.left)
        if(node.right) queue.push(node.right)
    
        return res
    }

    successor(value){
        let node = this.#root
        let succ = null

        while(node){
            if(value < node.value){
                succ = node
                node = node.left
            }else{
                node = node.right
            }
        }
        return succ ? succ.value : null
    }

    predecessor(value){
        let node = this.#root
        let prev = null

        while(node){
            if(value > node.value){
                prev = node
                node = node.right
            }else{
                node = node.left
            }
        }
        return prev ? prev.value : null
    }
    
    is_balanced() {
        return this.#checkBalanced(this.#root) !== -1
    }

    #checkBalanced(node) {
        if (!node) return 0

        let left = this.#checkBalanced(node.left)
        if (left === -1) return -1

        let right = this.#checkBalanced(node.right)
        if (right === -1) return -1

        if (Math.abs(left - right) > 1) return -1

        return Math.max(left, right) + 1
    }

    validate_BST() {
        let arr = this.inorder()

        for (let i = 1; i < arr.length; i++) {
            if (arr[i] <= arr[i - 1]) {
                return false
            }
        }
        return true
    }

   toArray(){
    return this.#root.inorder()
   }
   
   clone(){
    const newTree = new BST()
    newTree.#root = this.#cloneNode(this.#root)
    newTree.size = this.#size
    return newTree
   }

   #cloneNode(node){
        if(!node) return null
        const newNode = new Node(node.value)
        newNode.left = this.#cloneNode(node.left)
        newNode.right = this.#cloneNode(node.right)
        return newNode
   }

   [Symbol.iterator](){
        const stack = []
        let curr = this.#root
        
        return {
            next(){
                while(curr){
                    stack.push(curr)
                    curr = curr.left
                }
                if(stack.length === 0){
                    return { done : true }
                }
                curr = stack.pop()
                const value = curr.value
                curr = curr.right
                return {value, done : false}
            }
        }
   }

   values(){
        return this[Symbol.iterator]()
   }

    entries() {
        const iterator = this[Symbol.iterator]()
        let index = 0

        return {
            next() {
                const result = iterator.next()
                if (result.done) return { done: true }
                return { value: [index++, result.value], done: false }
            },
            [Symbol.iterator]() { return this }
        }
    }
}