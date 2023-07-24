let n = 8; // 데이터의 개수 N
let m = 5; // 찾고자 하는 부분합 M
let data = [3, 2, 4, 1, 2, 2, 1, 5]; // 전체 수열
let cnt = 0;
let intervalSum = 0;
let end = 0;
// start를 차례대로 증가시키며 반복
for (let start = 0; start < n; start++) {
  // end를 가능한 만큼 이동시키기
  while (intervalSum < m && end < n) {
    intervalSum += data[end];
    end += 1;
  }
  // intervalSum이 m보다 같거나 커졌거나
  // end가 끝부분에 도착했다면 부분합이 m일 때 카운트 증가
  if (intervalSum == m) cnt += 1;
  intervalSum -= data[start];
}
console.log(cnt);

//주석 제거
let n = 8;
let m = 5; //목푯값
let data = [3, 2, 4, 1, 2, 2, 1, 5];
let cnt = 0;
let intervalSum = 0;
let end = 0;

for (let start = 0; start < n; start++) {
  while (intervalSum < m && end < n) {
    intervalSum += data[end];
    end += 1;
  }
  if (intervalSum == m) cnt += 1;
  intervalSum -= data[start];
}
console.log(cnt);