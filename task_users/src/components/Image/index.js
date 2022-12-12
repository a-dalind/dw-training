import styles from './Image.module.scss';

const Image = ({
    src,
    alt,
    width,
    height,
}) => {

  return (
    <img className={styles.img} src={src} alt={alt} width={width} height={height} />
  )
}

export default Image;