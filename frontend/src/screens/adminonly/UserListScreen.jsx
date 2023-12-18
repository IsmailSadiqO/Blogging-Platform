import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserProfileQuery,
} from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';

const UserListScreen = () => {
  const { data: usersFullData, refetch, isLoading, error } = useGetUsersQuery();
  let users = usersFullData?.data;

  const [deleteUser, { isLoading: loadingDelete, isError }] =
    useDeleteUserMutation();

  const { data: profileFullData, refetch: refetchProfile } =
    useGetUserProfileQuery();
  let profile = profileFullData?.data;

  const deleteHandler = async (userId) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteUser(userId);
        // if (isError) {
        //   toast.error('Cannot delete admin user');
        // } else {
        toast.success('User deleted');
        // }
        refetch();
      } catch (err) {
        toast.error(err?.data?.error || err.error);
      }
    }
  };

  return (
    <>
      <h1>Users</h1>
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>FULL NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(
              (user) =>
                user._id !== profile?.userId && (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{`${user.firstName} ${user.lastName}`}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td>
                      {user.isAdmin ? (
                        <FaCheck style={{ color: 'green' }} />
                      ) : (
                        <FaTimes style={{ color: 'red' }} />
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/admin/user/${user._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <FaEdit />
                        </Button>
                      </LinkContainer>

                      {user.isAdmin ? (
                        <Button variant="danger" className="btn-sm" disabled>
                          <FaTrash style={{ color: 'white' }} />
                        </Button>
                      ) : (
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => deleteHandler(user._id)}
                        >
                          <FaTrash style={{ color: 'white' }} />
                        </Button>
                      )}
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
