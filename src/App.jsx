import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <Link to="/signup">회원가입</Link> {/* a href 태그 대신 사용 */}
      <Link to="/login">로그인</Link>
    </>
  );

}

export default App;
