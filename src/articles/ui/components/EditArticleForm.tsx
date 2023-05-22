import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { getArticle } from "../../utils/getArticle";
import { createOrUpdateArticle } from "../../utils/createOrUpdateArticle";
import useUser from "../../../auth/utils/useUser";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

interface Props {
  articleId: string;
}

const EditArticleForm = ({ articleId }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const user = useUser().user;
  const userId = user?.uid;
  const [articleText, setArticleText] = useState("");
  const [articleTeaser, setArticleTeaser] = useState("");
  const [initText, setInitText] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const article = await getArticle(articleId);
      if (article) {
        setArticleTitle(article.title);
        setArticleTeaser(article.teaser);
        setInitText(article.text);
        setArticleText(article.text);
        setIsPublished(article.isPublished);
      }
    };
    fetchData();
  }, [articleId]);

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
        createOrUpdateArticle(userId, articleText, {
          title: articleTitle,
          isPublished: isPublished,
          articleId: articleId,
          teaser: articleTeaser,
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
      {feedback && <p className="success fixed">{feedback}</p>}

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
        value={articleTitle}
        onChange={(e) => {
          setArticleTitle(e.target.value);
        }}
        type="text"
        name="title"
        id="title"
      />

      <label htmlFor="teaser">Teaser:</label>
      {errors && (
        <p className="input-error">
          <ErrorMessage errors={errors} name="teaser" />
        </p>
      )}
      <textarea
        {...register("teaser", {
          maxLength: {
            value: 500,
            message: "Teaser can be max 500 characters long.",
          },
        })}
        value={articleTeaser}
        onChange={(e) => {
          setArticleTeaser(e.target.value);
        }}
        name="teaser"
        id="teaser"
      />

      <br />
      <label htmlFor="text">Text:</label>
      <Editor
        apiKey="wqdbl7tam7xcqrfqkqzadcuohz92r8wm1k9whuemimv8jbbg"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={initText}
        onEditorChange={(content) => {
          setArticleText(content);
          editorRef.current.options.set(
            "save_onsavecallback",
            handleSubmit(() => {
              setError("");
              try {
                if (userId) {
                  createOrUpdateArticle(userId, content, {
                    articleId: articleId,
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
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
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
            "alignright alignjustify | bullist numlist outdent indent | image | emoticons | fullscreen | " +
            "removeformat | code | anchor | insertdatetime | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          skin: "snow",
          content_css: "material-classic",
          // icons: "thin",
          browser_spellcheck: true,
          save_enablewhendirty: true,
          // inline: true,
          // save_onsavecallback: handleSubmit(saveFormData),
          image_list: [
            { title: "1", value: "/pics/1.jpg" },
            { title: "girl with book", value: "/pics/girl-with-book.jpg" },
            {
              title: "book illustration",
              value: "/pics/book-illustration.png",
            },
          ],
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

export default EditArticleForm;
