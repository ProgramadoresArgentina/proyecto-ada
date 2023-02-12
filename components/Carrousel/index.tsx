import Link from "next/link";
import { useRef } from "react";
import CarrouselCard from "./CarrouselCard";

const projects = [
    {
        id: 1,
        title: "Proyecto ADA",
        description: "Nuestro primer proyecto con la comunidad. El proyecto es la creaccion del sitio web programadoresargetina.com",
        url: "/"
    },
    {
        id: 2,
        title: "Proyecto ADA",
        description: "Nuestro primer proyecto con la comunidad. El proyecto es la creaccion del sitio web programadoresargetina.com",
        url: "/"
    },
    {
        id: 3,
        title: "Proyecto ADA",
        description: "Nuestro primer proyecto con la comunidad. El proyecto es la creaccion del sitio web programadoresargetina.com",
        url: "/"
    },
    {
        id: 4,
        title: "Proyecto ADA",
        description: "Nuestro primer proyecto con la comunidad. El proyecto es la creaccion del sitio web programadoresargetina.com",
        url: "/"
    },
    {
        id: 5,
        title: "Proyecto ADA",
        description: "Nuestro primer proyecto con la comunidad. El proyecto es la creaccion del sitio web programadoresargetina.com",
        url: "/"
    },
    {
        id: 6,
        title: "Proyecto ADA",
        description: "Nuestro primer proyecto con la comunidad. El proyecto es la creaccion del sitio web programadoresargetina.com",
        url: "/"
    },
    {
        id: 7,
        title: "Proyecto ADA",
        description: "Nuestro primer proyecto con la comunidad. El proyecto es la creaccion del sitio web programadoresargetina.com",
        url: "/"
    },
    {
        id: 8,
        title: "Proyecto ADA",
        description: "Nuestro primer proyecto con la comunidad. El proyecto es la creaccion del sitio web programadoresargetina.com",
        url: "/"
    },
    {
        id: 5,
        title: "Proyecto ADA",
        description: "Nuestro primer proyecto con la comunidad. El proyecto es la creaccion del sitio web programadoresargetina.com",
        url: "/"
    },
    {
        id: 6,
        title: "Proyecto ADA",
        description: "Nuestro primer proyecto con la comunidad. El proyecto es la creaccion del sitio web programadoresargetina.com",
        url: "/"
    },
    {
        id: 7,
        title: "Proyecto ADA",
        description: "Nuestro primer proyecto con la comunidad. El proyecto es la creaccion del sitio web programadoresargetina.com",
        url: "/"
    },
    {
        id: 8,
        title: "Proyecto ADA",
        description: "Nuestro primer proyecto con la comunidad. El proyecto es la creaccion del sitio web programadoresargetina.com",
        url: "/"
    },
    {
        id: 5,
        title: "Proyecto ADA",
        description: "Nuestro primer proyecto con la comunidad. El proyecto es la creaccion del sitio web programadoresargetina.com",
        url: "/"
    },
    {
        id: 6,
        title: "Proyecto ADA",
        description: "Nuestro primer proyecto con la comunidad. El proyecto es la creaccion del sitio web programadoresargetina.com",
        url: "/"
    },
    {
        id: 7,
        title: "Proyecto ADA",
        description: "Nuestro primer proyecto con la comunidad. El proyecto es la creaccion del sitio web programadoresargetina.com",
        url: "/"
    },
    {
        id: 8,
        title: "Proyecto ADA",
        description: "Nuestro primer proyecto con la comunidad. El proyecto es la creaccion del sitio web programadoresargetina.com",
        url: "/"
    }
]

export default function Carrousel() {
  return (
    <section className="bg-background-vector bg-cover bg-center bg-no-repeat font-poppins pt-28 pb-16 flex flex-col gap-6 items-center justify-center" >
        <h2 className="text-4xl font-bold tracking-tight">Proyectos de la comunidad</h2>
        <h3 className="text-xl">Descripcion sobre los proyectos</h3>
        <div className="flex overflow-x-hidden max-w-5xl"> {/* container */}
          <div className="flex gap-8 justify-start items-center w-full snap-x transition-transform">
              {projects.map(({id, title, description, url}) => <CarrouselCard key={id} id={id} title={title} description={description} url={url} />)}
          </div>
        </div>
        <div className="flex gap-4">
            {
                projects.map((p,index) => {
                    if(index % 3 == 0 ) return <button key={index} className={`rounded-full w-3 h-3 ${index === 0 ? "bg-blue-500" : "bg-blue-200"}`}></button>
                })
            }
        </div>
        <Link href="/" className="px-6 py-3 rounded-lg bg-shadeBlue text-white text-sm">Inscribirse a proyectos 🎉</Link>
    </section>
  )
}
