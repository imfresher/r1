import styles from './LineLayout.module.css';

export default function LineLayout({ children, ...rest }) {
  return (
    <div
      className={styles.container}
      {...rest}
    >{children}</div>
  );
};
