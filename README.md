# 뉴스뷰어 프로젝트

## API

### https://newsapi.org 에서 제공하는 API 데이터 받기

## 작업순서

1. 비동기 작업의 이해
2. axios로 API 호출해서 데이터 받아오기
3. newsapi API 키 발급받기
4. 뉴스 뷰어 UI 만들기
5. 데이터 연동하기
6. 카테고리 기능 구현하기
7. 리액트 라우터 적용하기

## 비동기 작업의 이해

웹앱에서 서버쪽 데이터가 필요할 때는 Ajax 기법을 사용하여 서버의 API를 호출함으로써 데이터를 수신합니다. 이렇게 api를 사용해야 할 때는 네트워크 송수신 과정에서 시간이 걸리기 때문에 작업이 즉시 처리되는 것이 아니라, 응답을 받을 때까지 기다렸다가 전달받은 응답 데이터를 처리합니다.

이 과정을 비동기적으로 처리하게 됩니다.

만약 작업을 동기적으로 처리한다면 요청이 끝날 때까지 기다리는 동안 중지 상태가 되기 떄문에 다른 작업을 할 수 가 없습니다.

그리고 요청이 끝나야 그 다음 예정된 작업을 할 수 있다. <b>하지만 비동기적으로 처리한다면 웹앱이 멈추지 않기 때문에 동시에 여러가지 요청을 처리할 수도 있고, 기다리는 과정에서 다른 함수도 호출할 수 있다</b>.

이렇게 서버 API를 호출할 때, 외에도 작업을 비동기적으로 처리할 때가 있는데 바로 <b> setTimeout</b> 함수를 사용하여 특정작업을 예약할 때 이다.

```
fucntion pritMe() {
  console.log('Hello World');
}

setTimeout(printMe, 3000);
console.log('대기중 ...');
```

printMe가 3초 뒤에 호출되도록 setTimeout 함수의 인자로 전달해 주었는데, 이런 함수를 <콜백함수> 라고 부른다.
