import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import FirstScreen from "./components/FirstScreen/FirstScreen";
import Phone from "../assets/images/Iphone-Model-2.png";
import Signup1 from "./components/Signup/Signup1";
import Signup2 from "./components/Signup/Signup2";
import Signup3 from "./components/Signup/Signup3";
import Signup4 from "./components/Signup/Signup4";
import Signup3_a from "./components/Signup/Signup3_a";
import Signup5 from "./components/Signup/Signup5";
import Signup5_c from "./components/Signup/Signup5_c";
import UploadDetails from "./components/UploadDetails/UploadDetails";
import Home from "./components/Home/Home";
import Login_c from "./components/Login/Login_c";
import CaptureSnap from "./components/CaptureSnap/CaptureSnap";
import PreviewCapturedSnap from "./components/PreviewCapturedSnap/PreviewCapturedSnap";
import { useEffect } from "react";
import { auth, db } from "./firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { login, logout, selectUser } from "./features/appSlice";
import { useDispatch, useSelector } from "react-redux";
import Snap from "./components/Snap/Snap";

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const getUserData = async () => {
    const uData = await (
      await getDoc(doc(db, "users", auth.currentUser.uid))
    ).data();
    dispatch(login(uData));
  };

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      authUser ? getUserData() : dispatch(logout());
    });
  }, []);

  return (
    <div className="App">
      <div className="appContainer">
        <img src={Phone} alt="" className="phoneBody" />
        <p>...Loading</p>
        <Router>
          {user ? (
            <div className="userApp">
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/captureSnap" element={<CaptureSnap />} />
                <Route exact path="/snap" element={<Snap />} />
                <Route
                  exact
                  path="/previewCapturedSnap"
                  element={<PreviewCapturedSnap />}
                />
              </Routes>
            </div>
          ) : (
            <div className="noUserApp">
              <Routes>
                <Route exact path="/" element={<FirstScreen />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/login_c" element={<Login_c />} />
                <Route exact path="/signup1" element={<Signup1 />} />
                <Route exact path="/signup2" element={<Signup2 />} />
                <Route exact path="/signup3" element={<Signup3 />} />
                <Route exact path="/signup3_a" element={<Signup3_a />} />
                <Route exact path="/signup4" element={<Signup4 />} />
                <Route exact path="/signup5" element={<Signup5 />} />
                <Route exact path="/signup5_c" element={<Signup5_c />} />
                <Route
                  exact
                  path="/uploadDetails"
                  element={<UploadDetails />}
                />
              </Routes>
            </div>
          )}
        </Router>
      </div>
    </div>
  );
}
