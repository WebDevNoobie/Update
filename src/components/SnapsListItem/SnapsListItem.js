import { Avatar } from "@mui/material";
import React from "react";
import "./SnapsListItem.scss";
import ReactTimeago from "react-timeago";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase.config";
import { collection, doc, updateDoc } from "firebase/firestore";
import { setSnapURL } from "../../features/appSlice";

function SnapsListItem({ id, snapImageURL, uploadedOn, read, username, dp }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const open = () => {
    if (!read) {
      dispatch(setSnapURL(snapImageURL));
      updateDoc(
        doc(collection(db, "users", auth.currentUser.uid, "receivedSnaps"), id),
        { read: true }
      );
      navigate("/snap");
    }
  };

  return (
    <div onClick={open} className="snapsListItem">
      <Avatar className="avatar" src={dp} />
      <div className="snapInfo">
        <h3>{username}</h3>
        <p>
          Tap to view -{" "}
          <ReactTimeago date={new Date(uploadedOn?.toDate()).toUTCString()} />
        </p>
      </div>
      {!read && <StopRoundedIcon className="readDot" />}
    </div>
  );
}

export default SnapsListItem;
