import Parallax from 'parallax-js';

export default function initParallax() {
    const element = document.querySelectorAll('.parallax');
    /* eslint-disable no-unused-vars, no-undef */
    for (let i = 0; i < element.length; i++) {
        // @ts-ignore
        const parallaxInstance = new Parallax(element[i]);
    }
}
