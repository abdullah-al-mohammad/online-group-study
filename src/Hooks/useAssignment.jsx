
import useAxiosPublic from './useAxiosPublic'
import { useQuery } from '@tanstack/react-query';

const useAssignment = () => {
    const axiosPublic = useAxiosPublic()

    const { data: assignments = [], isPending: loading, refetch } = useQuery({
        queryKey: ["assignment"],
        queryFn: async () => {
          const res = await axiosPublic.get("/assignment");
          return res.data;
        },
      });
  return [assignments, loading, refetch]
}

export default useAssignment
