import { Row, Col } from 'react-bootstrap';
import Blogpost from '../components/Blogpost';
import { useGetBlogpostsQuery } from '../slices/blogpostsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
// import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';

const HomeScreen = () => {
  const { data: fullData, isLoading, error } = useGetBlogpostsQuery();
  let blogposts = fullData?.data;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Blogposts</h1>
          <Row>
            {blogposts.map(
              (blogpost) =>
                blogpost.isActive && (
                  <Col key={blogpost._id} sm={12} md={6} lg={4} xl={3}>
                    <Blogpost blogpost={blogpost} />
                  </Col>
                )
            )}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
