import React from 'react';
import styles from './Card.module.scss';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, X } from 'lucide-react';
import { usePoster } from "../../context/Context.jsx";


// import { useReducer } from "react";
// import reducerProvider from "../../context/ReducerProvider.jsx";

const Card = ({ title, description, postId }) => {
  const navigate = useNavigate();
  const { deletePost } = usePoster();

  // const [state, dispatch] = useReducer(reducerProvider, initialState);

  // Format the date
  const dateShower = () => {
    return new Date().toLocaleDateString("de-DE", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  }

  const showMore = (e) => {
    e.preventDefault();
    navigate(`/posts/${postId}`);
  }

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Do you want to delete this post?")) {
      deletePost(postId);
    }
  }

  return (
    <div className={styles.card}>
      <figure className={styles.figure}>
        <img 
          src="/images/blogImg.png" 
          alt={title} 
          className={styles.image} 
        />
        <div className={styles.overlay} onClick={showMore}>
          <div className={styles.content}>
            <h3>{title}</h3>
            <p className={styles.date}>{dateShower()}</p>
            <p className={styles.description}>{description}</p>
          </div>
        </div>
        <div className={styles.iconGroup}>
          <div className={styles.linkIcon} onClick={showMore}>
            <ArrowUpRight size={20} />
          </div>
          <button 
            className={styles.deleteIcon}
            onClick={handleDelete}
            aria-label="Delete post"
          >
            <X size={18} />
          </button>
          {/* <button 
            onClick={() => dispatch({
              type: "DELETE_POST",
              payload: postId,
            })}
          >
            <X size={18} />
          </button> */}
            
        </div>
      </figure>
    </div>
  );
};

export default Card;

