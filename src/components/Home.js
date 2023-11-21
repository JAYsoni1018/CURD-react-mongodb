import { useEffect, useState } from 'react';
import axios from 'axios';
import MyForm from './MyForm';

function Home() {

    axios.defaults.baseURL = 'https://crud-mongodb-iqqa.onrender.com';

    const [addSection, setaddSection] = useState(false);
    const [editSection, seteditSection] = useState(false);
    const [dataList, setdataList] = useState([]);

    const [formData, setformData] = useState({
        "name": "",
        "email": "",
        "mobile": "",
    });

    const [formDataEdit, setformDataEdit] = useState({
        "name": "",
        "email": "",
        "mobile": "",
        "_id": ""
    });
    useEffect(() => {

        getFetchData();
    }, []);
    // console.log(dataList)
    const getFetchData = async () => {
        try {
            const url = '/';
            const response = await axios.get(url);
            if (response.data.success) {
                setdataList(response.data.data);
            } else {
                alert('Failed to fetch data from the server.');
            }
        } catch (error) {
            console.error('An error occurred while fetching data:', error);
            alert('An error occurred while fetching data from the server.');
        }
    };

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

    const handelOnChangeEdit = (e) => {  //same logic as handelOnChange
        const { value, name } = e.target;
        setformDataEdit((preve) => {
            return {

                ...preve,
                [name]: value
            }
        })
    }

    const validateFields = (fields) => {
        for (const field of fields) {
            if (formData[field].trim() === '') {
                return false; // Field is empty, validation fails
            }
        }
        return true;
    };

    const handelSubmit = async (e) => {
        e.preventDefault();

        const fieldsToValidate = ["name", "email", "mobile"];

        if (validateFields(fieldsToValidate)) {
            const url = '/create';
            const data = {
                name: formData.name,
                email: formData.email,
                mobile: formData.mobile,
            };
            try {
                const response = await axios.post(url, data);
                if (response.data.success) {
                    setaddSection(false);
                    setformData({
                        "name": "",
                        "email": "",
                        "mobile": "",
                    });
                    alert(response.data.message);
                    getFetchData();
                } else {
                    alert('Failed to add user to the database.');
                }
            } catch (error) {
                console.error('An error occurred while adding the user:', error);
                alert('An error occurred while adding the user.');
            }
        } else {
            alert('Please fill all fields');
        }
    };

    const handelDelete = async (e) => {
        const id = e._id;
        const url = `/delete/${id}`;

        try {
            const deletedata = await axios.delete(url);
            if (deletedata.data.success) {
                alert(deletedata.data.message);
                getFetchData();
            } else {
                alert('Failed to delete the user.');
            }
        } catch (error) {
            console.error('An error occurred while deleting the user:', error);
            alert('An error occurred while deleting the user.');
        }
    };

    const handelEdit = (e) => {
        seteditSection(true);
        setformDataEdit(e);
    };

    const handelUpdate = async (e) => {
        e.preventDefault();

        const requiredFields = ["name", "email", "mobile"];

        const isEmptyField = requiredFields.some(field => formDataEdit[field].trim() === '');

        if (isEmptyField) {
            alert('Please fill in all required fields before updating.');
        } else {
            const url = '/update';
            const data = {
                name: formDataEdit.name,
                email: formDataEdit.email,
                mobile: formDataEdit.mobile,
                _id: formDataEdit._id,
            };

            try {
                const response = await axios.put(url, data);
                if (response.data.success) {
                    getFetchData();
                    seteditSection(false);
                    alert(response.data.message);
                } else {
                    alert('Failed to update user data.');
                }
            } catch (error) {
                console.error('An error occurred while updating user data:', error);
                alert('An error occurred while updating user data.');
            }
        }
    };

    return (
        <div className="container mt-3 ">


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

            <table className="pure-table" >
                <thead>
                    <tr>
                        <th className="row">No.</th>
                        <th className="row" style={{ width: "200px" }}>Name</th>
                        <th className="row">Email</th>
                        <th className="row">Mobile</th>
                        <th className="row" style={{ width: "800px" }}>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        dataList.map((el, key) => {
                            // let a = 0;
                            // a = a + 1;
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

export default Home