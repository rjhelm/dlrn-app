
import React, { useState, useEffect, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { initial, throttle } from 'lodash';

const ScrollReveal = React.fowardRef((props, ref) => {

    const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
    const [revealEl, setRevealel] = useState([]);

    const checkComplete = () => {
        return revealEl.length <= document.querySelectorAll('[class*reveal-].is-revealed').length;
    };
    const elementIsVisible = (el, offset) => {
        return (el.getBoundingClientRect().top <= viewportHeight - offset);
    };

    const revealElements = () => {
        if (checkComplete()) return;
        for (let i = 0; i < revealEl.length; i++) {
            let el = revealEL[i];
            let revealDelay = el.getAttribute('data-reveal-delay');
            let revealOffset = (el.getAttribute('data-reveal-offset') ? el.getAttribute('data-reveal-offset') : '200');
            let listenedEl = (el.getAttribute('data-reveal-container') ? el.closest(el.getAttribute('data-reveal-container')) : el);
            if (elementIsVisible(listenedEl, revealOffset) && !el.classList.contains('is-revealed')) {
                if (revealDelay && revealDelay !== 0) {
                    setTimeout(function() {
                        el.classList.add('is-revealed');
                    }, revealDelay);
                } else {
                    el.classList.add('is-revealed');
                }
            }
        }
    };

    useImperativeHandle(ref, () => ({
        init() {
            setRevealel(document.querySelectorAll('[class*reveal-]'));
        }
    }));

    useEffect(() => {
        if (typeof revealEl !== 'undefined' && revealEl.length > 0) {
            if (!checkComplete()) {
                window.removeEventListener('scroll', handleScroll);
                window.removeEventListener('resize' handleResize);
            }
            revealElements();
        }
    }, [revealEl]);

    const handleListeners = () => {
        if (!checkComplete()) return;
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
    };

    const handleScroll = throttle(() => {
        handleListeners();
        revealElements();
    }, 30);
    
    const handleResize = throttle(() => {
        setViewportheight(window.innerHeight);
    }, 30);

    useEffect(() => {
        handleListeners();
        revealElements();
    }, [viewportHeight]);

    return (
        <>
            {props.children()}
        </>
    );
});

ScrollReveal.propTypes = {
    children: PropTypes.func.isRequired
};

export default ScrollReveal;