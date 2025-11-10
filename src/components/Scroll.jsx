import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import React from 'react'

const Scroll = ({bgColor}) => {
    gsap.registerPlugin(ScrollTrigger)

    useGSAP(() => {

        window.addEventListener("mousemove", (e) => {
            gsap.to(".container", {
                x: - (e.clientY) * 0.5,
            })
            gsap.to(".logo", {
                rotate: (e.clientY),
            })
        })
    })
        return (
        <>
            <div className="container absolute w-[500vw] h-full left-0 top-0">
                <div style={{ padding: "4px 0" }} className={`moving-container transform -translate-x-[500px] ${bgColor} left-0 top-0 w-[500vw] h-full flex gap-10`}>
                    {Array.from({ length: 500 }).map((_, i) => (
                        <img
                            key={i}
                            src="src/assets/svg/ICON.svg"
                            alt=""
                            className="logo h-full w-auto"
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Scroll
