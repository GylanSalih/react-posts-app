import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { Twitter } from 'lucide-react';
import { Facebook } from 'lucide-react';
import { Youtube } from 'lucide-react';


const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.socialMedia}>
        <Instagram size={24} className={styles.socialMediaIcon}/>
        <Twitter size={24} className={styles.socialMediaIcon}/>
        <Facebook size={24} className={styles.socialMediaIcon}/>
        <Youtube size={24} className={styles.socialMediaIcon}/>
      </div>
      <p className={styles.copyright}>Copyright © 2025 React-posts-app</p>
    </div>  
  );
};

export default Footer;