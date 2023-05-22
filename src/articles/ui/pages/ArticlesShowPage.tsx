import ArticlesCardsList from "../components/ArticlesCardsList";

const ArticlesShowPage = () => {
  return (
    <div className="content">
      <h1 className="hr">What's New</h1>
      <ArticlesCardsList limit={6} />
    </div>
  );
};

export default ArticlesShowPage;
