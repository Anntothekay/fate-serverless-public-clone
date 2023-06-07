import { getAllStoriesFromAuthor } from "../../utils/getAllStoriesFromAuthor";
import useUser from "../../../auth/utils/useAuth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Story {
  id: string;
  title?: string;
  author?: string;
  text?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserArticlesPage = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const user = useUser().user;
  const userId = user?.uid;

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const data = await getAllStoriesFromAuthor(userId);
        setStories(data);
      }
    };
    fetchData();
  }, [userId]);
  return (
    <div className="content">
      <ul>
        {stories.map((story: Story) => (
          <Link key={story.id} to={`/stories/edit/${story.id}`}>
            <li>{story.title}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default UserArticlesPage;
