import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db, auth } from "../firebaseConfig";
import Graph from "../Components/Graph";
import { Button } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTheme } from "../Context/ThemeContext";

const ComparePage = () => {
  const { username } = useParams();
  const [loggedinUserData, setLoggedinUserData] = useState([]);
  const [loggedinUserGraphData, setLoggedinUserGraphData] = useState([]);
  const [user] = useAuthState(auth);
  const [compareUserData, setCompareUserData] = useState([]);
  const [compareUserGraphData, setCompareUserGraphData] = useState([]);
  const getUID = async () => {
    const response = await db.collection("usernames").doc(username).get();
    return response.data().uid;
  };
  const { theme } = useTheme();

  const getData = async () => {
    const compareUserUID = await getUID();
    const { uid } = auth.currentUser;

    const resultsRef = db.collection("Results");
    let tempData = [];
    let tempGraphData = [];
    resultsRef
      .where("userID", "==", uid)
      .orderBy("timeStamp", "desc")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          console.log("working");
          tempData.push({ ...doc.data() });
          tempGraphData.push([doc.data().timeStamp, doc.data().wpm]);
        });
        setLoggedinUserData(tempData);
        setLoggedinUserGraphData(tempGraphData.reverse());
      });

    let tempData1 = [];
    let tempGraphData1 = [];
    resultsRef
      .where("userID", "==", compareUserUID)
      .orderBy("timeStamp", "desc")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          console.log("working");
          tempData1.push({ ...doc.data() });
          tempGraphData1.push([doc.data().timeStamp, doc.data().wpm]);
        });
        setCompareUserData(tempData1);
        setCompareUserGraphData(tempGraphData1.reverse());
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="compare">
        <h1>Comapre</h1>
        <Link to="/">
          <Button
            style={{
              backgroundColor: theme.title,
              color: theme.background,
              marginLeft: "5px",
              marginTop: "10px",
            }}
          >
            Back To Homepage
          </Button>
        </Link>
      </div>
      <h2>User: {user.email}</h2>
      <div className="graph">
        <Graph graphData={loggedinUserGraphData} type="date" />
      </div>
      <h2>User: {username}</h2>
      <div className="graph">
        <Graph graphData={compareUserGraphData} type="date" />
      </div>
    </div>
  );
};

export default ComparePage;
