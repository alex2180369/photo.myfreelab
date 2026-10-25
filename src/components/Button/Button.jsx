import styles from './Button.module.css';

/**
 * Универсальная кнопка/ссылка-кнопка.
 * variant: 'primary' (графитовая) | 'outline' (контурная)
 */
export default function Button({
  variant = 'primary',
  href,
  children,
  className = '',
  ...rest
}) {
  const classes = `${styles.button} ${styles[variant]}${className ? ` ${className}` : ''}`;

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
