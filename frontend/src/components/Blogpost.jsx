import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Blogpost = ({ blogpost }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Card.Body>
        <Link to={`/blogposts/${blogpost._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{blogpost.title}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <div>
            <strong>Categories:</strong>
          </div>
          {blogpost.category.map((category) => (
            <li>{category}</li>
          ))}
        </Card.Text>

        <Card.Text></Card.Text>

        <Card.Text as="div">
          {' '}
          <strong>Author:</strong> {blogpost.author}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Blogpost;
