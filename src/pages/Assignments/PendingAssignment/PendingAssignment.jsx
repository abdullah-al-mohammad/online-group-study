import { Link } from "react-router";
import useAssignment from "../../../Hooks/useAssignment";
const PendingAssignment = () => {
  const [assignments] = useAssignment();
  return (
    <div>
      <h1 className="text-3xl text-center">Pending Assignments</h1>
      {/* Add your component logic here */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Title</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {assignments.map((data, index) => {
                if (data.status === "pending") {
                  return (
                    <tr>
                      <th>{index + 1}</th>
                      <td>{data.name}</td>
                      <td>{data.title}</td>
                      <td>{data.marks}</td>
                      <td><Link to={'/mark'}><button>give mark</button></Link></td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PendingAssignment;
