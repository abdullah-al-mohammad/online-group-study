
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import AssignmentCard from "./AssignmentCard";
import Heading from "../../Components/Heading/Heading";

const Assignments = () => {
  const axiosPublic = useAxiosPublic()
  const { data: assignments = [] } = useQuery({
    queryKey: ['assignment'],
    queryFn: async () => {
      const res = await axiosPublic.get('/assignment')
      return res.data
    }

  })
  return (
    <div>
      <Heading heading={'Assignments Hub'} subHeading={'Access all your tasks and deadlines here'}></Heading>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {
          assignments.map(data => <AssignmentCard key={data._id} assignment={data}></AssignmentCard>)
        }
      </div>
    </div>
  );
};

export default Assignments;