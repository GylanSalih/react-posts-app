import React from 'react';
import styles from './Card.module.scss';
import { useNavigate } from 'react-router-dom';

// context aufrufen
import { usePoster } from "../../context/postercontext.jsx";


const Card = ({ title, description, postId }) => {
  const navigate = useNavigate();

  const { deletePost } = usePoster()



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

  

  // löst den lösch vorgang aus ist aber in child?
  const handleDelete = (e) => {
    e.stopPropagation(); // Verhindere Card-Click Event
      deletePost(postId);
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

