import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

const GoTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const listenToScroll = () => {
        let heightToHidden = 250;
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        if (winScroll > heightToHidden) {
            setIsVisible(true);
        }
        else {
            setIsVisible(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', listenToScroll);
    }, []);

    const goToBtn = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
    return (
        <>
            {isVisible && (
                <div className=' bg-violet-900 dark:bg-white dark:text-black text-white w-10 h-10 flex justify-center items-center rounded-[100%] cursor-pointer fixed bottom-[5rem] md:right-[5rem] right-6 z-50 overflow-hidden' onClick={goToBtn}>
                    <FontAwesomeIcon icon={faArrowUp} className='createdanimation' />
                </div>
            )}
        </>
    )
}

export default GoTop
