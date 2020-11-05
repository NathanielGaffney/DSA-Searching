function indexOf(array, value) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == value) {
            return i;
        }
    }
    return -1;
};

function binarySearch(array, value, start, end) {
    var start = start === undefined ? 0 : start;
    var end = end === undefined ? array.length : end;

    if (start > end) {
        return -1;
    }

    const index = Math.floor((start + end) / 2);
    const item = array[index];

    console.log(start, end);
    if (item == value) {
        return index;
    }
    else if (item < value) {
        return binarySearch(array, value, index + 1, end);
    }
    else if (item > value) {
        return binarySearch(array, value, start, index - 1);
    }
};

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
    }
    enqueue(data) {
        const node = new _QNode(data);
        if (this.first === null) {
            this.first = node;
        }
        if (this.last) {
            this.last.next = node;
        }
        this.last = node;
    }
    dequeue() {
        if (this.first === null) {
            return;
        }
        const node = this.first;
        this.first = this.first.next;

        if (node === this.last) {
            this.last = null;
        }
        return node.value;
    }
}

class BinarySearchTree {
    constructor(key = null, value = null, parent = null){
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
    insert(key, value){
        if(this.key == null){
            this.key = key;
            this.value = value;
        } else if (key <= this.key) {
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this);
            } else {
                this.left.insert(key, value);
            }
        } else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            } else {
                this.right.insert(key, value);
            }
        }
    }
    find(key) {
        if (this.key == key) {
            return this.value;
        } else if (key < this.key && this.left) {
            return this.left.find(key);
        } else if (key > this.key && this.right) {
            return this.right.find(key);
        } else {
            throw new Error('Key Error');
        }
    }
    remove(key){
        if (this.key == key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            } else if (this.left) {
                this._replaceWith(this.left);
            } else if (this.right) {
                this._replaceWith(this.right);
            } else {
                this._replaceWith(null);
            }
        } else if (key < this.key && this.left) {
            this.left.remove(key);
        } else if (key > this.key && this.right) {
            this.right.remove(key);
        } else {
            throw new Error('Key Error')
        }
    }
    _replaceWith(node){
        if (this.parent){
            if (this == this.parent.left) {
                this.parent.left = node;
            } else if (this == this.parent.right) {
                this.parent.right = node;
            } else {
                if (node) {
                    this.key = node.key;
                    this.value = node.value;
                    this.left = node.left;
                    this.right = node.right;
                } else {
                    this.key = null;
                    this.value = null;
                    this.left = null;
                    this.right = null;
                }
            }
        }
    }
    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }
    dfs(values=[]){
        if (this.left){
            values = this.left.dfs(values);
        }
        values.push(this.value);

        if (this.right){
            values = this.right.dfs(values);
        }
        return values;
    }
    bfs(tree, values=[]){
        const queue = new Queue();
        const node = tree.root;
        queue.enqueue(node);
        while(queue.length){
            const node = queue.dequeue();
            values.push(node.value);
            
            if(node.left){
                queue.enqueue(node.left);
            }
            if(node.right){
                queue.enqueue(node.right);
            }
        }
        return values;
    }
}

let arr1 = [3, 5, 6, 8, 11, 12, 14, 15, 17, 18]

function main(){
    
}

main();
