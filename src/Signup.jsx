import { useState, useCallback, useRef } from "react";
import "./App.css";
import Input from "./components/Input";
import EmailInput from "./components/EmailInput";
import useInput from "./modules/hooks/useInput";
import useEmailInput from "./modules/hooks/useEmailInput";

const domainList = [
  { name: "naver.com" },
  { name: "gmail.com" },
  { name: "hanmail.net" },
];

function Signup() {
  const [password, passwordInputRef, onChangePassword] = useInput();
  const [nickName, nickNameInputRef, onChangeNickName] = useInput();
  const [phoneNumb, phoneNumbInputRef, onChangePhoneNumb] = useInput();
  const [id, domain, idInputRef, onChangeId, onChangeDomain] = useEmailInput();
  const [loginChecked, setLoginChecked] = useState(false);
  const [errors, setErrors] = useState({});

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
      if (type === "signup") {
        if (!id?.trim()) {
          setErrors({ idError: "아이디를 입력해주세요" });
          idInputRef.current?.focus();
          return;
        } else if (!password?.trim()) {
          setErrors({ passwordError: "패스워드를 입력해주세요" });
          passwordInputRef.current?.focus();
          return;
        } else if (!domain && !checkEmail(id)) {
          // 이메일 주소(직접입력)가 유효하지 않을때
          setErrors({ idError: "아이디를 입력해주세요" });
          idInputRef.current?.focus();
          return;
        } else if (!nickName?.trim()) {
          setErrors({ nickNameError: "닉네임을 입력해주세요" });
          nickNameInputRef.current?.focus();
          return;
        } else if (phoneNumb.length !== 11) {
          console.log("전화번호 길이 확인", phoneNumb.length);
          setErrors({ phoneNumbError: "전화번호를 입력해주세요" });
          phoneNumbInputRef.current?.focus();
          return;
        } else {
          const emailAddress = `${id}${domain && "@" + domain}`;
          console.log(
            "회원가입 하러 고",
            emailAddress,
            password,
            nickName,
            phoneNumb
          );
          setErrors({});
          return;
        }
        // 서버로 보내서 로그인
      } else {
        console.log("로그인 화면으로 가기기");
      }
    },
    [
      id,
      password,
      domain,
      checkEmail,
      nickName,
      phoneNumb,
      idInputRef,
      passwordInputRef,
      nickNameInputRef,
      phoneNumbInputRef,
    ]
  );

  return (
    <>
      <EmailInput
        label="아이디"
        name="id"
        type="text"
        value={id}
        onChangeId={(e) => onChangeId(e)}
        error={errors && errors.idError}
        ref={idInputRef}
        domain={domain}
        domainList={domainList}
        onChangeDomain={onChangeDomain}
      />
      <Input
        label="비밀번호"
        name="password"
        type="password"
        value={password}
        onChange={(e) => onChangePassword(e)}
        error={errors && errors.passwordError}
        ref={passwordInputRef}
      />
      <Input
        label="닉네임"
        name="nickName"
        value={nickName}
        onChange={(e) => onChangeNickName(e)}
        error={errors && errors.nickNameError}
        ref={nickNameInputRef}
      />
      <Input
        label="전화번호"
        name="phoneNumb"
        type="tel"
        value={phoneNumb}
        onChange={(e) => onChangePhoneNumb(e)}
        error={errors && errors.phoneNumbError}
        ref={phoneNumbInputRef}
      />
      <div className="btn_area">
        <button className="btn" onClick={() => onClickBtn("signup")}>
          회원가입
        </button>
      </div>
      <div className="btn_area">
        <button className="btn" onClick={() => onClickBtn("login")}>
          로그인
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

export default Signup;
