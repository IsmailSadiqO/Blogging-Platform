import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Button, Form } from 'react-bootstrap';
import {
  useGetBlogpostDetailsQuery,
  useGetCommentsForBlogpostQuery,
  useCreateCommentMutation,
} from '../slices/blogpostsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { toast } from 'react-toastify';
import { useState } from 'react';

const BlogpostScreen = () => {
  const { id: blogpostId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: blogpostFullData,
    isLoading: blogpostIsLoading,
    error: blogpostError,
  } = useGetBlogpostDetailsQuery(blogpostId);
  let blogpost = blogpostFullData?.data;

  const {
    data: commentFullData,
    isLoading: commentIsLoading,
    error: commentError,
    refetch,
  } = useGetCommentsForBlogpostQuery(blogpostId);
  let comments = commentFullData?.data;

  const [comment, setComment] = useState('');

  const { userInfo } = useSelector((state) => state.auth);

  const [createComment, { isLoading: loadingBlogpostComment }] =
    useCreateCommentMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createComment({
        blogpostId,
        comment,
      }).unwrap();
      refetch();
      toast.success('Comment Submitted');
      setComment('');
    } catch (err) {
      toast.error(err?.data?.error || err.error);
    }
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      {blogpostIsLoading ? (
        <Loader />
      ) : blogpostError ? (
        <Message variant="danger">
          {blogpostError?.data?.message || blogpostError.error}
        </Message>
      ) : (
        <>
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

            {commentIsLoading ? (
              <Loader />
            ) : commentError ? (
              <Message variant="danger">
                {commentError?.data?.message || commentError.error}
              </Message>
            ) : (
              <>
                <Col md={5} className="review">
                  <h2>Comments</h2>
                  {comments.length == 0 && <Message>No Comments</Message>}
                  <ListGroup variant="flush">
                    {comments
                      .filter((comment) => comment.blogpostId === blogpostId)
                      .map((comment) => (
                        <ListGroup.Item key={comment._id}>
                          <strong>
                            {comment.commenter.firstName}{' '}
                            {comment.commenter.lastName}
                          </strong>
                          <p>{comment.createdAt.substring(0, 10)}</p>
                          <p>{comment.comment}</p>
                        </ListGroup.Item>
                      ))}
                    <ListGroup.Item>
                      <h2>Write a Comment</h2>
                      {userInfo ? (
                        <Form onSubmit={submitHandler}>
                          <Form.Group controlId="comment" className="my-2">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                              as="textarea"
                              row="3"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                          <Button
                            disabled={loadingBlogpostComment}
                            type="submit"
                            variant="primary"
                          >
                            Submit
                          </Button>
                        </Form>
                      ) : (
                        <Message>
                          {' '}
                          Please <Link to="/auth/login">login</Link> to write a
                          comment
                        </Message>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </>
            )}
          </Row>
        </>
      )}
    </>
  );
};

export default BlogpostScreen;
