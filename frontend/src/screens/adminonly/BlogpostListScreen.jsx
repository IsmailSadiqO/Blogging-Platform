import { LinkContainer } from 'react-router-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
// import Paginate from '../../components/Paginate';
import {
  useGetBlogpostsQuery,
  useCreateBlogpostMutation,
  useDeleteBlogpostMutation,
} from '../../slices/blogpostsApiSlice';

const BlogpostListScreen = () => {
  //   const { pageNumber } = useParams();

  const {
    data: blogpostsFullData,
    isLoading,
    error,
    refetch,
  } = useGetBlogpostsQuery();
  let blogposts = blogpostsFullData?.data;

  const [createBlogpost, { isLoading: loadingCreate }] =
    useCreateBlogpostMutation();

  const [deleteBlogpost, { isLoading: loadingDelete }] =
    useDeleteBlogpostMutation();

  const deleteHandler = async (blogpostId) => {
    if (
      window.confirm(
        'Are you sure? This will delete the Learning Path and all its Courses.'
      )
    ) {
      try {
        await deleteBlogpost(blogpostId);
        refetch();
        toast.success('Blogpost and Comments Deleted');
      } catch (err) {
        toast.error(err?.data?.error || err.error);
      }
    }
  };

  const ccreateBlogpostHandler = async () => {
    const content = 'Sample Content';
    const title = 'Sample Title';
    const category = ['Sample Category'];
    if (window.confirm('Are you sure you want to create a new Blogpost?')) {
      try {
        const result = await createBlogpost({
          content,
          title,
          category,
        });
        if (result.error) {
          toast.error(result.error.data?.error || result.error.message);
        } else {
          refetch();
          toast.success('Blogpost Created');
        }
      } catch (err) {
        toast.error(err?.data?.error || err.error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Blogposts</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={ccreateBlogpostHandler}>
            <FaEdit /> Create Blogpost
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>AUTHOR</th>
                <th>CATEGORIES</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {blogposts.map((blogpost) => (
                <tr key={blogpost._id}>
                  <td>
                    <Link to={`/blogposts/${blogpost._id}`}>
                      {blogpost._id}
                    </Link>
                  </td>
                  <td>{blogpost.title}</td>
                  <td>
                    {blogpost.author.firstName} {blogpost.author.lastName}
                  </td>
                  <td>
                    {blogpost.category.map((category) => (
                      <>
                        <strong>|</strong> {category}{' '}
                      </>
                    ))}
                    <strong>|</strong>
                  </td>
                  <td>
                    <LinkContainer to={`/admin/blogposts/${blogpost._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(blogpost._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default BlogpostListScreen;
