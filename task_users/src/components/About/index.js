import clsx from 'clsx';
import styles from './About.module.scss'
import {Image} from '../../components'

const About = ({}) => {
    return (
        <div className={styles.about}>
	        <h1>About us</h1>
            <div className={styles.imgWrapper}>
                <Image src={'https://vjoy.cc/wp-content/uploads/2019/07/1-29.jpg'} alt={'Фото о нас'} width={800} height={533} />
            </div>


        </div>
    )
}

export default About;
