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

        <button className={`${isVisible ? "bg-[#FFFFFF] text-white font-bold py-2 px-4 rounded fixed bottom-5 right-14 border shadow-lg"
            : "hidden"}`} title="Volver arriba"
            onClick={() => handleClick()}
        >
            <img src="https://64.media.tumblr.com/39c0656670e6013bb3806455fd2bf532/tumblr_myzobdh4d51svwlszo1_500.gif" style={{width: 30}} />
        </button>

    )
}
export default ButtonUp