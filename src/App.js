import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Loader from './components/Loader';
import Home from './components/Home';




function App() {
  axios.defaults.baseURL = 'https://crud-mongodb-iqqa.onrender.com';



  const [loading, setLoading] = useState(true);

  useEffect(() => {

    getFetchData();
  }, []);
  // console.log(dataList)
  const getFetchData = async () => {
    try {
      const url = '/';
      const response = await axios.get(url);
      if (response.data.success) {
        // setdataList(response.data.data);
      } else {
        alert('Failed to fetch data from the server.');
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
      alert('An error occurred while fetching data from the server.');
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  return (
    <div  >

      {
        loading ? (
          <>
            <div className="loader-container">
              <div class="spinner-border" role="status">
                <Loader />
              </div>
            </div>
          </>
        ) : (

            <Home />
          )
      }


    </div>
  );

}
export default App;
