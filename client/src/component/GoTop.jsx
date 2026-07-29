import React, { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

const GoTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const listenToScroll = () => {
        let heightToHidden = 250;
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        setIsVisible(winScroll > heightToHidden);
    }

    useEffect(() => {
        window.addEventListener('scroll', listenToScroll);
        return () => window.removeEventListener('scroll', listenToScroll);
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
                <button
                    onClick={goToBtn}
                    className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-110 transition-all duration-300 flex items-center justify-center"
                    aria-label="Go to top"
                >
                    <ArrowUp className="w-5 h-5" />
                </button>
            )}
        </>
    )
}

export default GoTop
