import { useState, useEffect } from 'react';
import '@/styles/Popup.scss';

const Popup = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000); // 30 seconds

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {

        setIsVisible(false);
    };

    return (
        isVisible && (
            <div className="popup-container">
                <div
                    className="popup popup-glow" style={{animation: "bounceIn 1s"}}
                    onMouseEnter={() => {
                        const popupElement = document.querySelector('.popup');
                        if (popupElement) {
                            popupElement.classList.remove('popup-glow');
                        }
                    }}
                    onMouseLeave={() => {
                        const popupElement = document.querySelector('.popup');
                        if (popupElement) {
                            popupElement.classList.add('popup-glow');
                        }
                    }}
                >
                    <button className="close-button" onClick={handleClose}>×</button>
                    <p>Hey there, want to help make our website better?</p>
                    <div className="popup-options">
                        <label>
                            <input type="checkbox" />
                            Yeah
                        </label>
                        <label>
                            <input type="checkbox" />
                            No thanks
                        </label>
                    </div>
                </div>
            </div>
        )
    );
};

export default Popup;
