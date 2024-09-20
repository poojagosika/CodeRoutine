import React, { useEffect } from "react";
import Description from "./Description/Description";
import WorkPlace from "./WorkPlace/WorkPlace";
import Split from "react-split";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProblemById } from "../../features/problems/problemActions";

const Problem = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {loading: isLoading, error} = useSelector((state) => state.problems);
  
  useEffect(() => {
    document.title = "CodeRoutine | Home";
    dispatch(fetchProblemById(id))
  }, [id]);

  const problem = useSelector((state) => state.problems.problems.find((problem) => problem._id === id));

  return (
    <div>
      <Split
        className="split"
        minSize={0}
        style={{ height: "calc(100vh - 70px)" }}
        gutterSize={6}
      >
        <Description isLoading={isLoading} error={error} problem={problem} />
        <WorkPlace isLoading={isLoading} error={error} problem={problem} />
      </Split>
    </div>
  );
};

export default Problem;
