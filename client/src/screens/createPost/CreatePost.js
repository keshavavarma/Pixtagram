import React, { useState, useEffect } from "react";
import styles from "./CreatePost.module.css";
import { useHistory } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { createPost } from "../../api";
import { Alert } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const closeHandler = (e) => {
    if (e.target !== e.currentTarget) return;
    history.push("/");
  };

  const postToCloud = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "pixtagram");
    data.append("cloud_name", "cr7");
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/cr7/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      if (!response || !response.ok) {
        const error = await response.json();
        setLoading(false);
        throw new Error("Select a Picture");
      }
      const output = await response.json();
      setLoading(false);
      setUrl(output.url);
      setSuccess("Picture Ready,You can Post Now !!");
    } catch (err) {
      setError(err.message);
      console.log(err.message);
      //return { error: err };
    }
  };
  const postDetails = async (e) => {
    e.preventDefault();
    console.log("This is url", url);
    const data = await createPost({ picture: url, caption });
    if (data.error) {
      console.log("Error", data.error.message);
      setError(data.error.message);
    } else {
      console.log("Posted successfully");
      history.push("/");
    }
  };
  useEffect(() => {
    if (image) {
      postToCloud();
    }
  }, [image]);
  return (
    <div className={styles.modalContainer} onClick={closeHandler}>
      <div className={`${styles.createPost} ${styles.card} `}>
        {error && (
          <Alert
            onClose={() => {
              setError("");
            }}
            severity="error"
          >
            {error}
          </Alert>
        )}
        {success && (
          <Alert
            onClose={() => {
              setSuccess("");
            }}
            severity="success"
          >
            {success}
          </Alert>
        )}
        <div className={styles.imgContainer}>
          {url ? (
            <img src={url} alt="post" />
          ) : (
            <label
              htmlFor="fileUpload"
              className={styles.fileUploadLabel}
              role="button"
            >
              {/* <CloudUploadIcon
                fontSize="large"
                sx={{ color: "rgb(0, 119, 255)" }}
              /> */}
              {loading && (
                <CircularProgress
                  size="50px"
                  sx={{ color: "rgb(0, 119, 255)" }}
                />
              )}
              <h1>Click here to upload picture</h1>
              <input
                id="fileUpload"
                disabled={loading}
                className={styles.fileUpload}
                type="file"
                accept=".jpeg,.jpg,.png"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
          )}
        </div>
        <form className={styles.addCaption}>
          <input
            type="text"
            placeholder="Add Caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <button onClick={postDetails}>
            <SendIcon fontSize="large" sx={{ color: "rgb(0, 119, 255)" }} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
