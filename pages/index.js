import Axios from "axios";
import { useState } from "react";
import Link from "next/link";

const Home = (props) => {
  const [posts, setPosts] = useState(props.data);

  return (
    <div>
      <h1>Homepage</h1>
      <ol>
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              href={{
                pathname: "/[id]",
                query: { id: post.id },
              }}
            >
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const res = await Axios.get("https://jsonplaceholder.typicode.com/posts");
  return {
    props: { data: res.data.slice(0, 10) },
  };
};
