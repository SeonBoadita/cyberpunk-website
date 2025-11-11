import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollSmoother } from "gsap/ScrollSmoother"
import Textani from "../components/Textani"
import { useGSAP } from "@gsap/react"
import Scroll from "../components/Scroll"
import scrollData from "../json/scrollTexts.json"
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const Home = ({ val }) => {
    const { mainPageHeading, mainPageSideHeading, charactersName, descriptionText, backgroundHuman, backgroundMask, backgroundColor, textColor, selectionColor, mouseColor } = val || {};

    const smootherRef = useRef(null)


    useEffect(() => {
        const pointerHandler = (e) => {
            gsap.to(".mouse", {
                x: e.clientX - window.innerWidth * 0.02,
                y: e.clientY - window.innerWidth * 0.02,
                ease: "power4.out",
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
    }, [])

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

        tl.fromTo([".background-shapes", ".human", ".mask"], {
            opacity: 0,
            scale: 0
        },
            {
                opacity: 1,
                scale: 1,
                ease: "elastic.inOut"
            })
    })



    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".mask",
                // markers: true,
                start: "top-=450vh top",
                end: "bottom+=275vh top",
                pin: true,
                scrub: true
            }

        })

        tl.fromTo(".background-shapes", { opacity: 1 }, { opacity: 0 })

        tl.to([".human", ".scroller-container"], {
            y: -600,
            ease: "power1.out",
            duration: 10
        })
        tl.to(".mask", {
            rotate: 10,
            y: -100,
            duration: 10
        }, "<")
        tl.to(".mask", {
            display: "none",
        })
        return () => {
            tl.kill() // kills when component unmounts or effect re-runs
        }
    })



    useEffect(() => {
        window.addEventListener("mousemove", (e) => {

            const xVal = e.clientX / window.innerWidth - 0.5
            const yVal = e.clientY / window.innerHeight - 0.5

            gsap.to([".human", ".mask"], {
                x: xVal * 30,
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
    })

    useGSAP(() => {
        const tl = gsap.timeline(
            {
                scrollTrigger: {
                    trigger: ".second-section",
                    markers: true,
                    scrub: true,
                    pin: true,
                    start: "top-=2.5vh top",
                    end: "bottom top",
                }
            }
        )
        tl.to(".mask-2", {
            display: "block",
        })
        tl.to(".section-two-cont", {
            y: -30,
            backgroundColor: "#030306",
        }, "<")

        // 1
        tl.to(".mask-2", {
            rotate: 10,
            x: -300,
            y: 90,
            duration: 2,
        });

        tl.from(".svg-img", {
            opacity: 0,
            scale: 0.5,
        }, ">-=0.2");

        tl.from(".rotor", {
            opacity: 0,
            scale: 0.5,
            ease: "elastic.out"
        }, ">-=0.2");

        // console.log(scrollData.length);
        for (let i = 1; i <= scrollData.length; i++) {
            tl.to(`.scroll-text${i}`, {
                y: -300,
                opacity: 1,
                ease: "power2.inOut",
                duration: 1
            });
            tl.to(`.scroll-text${i}`, {
                x: -300,
                y: -900,
                display: "none",
                opacity: 0,
                ease: "power2.inOut",
                duration: 1
            });
            tl.to(".svg-img", {
                rotate: `+=${360 / scrollData.length}`,
                ease: "power2.inOut"
            }, "<");
            tl.to(".rotor", {
                rotate: `+=${-360 / scrollData.length}`,
                ease: "power2.inOut"
            }, "<");

            // Mask levitation effect
            tl.to(".mask-2", {
                y: i % 2 === 0 ? 70 : 90,
                x: i % 2 === 0 ? -320 : -280,
                ease: "power2.inOut",
                duration: 0.5
            }, "<");
        }

    })


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
                className="mouse fixed top-0 left-0 w-[4vw] h-[4vw] rounded-full backdrop-blur-3xl pointer-events-none z-999"
                style={{ backgroundColor: mouseColor }}>
            </div>

            <div id="smooth-wrapper" className="overflow-hidden">
                <div id="smooth-content">
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
                                <div className="shapes-container relative w-full h-full left-0 top-0">
                                    <img src="src/assets/images/background/PINK.png" alt="" className="shape-circle absolute w-[60%] left-[50%] transform translate-x-[-50%] h-full object-cover" />
                                </div>
                            </div>

                            {/* image */}
                            <div className="image-container absolute bottom-[-5vh] left-[55%] w-[45vw] h-[90vh] transform -translate-x-1/2 z-50">
                                <div className="images-main relative w-full h-full">
                                    <img src={backgroundHuman} alt="" className="human object-cover absolute top-0 left-0" />
                                </div>
                            </div>

                            <div className="image-container absolute bottom-[-5vh] left-[55%] w-[45vw] h-[90vh] transform -translate-x-1/2 z-70">
                                <div className="images-main relative w-full h-full">
                                    <img src={backgroundMask} alt="" className="mask object-cover absolute top-0 left-0" />
                                </div>
                            </div>

                            {/* heading */}
                            <div className="page-heading-container z-2 p-2.5 relative top-0 left-[10vw] w-[20vw] h-full">
                                <div className="text-container flex items-start absolute justify-around font-black text-[5vw] font-[Orbitron] w-full h-[90vh] top-[5vh]">
                                    <div className="side-text text-[0.6vw] -rotate-90 relative top-[8vw] w-[10vw] h-fit">
                                        <span className="span-text rotate-90 uppercase">{mainPageSideHeading}</span>
                                    </div>
                                    <div className="svg-heading w-full h-full">
                                        <img src={mainPageHeading} alt="heading" className="svg-heading-image top-0 left-0 absolute w-full h-full object-contain" />
                                    </div>
                                </div>
                            </div>

                            {/* scroll band */}
                            <div className="scroller-container -rotate-3 relative top-[4vw] z-60 left-0 h-[2vw]">
                                <Scroll bgColor={"bg-[#e41ff6]"} />
                            </div>


                            {/* name of charecter */}
                            <div className="charecters-name z-2 absolute top-1/2 left-[3vw] w-[10vw] h-[4vw]">
                                <div className="text-container w-full h-full">
                                    <span>{charactersName}</span>
                                </div>
                            </div>

                            {/* discription */}
                            <div className="discription upper-text z-2 absolute right-[10vw] w-[10vw] h-[5vw] top-[45%]">
                                <div className="upper-text-container w-full h-full font-medium tracking-[0.2vw] text-center text-[0.7vw]">
                                    <span>
                                        {descriptionText}
                                    </span>
                                </div>
                            </div>

                            {/* right text */}
                            <div className="right-text z-2 absolute right-2 w-fit h-fit rotate-90 top-1/2">
                                <div className="right-text-container w-full h-full font-medium text-center text-[1.5vw] tracking-[1.5vw]">
                                    <span>
                                        2025
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>


                    <section
                        className="second-section h-[900vh] w-full relative"
                        style={{
                            '--selection-bg': selectionColor,
                            '--selection-text': textColor || '#ffffff'
                        }}
                    >
                        <div className="section-2-container relative top-0 left-0 w-full h-screen">
                            <div className="section-two-cont relative top-0 left-0 w-full h-full rounded-t-4xl backdrop-blur-2xl bg-[#0a060d] border-t-[1.5vh] border-[#ef26e9] z-1">
                                <div className="image-container-2 absolute rotate-10 bottom-[9.4vh] left-[55%] w-[45vw] h-[90vh] transform -translate-x-1/2 z-70">
                                    <div className="images-main-2 relative w-full h-full">
                                        <img src={backgroundMask} alt="" className="mask-2 hidden object-cover absolute top-0 left-0" />
                                    </div>
                                </div>
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
                                            scrollData.map((item, key) => (<div key={key} className={`scroll-text${key + 1} absolute opacity-0 top-[70vh] right-[10vw] w-[20vw] h-fit p-4`}>
                                                <h2 className="heading text-[4vw] font-bold mb-3 text-white font-[Poppins]">{item.heading}</h2>
                                                <p className="text-base text-white leading-relaxed font-light">
                                                    {item.content}
                                                </p>
                                            </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="text-section2 z-2 relative top-0 right-0 w-full h-full">
                                </div>
                            </div>
                        </div>

                    </section>
                    <div className="third-scroll-section bg-transparent relative top-0 left-0 h-screen w-full"></div>
                </div>
            </div>
        </>
    )
}
//#0a060d
export default Home