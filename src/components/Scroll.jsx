import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import React, { useEffect } from 'react'

const Scroll = ({ bgColor }) => {
    gsap.registerPlugin(ScrollTrigger)

    useEffect(() => {

        const handleMouseMove = (e) => {
            gsap.to(".container", {
                x: -(e.clientY * 0.5),
                duration: 0.2,
            })
            gsap.to(".logo", {
                rotate: e.clientY,
                duration: 0.2,
                stagger: 0.001,
            })
        }

        const handleWheel = (e) => {
            const moveX = e.deltaY * 0.1
            const rotateLogo = e.deltaY * 0.8

            gsap.to(".container", {
                x: `+=${-moveX}`,
                duration: 0.2,
            })

            gsap.to(".logo", {
                rotate: `+=${rotateLogo}`,
                duration: 0.2,
                stagger: 0.001,
            })
        }

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("wheel", handleWheel)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("wheel", handleWheel)
        }

    }, [])

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
