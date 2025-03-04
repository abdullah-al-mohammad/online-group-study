import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Heading from "../../Components/Heading/Heading";
import { useState } from "react";
import { useParams } from "react-router";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AssignmentTab from "./AssignmentTab";
import "./assignmentCard.css";
import ClipLoader from "react-spinners/ClipLoader";

const Assignments = () => {
  const categories = ["easy", "medium", "hard"];
  const { category } = useParams();
  // create initial value for tabIndex
  const initialIndex = categories.includes(category)
    ? categories.indexOf(category)
    : 0;
  const [tabIndex, setTabIndex] = useState(initialIndex);

  const axiosPublic = useAxiosPublic();

  const {
    data: assignments = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["assignment"],
    queryFn: async () => {
      const res = await axiosPublic.get("/assignment");
      return res.data;
    },
  });

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
      {loading ? (
        <ClipLoader
          color={"#008000"}
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList>
            <Tab>All</Tab>
            <Tab>Easy</Tab>
            <Tab>Medium</Tab>
            <Tab>Hard</Tab>
          </TabList>
          <TabPanel>
            <AssignmentTab
              skill={assignments}
              refetch={refetch}
            ></AssignmentTab>
          </TabPanel>
          <TabPanel>
            <AssignmentTab skill={easy} refetch={refetch}></AssignmentTab>
          </TabPanel>
          <TabPanel>
            <AssignmentTab skill={medium} refetch={refetch}></AssignmentTab>
          </TabPanel>
          <TabPanel>
            <AssignmentTab skill={hard} refetch={refetch}></AssignmentTab>
          </TabPanel>
        </Tabs>
      )}
    </div>
  );
};
export default Assignments;
