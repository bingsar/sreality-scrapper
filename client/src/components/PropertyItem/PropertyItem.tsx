import s from './PropertyItem.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface PropertyItemProps {
    id: number;
    title: string;
    images: string[];
    key: number;
}

const PropertyItem = ({ id, title, images }: PropertyItemProps) => {
    return (
        <div key={id} className={s.wrapper}>
            <fieldset className={s.field}>
                <legend className={s.title}>{title}</legend>
                <Swiper
                    spaceBetween={20}
                    slidesPerView={'auto'}
                    className="propertySwiper"
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img src={image} alt={title} />
                        </SwiperSlide>
                    ))}

                </Swiper>
            </fieldset>
        </div>
    )
}

export default PropertyItem