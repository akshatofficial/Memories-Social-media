import React, {useState} from 'react';

import scrollIcon from '../../images/scrollIcon.png';

import './style.css';

const ScrollToTop = () => {

    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled <= 300) {
            setVisible(false);
        } else if (scrolled > 300) {
            setVisible(true);
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    window.addEventListener("scroll", toggleVisible);

    return (
        <div className={"scrollToTop"} style={{display: visible ? "inline" : "none"}}>
            <img
                style={{height: "50px", width: "50px"}}
                onClick={scrollToTop}
                src={scrollIcon}
                alt={"Scroll Icon"}
            />
        </div>
    );
};

export default ScrollToTop;