import React, { useEffect } from 'react'
import Graph from './Graph'
import { db, auth } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from "react-toastify";

const Stats = ({wpm, resetTest, accuracy, correctChars, incorrectChars, missedChars, extraChars,graphData}) => {
    // console.log(graphData);
    // arr= [1,1,2,3,2,2,2,3,3,3,3,4,4,4], set(arr) = [1,2,3,4]
    var timeSet = new Set();  //store unique values of time
    // has(value) -> true or false , constant time
    // add(value) -> adds the value in set
    const newGraph = graphData.filter((i)=>{
        if(!timeSet.has(i[0])){
            timeSet.add(i[0]);
            return i;
        }
    });

    const [user] = useAuthState(auth);

    const pushResultToDatabase = ()=>{
        const resultsRef = db.collection('Results');
        const {uid} = auth.currentUser;
        if(!isNaN(accuracy)){
            resultsRef.add({
                wpm: wpm,
                accuracy: accuracy,
                characters: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
                userID: uid,
                timeStamp: new Date()
            }).then((response)=>{
                toast.success ('Data saved to db', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            });
        }
        else{
            toast.error ('Not able to save', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
        
    }

    useEffect(()=>{

        if(user){
            //saving because user is logged in;
            pushResultToDatabase();
        }
        else{
            //no user, no save
            toast.warning ('login to save results', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
        
    },[]);


    // console.log(graphData,newGraph);
  return (
    <div className="stats-box">
        <div className="left-stats">
            <div className="title">WPM</div>
            <div className="subtitle">{wpm}</div>
            <div className="title">Accuracy</div>
            <div className="subtitle">{accuracy}%</div>
            <div className="title">Characters</div>
            <div className="subtitle">{correctChars}/{incorrectChars}/{missedChars}/{extraChars}</div>
            <div className='Restart subtitle' onClick={resetTest}>Restart</div>
        </div>
        <div className="right-stats">
            {/* graph comp will go here */}
            <Graph graphData={newGraph}/>
        </div>
    </div>
  )
}

export default Stats