import { useState, useEffect } from 'react';
import Select from 'react-select';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useGetBlogpostsQuery,
  useUpdateBlogpostMutation,
  useGetBlogpostDetailsQuery,
} from '../../slices/blogpostsApiSlice';

const BlogpostEditScreen = () => {
  const { blogpostId } = useParams();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState([]);
  const [isActive, setIsActive] = useState('');

  const options = [
    { value: 'Web Development', label: 'Web Development' },
    { value: 'Mobile Development', label: 'Mobile Development' },
    { value: 'Backend Development', label: 'Backend Development' },
    { value: 'UI/UX', label: 'UI/UX' },
    { value: 'Data Science', label: 'Data Science' },
    { value: 'Systems Programming', label: 'Systems Programming' },
    { value: 'Other', label: 'Other' },
  ];

  const { data: blogpostsFullData, refetch: refetchBlogposts } =
    useGetBlogpostsQuery();
  let blogposts = blogpostsFullData?.data;

  const {
    data: blogpostFullData,
    isLoading,
    refetch,
    error,
  } = useGetBlogpostDetailsQuery(blogpostId);
  let blogpost = blogpostFullData?.data;

  const [updateBlogpost, { isLoading: loadingUpdate }] =
    useUpdateBlogpostMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (blogpost) {
      setTitle(blogpost.title);
      setContent(blogpost.content);
      setCategory(blogpost.category);
      setIsActive(blogpost.isActive);
    }
  }, [blogpost]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedBlogpost = {
      blogpostId,
      title,
      content,
      category,
      isActive,
    };
    const result = await updateBlogpost(updatedBlogpost);
    if (result.error) {
      toast.error(result.error);
    } else {
      refetch();
      toast.success('Blogpost Updated');
      navigate('/admin/blogpostlist');
      refetchBlogposts();
    }
  };

  return (
    <>
      <Link to="/admin/blogpostlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Blogpost</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message vaeriant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="title" className="my-2">
              <Form.Label>Blogpost Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Blogpost title "
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="content" className="my-2">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Blogpost content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category" className="my-2">
              <Form.Label>Categories</Form.Label>
              <Select
                isMulti
                options={options}
                value={category.map((val) => ({ value: val, label: val }))}
                onChange={(selectedOptions) =>
                  setCategory(selectedOptions.map((item) => item.value))
                }
              />
            </Form.Group>

            <Form.Group controlId="isActive" className="my-2">
              <Form.Check
                type="checkbox"
                label="Blogpost Visibility (isActive)"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary" className="my-2">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default BlogpostEditScreen;
