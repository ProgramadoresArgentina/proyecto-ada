import React, { FC } from "react";
import { ContactForm } from "./ContactForm";
import { ContactTexts } from "./ContactTexts";
import { motion } from "framer-motion"

export const ContactSection: FC = () => (
	<section id="contact" className="w-full py-4 h-auto bg-[#161B22] relative">
        <div
            className="m-auto max-w-[1150px] px-4 flex flex-col justify-start items-start text-white font-manrope
            min-[950px]:h-60 min-[950px]:min-h-[350px] min-[950px]:px-8 min-[950px]:flex-row min-[950px]:items-center
            lg:px-14 
            ">
                <motion.div
                    style={{width: "100%"}}
                    transition={{duration: 1}}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}>
                    <ContactTexts />
                </motion.div>
                <motion.div
                    style={{width: "100%"}}
                    transition={{duration: 1}}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}>
                    <ContactForm />
                </motion.div>
        </div>
	</section>
);
