import React from "react";
import "../App.css";
import Container from "./Conatiner";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
// import { fetchDataRequest, fetchDataSuccess, fetchDataFailure, addItem, deleteItem, updateItem } from './actions';
import { fetchDataRequest, fetchDataSuccess, fetchDataFailure, addItem, deleteItem, updateItem } from '../actions';
import { fetchDataFromApi } from "../api";
import _, { isUndefined } from 'lodash'




const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  // .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address'),
  // .required('Email is required'),
  avatar: Yup.mixed()
  // .required('Image is required'),
});


function Modal({
  setModalDelete,
  setModalEdit,
  modalEdit,
  modalDelete,
  handleDelete,
  addmodal,
  setAddModal,
  value,
  items,
  delModal,
  Id,
  setDelModal,
}) {

  const initialValues = {
    first_name: value?.first_name ? value.first_name : '',
    email: value?.email ? value.email : '',
    avatar: value?.avatar ? value?.avatar : null
  
  };
   const dispatch = useDispatch()
  const [selectedFile, setSelectedFile] = useState(null);
  const onSubmit = (values) => {
    if (modalEdit) {
      dispatch(updateItem(Id, values));
      setModalEdit(false)
      return
    }
    dispatch(addItem(values));
    setAddModal(false)
    setSelectedFile(null)
    localStorage.setItem('items',items)
  }


  const handleFileChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    setFieldValue('avatar', file);
    setSelectedFile(file.name)
  };
  return (
    <>
      {delModal ? (
        <div
          className="bg-black bg-opacity-25 absolute top-0 left-0 h-full w-full flex justify-center items-center"
        // onClick={() => setModalDelete({ ...modalDelete, status: false })}
        >
          <div
            className="bg-white h-[350px] w-[350px] max-w-[90%] rounded-md  px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end pt-2" onClick={() => setDelModal(false)}>
              <RxCross1 />
            </div>
            <div className="flex flex-col justify-center items-center mt-[40px]">
              <div>
                <RiDeleteBin6Line className="text-[80px] text-[#D80000]" />
              </div>
              <p className="text-[20px] font-[700]">Are you sure?</p>
              <p className="text-[14px] font-[600] text-center">
                Do you really want to delete this customer? This process can not
                be undone.
              </p>

              <div className="flex gap-4 justify-between items-center mt-7">
                <div className="bg-[#A5A5AF] rounded-md text-white text-[16px] md:w-[150px] w-[120px] p-2 text-center font-[500] ">
                  Edit
                </div>
                <button onClick={handleDelete} className="bg-[#D80000]  rounded-md text-white text-[16px] md:w-[150px] w-[120px] p-2 text-center font-[500]">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : <></>}

      {addmodal || modalEdit ? (
        <div
          className="bg-black bg-opacity-25 absolute top-0 left-0 h-full w-full flex justify-center items-center"

        >
          <div
            className="bg-[#FBFCFC] h-[480px] w-[380px] max-w-[90%] rounded-[20px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 modalBackground_head ">
              <div
                className="text-right text-white font-[600] flex justify-end pt-2"
                onClick={() => modalEdit ? setModalEdit(false) : setAddModal(false)}
              >
                <RxCross1 />
              </div>
              <p className="text-[22px] text-center  text-white mt-4">
                {modalEdit ? 'Edit Customer' : 'Add New Customer'}
              </p>
            </div>

            <Container>

              <div className="my-[40px]">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {({ errors, touched, setFieldValue }) => (
                    <Form>
                      <div className="flex  my-4 justify-center items-center ">
                        <Field
                          name="first_name"
                          type="text"
                          id="first_name"
                          className="border border-gray-200 bg-gray-200 w-full rounded-md p-2 outline-none"
                          placeholder="Customer Name"
                        />
                      </div>
                      <ErrorMessage name="first_name" component="div" className="text-[#D80000] font-bold" />
                      <div className="flex  my-4 justify-center items-center ">
                        <Field
                          type="email"
                          placeholder="Email"
                          name="email"
                          id="email"
                          className="border border-gray-200 bg-gray-200 w-full rounded-md p-2 outline-none"
                        />
                      </div>
                      <ErrorMessage name="email" component="div" className="text-[#D80000] font-bold" />
                      <div className="my-4">
                        <input id="file" accept=".jpg, .jpeg, .png, .gif, .webp" className="hidden" name="avatar" type="file" onChange={(e) => handleFileChange(e, setFieldValue)} />

                        <ErrorMessage name="avatar" component="div" className="error" className="text-[#D80000] font-bold" />


                        <label
                          htmlFor="file"
                          className="cursor-pointer text-[#57BC90] py-2 px-4 rounded "
                        >

                          {`Upload Photo  ${selectedFile ? selectedFile : value && value.avatar ? value.avatar.substring(value.avatar.lastIndexOf('/') + 1) : ''} `}


                        </label>

                        {/* <input type="file" name="image" className="hidden" id="fileInput" onChange={()=>Formik.setF} accept="image/*" />
                        <label
                          htmlFor="fileInput"
                          className="cursor-pointer text-[#57BC90] py-2 px-4 rounded "
                        >
                          {`Upload Photo ${selectedFile ? selectedFile.name : ''} `}
       
                          {/* <Field type="file" name="image"   />        */}
                        {/* <ErrorMessage name="image" component="div" className="error" className="text-[#D80000] font-bold" /> */}
                        {/* </label>  */}
        </div>

                      <div className="border my-4 bg-gradient-to-r from-[#57BC90] to-teal-900 rounded-md flex justify-center gap-6 items-center p-3 shadow-lg  ">

                        <button type="submit" className="text-[14px] text-white font-[500]"  >

                          {modalEdit ? 'EDIT CUSTOMER' : 'ADD CUSTOMER'}

                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </Container>
          </div>
        </div>
      ) : <></>}
    </>
  );
}

export default Modal;
