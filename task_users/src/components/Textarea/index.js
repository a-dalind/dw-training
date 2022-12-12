import styles from './Textarea.module.scss';

const Textarea = ({
  className,
  disabled,
  onChange,
  placeholder,
  value,
  defaultValue,
  id,
  labelText,
  name,
  ...textareaProps
}) => {

  return (
    <div className={styles.wrapper}>
        <label className={styles.label}>
            <span className={styles.labelText}>{labelText}</span>
            <textarea
	            className={styles.textarea}
                placeholder={placeholder}
	            id={id}
	            name={name}

                value={value}
	            defaultValue={defaultValue}
	            onChange={onChange}
            />
        </label>
    </div>
  )
}

export default Textarea;
