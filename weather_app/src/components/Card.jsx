import React, { useState } from 'react'
import Weather from './Weather';

const Card = () => {

    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    return (
        <div className='card_main_container flex justify-center items-center mx-3'>
            <div className={darkMode ? `bg-zinc-800 flex flex-col justify-between items-center rounded-md p-6 w-[60vw]` : `bg-white flex flex-col justify-center items-center rounded-md p-6 w-[60vw]`}>
                <span className={darkMode ? `text-white text-[3rem]` : 'text-black text-[3rem]'}>Weather App</span>
                <button type='button' className='py-3 px-5 bg-blue-600 text-[#fff] rounded-3xl'
                    onClick={toggleDarkMode}
                >{darkMode ? `Switch to Lightmode` : `Switch to Darkmode`}</button>

                <div className=''><Weather /></div>
            </div>

        </div>
    )
}

export default Card