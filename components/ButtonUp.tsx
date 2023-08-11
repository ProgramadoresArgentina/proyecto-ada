import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ButtonUp: React.FC = () => {
    const [showButton, setShowButton] = useState(false);
    const [scrollPercentage, setScrollPercentage] = useState(0);

    const handleScroll = () => {
        const scrolled = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const percentage = (scrolled / windowHeight) * 100;
        setScrollPercentage(percentage);
        setShowButton(scrolled > 200); // Mostrar el botón solo cuando el scroll es mayor a 200px
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {showButton && (
                <div className="scroll-up-button" onClick={scrollToTop}
                    data-tooltip-id="tooltip" data-tooltip-content="Volver arriba"
                    style={{ background: `conic-gradient(#008fff ${scrollPercentage}%, rgba(192, 192, 255, .5) ${scrollPercentage}%)` }}>
                    <span><FaArrowUp /></span>
                </div>
            )}
        </>
    );

}
export default ButtonUp