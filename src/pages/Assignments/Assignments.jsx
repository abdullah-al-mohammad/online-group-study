import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Heading from "../../Components/Heading/Heading";
import { useState } from "react";
import { useParams } from "react-router";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import 'react-tabs/style/react-tabs.css'
import AssignmentTab from "./AssignmentTab";
import './assignmentCard.css'

const Assignments = () => {
  const categories = ['easy', 'medium', 'hard']
  const { category } = useParams()
  console.log(category);
  const initialIndex = categories.includes(category) ? categories.indexOf(category) : 0;
  const [tabIndex, setTabIndex] = useState(initialIndex);

  const axiosPublic = useAxiosPublic();

  const { data: assignments = [], isLoading: loading } = useQuery({
    queryKey: ["assignment"],
    queryFn: async () => {
      const res = await axiosPublic.get("/assignment");
      return res.data;
    },
  });
  console.log(assignments);

  const easy = assignments.filter((data) => data.difficulty === "easy");
  const medium = assignments.filter((data) => data.difficulty === "medium");
  const hard = assignments.filter((data) => data.difficulty === "hard");


  return (
    <div>
      <div className="assignmentCover min-h-screen">
        <Heading
          heading={"Assignments Hub"}
          subHeading={"Access all your tasks and deadlines here"}
        ></Heading>
      </div>
      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>All</Tab>
          <Tab>Easy</Tab>
          <Tab>Medium</Tab>
          <Tab>Hard</Tab>
        </TabList>
        <TabPanel>
          <AssignmentTab skill={assignments}></AssignmentTab>
        </TabPanel>
        <TabPanel>
          <AssignmentTab skill={easy}></AssignmentTab>
        </TabPanel>
        <TabPanel>
          <AssignmentTab skill={medium}></AssignmentTab>
        </TabPanel>
        <TabPanel>
          <AssignmentTab skill={hard}></AssignmentTab>
        </TabPanel>
      </Tabs>
    </div>
  );
}
export default Assignments;
