function recursive() {
  if(종료 조건을 만족한다면){
    //일반적으로 리프 노드에 도달하였을 때 종료
    처리 후 종료;
  }
  for(자식 노드를 하나씩 확인하며){
    if(임의의 조건을 만족한다면){
      자식 노드 방문 처리;
      재귀 함수 호출;
      자식 노드 방문 처리 해제;
    }
  }
}