# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# 리액트

[리액트공식문서](https://react.dev/)

1. useState
   화면의 데이터를 변경할때 사용한다.
   리액트의 state 는 현재 상태를 나타내기 때문에 미래 값을 알 수 없다.

2. useRef
   데이터 저장장치. 데이터인데, 화면이 바뀌지 않는 데이터다.

```jsx
import { useRef } from "react";

function App() {
  const ref = useRef(null);

  return (
    <>
      <input ref={ref} type="text" />
    </>
  );
}

export default App;
```

ref 값을 바꿔도 화면 리렌더링 되지 않는다.
데이터가 있는데, 바뀌는 데이터 + 화면이 바뀌는지 유무에 따라 결정하면 된다.

```jsx
/* src/App.jsx */
import { useState, useCallback, useRef } from "react";
import "./App.css";
//.. 생략
function App() {
  const [id, setId] = useState("");
  const [domain, setDomain] = useState(domainList?.[0]?.name);
  const [password, setPassword] = useState("");
  const onClickBtn = useCallback(
    (type) => {
      if (type === "login") {
        // 이메일 주소(직접입력)가 유효하지 않을때
        if (!id?.trim()) {
          setErrors({ idError: "아이디를 입력해주세요" });
          document.getElementById("id").focus();
          document.getElementById("id").textContent = "아이디를 입력해주세요";

          return;
        } else if (!password?.trim()) {
          setErrors({ passwordError: "패스워드를 입력해주세요" });
          document.getElementById("password").focus();
          return;
        } else if (!domain && !checkEmail(id)) {
          setErrors({ idError: "아이디를 입력해주세요" });
          return;
        } else {
          const emailAddress = `${id}${domain && "@" + domain}`;
          console.log("로그인 하러 고", emailAddress, password);
          setErrors({});
          return;
        }
        // 서버로 보내서 로그인
      } else {
        console.log("회원가입");
      }
    },
    [id, password, domain, checkEmail]
  );

  //.. 생략
}

export default App;
```

리액트에서 html 소스에 접근하기 위해서 `document.getElementById('id').focus();`, `document.getElementById('password').focus();` 와 같이 접근할 수 있지만, 리액트에서 권장하지 않는다. `document.getElementById('id').textContent = '아이디를 입력해주세요';` 와 같이 사용한다면 화면이 바뀌나 변경될 부분은 리액트를 통해서(setState) 변경해야 한다.
만약 `document.getElementById()`를 사용하여 변경한다면 리액트에서는 이 부분이 state가 아니기 때문에 알아듣지 못한다. 물론 화면은 바뀌지만 state 가 두개 - 1.리액트가 관리하는 state (`setErrors({ idError: "아이디를 입력해주세요" })`) 2.직접 돔을 조작해서 화면을을 관리하는 부분 (`document.getElementById("id").textContent = "아이디를 입력해주세요"`) - 가 생기는 셈이기 때문에 관리하기 매우 힘들다. 리액트는 화면을 바꾸는 동작(document 접근하는 방식)을 하지 말라고 권장한다.

이렇게 html에 직접 접근하고 싶을 때 ref를 사용하면 된다.

```jsx
/* src/App.jsx */
import { useState, useCallback, useRef } from "react";
import "./App.css";
//.. 생략
function App() {
  const idRef = useRef(null); // 초기값은 null -> {current: null}
  const [id, setId] = useState("");
  const [domain, setDomain] = useState(domainList?.[0]?.name);
  const [password, setPassword] = useState("");

  //.. 생략

  return (
    <>
      <div className="input_area">
        <label htmlFor="id">아이디</label>
        <input
          ref={idRef} // <-
          className={errors && errors.idError ? "error" : ""}
          type="text"
          value={id}
          onChange={(e) => onChangeEmail(e.target.value)}
        />
        {domain && <span>@</span>}
        <select onChange={onChangeDomain} value={domain}>
          {domainList.map((item, i) => {
            return (
              <option key={i} value={item.name}>
                {item.name}
              </option>
            );
          })}
          <option value={""}>직접입력</option>
        </select>
      </div>
      //.. 생략
    </>
  );
}

export default App;
```
