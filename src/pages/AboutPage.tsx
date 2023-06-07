import { NavLink } from "react-router-dom";
const AboutPage = () => {
  return (
    <div className="content article">
      <h1 className="mb-2em">
        FATE - A Place for Fables And Tales Enthusiasts
      </h1>
      <div className="content-box mb-4em">
        <p>
          FATE is a platform that aims to bring together readers and writers in
          a warm and inviting community. Our goal is to provide a cozy space
          where enthusiasts of fables and tales can connect, share their
          passion, and foster meaningful relationships.
        </p>
        <img
          src="/images/icons/cozy.svg"
          alt="roasting marshmallows giving off a cozy feeling"
          width={100}
          height={100}
        />
      </div>
      <div className="content-box icon-right mb-4em">
        <p>
          The project was born out of a love for web development and
          storytelling. As the creative catalyst behind FATE, Annkay, a single
          mom with a youthful spirit and a passion for fantasy and sci-fi,
          embarked on a quest to combine her skills and interests. With FATE,
          she aims to create a platform where writers can unleash their
          creativity and readers can discover hidden gems.
        </p>
        <img
          src="/images/icons/treasure.svg"
          alt="a treasure box holding many hidden gems"
          width={100}
          height={100}
        />
      </div>
      <div className="content-box mb-4em">
        <p>
          FATE aims to offer a delightful user experience with features designed
          to enhance the writing and reading journey. Powered by React.js and
          Firebase, the platform currently incorporates a serverless website,
          user control and authentication, and a cloud database for managing
          user and article data.
        </p>
        <img
          src="/images/icons/cloud.svg"
          alt="a green cloud with a checkmark hinting at cloud technology"
          width={100}
          height={100}
        />
      </div>
      <div className="content-box icon-right mb-4em">
        <p>
          At FATE, we envision more than just a website. We strive to build a
          vibrant community by fostering connections among like-minded
          individuals. Our long-term plans include exploring monetization
          options to support authors and implementing features such as messaging
          systems, chat forums, and Discord integration.
        </p>
        <img
          src="/images/icons/telescope.svg"
          alt="a telescope pointing to the stars"
          width={100}
          height={100}
        />
      </div>
      <div className="content-box mb-4em">
        <p>
          Join us at FATE, whether you're an avid reader seeking new worlds to
          explore or an aspiring writer yearning to share your tales. Together,
          let's kindle the fires of creativity, forge lasting connections, and
          embark on an unforgettable literary odyssey.
        </p>
        <img
          src="/images/icons/sword.svg"
          alt="a sword to take with on adventures"
          width={100}
          height={100}
        />
      </div>
      <div className="center mb-3em">
        <NavLink to="/signup" className={"btn btn-primary"}>
          Join us at FATE!
        </NavLink>
      </div>
    </div>
  );
};

export default AboutPage;
