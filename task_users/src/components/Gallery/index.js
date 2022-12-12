import clsx from 'clsx';
import styles from './Gallery.module.scss'
import {Image} from '../../components'

const Gallery = ({}) => {
    return (
        <div className={styles.gallery}>
	        <h1>Gallery</h1>
            <div className={styles.galleryBlock}>
                <div className={styles.galleryImg}>
                    <Image src={'https://doshkolniki.org/images/vospitanie/ekologicheskoe/klassifikaciya-zhivotnyx-1901.jpg'} alt={'Фото 1'} width={800} height={600} />
                </div>
                <div className={styles.galleryImg}>
                    <Image src={'https://www.zoopicture.ru/assets/2020/10/01.jpg'} alt={'Фото 2'} width={600} height={444} />
                </div>
                <div className={styles.galleryImg}>
                    <Image src={'https://zagge.ru/wp-content/uploads/2018/09/1514537968163323735.jpg'} alt={'Фото 3'} width={960} height={642} />
                </div>
                <div className={styles.galleryImg}>
                    <Image src={'https://www.krugosvet.ru/sites/krugosvet.ru/files/img00/1000302_PH01352.jpg'} alt={'Фото 4'} width={615} height={420} />
                </div>
            </div>
        </div>
    )
}

export default Gallery;
