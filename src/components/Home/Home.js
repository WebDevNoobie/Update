import { collection, orderBy, query, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase.config";
import "./Home.scss";
import { Avatar } from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/appSlice";
import { signOut } from "firebase/auth";
import SnapsListItem from "../SnapsListItem/SnapsListItem";

function Home() {
  const [snaps, setSnaps] = useState([]);
  const userData = useSelector(selectUser);
  const navigate = useNavigate();

  const logoutUser = () => {
    signOut(auth);
  };

  const getSnaps = () => {
    onSnapshot(
      query(
        collection(db, "users", auth.currentUser.uid, "receivedSnaps"),
        orderBy("uploadedOn", "desc")
      ),
      (snapshot) => {
        setSnaps(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data()
          }))
        );
      }
    );
    console.log(snaps);
  };

  useEffect(() => {
    getSnaps();
  }, []);

  return (
    <div className="home">
      <div className="homeHeader">
        <Avatar
          src={userData ? userData.dp : ""}
          className="accountCircleIcon"
        />
        <h3 className="headerHeading">Snaps</h3>
        <PowerSettingsNewIcon className="searchIcon" onClick={logoutUser} />
      </div>
      <div className="snapsDiv">
        {snaps.map(
          ({ id, data: { snapImageURL, uploadedOn, read, username, dp } }) => (
            <SnapsListItem
              key={id}
              id={id}
              username={username}
              uploadedOn={uploadedOn}
              read={read}
              snapImageURL={snapImageURL}
              dp={dp}
            />
          )
        )}
      </div>
      <div
        className="snapCaptureButton"
        onClick={() => navigate("/captureSnap")}
      ></div>
    </div>
  );
}

export default Home;
