import { useState, useCallback, useEffect } from "react";
import "./App.css";

const domainList = [
  { name: "naver.com" },
  { name: "gmail.com" },
  { name: "hanmail.net" },
];

function App() {
  const [id, setId] = useState("");
  const [domain, setDomain] = useState(domainList?.[0]?.name);
  const [password, setPassword] = useState("");
  const [loginChecked, setLoginChecked] = useState(false);
  const [errors, setErrors] = useState({});

  const onChangeDomain = useCallback(
    (e) => {
      setDomain(e.target.value);
      setErrors({ ...errors, idError: "" });
      // console.log("value:::", e, e.target.value);
    },
    [errors]
  );

  const onChangeEmail = useCallback(
    (value) => {
      // console.log("onChangeEmail:::", value);
      setId(value);
      setErrors({ ...errors, idError: "" });
    },
    [errors]
  );

  const onChangePassword = useCallback(
    (value) => {
      setPassword(value);
      setErrors({ ...errors, passwordError: "" });
    },
    [errors]
  );

  const onChangeAutoLogin = useCallback((check) => {
    // console.log("onChangeAutoLogin:::", check);
    setLoginChecked(check);
  }, []);

  const checkEmail = useCallback((value) => {
    const emailRegEx =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    return emailRegEx.test(value);
  }, []);

  const onClickBtn = useCallback(
    (type) => {
      if (type === "login") {
        // 이메일 주소(직접입력)가 유효하지 않을때
        if (!id?.trim()) {
          setErrors({ idError: "아이디를 입력해주세요" });
          return;
        } else if (!password?.trim()) {
          setErrors({ passwordError: "패스워드를 입력해주세요" });
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

  return (
    <>
      <div className="input_area">
        <label htmlFor="id">아이디</label>
        <input
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
      {errors.idError && <div className="error_message">{errors.idError}</div>}
      <div className="input_area">
        <label htmlFor="password">비밀번호</label>
        <input
          className={errors && errors.passwordError ? "error" : ""}
          type="password"
          value={password}
          onChange={(e) => onChangePassword(e.target.value)}
        />
      </div>
      {errors.passwordError && (
        <div className="error_message">{errors.passwordError}</div>
      )}
      <div className="btn_area">
        <button className="btn" onClick={() => onClickBtn("login")}>
          로그인
        </button>
      </div>
      <div className="btn_area">
        <button className="btn" onClick={() => onClickBtn("join")}>
          회원가입
        </button>
      </div>
      <div>
        <input
          type="checkbox"
          check={loginChecked.toString()}
          onChange={(e) => onChangeAutoLogin(e.target.checked)}
          name="자동으로 로그인"
        />
        <span>자동으로 로그인</span>
      </div>
    </>
  );
}

export default App;
