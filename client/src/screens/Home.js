import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState, useEffect, useContext } from "react";
import styles from "./Home.module.css";
import profile from "../images/profile.jpeg";
import { useHistory } from "react-router-dom";
import { getAllPosts } from "../api";
import { AuthContext } from "../contexts/AuthContext";

const Home = () => {
  const { isAuth } = useContext(AuthContext);
  const [like, setLike] = useState(false);
  const [feed, setFeed] = useState([]);
  console.log("In Home.js");
  const history = useHistory();
  const createHandler = () => {
    history.push("/CreatePost");
  };
  const likeHandler = () => {
    setLike(!like);
  };

  const homeFeed = async () => {
    const feed = await getAllPosts();
    console.log(feed);
    setFeed(feed);
  };
  useEffect(() => {
    homeFeed();
    return console.log("HomePage cleanup done");
  }, []);

  return (
    <div className={`${styles.feed} ${styles.container}`}>
      <button className={styles.createPost} onClick={createHandler}>
        +
      </button>
      {feed.length !== 0 ? (
        feed.map((post) => {
          return (
            <div className={`${styles.post} ${styles.card}`} key={post._id}>
              <div
                className={styles.userInfo}
                onClick={(e) => {
                  history.push(`user/${post.user._id}`);
                }}
              >
                <img src={post.user.picture} alt=" profile" />
                <p>{post.user.name}</p>
              </div>
              <div
                className={styles.feedImgContainer}
                onClick={(e) => {
                  history.push(`ViewPost/${post._id}`);
                }}
              >
                <img src={post.picture} alt="post" />
              </div>
              <div className={styles.feedPostActions}>
                {like ? (
                  <button className="likes" onClick={likeHandler}>
                    <FavoriteIcon sx={{ color: "red" }} fontSize="large" />
                  </button>
                ) : (
                  <button className="likes" onClick={likeHandler}>
                    <FavoriteBorderOutlinedIcon fontSize="large" />
                  </button>
                )}
                <span>10 likes</span>
              </div>
            </div>
          );
        })
      ) : (
        <h2>No Posts</h2>
      )}
    </div>
  );
};

export default Home;
