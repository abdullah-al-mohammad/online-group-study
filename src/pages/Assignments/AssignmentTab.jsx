
import AssignmentCard from "./AssignmentCard";

const AssignmentTab = ({ skill }) => {
  // console.log(skill);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {
        skill.map(data => <AssignmentCard key={data._id} assignment={data}></AssignmentCard>)
      }
    </div>
  );
};

export default AssignmentTab;
