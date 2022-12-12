import styles from './Input.module.scss';

const Input = ({
  className,
  disabled,
  onChange,
  placeholder,
  type,
  value,
  defaultValue,
  checked,
  id,
  labelText,
  name,
  required,
  error,
  errorText,
  ...inputProps
}) => {

  return (
    <div className={styles.wrapper}>
        <label className={styles.label}>
            <span className={styles.labelText}>{labelText}</span>
            <input
	            className={styles.input}
                placeholder={placeholder}
	            id={id}
	            name={name}

	            type={type || 'text'}
	            required={required || false}
                value={value}
	            defaultValue={defaultValue}
	            onChange={onChange}
            />
        </label>

      {error && (
        <div className={styles.error}>
          <span>{errorText}</span>
        </div>
      )}

    </div>
  )
}

export default Input
