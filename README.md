# EPL

#### ⚽️ [배포 페이지 바로가기](https://sangwoo9734.github.io/EPL/)

## 프로젝트 소개
Vue JS 온라인 강의를 수강하고 배운 것을 바탕으로 제작한 잉글랜드 프리미어리그 정보 전달 웹 페이지입니다.  
본 프로젝트의 기획, 디자인, 개발은 모두 개인으로 진행하였습니다.

## 기술 스택

<div>
  <p>
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black" />
    <img src="https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=Vue.js&logoColor=white" />
    <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=Bootstrap&logoColor=white" />
  </p>
</div>

## 프로젝트 시작

#### `npm install`

프로젝트와 관련된 의존성을 모두 설치합니다.

#### `npm run serve`

개발 모드로 앱을 시작할 수 있습니다.
명령어 입력 후, [http://localhost:8080](http://localhost:8080)를 입력하여 브라우저에서 확인 가능합니다.

## EPL 개선기 ( ~ 6/16)
<details>
<summary>개선기 보기</summary>
  
제작 초기에는 기능 및 화면 구현에 초점을 맞추었기 때문에 그 외 부분에 대해서는 전혀 신경쓰지 않고 개발 했었다.

그 당시 신경 쓰지 않았던 몇 가지 부분에 대해서 개선사항으로 정의하고 적용시켜 나가기로 했다.

- ESLint & Prettier 적용 / 변수명 수정  
    - 
    - 기존에 무질서하게 작성했던 코드에 가독성과 통일성을 부여하기 위해서, ESlint와 Prettier를 사용했다.
    - 추가로 코드 내에 존재하는 의미를 알 수 없는 변수명 'm', 'r'과 같은 변수는 모두 의미가 있는 'match', 'result'로 변경해주었다.
- API
    -
    API가 Page내에서 각각 메소드로 사용되고 있었고, header, base url 뿐만아니라  API Key까지 그대로 사용하는 짓을 해놓았었다…
    
    - API 디렉토리를 따로 제작하여 모든 API 요청을 한 곳에서 관리하도록 분리해주었다.
    - .env 환경변수 파일을 추가해서 API KEY, BASE URL를 숨겨 외부에 노출되지 않도록 해주었다.
    - 기존 페이지 전환시 필요한 데이터를 모두 다시 불러오도록 되어있었다. 사용하는 데이터가 빠르게 변하는 데이터가 아니라고 생각했고, 그래서 데이터를 짧은 주기로 여러번 호출할 필요가 없다는 생각을 하게 되었다. 각 페이지 진입시 API 요청으로 받아온 데이터를 sessionStorage에 저장하고, 다른 페이지로 이동 후 재방문하게 되면 sessionStorage를 확인하여 데이터 호출 기록이 있다면 sessionStorage에 있는 데이터를 활용하도록 하였다.
  ``` JS
      // 다음 경기 일정 데이터 요청
    const getNextFixture = async () => {
      if (sessionStorage.getItem('matchScheduleData')) {
        const savedData = JSON.parse(sessionStorage.getItem('matchScheduleData'));
        return savedData;
      }
      return await axios
        .get(process.env.VUE_APP_API_BASE_URL + '/fixtures', {
          params: { league: '39', next: '10' },
          headers: ORIGINAL_HEADERS,
        })
        .then(response => {
          const matchScheduleData = response.data.response;
          sessionStorage.setItem(
            'matchScheduleData',
            JSON.stringify(matchScheduleData),
          );
          return response.data.response;
        })
        .catch(error => {
          console.log(error);
        });
    };
  ```
  
  ***sessionStorage를 쓴 이유***  
  사용자의 정보가 드러나는 데이터가 없기 때문에 사용하기 쉬운 sessionStorage나 localStorage를 사용하는 것을 선택했다.
  그리고 내가 만든 페이지의 특성상 서비스를 이용하는 시간이 그렇게 길지 않다고 생각을 해서 사용자가 새 브라우저로 서비스에 들어올 때만 새로운 데이터를 받아오게 한다면 데이터의 최신화 부분과 불필요한 API요청 횟수 문제를 동시에 해결할 수 있다고 판단해서 sessionStorage를 사용하게 되었다.  
  
- 디렉토리 구조화 / 파일명 변경
    -
    - 기존 프로젝트의 디렉토리를 보았을 때, 불필요한 파일이 남아있는 경우도 있었고, 파일명이 모호해서 어떤 기능을 하는 파일인지 다소 명확하게 인지하기 힘들었다.
    - 다음과 같이 기존의 디렉토리를 개선하였다.
        - [X] Static 데이터 중 일부 사용하지 않는 데이터는 제거해주었다.
        - [X] 화면에 해당하는 Vue 파일은 View 폴더로, 화면의 하위 컴포넌트로 포함되는 Vue 파일은 Components로 분리하여 주었다.
        - [X] Components 내부의 컴포넌트 파일에 대해서는 ‘ 부모 컴포넌트’이름을 포함하여 상관관계를 표현할 수 있도록 했고, 컴포넌트가 표현하는 화면에 대해서 명확하게 인지할 수 있는 단어를 사용하도록 하였다.
- 컴포넌트 분리
    -
    - 기존 하나의 페이지에 대해서 한 개의 파일에 모든 코드를 다 작성해 주었고, 덕분에(?) 가독성은 엄청 떨어졌다. 그래서 3개의 페이지에 대해서 각각 하위 컴포넌드를 아래와 같이 정의하고, 분리해주었다.
    - Rank
        - [x]  RankTeam
        - [x]  RankPersonal
    - Schedule
        - [x]  ScheduleUpcomming
        - [x]  ScheduleResult
    - Team
        - [x]  TeamList
        - [x]  TeamInfo
        - [x]  TeamStatus
        - [x]  TeamRecent
        - [x]  TeamFormation
        - [x]  TeamPlayer
        
- UX 개선
    -
    - ***Loading 컴포넌트***  
      TeamRank, PersonalRank 부분에서 데이터 요청시 잠깐 시간동안 빈 화면이 나오는 현상이 있었고, 간단하게 Loading 컴포넌트를 제작하여 데이터 요청동안에는 Loading 컴포넌트를 통해 데이터를 불러오는 중임을 주었다.  
      <img width="300" src='https://user-images.githubusercontent.com/49917043/173894157-79b68095-58a5-4c04-a48f-b146fe1b96aa.gif' />

      
## 회고 ( ~ 6/16)
  이 프로젝트는 처음 Vue 프레임워크를 배우고서 관심있는 주제를 가지고 제작한 프로젝트이다. 당시에는 기능 구현에만 급급했다. 몇 개월 뒤에 다시보니 수정해야할 부분이 많이 보였다. 개선기로 남긴 내용을 수정하면서 몇 개월간 그래도 성장했구나 하는 생각이 들었다. 아마 다음 몇 개월이 지나서 다시보면 또 수정할게 산더미가 아닐까 싶다. 지금 아쉬운 점을 꼽자면 이번 개선에서 스타일 코드를 분리하고 코드라인을 정리하는 부분을 진행하지 못했다. 내부 컴포넌트 마다 `scoped`로 디자인 적용을 제한하지 않고 css를 작성해두어서 어디까지 건드려할지 엄두가 나지않았다. 이번도 그렇고 다른 프로젝트를 진행하면서 디자인 코드 관리를 어떻게 해야할지 고민이 되는 부분이다.
</details>

## 주요 화면
### 일정 - FIXTURES
<img width="250" alt="image" src="https://user-images.githubusercontent.com/49917043/173908286-405fd7a7-3293-441f-9df3-9019f309dc62.png">  
크게 다음 일정과 이번달 진행된 경기 결과에 대해서 알려주는 페이지이다. 상단의 화살표를 조작하여 다음달, 이전달로 이동가능하다.  
다음 일정의 경우 해당 월에 진행될 최대 10경기에 대한 정보를 제공한다. 경기 결과의 경우 풀타임(FT)으로 끝난 경기만 표현되며 가장 최근 경기가 상단에 노출되도록 설계하였다.  
( 현재 6/16 기준 캡처 화면입니다. 비시즌 중이라 다음 일정에 대한 UI가 표시되지 않습니다. )  

### 순위/기록 - RECORDS
팀 순위, 개인 순위를 확인할 수 있는 페이지이다. 각 순위 페이지는 상단의 화살표를 통해 이전 시즌의 기록도 확인할 수 있다.  
#### ***팀 순위***
<img width="250" alt="image" src="https://user-images.githubusercontent.com/49917043/173906290-a6d282fd-6261-420a-9d7d-41a6e0ea74bf.png">  
경기 수, 총 승점이 각 클럽별로 표시되며, 원하는 클럽의 행을 눌렀을 때 드롭박스를 통해 추가적으로, 승/무/패/득점/실점/최근 5경기 기록과 같은 추가 정보를 제공하도록 제작하였다.  

#### ***개인 순위***
<img width="250" alt="image" src="https://user-images.githubusercontent.com/49917043/173906827-b7c16e86-6a62-4ad7-8fc8-7f80f5a79c34.gif">  
개인 순위는 득점 순위, 도움 순위로 나누어져 있으며, 각 부문별로 상위 15명의 선수의 이름과 소속 팀, 기록이 나오도록 제작하였다.  


### 팀/클럽 - CLUBS
<img width="250" alt="image" src="https://user-images.githubusercontent.com/49917043/173907897-5f590f92-ce39-4dff-92da-168d1f3ddf9f.png">  
팀/클럽은 21/22시즌 기준 20개의 팀 정보를 보여주는 페이지이다. 상단의 클럽 리스트에서 팀을 선택하면 아래 클럽 관련 정보가 제공된다. 제공되는 정보로는 팀 정보 / 최근 10경기 성적 / 사용하는 포메이션종류 / 선수 명단이 있다. 이 페이지의 경우 사용하는 API가 유료임을 감안하여 `src/assets/data/team_data.json` 경로에 존재하는 static 데이터로 페이지를 구성하였다. 시즌이 바뀔 때마다 승/강등 되는 클럽이 생기기 때문에 변동의 여지가 있어 적절한 API가 있다면 대체하여 사용할 예정이다.
  
## Reference
- 코딩애플 Vue.js 강의 : [https://codingapple.com/course/vue-js/](https://codingapple.com/course/vue-js/)
