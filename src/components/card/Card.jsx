import React from 'react';
import styles from './Card.module.scss';
import { useNavigate } from 'react-router-dom';

const Card = ({ title, description, deletePost, postId }) => {
  const navigate = useNavigate();

  // Datum formatieren
  const dateShower = () => {
    return new Date().toLocaleDateString("de-DE", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  }

  const showMore = () => {
    navigate(`/posts/${postId}`);
  }

  // // Click Event for Card which redirects to PostPage
  // const handleCardClick = (e) => {
  //   // Verhindere Navigation wenn Delete-Button geklickt wird
  //   showMore();
  // }

  const handleDelete = (e) => {
    e.stopPropagation(); // Verhindere Card-Click Event
    if (window.confirm('Do you really want to delete this post?')) {
      deletePost(postId);
    }
  }

  return (
    <div className={styles.simpleWrapper}>
    <div className={styles.Card} onClick={showMore}>
      <img 
        src="/images/blogImg.png" 
        alt="blog-card" 
        className={styles.CardImage} 
      />
      <h1 className={styles.CardTitle}>{title}</h1>
      <p className={styles.CardDate}>{dateShower()}</p>
      <p className={styles.CardDescription}>{description}</p>
      <div className={styles.buttonGroup}>
        <button 
          className={styles.showMoreButton} 
          onClick={showMore}
        >
          Read More
        </button>
        <button 
          className={styles.deleteButton} 
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
      </div>
    </div>
  );
};

export default Card;