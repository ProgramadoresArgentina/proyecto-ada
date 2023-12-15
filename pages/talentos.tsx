import React, { useEffect, useState } from 'react'
import TalentsMarquee from '../components/TalentsSection/TalentsMarquee'
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const talents = () => {
    const [init, setInit] = useState(false);


    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            //await loadAll(engine);
            //await loadFull(engine);
            await loadSlim(engine);
            //await loadBasic(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesOptions = {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            }
        }
    };

    return (
        <div className="w-full py-6 bg-gradient-to-r from-zinc-900 to-slate-900 mt-12">
            {init &&
                <Particles
                    id="tsparticles"
                    options={{
                        pauseOnBlur: false,
                        interactivity: {
                            events: {
                                onHover: {
                                    enable: true,
                                    mode: "bubble"
                                },
                            },
                            modes: {
                                bubble: {
                                    distance: 40,
                                    duration: 2,
                                    opacity: 8,
                                    size: 6,
                                    speed: 3
                                }
                            }
                        },
                        particles: {
                            color: {
                                value: ["#4285f4", "#34A853", "#FBBC05", "#EA4335"]
                            },
                            links: {
                                color: "random",
                                distance: 40,
                                enable: true,
                                opacity: 0.8,
                                width: 1
                            },
                            move: {
                                direction: "none",
                                enable: true,
                                outModes: "bounce",
                                speed: 1
                            },
                            number: {
                                value: 200
                            },
                            opacity: {
                                animation: {
                                    enable: true,
                                    speed: 2,
                                    sync: false
                                },
                                value: { min: 0.3, max: 0.8 }
                            },
                            shape: {
                                type: "circle"
                            },
                            size: {
                                value: 1
                            }
                        },
                        polygon: {
                            draw: {
                                enable: true,
                                stroke: {
                                    color: "#fff",
                                    opacity: 0.2,
                                    width: 1
                                }
                            },
                            enable: true,
                            move: {
                                radius: 5
                            },
                            position: {
                                x: 30,
                                y: 10
                            },
                            inline: {
                                arrangement: "equidistant"
                            },
                            scale: 1,
                            type: "inline",
                            url: "https://particles.js.org/images/google.svg"
                        },
                        background: {
                            color: "#000000",
                            image: "",
                            position: "50% 50%",
                            repeat: "no-repeat",
                            size: "cover"
                        }
                    }
                    }
                />
            }
            <div className="z-10 relative pt-10">
                <h1 className="text-4xl font-bold text-center text-white">Bolsa de
                    <span className="degrade-text"> talentos</span>
                </h1>
                <TalentsMarquee />
            </div>
        </div>
    )
}
export default talents