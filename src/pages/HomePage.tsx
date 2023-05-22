import { Helmet } from "react-helmet-async";
import ArticlesCardsList from "../articles/ui/components/ArticlesCardsList";
import Hero from "../ui/Hero";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>FATE - a Site for "Fables And Tales Enthusiasts"</title>

        <meta
          name="description"
          content="Discover a vibrant community of hobby authors sharing captivating fanfictions and exclusive previews of unpublished book projects. Explore aspiring authors' hidden gems, enjoy sneak peeks of upcoming books, and embark on literary journeys that ignite your imagination. Join us to read, connect, and support emerging authors as they share their creative talents with the world."
        />
      </Helmet>

      <Hero />
      <h2 className="hr hr-glow">What's New?</h2>
      <div className="content">
        <ArticlesCardsList limit={4} />
      </div>
    </>
  );
};

export default HomePage;
