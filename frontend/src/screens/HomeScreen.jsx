import { Row, Col } from 'react-bootstrap';
import Blogpost from '../components/Blogpost';
import blogposts from '../blogposts';
import comments from '../comments';
// import { useGetBlogpostsQuery } from '../slices/blogpostsApiSlice';
// import LearningPath from '../components/LearningPath';
// import Loader from '../components/Loader';
// import Message from '../components/Message';
// import Paginate from '../components/Paginate';
// import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import SearchBox from '../components/SearchBox';

const HomeScreen = () => {
  return (
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
  );
};

export default HomeScreen;