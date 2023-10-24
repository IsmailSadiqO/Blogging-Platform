import { useParams, useNavigate, Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import {
//   useGetLearningPathDetailsQuery,
//   useGetCoursesForLearningPathQuery,
//   useCreateReviewMutation,
// } from '../slices/blogpostsApiSlice';
// import { useGetUserProfileQuery } from '../slices/usersApiSlice';
// import Rating from '../components/Rating';
// import Loader from '../components/Loader';
// import Message from '../components/Message';
// import { FaInfoCircle } from 'react-icons/fa';
// import { toast } from 'react-toastify';
// import { useState } from 'react';

const BlogpostScreen = () => {
  const { id: blogpostId } = useParams();
  const [blogpost, setBlogpost] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchBlogpost = async () => {
      const { data: fullData } = await axios.get(
        `/api/v1/blogposts/${blogpostId}`
      );
      let blogpostData = fullData.data;
      setBlogpost(blogpostData);
    };
    fetchBlogpost();
  }, [blogpostId]);

  useEffect(() => {
    const fetchComments = async () => {
      const { data: fullData } = await axios.get(
        `/api/v1/blogposts/${blogpostId}/comments`
      );
      let commentData = fullData.data;
      setComments(commentData);
    };
    fetchComments();
  }, [blogpostId]);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      <ListGroup variant="flush">
        <ListGroup.Item></ListGroup.Item>
        <ListGroup.Item>
          <h3>{blogpost.title}</h3>
        </ListGroup.Item>
        <ListGroup.Item></ListGroup.Item>
      </ListGroup>

      <Row>
        <Col>
          <ListGroup.Item></ListGroup.Item>
          <ListGroup.Item className="text-justify">
            {blogpost.content}
          </ListGroup.Item>
          <ListGroup.Item></ListGroup.Item>
        </Col>

        <Col md={5} className="review">
          <h2>Comments</h2>
          <ListGroup variant="flush">
            {comments
              .filter((comment) => comment.blogpostId === blogpostId)
              .map((comment) => (
                <ListGroup.Item key={comment._id}>
                  <strong>
                    {comment.commenter.firstName} {comment.commenter.lastName}
                  </strong>
                  <p>{comment.createdAt.substring(0, 10)}</p>
                  <p>{comment.comment}</p>
                </ListGroup.Item>
              ))}
            <ListGroup.Item>
              <h2>Write a Comment</h2>
              <Form>
                <Form.Group controlId="comment" className="my-2">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control as="textarea" row="3"></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </Form>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default BlogpostScreen;
