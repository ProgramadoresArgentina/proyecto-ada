//recibe: un array con hashtags(strings), y una lista de blogs(array de objetos) que incluyan estos hashtags,
//devuelve: la lista de blogs ordenada de mayor a menor, basandose en cantidad de coincidencias
//entre los hashtags de cada blog y la lista de hashtags.

export default function blogsSort(hashtags: string[], blogs: any){

    const hashtagMatches = {};

    for(const blog of blogs){

        const names = blog.hashtags.map(tag => tag.name); //obtenemos los hashtags del blog

        const matches = names.filter(tag => hashtags.includes(tag)).length; //obtenemos la cantidad de matcheos entre tags
        
        hashtagMatches[blog.id] = matches; //guardamos como key: id del blog, value: cantidad de matcheos
    }

    blogs.sort((a,b) => {
        const tagA = hashtagMatches[a.id];//para el sort, le damos a cada id de los blogs a comparar, el valor de la cantidad de matcheos.
        const tagB = hashtagMatches[b.id];

        return tagB - tagA

    })

    return blogs;

}