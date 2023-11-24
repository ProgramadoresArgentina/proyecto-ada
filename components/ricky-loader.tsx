import Image from "next/image"

const RickyLoader = () => {
    return (
        <div className="flex flex-row items-center gap-5 justify-center">
            <Image src="https://media.taringa.net/knn/identity/Z3M6Ly9rbjMvdGFyaW5nYS9DLzUvRC9DLzYvRS9FMEEuZ2lm"
            alt="ricky fort programadores argentina" width={50} height={50} />
            <h4 className="m-0 text-white">Cargando contenido...</h4>
        </div>
    )
}

export default RickyLoader;