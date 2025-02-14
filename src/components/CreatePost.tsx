import { useState } from "react";
import { usePostContext } from "../context/PostContext";
import { FaImage, FaSmile } from "react-icons/fa";
import { MdGif } from "react-icons/md";
import userPfp from "../assets/user-pfp.png";

const CreatePost = () => {
  const { addPost } = usePostContext();
  const [text, setText] = useState("");
  const [media, setMedia] = useState<string | undefined>(undefined);
  const [isGif, setIsGif] = useState(false);

  const handleMediaUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "gif"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMedia(reader.result as string);
        setIsGif(type === "gif");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!text.trim() && !media) return;

    addPost({
      profilePic: "/assets/user-pfp.png",
      name: "New User",
      username: "@newuser",
      content: text,
      hashtags: text.match(/#\w+/g) || [],
      image: media || undefined,
      likes: 0,
    });

    setText("");
    setMedia(undefined);
    setIsGif(false);
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700 p-4 rounded-xl shadow-md transition-all duration-300">
      <div className="flex space-x-3">
        {/* Profile Picture */}
        <img src={userPfp} alt="User" className="w-10 h-10 rounded-full" />
        {/* Post Input Section */}
        <div className="flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What is happening?!"
            className="w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-lg outline-none resize-none p-2 rounded-md transition-all duration-300"
            rows={2}
          />

          {/* Media Preview */}
          {media && (
            <img
              src={media}
              alt={isGif ? "GIF Preview" : "Image Preview"}
              className="mt-2 rounded-lg w-full max-h-60 object-cover"
            />
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex space-x-3 text-blue-500">
              <label>
                <FaImage className="cursor-pointer text-xl" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleMediaUpload(e, "image")}
                  className="hidden"
                />
              </label>

              <label>
                <MdGif className="cursor-pointer text-xl" />
                <input
                  type="file"
                  accept="image/gif"
                  onChange={(e) => handleMediaUpload(e, "gif")}
                  className="hidden"
                />
              </label>

              <button onClick={() => {}}>
                <FaSmile className="cursor-pointer text-xl" />
              </button>
            </div>

            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full font-semibold disabled:opacity-50 transition-all duration-300"
              disabled={!text.trim() && !media}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
