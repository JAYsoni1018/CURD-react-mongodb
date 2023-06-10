import { useEffect, useState } from 'react';
import './App.css';
import { MdClose } from 'react-icons/md'
import axios from 'axios';
import MyForm from './components/MyForm';



function App() {
  axios.defaults.baseURL = "http://localhost:8080/"

  const [addSection, setaddSection] = useState(false)
  const [editSection, seteditSection] = useState(false)
  const [dataList, setdataList] = useState([])

  const [formData, setformData] = useState({
    "name": "",
    "email": "",
    "mobile": "",
  })

  const [formDataEdit, setformDataEdit] = useState({
    "name": "",
    "email": "",
    "mobile": "",
    "_id": ""
  })
  useEffect(() => {
    getFetchData();
  }, [])
  // console.log(dataList)


  //functions
  const handelOnChange = (e) => {
    const { value, name } = e.target;
    setformData((preve) => {
      return {

        ...preve,
        [name]: value
      }
    })
  }


  const getFetchData = async () => {
    const data = await axios.get("/");
    // console.log(data)
    if (data.data.success) {
      setdataList(data.data.data)
    }
  }


  const handelSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formData);
    // console.log(formData)
    // console.log(data)
    if (data.data.success) {
      setaddSection(false)
      alert(data.data.message)
      getFetchData();
    }


  }

  const handelDelete = async (e) => {
    const id = e._id;

    const deletedata = await axios.delete(`/delete/${id}`);
    if (deletedata.data.success) {

      alert(deletedata.data.message)
      getFetchData();

    }
  }
  const handelEdit = async (e) => {
    seteditSection(true)
    setformDataEdit(e)
  }
  const handelOnChangeEdit = (e) => {  //same logic as handelOnChange
    const { value, name } = e.target;
    setformDataEdit((preve) => {
      return {

        ...preve,
        [name]: value
      }
    })
  }
  const handelUpdate = async (e) => {     //same logic as handelSubmit
    e.preventDefault();
    const data = await axios.put("/update", formDataEdit);
    // console.log(formData)
    // console.log(data)
    if (data.data.success) {
      getFetchData();
      seteditSection(false)
      alert(data.data.message)
    }


  }

  return (
    <div className="container mt-3">
      <button className="btn btn-add" onClick={() => setaddSection(true)}>Add</button>
      {
        addSection ? <>

          <MyForm
            handelClose={() => setaddSection(false)}
            handelOnChange={handelOnChange}
            handelSubmit={handelSubmit}
            rest={formData}
            heading="Add User"
          />
        </>
          : ""
      }
      {
        editSection ? <>

          <MyForm
            handelClose={() => seteditSection(false)}
            handelOnChange={handelOnChangeEdit}
            handelSubmit={handelUpdate}
            rest={formDataEdit}
            heading="Update User"

          />
        </>
          : ""
      }

      <table className="pure-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {
            dataList.map((el, key) => {
              let a = 0;
              a = a + 1;
              return (

                <tr className="pure-table-odd">
                  <td>{key + 1}</td>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.mobile}</td>
                  <td>
                    <button onClick={() => handelEdit(el)} className='btn btn-edit'>Edit</button>
                    <button onClick={() => handelDelete(el)} className='btn btn-delete'>Delete</button>
                  </td>

                </tr>
              )
            })
          }

        </tbody>
      </table>

    </div>
  );

}
export default App;
