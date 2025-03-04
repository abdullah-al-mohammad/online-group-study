
import AssignmentCard from "./AssignmentCard";

const AssignmentTab = ({ skill, refetch }) => {
  // console.log(skill);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {
        skill.map(data => <AssignmentCard key={data._id} assignment={data} refetch={refetch}></AssignmentCard>)
      }
    </div>
  );
};

export default AssignmentTab;
