import EditStoryForm from "../components/EditStoryForm";

interface EditStoryPageProps {
  storyId?: string;
}

const EditStoryPage = ({ storyId }: EditStoryPageProps) => {
  const storyIdProp = storyId || "";
  return (
    <div className="content__fs">
      <h1>Story Editor</h1>
      <EditStoryForm storyId={storyIdProp} />
    </div>
  );
};

export default EditStoryPage;
