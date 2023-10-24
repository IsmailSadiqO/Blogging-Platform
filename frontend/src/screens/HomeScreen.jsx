import { Row, Col } from 'react-bootstrap';
import Blogpost from '../components/Blogpost';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
import { useGetBlogpostsQuery } from '../slices/blogpostsApiSlice';
// import Loader from '../components/Loader';
// import Message from '../components/Message';
// import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';

const HomeScreen = () => {
  // const [blogposts, setBlogposts] = useState([]);

  // useEffect(() => {
  //   const fetchBlogposts = async () => {
  //     const { data: fullData } = await axios.get('/api/v1/blogposts');
  //     let blogpostData = fullData.data;
  //     setBlogposts(blogpostData);
  //   };
  //   fetchBlogposts();
  // }, []);

  const { data: fullData, isLoading, error } = useGetBlogpostsQuery();
  let blogposts = fullData?.data;

  console.log(blogposts);

  return (
    <>
      {isLoading ? (
        <h2>Loading..</h2>
      ) : error ? (
        <div>{error?.data?.message || error.error}</div>
      ) : (
        <>
          <h1>Blogposts</h1>
          <Row>
            {blogposts.map((blogpost) => (
              <Col key={blogpost._id} sm={12} md={6} lg={4} xl={3}>
                <Blogpost blogpost={blogpost} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
