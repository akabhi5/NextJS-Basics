import Axios from "axios";
import { useRouter } from "next/router";

// router is required for fallback: true

const Post = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Post page</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
};

export default Post;

/* Static rendering */
export const getStaticProps = async ({ params }) => {
  const res = await Axios.get(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const post = await res.data;
  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await Axios.get("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.data.slice(0, 10);
  const paths = posts.map((post) => ({ params: { id: post.id.toString() } }));
  return {
    paths,
    // fallback: false,
    fallback: true,
  };
};

/* Server side rendering */
// export const getServerSideProps = async ({ params }) => {
//   const res = await Axios.get(
//     `https://jsonplaceholder.typicode.com/posts/${params.id}`
//   );
//   const post = await res.data;
//   return {
//     props: {
//       post,
//     },
//   };
// };
