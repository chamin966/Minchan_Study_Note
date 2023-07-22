class PriorityQueue {
  constructor(compare = (a, b) => a - b) {
    this.heap = [];
    this.compare = compare;
  }

  getLeftChildIndex = parentIndex => 2 * parentIndex + 1;
  getRightChildIndex = parentIndex => 2 * parentIndex + 2;
  getParentIndex = childIndex => Math.floor((childIndex - 1) / 2);

  hasParent = childIndex => this.getParentIndex(childIndex) >= 0;
  hasLeftChild = parentIndex => this.getLeftChildIndex(parentIndex) < this.heap.length;
  hasRightChild = parentIndex => this.getRightChildIndex(parentIndex) < this.heap.length;

  leftChild = parentIndex => this.heap[this.getLeftChildIndex(parentIndex)];
  rightChild = parentIndex => this.heap[this.getRightChildIndex(parentIndex)];
  parent = childIndex => this.heap[this.getParentIndex(childIndex)];

  swap = (index1, index2) => [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];

  heapifyDown = () => {
    let currentIndex = 0;
    while (this.hasLeftChild(currentIndex)) {
      let childIndexToSwap = this.getLeftChildIndex(currentIndex);
      if (this.hasRightChild(currentIndex) && this.compare(this.rightChild(currentIndex), this.leftChild(currentIndex)) > 0) {
        childIndexToSwap = this.getRightChildIndex(currentIndex);
      }

      if (this.compare(this.heap[currentIndex], this.heap[childIndexToSwap]) >= 0) {
        break;
      }

      this.swap(currentIndex, childIndexToSwap);
      currentIndex = childIndexToSwap;
    }
  }

  enq(value) {
    this.heap.push(value);
    let currentIndex = this.heap.length - 1;
    while (this.hasParent(currentIndex) && this.compare(this.parent(currentIndex), this.heap[currentIndex]) < 0) {
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  deq() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return top;
  }

  peek() { return (this.heap.length === 0) ? null : this.heap[0]; }

  size() { return this.heap.length; }
}

let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let [nodeCnt, loadCnt] = input[0].split(' ').map(v => Number(v));
const data = Array.from({length: nodeCnt + 1}, () => []);
for (let i = 1; i <= loadCnt; i++) {
  let [a, b, c] = input[i].split(' ').map(v => Number(v));
  data[a].push([b, c]);
  data[b].push([a, c]);
}

function solution(graph, nodeCnt, loadCnt){
  let INF = Infinity;
  let start = 1;

  // distance[부서진 출발 노드][부서진 도착 노드] => 최소 소요 비용
  const distance = Array.from({length: nodeCnt + 1}, () => new Array(loadCnt + 1).fill(INF));

  // [현재 노드, 현재까지 비용, 부서진 출발 노드, 부서진 도착 노드]
  const pq = new PriorityQueue((a, b) => b[1] - a[1]);
  pq.enq([start, 0, 0, 0]);
  distance[0][0] = 0;
  while(pq.size() > 0){
    let [curNode, curCost, curDX, curDY] = pq.deq();
    if(curNode === curDX || curCost > distance[curDX][curDY]) continue;
    for(let [nextNode, nextCost] of graph[curNode]){
      if(nextNode === curDY) continue;
      let newCost = curCost + nextCost;
      if(distance[curDX][curDY] > newCost){
        distance[curDX][curDY] = newCost;
        pq.enq([nextNode, newCost, curDX, curDY]);
      }
      if(curCost < distance[curNode][nextNode]){
        distance[curNode][nextNode] = curCost;
        pq.enq([curNode, curCost, curNode, nextNode]);
      }
    }
  }
  
  return distance;
}

console.log(solution(data, nodeCnt, loadCnt));
