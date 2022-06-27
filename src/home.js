import { useState, useEffect } from "react";
import BlogList from "./blogList";
const Home = () => {
  const [blogs, setBlogs] = useState([null]);
  const [isPending, setisPending] = useState(true);

  const handleDelete = (id) => {
    const newBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(newBlogs);
  };

  useEffect(() => {
    fetch(" http://localhost:8000/blogs")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setBlogs(data);
      });
  }, []);

  return (
    <div className="home">
      {isPending && <div>Loading...</div>}
      {blogs && (
        <BlogList
          blogs={blogs}
          title="All blogs!"
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Home;
