import { useState, useEffect } from 'react';

const ButtonUp: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = (): void => {
        if (window.pageYOffset > 300) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }

    const handleClick = (): void => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility)

        return () => {
            window.removeEventListener('scroll', toggleVisibility)
        }
    }, [])
    return (

        <button className={`${isVisible ? "bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded fixed bottom-1 right-1"
            : "hidden"}`}
            onClick={() => handleClick()}
        >
            Arriba
        </button>

    )
}
export default ButtonUp