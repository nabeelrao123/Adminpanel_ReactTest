import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useEffect } from "react";
import Container from "../Components/Conatiner";
import AddCoutomerButton from "../Components/AddCoutomerButton";
import TableHead from "../Components/TableHead";
import Modal from "../Components/modal";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataRequest, fetchDataSuccess, fetchDataFailure, addItem, deleteItem, updateItem } from '../actions';
import { fetchDataFromApi } from "../api";
import _, { isUndefined } from 'lodash'

function Customer() {
  const dispatch = useDispatch();
  const [addmodal, setAddModal] = useState(false);
  const { items, loading, error } = useSelector((state) => state.data);
  
  
  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchDataRequest());
      try {
        if(items.length === 0){
          const responseData = await fetchDataFromApi();
          dispatch(fetchDataSuccess(responseData));
        }
      } catch (error) {
        dispatch(fetchDataFailure(error.message));
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <>

      <Modal setAddModal={setAddModal} addmodal={addmodal}  />
      <Container>
        <div className="pt-6 overflow-x-auto ">
          <div className="py-6 ">
            <AddCoutomerButton setAddModal={setAddModal} />
          </div>
          <TableHead items={items} />
        </div>
      </Container>
    </>
  );
}

export default Customer;
