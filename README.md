# 뉴스뷰어 프로젝트

## API

### https://newsapi.org 에서 제공하는 API 데이터 받기

### https://newsapi.org/s/south-korea-news-api -> 한국뉴스 가져오는 API

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

## 콜백함수

```
function increase(number, callback) {
  setTimeout(()=> {
    const result = number + 10;
    if (callback) {
      callback(result);
    }
  }, 1000)
}

console.log('작업시작');
increase(0, result => {
  console.log(result);
  increase(result, result => {
    console.log(result);
    increase(result, result => {
      console.log(result);
    }
  }
})
```

이렇게 하면 1초에 걸쳐서 10, 20, 30, 40 과 같은 형태로 여러 번 순차적으로 덧셈 처리하고 싶다면 콜백함수를 통해 중첩하여 구현할 수 있습니다.
하지만 그렇게 중첩해서 코드를 짜다보면 코드의 가독성도 나빠지고 이러한 형태를 '콜백지옥' 이라고 부른다.

이를 해결해줄 것이 콜백지옥 같은 코드가 형성되지 않게 하는 방안으로

## Promise 를 사용한다.

- ES6에 도입된 기능임

위에 콜백지옥 코드를 Promise를 사용하여 구현해보면 이렇게 된다.

```
function increase(number) {
  const promise = new Promise((resolve, reject) => {
    // resolve는 성공, reject는 실패

    setTimeout(()=> {
      const result = number + 10;
      if(result > 50) {
        // 50보다 높으면 에러 발생 시키기
        const e = new Error('NumberTooBig');
        return reject(e);
      }
      resolve(result);
      // number 값에 +10 후 성공 처리
    }, 1000);
  });
  return promise;
}

increase(0)
  .then(number => {
    // Promise에서 resolve된 값은 .then을 통해 받아올수있다.

    console.log(number);
    return increase(number);
  })

  // 이렇게 또 .then으로 처리가 가능하다.
    .then(number => {
      console.log(number);
      return increase(number);
    })
    .then(number => {
      console.log(number);
      return increase(number);
    })
    .then(number => {
      console.log(number);
      return increase(number);
    })
    .then(number => {
      console.log(number);
      return increase(number);
    })
    .catch(e => {
      //도중에 에러가 발생한다면 .catch를 통해 알 수 있음
      console.log(e);
    })
```

여러 작업을 연달아 처리한다고 해서 함수를 여러 번 감싸는 것이 아니라 .then을 사용하여 그다음 작업을 설정하기 때문에 콜백 지옥이 형성되지 않습니다.

## async/await

async/await는 Promise를 더욱 쉽게 사용할 수 있도록 해 주는 ES8 문법이다. 이 문법을 사용하려면 함수의 앞부분에 async 키워드를 추가하고, 해당 함수 내부에서 Promise의 앞부분에 await 키워드를 사용한다.

이렇게 하면 Promise가 끝날 때까지 기다리고, 결과 값을 특정 변수에 담을 수 있다.

```
function increase(number) {
  const promise = new Promise((resolve, reject) => {
    // resolve는 성공, reject는 실패

    setTimeout(()=> {
      const result = number + 10;
      if(result > 50) {
        // 50보다 높으면 에러 발생 시키기
        const e = new Error('NumberTooBig');
        return reject(e);
      }
      resolve(result);
      // number 값에 +10 후 성공 처리
    }, 1000);
  });
  return promise;
}

async function runTasks() {
  try{
    let result = await increase(result);
    console.log(result);
    let result = await increase(result);
    console.log(result);
    let result = await increase(result);
    console.log(result);
    let result = await increase(result);
    console.log(result);
    let result = await increase(result);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}
```

## axios 로 API 호출해서 데이터 받아오기

- axios는 현재 가장 많이 사용되고 있는 자바스크립트 HTTP 클라이언트입니다.
  이 라이브러리 특징은 HTTP 요청을 promise 기반으로 처리한다는 점입니다.

```
$ npm install axios
```

## 뉴스 뷰어 UI 구성

[components] - NewsItem.js / NewsList.js 파일 생성
NewsItem.js : 각 뉴스정보 보여주는 컴포넌트
NewsList.js : API 요청하고 뉴스 데이터가 들어있는 배열을 컴포넌트 배열로 변환하여 렌더링해주는 컴포넌트

## 데이터 연동하기

uesEffect를 사용하여 컴포넌트가 처음 렌더링되는 시점에 API를 요청한다.
이 때 주의할 점은 ! useEffect에 등록하는 함수에 async를 붙이면 안된다.

useEffect에서 반환해야 하는 값은 뒷정리 함수이기 때문이다.
따라서 useEffect 내부에 async/await를 사용하고 싶다면, 함수 내부에 async키워드가 붙은 또 다른 함수를 만들어서 사용해 줘야한다.

- 추가

<br>

loading이라는 상태도 관리하여 API 요청이 대기중인지 판별해야됨.
요청이 대기중일 때는 loading값이 true이고 요청이 끝나면 false가 되어야한다.

NewsList.js에서 map 함수를 사용하기 전에 꼭,

```
 if (!articles) {
    return null;
  }
```

이 과정을 해주어야한다. !articles를 조회하여 해당 값이 현재 null이 아닌지 검사해야한다. 이 작업을 하지 않으면 아직 데이터가 없을 때 null에는 map함수가 없기 때문에 렌더링 과정에서 오류가 발생합니다.

그래서 애플리케이션이 제대로 나타나지 않고 흰 페이지만 보이게 됩니다.

## 카테고리 구현하기

```
try {
        const query = category === 'all' ? '' : `&category=${category}`;
        const response = await axios.get(
          `http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=0a8c4202385d4ec1bb93b7e277b3c51f`,
        );
        setArticles(response.data.articles);
      } catch(e) {
        console.log(e);
      }
      setLoading(false);
    };
```

category값이 all이라면 query 값을 공백으로 설정하고, all이 아니라면 `&category=${category}`형태의 문자열로 만듦. 이 query를 요청할 때 주소에 포함된다. (삼항연산자임)

```
(...)
  fetchData();
  }, [category]);
```

category값이 바뀔 때마다 뉴스를 새로 불러와야 하기 때문에 useEffect의 의존배열에 category를 넣음.

useEffect 한 번으로 컴포넌트가 맨 처음 렌더링될 떄, category값이 바뀔 때 요청하도록 설정하였다.
