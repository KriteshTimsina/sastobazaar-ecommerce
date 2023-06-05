import { Link } from "react-router-dom";
import Swiper from "../../components/Swiper";
import Offers from "../../components/Offers";
import Footer from "../../components/Footer";
const Home = () => {
  return (
    <div className="min-h-screen pt-14 md:pt-12 dark:bg-darkbg dark:text-darktext ">
      <Swiper />
      <div className="mt-4 w-full mx-auto  flex flex-wrap sm:gap-2.5 justify-center items-center">
        <section className="relative flex flex-col">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybHMlMjBqd2VsZXJ5JTIwc2hvcHBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
            alt="Womens's wear"
            className="mb-10 w-[350px] md:[400px] brightness-50 transition-all hover:cursor-pointer"
          />
          <div className="absolute flex flex-col items-start w-full gap-4 pl-5 text-xl text-center text-white bottom-1/4 md:bottom-1/3 md:items-center">
            <h1 className="text-2xl">Womenswear</h1>
            <Link
              to="/product"
              className="px-2 py-1 text-black transition-all bg-white rounded-sm hover:bg-primary hover:scale-105 hover:text-white"
            >
              SHOP NOW
            </Link>
          </div>
        </section>
        <section className="relative flex flex-col">
          <img
            src="https://images.unsplash.com/photo-1577511757985-6c9f8518fc7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbiUyMHNob3BwaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
            alt="mens's wear"
            className="mb-10 w-[350px] md:[400px] brightness-50 transition-all hover:cursor-pointer"
          />
          <div className="absolute flex flex-col items-start w-full gap-4 pl-5 text-xl text-center text-white bottom-1/4 md:bottom-1/3 md:items-center">
            <h1 className="text-2xl">Menswear</h1>
            <Link
              to="/product"
              className="px-2 py-1 text-black transition-all bg-white rounded-sm hover:bg-primary hover:scale-105 hover:text-white"
            >
              SHOP NOW
            </Link>
          </div>
        </section>
        <section className="relative flex flex-col">
          <img
            src="https://images.unsplash.com/photo-1617117811969-97f441511dee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amV3ZWxlcnl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
            alt="jewelery"
            className="mb-10 w-[350px] md:[400px] brightness-50 transition-all hover:cursor-pointer"
          />
          <div className="absolute flex flex-col items-start w-full gap-4 pl-5 text-xl text-center text-white bottom-1/4 md:bottom-1/3 md:items-center">
            <h1 className="text-2xl">Perfect Jewelery</h1>
            <Link
              to="/product"
              className="px-2 py-1 text-black transition-all bg-white rounded-sm hover:bg-primary hover:scale-105 hover:text-white"
            >
              SHOP NOW
            </Link>
          </div>
        </section>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-3xl italic font-bold uppercase">Sasto Bazaar</h2>
        <p className="text-lg">One stop for your needs</p>
      </div>
      <Offers />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
