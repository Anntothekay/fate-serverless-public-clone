import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { getStory } from "../../utils/getStory";
import { createOrUpdateStory } from "../../utils/createOrUpdateStory";
import useUser from "../../../auth/utils/useUser";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

interface Props {
  storyId: string;
}

const EditStoryForm = ({ storyId }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const user = useUser().user;
  const userId = user?.uid;
  const [storyText, setStoryText] = useState("");
  const [initText, setInitText] = useState("");
  const [storyTitle, setStoryTitle] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const story = await getStory(storyId);
      if (story) {
        setStoryTitle(story.title);
        setInitText(story.text);
        setIsPublished(story.isPublished);
      }
    };
    fetchData();
  }, []);

  const showFeedbackMessage = (msg: string, timeout = 3000) => {
    setFeedback(msg);
    setTimeout(() => {
      setFeedback("");
    }, timeout);
  };

  const saveFormData = () => {
    setError("");
    try {
      if (userId) {
        createOrUpdateStory(userId, storyText, {
          title: storyTitle,
          isPublished: isPublished,
          storyId: storyId,
        });
        showFeedbackMessage("Successfully updated.");
      }
    } catch (e: any) {
      setError(e.message);
    }
  };

  const editorRef = useRef<any>(null);

  return (
    <form onSubmit={handleSubmit(saveFormData)} className="left">
      {error && <p className="error">{error}</p>}
      {feedback && <p className="success">{feedback}</p>}

      <label htmlFor="title">Title:</label>
      {errors && (
        <p className="input-error">
          <ErrorMessage errors={errors} name="title" />
        </p>
      )}
      <input
        {...register("title", {
          maxLength: {
            value: 500,
            message: "Title can be max 500 characters long.",
          },
        })}
        value={storyTitle}
        onChange={(e) => {
          setStoryTitle(e.target.value);
        }}
        type="text"
        name="title"
        id="title"
      />
      <br />
      <label htmlFor="title">Text:</label>
      <Editor
        apiKey="wqdbl7tam7xcqrfqkqzadcuohz92r8wm1k9whuemimv8jbbg"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={initText}
        onEditorChange={(content) => {
          setStoryText(content);
          editorRef.current.options.set(
            "save_onsavecallback",
            handleSubmit(() => {
              setError("");
              try {
                if (userId) {
                  createOrUpdateStory(userId, content, {
                    storyId: storyId,
                  });
                  showFeedbackMessage("Successfully updated.");
                }
              } catch (e: any) {
                setError(e.message);
              }
            })
          );
        }}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "emoticons",
            // "autolink",
            "lists",
            // "link",
            // "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            // "code",
            "fullscreen",
            "insertdatetime",
            // "media",
            "table",
            // "code",
            "help",
            "wordcount",
            "save",
          ],
          toolbar:
            "save | " +
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | emoticons | fullscreen | " +
            "removeformat | anchor | insertdatetime | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          skin: "snow",
          content_css: "fluent",
          icons: "material",
          browser_spellcheck: true,
          save_enablewhendirty: true,
          // save_onsavecallback: handleSubmit(saveFormData),
        }}
      />
      <br />
      <input
        checked={isPublished}
        onChange={(e) => setIsPublished(e.target.checked)}
        type="checkbox"
        name="isPublished"
        id="isPublished"
      />
      <label htmlFor="isPublished">publish</label>
      <br />
      <br />
      <button name="submitbtn" className="btn  btn-primary">
        Save all changes
      </button>
    </form>
  );
};

export default EditStoryForm;
