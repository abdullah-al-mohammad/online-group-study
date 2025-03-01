import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import AssignmentCard from "./AssignmentCard";
import Heading from "../../Components/Heading/Heading";
import { useState } from "react";
import { useParams } from "react-router";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const Assignments = () => {
  const axiosPublic = useAxiosPublic();
  const { data: assignments = [] } = useQuery({
    queryKey: ["assignment"],
    queryFn: async () => {
      const res = await axiosPublic.get("/assignment");
      return res.data;
    },
  });

  const categories = ['easy', 'medium', 'hard']
  const {category} = useParams()
  console.log(category);
    const intialIndex = categories.indexOf(category)

    const easy = assignments.filter((data) => data.difficulty === "easy");
    const medium = assignments.filter((data) => data.difficulty === "medium");
    const hard = assignments.filter((data) => data.difficulty === "hard");
  
    const [tabIndex, setTabIndex] = useState(intialIndex);
  
  return (
    <div>
      <Heading
        heading={"Assignments Hub"}
        subHeading={"Access all your tasks and deadlines here"}
      ></Heading>
      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Easy</Tab>
          <Tab>Medium</Tab>
          <Tab>Hard</Tab>
        </TabList>
        <TabPanel>
            <AssignmentCard difficultyLevel={easy}></AssignmentCard>
        </TabPanel>
        <TabPanel>
            <AssignmentCard difficultyLevel={medium}></AssignmentCard>
        </TabPanel>
        <TabPanel>
            <AssignmentCard difficultyLevel={hard}></AssignmentCard>
        </TabPanel>
      </Tabs>
      </div>
  );
}
export default Assignments;
