import clsx from 'clsx'
import styles from './Button.module.scss'

const Button = ({
  children,
  className,
  disabled,
  onClick,
  modifiers=[],
  ...restProps
}) => {
  const mod = {
    blue: false,
    link: false,
    skeleton: false,
  }
  modifiers.forEach((item) => { mod[item] = true })

  return (
    <button
      className={clsx(
        className,
        styles.btn,
        mod.blue && styles['btn--blue'],
        mod.link && styles['btn--link'],
        mod.skeleton && styles['btn--skeleton'],
      )}
      onClick={onClick}
      disabled={disabled}
      type="button"
      {...restProps}
    >
      {children}
    </button>
  )
}

export default Button;
