import React, { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollSmoother } from "gsap/ScrollSmoother"
import Textani from "../components/Textani"
import { useGSAP } from "@gsap/react"
import Scroll from "../components/Scroll"
import "../App.css"
import scrollData from "../json/scrollTexts.json"
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const Home = ({ val }) => {
    const { mainPageHeading, mainPageSideHeading, charactersName, descriptionText, backgroundHuman, backgroundMask, backgroundColor, textColor, selectionColor, mouseColor } = val || {};

    const [x, setX] = useState(50)
    const [y, setY] = useState(50)
    const smootherRef = useRef(null)
    const lightDiv = useRef(null)

    useEffect(() => {
        const handleMouseMove = (e) => {

            const newX = e.clientX
            const newY = e.clientY

            setX(newX)
            setY(newY)
        }

        window.addEventListener("mousemove", handleMouseMove)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    useEffect(() => {
        const pointerHandler = (e) => {
            gsap.to(".mouse", {
                x: e.clientX - window.innerWidth * 0.02,
                y: e.clientY - window.innerWidth * 0.02,
                ease: "power4.out",
                duration: 0.3
            });
        };

        window.addEventListener("mousemove", pointerHandler);

        return () => {
            window.removeEventListener("mousemove", pointerHandler);
        };
    }, []);




    useEffect(() => {
        smootherRef.current = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 5,
            effects: true,
            smoothTouch: 0.1,
        })

        return () => {
            if (smootherRef.current) {
                smootherRef.current.kill()
            }
        }
    }, [])

    // screen appear
    useGSAP(() => {
        const tl = gsap.timeline()
        tl.from([".charecters-name", ".page-heading-container"], {
            x: -500,
            ease: "elastic.inOut",
            duration: 0.5
        })
        tl.from([".discription", ".right-text"], {
            x: 500,
            ease: "elastic.inOut",
            duration: 0.5
        }, "<")

        tl.fromTo([".background-shapes", ".human", ".mask-image"], {
            opacity: 0,
            scale: 0
        },
            {
                opacity: 1,
                scale: 1,
                ease: "elastic.inOut"
            })
    }, [val])


    const smallerMouse = () => {
        gsap.to(".mouse", {
            scale: 0.2,
            ease: "elastic.inOut"
        })
    }
    const normalMouse = () => {
        gsap.to(".mouse", {
            scale: 1,
            ease: "elastic.inOut"
        })
    }


    // mouse effect
    useEffect(() => {
        window.addEventListener("mousemove", (e) => {

            const xVal = e.clientX / window.innerWidth - 0.5
            const yVal = e.clientY / window.innerHeight - 0.5

            gsap.to([".human"], {
                x: xVal,
                duration: 0.4,
                ease: "power3.out"
            })
            gsap.to(".discription", {
                x: xVal * -20,
                y: yVal * 50,
                duration: 0.4,
                ease: "power3.out"
            })
            gsap.to(".text-container", {
                x: xVal * 60,
                y: yVal * -10,
                duration: 0.4,
                ease: "power3.out"
            })
            gsap.to(".charecters-name", {
                x: xVal * 20,
                y: yVal * 40,
                duration: 0.4,
                ease: "power3.out"
            })
            gsap.to(".right-text", {
                x: xVal * 50,
                y: yVal * -30,
                duration: 0.4,
                ease: "power3.out"
            })
            gsap.to(".background-shapes", {
                x: xVal * -10,
                y: yVal * 30,
                duration: 0.4,
                ease: "power3.out"
            })

        })
    }, [])


    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#smooth-content",
                // markers: true,
                start: "top top",
                end: "bottom top",
                scrub: 1,
            }
        })

        tl.fromTo(".background-shapes", { opacity: 1 }, { opacity: 0, duration: 2 })

        tl.to([".human", ".scroller-container"], {
            y: -600,
            ease: "none",
        }, "<")

        tl.to(".mask-image", {
            rotate: 35,
            duration: 2,
            ease: "none",
        }, "<")

        tl.to(".mask-image", {
            x: -300,
            y: -100,
            duration: 1.5,
        }, "-=1.9")

        return () => {
            tl.scrollTrigger?.kill()
            tl.kill()
        }
    }, [val])

    useGSAP(() => {
        gsap.fromTo(".light",
            {
                opacity: 0
            },
            {
                opacity: 1,
                scrollTrigger: {
                    trigger: ".second-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                }
            }
        )
    }, [])

    useGSAP(() => {
        const tl = gsap.timeline(
            {
                scrollTrigger: {
                    trigger: ".second-section",
                    markers: true,
                    scrub: 1,
                    pin: true,
                    start: "top top",
                    end: "bottom top",
                }
            }
        )
        tl.to(".section-two-cont", {
            y: -30,
            backgroundColor: "#030306",
        }, "<")

        tl.from(".svg-img", {
            x: -150,
            opacity: 0,
            scale: 0.5,
        }, ">-=0.2");

        tl.from(".rotor", {
            x: -700,
            opacity: 0,
            scale: 0.5,
            ease: "elastic.out~"
        }, ">-=0.2");

        // console.log(scrollData.length);
        for (let i = 1; i <= scrollData.length; i++) {

            tl.fromTo(`.scroll-text${i}`,
                {
                    y: 0,
                    opacity: 0,
                },
                {
                    y: -300,
                    opacity: 1,
                    ease: "power2.inOut",
                }
            )

            tl.fromTo(`.scroll-text${i}`,
                {
                    x: 0,
                    y: -300,
                },
                {
                    x: -300,
                    y: -900,
                    opacity: 0,
                    ease: "power2.inOut",
                }
            )

            tl.to(".svg-img", {
                rotate: `+=${360 / scrollData.length}`,
                ease: "power2.inOut"
            }, "<")

            tl.to(".rotor", {
                rotate: `+=${-360 / scrollData.length}`,
                ease: "power2.inOut"
            }, "<")
        }


        return () => {
            tl.scrollTrigger?.kill()
            tl.kill()
        }
    }, [])


    return (
        <>
            <style>
                {`
                    .section1::selection {
                        background-color: var(--selection-bg, #ff6b9d);
                        color: var(--selection-text, #ffffff);
                    }
                `}
            </style>
            <div
                id="mouse"
                className="mouse hidden lg:block md:block fixed top-0 left-0 w-[4vw] h-[4vw] rounded-full backdrop-blur-3xl pointer-events-none z-999"
                style={{ backgroundColor: mouseColor }}>
            </div>
            <div className="main-cont relative w-full h-full">
                <div className="mask-image-section fixed top-0 left-0 w-full h-screen z-99 pointer-events-none">
                    <div className="mask-image-container absolute lg:top-[15vh] lg:left-[55%] lg:w-[45vw] lg:h-[90vh] w-screen h-full left-[53%] top-[50%] transform -translate-x-1/2 z-70">
                        <div className="mask-images-main relative w-full h-full">
                            <img src={backgroundMask} alt="" className="mask-image object-cover absolute top-0 left-0" />
                        </div>
                    </div>
                </div>
                <div id="smooth-wrapper" className="smooth-wrapper-class overflow-hidden">
                    <div id="smooth-content" className="smooth-content-class">
                        <section
                            className="section1 h-screen w-full relative"
                            style={{
                                backgroundColor,
                                '--selection-bg': selectionColor,
                                '--selection-text': textColor || '#ffffff'
                            }}
                        >

                            <div className="container-section1 w-full h-screen relative top-0 left-0">

                                {/* shapes */}
                                <div className="background-shapes absolute top-0 left-0 w-full h-full z-1">
                                    <div className="shapes-container relative w-full h-full lg:left-0 lg:top-0 top-[30%] left-[45%]">
                                        <img src="src/assets/images/background/PINK.png" alt="" className="shape-circle absolute lg:w-[60%] lg:left-[50%] transform translate-x-[-50%] lg:h-full object-cover w-screen h-[60%]" />
                                    </div>
                                </div>

                                {/* image */}
                                <div className="image-container absolute lg:bottom-[-5vh] lg:left-[55%] lg:w-[45vw] lg:h-[90vh] bottom-0 w-screen h-[100vw] left-[53%] transform -translate-x-1/2 z-50">
                                    <div className="images-main relative w-full h-full">
                                        <img src={backgroundHuman} alt="" className="human object-cover absolute top-0 left-0" />
                                    </div>
                                </div>

                                {/* heading */}
                                <div className="page-heading-container z-2 relative lg:top-0 lg:left-[10vw] lg:w-[20vw] lg:h-full w-[15vw] -top-[25vh] left-[5vw]">
                                    <div className="text-container flex items-start absolute justify-around font-black text-[5vw] font-[Orbitron] w-full h-[90vh] top-[5vh]">
                                        <div className="side-text lg:text-[0.6vw] text-[2vw] -rotate-90 top-[60vw] left-[15vw] h-fit w-[20vw] relative lg:top-[8vw] lg:w-[10vw] lg:h-fit" style={{ color: '#000000' }}>
                                            <span className="span-text rotate-90 uppercase">{mainPageSideHeading}</span>
                                        </div>
                                        <div className="svg-heading w-full h-full">
                                            <img src={mainPageHeading} alt="heading" className="svg-heading-image top-0 left-0 absolute w-full h-full object-contain" />
                                        </div>
                                    </div>
                                </div>

                                {/* scroll band */}
                                <div className="scroller-container -rotate-3 relative lg:top-[4vw] z-60 lg:left-0 lg:h-[2vw]">
                                    <Scroll bgColor={"bg-[#e41ff6]"} />
                                </div>


                                {/* name of charecter */}
                                <div className="charecters-name lg:block hidden z-2 absolute top-1/2 left-[3vw] w-[10vw] h-[4vw]" style={{ color: '#000000' }}>
                                    <div className="text-container w-full h-full">
                                        <span>{charactersName}</span>
                                    </div>
                                </div>


                                {/* discription */}
                                <div className="discription upper-text z-2 absolute lg:right-[10vw] w-[10vw] h-[5vw] lg:top-[45%] right-[1vw] top-8/10" style={{ color: '#000000' }}>
                                    <div className="upper-text-container w-full h-full font-medium tracking-[0.2vw] text-center lg:text-[0.7vw]
                                    text-[1.5vw]">
                                        <span>
                                            {descriptionText}
                                        </span>
                                    </div>
                                </div>

                                {/* right text */}
                                <div className="right-text z-2 absolute right-0 w-fit h-fit rotate-90 top-[65%] lg:top-1/2" style={{ color: '#000000' }}>
                                    <div className="right-text-container w-full h-full font-medium text-center text-[3vw] lg:text-[1.5vw] tracking-[1.5vw]">
                                        <span>
                                            2025
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>


                        <section
                            className="second-section lg:h-[900vh] lg:w-full h-[900vh] w-full relative"
                            style={{
                                '--selection-bg': selectionColor,
                                '--selection-text': textColor || '#ffffff'
                            }}
                            onMouseEnter={smallerMouse}
                            onMouseLeave={normalMouse}
                        >
                            <div
                                ref={lightDiv}
                                className="light fixed top-0 left-0 w-full h-full z-100 pointer-events-none opacity-0"
                                style={{
                                    background: `radial-gradient(
                                    circle ${window.innerWidth < 640 ? 150 : 500}px at ${x}px ${y}px,
                                    transparent 0px,
                                    transparent ${window.innerWidth < 640 ? 40 : 100}px,
                                    rgba(0, 0, 0, 0.5) ${window.innerWidth < 640 ? 120 : 400}px,
                                    rgba(0, 0, 0, 0.7) ${window.innerWidth < 640 ? 180 : 600}px,
                                    rgba(0, 0, 0, 0.9) ${window.innerWidth < 640 ? 220 : 700}px,
                                    rgba(0, 0, 0, 0.95) ${window.innerWidth < 640 ? 260 : 800}px,
                                    rgba(0, 0, 0, 1) ${window.innerWidth < 640 ? 300 : 1000}px
                                )`,
                                    transition: "background 0.1s ease-out"
                                }}
                            ></div>

                            <div className="section-2-container relative top-0 left-0 w-full h-[105vh]">
                                <div className="section-two-cont relative top-0 left-0 lg:w-full w-full h-full rounded-t-4xl border-t-[1.5vh] border-[#ef26e9] bg-[#0a060d] z-1">

                                    <div className="circle-svg z-2 relative top-0 right-0 w-full h-full">
                                        <div className="svg-container absolute top-[50vh] left-[15vw] w-[30vw] h-[30vw] -translate-y-1/2">
                                            <img src="src/assets/svg/BackgroundCircles01.svg" alt="svg-img" className="svg-img w-full h-full object-cover" />
                                        </div>
                                    </div>

                                    <div className="circle-rotate absolute top-0 left-0 w-full h-full z-50 pointer-events-none">
                                        <div className="rotor-container absolute top-1/2 right-[35vw] w-[80vw] h-[80vw] -translate-y-1/2">
                                            <img src="src/assets/svg/rotor.svg" alt="" className="rotor object-contain w-full h-full" />
                                        </div>
                                    </div>

                                    <div className="scroll-text-div absolute top-0 left-0 w-full h-full">
                                        <div className="scroll-text-content relative w-full h-full">

                                            {
                                                scrollData.map((item, key) => (<div key={key} className={`scroll-text${key + 1} absolute opacity-0 top-[70vh] right-[10vw] w-[20vw] h-fit`}>
                                                    <h2 className="heading text-[4vw] font-bold mb-3 text-white font-[Poppins]">{item.heading}</h2>
                                                    <p className="text-base text-white leading-relaxed font-light">
                                                        {item.content}
                                                    </p>
                                                </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </section>
                        <div className="third-scroll-section bg-transparent relative top-0 left-0 h-screen w-full"></div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Home