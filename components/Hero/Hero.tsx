import { FC } from "react";
import { Hero_Avatars } from "./Hero_Avatars";
import { Hero_Button } from "./Hero_Button";
import { Hero_Image } from "./Hero_Image";
import { Hero_Paragraph } from "./Hero_Paragraph";
import { Hero_Pattern } from "./Hero_Pattern";
import { Hero_Title } from "./Hero_Title";
import ProjectsSection from "../ProjectsSection";
import { commentsList } from '../../data/dummy-data'
import { CommentsSection } from "../CommentsSection/CommentsSection";
import Link from "next/link";

export const Hero: FC = () => (
    <section className="m-auto md:w-full min-h-max flex flex-col items-center bg-gradient-to-r
    from-indigo-900 via-indigo-800 to-indigo-900 pt-32 pb-28 relative">
        <div className="absolute w-full h-full z-0"
    style={{backgroundImage: 'url("http://demo.tophivetheme.com/metafans/wp-content/uploads/2022/08/bg.png")',
    backgroundPosition: 'center center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat',
    top: 0, left: 0}}></div>
    <div className="z-10 text-center">
        <h5 className="text-[10px] md:text-[20px] sm:w-[80%] m-auto
        text-white font-roboto tracking-[5px]">ESPACIO PARA PROGRAMADORES Y PERSONAS DEL MUNDO IT⚡️</h5>
        
        <h5 className="mt-5 m-auto p-0 text-[3rem] text-white font-jost font-bold sm:w-[20ch] md:w-[30ch]">
            La mejor manera de predecir el futuro es implementarlo 
        </h5>
        {/* <span className="text-[1rem] text-indigo-100">Alan Kay</span> */}
        <div>
			<button className="bg-shadeBlue hover:bg-shadeBlueHover ease-in duration-100 text-white font-normal tracking-tight md:tracking-normal text-xs min-[360px]:text-sm md:text-base rounded-full py-3 mt-10 px-8 ">
                <Link href="/blog">Ir al blog</Link>
			</button>
			<button className="bg-gray-800 hover:bg-gray-700 ease-in duration-100 text-white font-normal tracking-tight md:tracking-normal text-xs min-[360px]:text-sm md:text-base rounded-full py-3 mt-10 px-8 ml-5">
                Quiero ser parte del próximo proyecto 🎉
			</button>
        </div>
    </div>
    <div className="w-full mt-[6rem] mb-10">
        <CommentsSection commentsList={commentsList} />
    </div>
    </section>
);


	{/* <section className="m-auto md:w-full min-h-max flex flex-col justify-start  items-center pt-2 md:pt-8 pb-20 md:pb-36 pl-2 sm:pl-5 md:pl-0">
		<div className=" w-full h-auto flex flex-row justify-start items-start relative pl-8">
			<div className="w-full md:w-1/2 h-auto flex flex-col justify-start items-start gap-2 my-5 md:pt-6 lg:pt-1 pl-2 min-[360px]:pl-5 ">
				<Hero_Title />
				<Hero_Paragraph />
				<Hero_Avatars followers={20} />
				<Hero_Button />
				<Hero_Pattern />
			</div>
			<Hero_Image />
		</div>
	</section> */}
