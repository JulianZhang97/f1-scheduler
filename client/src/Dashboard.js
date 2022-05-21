import React, { useEffect } from "react";
import { BrowserRouter as Router, useLocation } from 'react-router-dom'

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Dashboard() {
  // let location = useLocation();
  let query = useQuery();


  useEffect(() => {
    const nylasToken = query.get("code");
    // console.log(nylasToken);

    if(sessionStorage.getItem('nylasToken') !== nylasToken){
      console.log("UPDATING NYLAS TOKEN");
      sessionStorage.setItem('nylasToken', nylasToken);
    }
  }, [query]);
  
  // sessionStorage.setItem('token', response.data.token)


  return (
    <div style={{ textAlign: 'center' }}>
      <h1> You are now logged into the Nylas F1 Scheduler</h1>
      {/* <button >Logout</button> */}
    </div>
  );
}

export default Dashboard