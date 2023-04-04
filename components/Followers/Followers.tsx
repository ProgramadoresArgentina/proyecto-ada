const Followers = () => {
  return (
    <div className="h-fit  w-fit bg-[#F4F9FF] rounded-br-[150px] md:bg-white">
      <div className="pt-11 pb-11 md:flex md:pt-0 lg:ml-10">
        <div className="ml-8 md:max-w-[35%]">
          <p className="font-semibold  text-[250%] md:text-[170%] lg:text-4xl">
            Nuestra comunidad
          </p>
          <p className="text-xl text-slate-500 mt-6 md:mt-2 w-96 md:text-[80%] md:max-w-[90%]">
            Contamos con personas de todas las regiones de Argentina
          </p>
        </div>
        <div className="xl:pl-56 lg:pl-20 w-screen flex flex-wrap mt-16 md:mt-0 font-semibold text-[200%] md:text-[170%] sm:text-[250%] ml-11 md:w-full">
          <div className="w-1/2 lg:flex-1 md:w-[30%] md:ml-8 lg:pl-0">
            <p>+19.2K </p>
            <p>Instagram</p>
          </div>
          <div className="ml-2 lg:flex-1 md:w-[25%] md:ml-0 md:pl-6 lg:pl-8 xl:pl-20 ">
            <p className="w-36">+10K</p>
            <p>Linkedin</p>
          </div>
          <div className=" w-1/2 mx-auto mt-6 md:mt-0 md:w-[15%] md:mx-0 md:pl-10 lg:flex-1 lg:pl-4 xl:pl-20">
            <p>+5K</p>
            <p>Facebook</p>
          </div>
          <div className="w-1/2 md:w-0"></div>
        </div>
      </div>
    </div>
  );
};
export default Followers;
