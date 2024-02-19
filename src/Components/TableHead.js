import React, { useEffect, useState } from "react";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import cardImage from "../images/table.png";
import Modal from "./modal";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataRequest, fetchDataSuccess, fetchDataFailure, addItem, updateItem } from '../actions';
import { deleteItem } from '../actions'
import { fetchDataFromApi } from "../api";
import _, { isUndefined } from 'lodash'

function TableHead(props) {
  const { items } = props
  const [lists, setLists] = useState(items)
  const [modalEdit, setModalEdit] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [value, setValue] = useState({ first_name: '', email: '', avatar:'' })
  const [Id, setId] = useState()
  const [modal, setModal] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    setLists(items)
  }, [items])

  const handleDelete = () => {
    dispatch(deleteItem(Id));
    setDelModal(false)
    localStorage.setItem('items',items)
  }
  return (
    <>
      <Modal items={items} delModal={delModal} Id={Id} value={value} setModalEdit={setModalEdit} modalEdit={modalEdit} handleDelete={handleDelete} setDelModal={setDelModal}
      />

      <div className="min-w-[800px] ">
        <div className="grid grid-cols-5 border  bg-[#57BC90] border-[#57BC90] border-opacity-50  bg-opacity-50 rounded-md  justify-center   items-center p-2 shadow-lg  ">
          <div></div>
          <div className="flex items-center justify-start ">
            <p className="text-[#015249] text-[16px] font-[600]">Customer ID</p>
            <div>
              <div className="text-[#015249] text-[12px] h-[6px]">
                <button onClick={() => setLists({ data: lists.data.sort((a, b) => b.id - a.id) })}>
                  <IoMdArrowDropup />
                </button>


              </div>
              <div className="text-[#015249] text-[12px] h-[10px] mt-2 ">
                <button onClick={() => setLists({ data: lists.data.sort((a, b) => a.id - b.id) })}>
                  <IoMdArrowDropdown />{" "}
                </button>

              </div>
            </div>
          </div>

          <div className="flex items-center justify-start ">
            <p className="text-[#015249] text-[16px] font-[600]">Customer Name</p>
            <div>
              <div className="text-[#015249] text-[12px] h-[6px]">
                <button onClick={() => setLists({ data: lists.data.sort((a, b) => b.first_name.localeCompare(a.first_name)) })}>

                  <IoMdArrowDropup />
                </button>
              </div>
              <div className="text-[#015249] text-[12px] h-[10px] mt-2 ">
                <button onClick={() => setLists({ data: lists.data.sort((a, b) => a.first_name.localeCompare(b.first_name)) })}>

                  <IoMdArrowDropdown />{" "}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-start ">
            <p className="text-[#015249] text-[16px] font-[600]">Email</p>
            <div  >
              <div className="text-[#015249] text-[12px] h-[6px]  ">
                <button onClick={() => setLists({ data: lists.data.sort((a, b) => b.email.localeCompare(a.email)) })}>
                  <IoMdArrowDropup />
                </button>
              </div>
              <div className="text-[#015249] text-[12px] h-[10px] mt-2   ">
                <button onClick={() => setLists({ data: lists.data.sort((a, b) => a.email.localeCompare(b.email)) })}>

                  <IoMdArrowDropdown />{" "}
                </button>
              </div>
            </div>
          </div>
        </div>


        {_.isObject(lists) && _.has(lists, 'data') ? lists.data.map((x) => (
          <>
            <div className="grid grid-cols-5 border border-[#FFFFFF] bg-[#FFFFFF]  justify-center gap-8  items-center p-2 shadow-lg my-5 rounded-md ">
              <div className="flex justify-between  items-center truncate overflow-hidden ">
                <div className="">
                  <img
                    src={x.avatar}
                    className="w-[60px] h-[60px] object-contain"
                   loading="lazy"
            />
                </div>
              </div>

              <div className="flex justify-between  items-center truncate overflow-hidden ">
                <p>{x.id}</p>
              </div>

              {/* scond */}
              <div className="truncate overflow-hidden ">
                <p className="text-[#57BC90]">{x.first_name}</p>
              </div>
              {/* third */}
              <div className="truncate overflow-hidden">
                <p>{x.email}</p>
              </div>
              {/* four */}
              <div className="flex gap-4">
                <button
                  className="bg-[#39B54A] bg-opacity-50 rounded-md text-[#008212] text-[16px] w-[100px] p-2 text-center font-[500]"
                  onClick={() => {
                    setModalEdit(true)
                    setId(x.id)
                    setValue({ ...value, first_name: x.first_name, email: x.email,avatar:x.avatar })
                  }}
                >
                  Edit
                </button>
                <button className="bg-[#D80000] bg-opacity-50 rounded-md text-[#D80000] text-[16px] w-[100px] p-2 text-center font-[500]"
                  onClick={() => {
                    setDelModal(true)
                    setId(x.id)
                  }}
                >
                  Delete
                </button>
              </div>
            </div>

          </>
        )) : <></>}
      </div>


    </>
  )
}

export default TableHead;
