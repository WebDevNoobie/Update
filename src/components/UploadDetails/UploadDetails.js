import { Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDob,
  selectMobile,
  selectName,
  selectPassword,
  selectUid,
  selectUserName
} from "../../features/signUpSlice";
import "./UploadDetails.scss";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase.config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";
import { login } from "../../features/appSlice";

function UploadDetails() {
  const navigate = useNavigate();
  const nameobj = useSelector(selectName);
  const password = useSelector(selectPassword);
  const dob = useSelector(selectDob);
  const phone = useSelector(selectMobile);
  const username = useSelector(selectUserName);
  const uid = useSelector(selectUid);
  const [file, setFile] = useState(null);
  const [imgURL, setImgURL] = useState(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const dispatch = useDispatch();

  const saveData = async () => {
    if (!file) {
      return;
    }
    const storageRef = ref(storage, "profilePictures/" + username + "-dp");
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgressPercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const userData = {
            name: nameobj,
            username: username,
            password: password,
            dob: dob,
            phone: phone,
            dp: downloadURL
          };
          setImgURL(downloadURL);
          setFile(null);
          setDoc(doc(db, "users", uid), userData);
        });
      }
    );
  };

  const nextScreen = async () => {
    const uData = await (
      await getDoc(doc(db, "users", auth.currentUser.uid))
    ).data();
    dispatch(login(uData));
    navigate("/");
  };

  return (
    <div className="uploadDetails">
      <img
        className="profilePic"
        src={
          imgURL === null
            ? "https://cdn-icons-png.flaticon.com/512/847/847969.png"
            : imgURL
        }
        alt="Profile Pic"
      />
      <label class="file">
        <input
          type="file"
          id="file"
          accept="image/*"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setImgURL(null);
          }}
          style={{ display: "none" }}
        />
        <p>{file === null ? "Select Picture" : file.name}</p>
      </label>
      <Button
        sx={{
          backgroundColor:
            file === null && imgURL === null ? "#c8c8c8" : "#74d4fe",
          ":hover": {
            backgroundColor:
              file === null && imgURL === null ? "#c8c8c8" : "#ade6ff"
          }
        }}
        className="upload"
        onClick={imgURL === null ? saveData : nextScreen}
        disabled={file === null && imgURL === null ? true : false}
      >
        {imgURL === null ? "Upload" : "Continue"}
      </Button>
      {!imgURL && (
        <ProgressBar
          completed={progressPercent}
          bgColor="#74d4fe"
          baseBgColor="ade6ff"
          className="progressBar"
        />
      )}
    </div>
  );
}

export default UploadDetails;
