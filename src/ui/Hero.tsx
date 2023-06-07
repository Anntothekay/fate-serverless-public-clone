import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero__inner">
        <div className="hero__inner__copy">
          <h1>Welcome!</h1>
          <p>
            Explore aspiring authors' hidden gems, enjoy sneak peeks of upcoming
            books, and embark on literary journeys that ignite your imagination.
            Join us to read, connect, and support emerging authors as they share
            their creative talents with the world.
          </p>
          <Link to="/about" className="btn btn-primary">
            Got curious?
          </Link>
        </div>
        <div className="hero__inner__img"></div>
      </div>
    </div>
  );
};

export default Hero;
