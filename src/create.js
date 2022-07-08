import { useState } from "react";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom";
const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");
  const [isLoading, SetIsLoading] = useState(false);
  const history = useHistory();
  const { data: blogs } = useFetch("http://localhost:8000/blogs");
  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };
    SetIsLoading(true);
    fetch("http://localhost:8000/blogs/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      console.log("new blog added");
      SetIsLoading(false);
      history.push("/");
    });
  };

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog author:</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          {blogs &&
            blogs
              .filter((blogToFilter, index) => {
                const foundIndex = blogs.findIndex(
                  (blogToFind) => blogToFilter.author === blogToFind.author
                );
                return foundIndex === index;
              })
              .map((blog, i) => (
                <option value={blog.author} key={i}>
                  {blog.author}
                </option>
              ))}
        </select>
        {!isLoading && <button>Add Blog</button>}
        {isLoading && <button disabled>Adding Blog...</button>}
      </form>
    </div>
  );
};

export default Create;
