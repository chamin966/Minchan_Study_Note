let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let line = 0
const datas = [];
while(true){
  let [n, m] = input[line].split(' ').map(v => Number(v));
  if(n === 0 && m === 0) break;
  const g = Array.from({length: n + 1}, () => []);
  for(let i = 1; i < m + 1; i++){
    let [x, y] = input[line + i].split(' ').map(v => Number(v));
    g[x].push(y);
    g[y].push(x);
  }
  datas.push(g);
  line += m + 1;
}


function solution(graphs){
  let answer = [];
  
  const isCycle = (graph, visited, now, prev) => {
    visited[now] = true;
    for(let next of graph[now]){
      if(visited[next] === false){
        if(isCycle(graph, visited, next, now)) return true;
      }
      else if (next !== prev) return true;
    }
    return false
  }

  for(let graph of graphs){
    let tmp = 0;
    const visited = Array.from({length: graph.length}, () => false);
    
    // 각 위치에서 연결 요소 계산 및 사이클 판단
    // graph를 순환하는 것이 아니라
    // 1 ~ N(0 추가돤 길이이므로 graph 인덱스 끝까지 감)까지 순서대로
    // 순환해야 함에 주의한다. graph 자체를 순환하면 편의상 넣은 0이 값을 망친다.
    for(let i = 1; i < graph.length; i++){
      if (!visited[i]){
        if(!isCycle(graph, visited, i, 0)) tmp += 1
      }
    }
    answer.push(tmp);
  }

  for(let i = 0; i < answer.length; i++){
    if(answer[i] === 0) console.log(`Case ${i+1}: No trees.`);
    else if(answer[i] === 1) console.log(`Case ${i+1}: There is one tree.`);
    else console.log(`Case ${i+1}: A forest of ${answer[i]} trees.`);
  }

  return;
}

solution(datas);