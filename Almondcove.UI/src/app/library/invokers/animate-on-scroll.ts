import Aos from "aos"

export default function InitAnimateOnScroll(){
    const animationToggle = document.querySelector('[data-aos]')
  
    if (animationToggle === null) return
  
    Aos.init() // eslint-disable-line no-undef
}
  