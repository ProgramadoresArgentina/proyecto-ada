import Link from "next/link";
import Image from "next/image";

export default function CarrouselCard( {id, title, description, url}: any ) {
  return (
    <div className="flex flex-col bg-white min-w-[20rem] snap-start w-80 rounded-2xl pb-10 px-6 mt-[4rem]">
        <Image src="/carrousel/proyecto_ada_logo.png" alt="layout"  width={180} height={180} className="m-auto translate-y-[-4rem]"/>
        <div className="flex flex-col gap-2">
        <h3 className="font-bold text-xl">{title + id}</h3>
        <p className="text-sm leading-6">
            {description}
        </p>
        <Link href={url} className="text-green-500 font-bold" >Leer mas &rarr;</Link>
        </div>
    </div>
  )
}
