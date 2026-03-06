class Node {
    left = null
    right = null
    height = 1
    balance = 0
    constructor(value){
        this.value = value
    }
}
class AVLTree {
    #root = null
    #size = 0
    
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

    findmin(){
        if(!this.#root) return null
        return this.#findMin(this.#root).value
    }
    
    #findMin(node){
        while(node.left){
            node = node.left
        }
        return node
    }

    findmax(){
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
            if(value < curr.value){
                curr = curr.left
            }
            else if(value > curr.value){
                curr = curr.right
            }
            else {
                return true
            }
        }
        return false
    }

    preorder(){
        if(!this.#root) return []
        let sta = [this.#root]
        let res = []
        while(sta.length){
            let node = sta.pop()
            res.push(node.value)
            if(node.right) sta.push(node.right)
            if(node.left) sta.push(node.left)
        }
        return res
    }

    inorder(){
        let sta = []
        let res = []
        let curr = this.#root
        while(curr || sta.length){
            while(curr){
                sta.push(curr)
                curr = curr.left
            }
            curr = sta.pop()
            res.push(curr.value)
            curr = curr.right
        }
        return res
    }
    
    postorder(){
        let stack1 = [this.#root]
        let stack2 = []
        let res = []
        while(stack1.length){
            let node = stack1.pop()
            stack2.push(node)
            if(node.left) stack1.push(node.left)
            if(node.right) stack2.push(node.right)    
        }
        while(stack2.length){
            res.push(stack2.pop().value)
        }
        return res
    }
    
    get_height(){
        return this.#getHight(this.#root)
    }

    #getHight(node){
        if(!node) 0
        let leftHight = this.#getHight(node.left)
        let rightHeight = this.#getHight(node.right)
        return Math.max(left,right) + 1
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

    levelorder(){
        if(!this.#root) return []
        let queue = [this.#root]
        let res = []

        while(queue.length){
            let node = queue.shift()
            res.push(node.value)
            if(node.left) queue.push(node.left)
            if(node.right) queue.push(node.right)
        }
        return res
    }

    successor(value){
        let node = this.#root
        let succ = null
        while(node){
            if(value < node.value){
                succ = node
                node = node.left
            }else {
                node = node.right
            }
        }
        return succ ? succ.value :null
    }

    predecessor(value){
        let node = this.#root
        let prev = null
        while(node){
            if(value > node.value){
                prev = node
                node = node.right
            }else {
                node = node.left
            }
        }
        return prev ? prev.value :null
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

    
    insert(value){
        this.root = this.#insert(this.root,value)
    }

    #insert(node,value){
        if(!node){ 
            this.#size++
            return new Node(value)
        }
        if(value < node.value){
            node.left = this.#insert(node.left,value)
        }
        else if(value > node.value){
            node.right = this.#insert(node.right,value)
        }
        this.update(node)
        return this.balanse(node)
    }

    update(node){
        const left = !node.left ? 0 :node.left.height
        const right = !node.right ? 0 :node.right.height
        node.height = 1 + Math.max(left,right)
        node.balance = left - right
    }

    balanse(node){
        if(node.balance < -1){
            if(node.right.balance > 0){
                node.right = this.rotateRight(node.right)
            }
            return this.rotateLeft(node)
        }else if(node.balance > 1){
            if(node.left.balanse < 0){
                node.left = this.rotateLeft(node.left)
            }
            return this.rotateRight(node)
        }
        return node
    }

    rotateLeft(x){
        let y = x.right
        let T2 = y.left
        y.left = x
        x.right = T2
        this.update(x)
        this.update(y)
        return y
    }

    rotateRight(y){
        let x = y.left
        let T2 = x.right
        x.right = y
        y.left = T2
        this.update(y)
        this.update(x)
        return x
    }
    
    delete(value){
        this.root = this.#delete(this.root,value)
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
            const min = this.#findMin(node.right)
            node.value = min.value
            node.right = this.#delete(node.right,min.value)
        }
        this.update(node)
        return this.balanse(node)
    }

    toArray(){
        return this.#root.inorder()
    }

    clone(){
        newTree = new AVLTree()
        newTree.root = this.#clone_Node(this.#root)
        newTree.size = this.#size
        return newTree
    }

    #clone_Node(node){
        if(!node) return null
        const newNode = new Node(node.value)
        newNode.left = this.#clone_Node(node.left)
        newNode.right = this.#clone_Node(node.right)
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
                    return {done : true}
                }
                curr = stack.pop()
                let value = curr.value
                curr = curr.right
                return {value, done :false}
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