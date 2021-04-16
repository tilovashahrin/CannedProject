import React from 'react'

const ImageSlider = (sliderData) => {
    return (
        <section class="slider ">
            {sliderData.map((slide, index) => {
                return (
                    <img src={slide.image} alt='podcasts'></img>
                )
            })}
        </section>
    )
}

export default imageSlider
