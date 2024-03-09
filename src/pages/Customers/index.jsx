import { useEffect, useState } from "react";
import Table from "../../components/Table";
import axios from "../../config";
import { toast } from "react-toastify";
import AddCustomer from "../../components/AddCustomer";
import Trash from "../../components/Icons/Trash";
import Pencil from "../../components/Icons/Pencil";

const Customers = () => {
  const [editData, setEditData] = useState({});
  const [customersList, setCustomersList] = useState([]);
  const [isModaOpen, setIsModaOpen] = useState(false);
  const headers = [
    {
      header: "No",
      accessor: "no",
      render: (row) => {
        return row.index;
      },
    },
    {
      header: "First Name",
      accessor: "firstName",
    },
    {
      header: "Second Name",
      accessor: "lastName",
    },
    {
      header: "Email ID",
      accessor: "email",
    },
    {
      header: "Phone Number",
      accessor: "phoneNumber",
    },
    {
      header: "Address",
      accessor: "address",
      render: (row) => {
        return (
          <div>
            {row?.address?.street}, {row?.address?.city}, {row?.address?.state},{" "}
            {row?.address?.country}, {row?.address?.zip}
          </div>
        );
      },
    },
    {
      header: "",
      accessor: "action",
      render: (row) => {
        return (
          <div className="flex justify-center items-center">
            <button
              type="button"
              className="mr-4 p-2 hover:bg-gray-100 rounded-[7px] "
              onClick={() => {
                setIsModaOpen(true);
                setEditData({
                  _id: row?._id,
                  firstName: row?.firstName,
                  lastName: row?.lastName,
                  email: row?.email,
                  phoneNumber: row?.phoneNumber,
                  street: row?.address?.street,
                  city: row?.address?.city,
                  state: row?.address?.state,
                  zip: row?.address?.zip,
                  country: row?.address?.country,
                });
              }}
            >
              <Pencil width="22" height="22" />
            </button>
            <button
              type="button"
              className=" p-2 hover:bg-gray-100 rounded-[7px] "
              onClick={() => deleteCustomer(row?._id)}
            >
              <Trash width="20" height="20" />
            </button>
          </div>
        );
      },
    },
  ];

  const addCustomer = () => {
    setEditData({});
    setIsModaOpen(true);
  };
  const deleteCustomer = (id) => {
    axios
      .delete(`/customers/list/${id}`)
      .then((response) => {
        toast(response.data.message, {
          type: "success",
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => window.location.reload(),
        });
      })
      .catch((err) => {
        toast(err.response.data.message, {
          type: "error",
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => window.location.reload(),
        });
      });
  };
  useEffect(() => {
    const getCustomers = () => {
      axios
        .get("/customers/list")
        .then((response) => {
          setCustomersList(response.data.data);
        })
        .catch((err) => {
          toast(err.response.data.message, {
            type: "error",
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    };

    getCustomers();
  }, []);

  return (
    <div className="custom-container py-[100px]">
      <div className="bg-white rounded-[16px] shadow-md shadow-[#eeeeee]  p-[25px] w-full">
        <div className="flex justify-end mb-4">
          <button
            type="button"
            className="bg-primary px-4 py-2 text-white rounded-[7px] text-sm "
            onClick={addCustomer}
          >
            Add Customer
          </button>
        </div>
        <Table header={headers} rows={customersList} />
      </div>
      {isModaOpen && (
        <AddCustomer
          closeModal={() => setIsModaOpen(false)}
          editData={editData}
        />
      )}
    </div>
  );
};

export default Customers;
