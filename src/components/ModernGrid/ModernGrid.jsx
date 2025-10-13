"use client";
import styles from "./ModernGrid.module.scss";

const ModernGrid = ({
  layoutMode = 1,
  currentPage = 1,
  itemsPerPage = 9,
  filteredItems = [],
}) => {
  // Pagination-Logik
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  return (
    <div className={styles.simpleWrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Made with love</span>
          <h2>Have a look at my work</h2>
        </div>

        <ul className={styles.grid}>
          {paginatedItems.map((item) => (
            <li key={item.slug} className={styles.item}>
              <div className={styles.card}>
                <figure className={styles.figure}>
                  <img
                    src={item.image}
                    alt={item.title}
                    width={550}
                    height={400}
                    className={styles.image}
                  />
                  <div className={styles.overlay}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <div className={styles.tags}>
                        {item.category.map((tag, idx) => (
                          <span key={idx} className={styles.tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </figure>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ModernGrid;
