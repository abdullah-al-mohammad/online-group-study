
import AssignmentCard from "./AssignmentCard";

const AssignmentTab = ({ difficultyLevel }) => {

  return (
    <div>
      {
        difficultyLevel.map(data => <AssignmentCard key={data._id} assignment={data}></AssignmentCard>)
      }
    </div>
  );
};

export default AssignmentTab;
