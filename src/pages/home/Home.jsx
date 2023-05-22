import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="pt-navtop dark:bg-darkbg h-screen dark:text-darktext flex flex-col justify-center items-center">
      <h2>Coming soon...</h2>
      <Link to="/product" className="text-primary hover:underline">
        view products
      </Link>
    </div>
  );
};

export default Home;
