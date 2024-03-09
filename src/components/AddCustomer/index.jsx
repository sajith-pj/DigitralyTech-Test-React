import PropTypes from "prop-types";
import Styles from "./customer-modal.module.scss";
import CloseIcon from "../Icons/CloseIcon";
import { useState } from "react";
import axios from "../../config";
import { toast } from "react-toastify";
const AddCustomer = ({ closeModal, editData }) => {
  const [customerDetails, setCustomerDetails] = useState(() =>
    Object.keys(editData).length > 0
      ? editData
      : {
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          street: "",
          city: "",
          state: "",
          zip: "",
          country: "",
        }
  );
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const handleChange = (event) => {
    setCustomerDetails({
      ...customerDetails,
      [event.target.name]: event.target.value,
    });

    setErrors({ ...errors, [event.target.name]: "" });
  };

  const validateCustomerForm = () => {
    let error = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    };

    if (customerDetails.firstName === "") {
      error.firstName = "Please enter your first name";
    }
    if (customerDetails.lastName === "") {
      error.lastName = "Please enter your last name";
    }
    if (customerDetails.email === "") {
      error.email = "Please enter your email";
    }
    if (customerDetails.phoneNumber === "") {
      error.phoneNumber = "Please enter your phone number";
    }
    if (customerDetails.street === "") {
      error.street = "Please enter your street address";
    }
    if (customerDetails.city === "") {
      error.city = "Please enter your city";
    }
    if (customerDetails.state === "") {
      error.state = "Please enter your state";
    }
    if (customerDetails.zip === "") {
      error.zip = "Please enter your zip code";
    }
    if (customerDetails.country === "") {
      error.country = "Please enter your country";
    }

    const hasErrors = Object.values(error).some((value) => value !== "");
    if (hasErrors) {
      setErrors({ ...errors, ...error });
      return false;
    }
    return true;
  };

  const postCustomer = (reqBody) => {
    axios.post("/customers/list", reqBody).then((response) => {
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
    });
  };

  const updateCustomer = (reqBody) => {
    axios.put(`/customers/list/${editData?._id}`, reqBody).then((response) => {
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
    });
  };
  const createCustomer = (event) => {
    event.preventDefault();
    const isValid = validateCustomerForm();
    if (!isValid) return;
    let reqBody = {
      firstName: customerDetails.firstName,
      lastName: customerDetails.lastName,
      email: customerDetails.email,
      phoneNumber: customerDetails.phoneNumber,
      address: {
        street: customerDetails.street,
        city: customerDetails.city,
        state: customerDetails.state,
        zip: customerDetails.zip,
        country: customerDetails.country,
      },
    };
    if (Object.keys(editData).length > 0) updateCustomer(reqBody);
    else postCustomer(reqBody);
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-screen justify-center z-50 bg-black bg-opacity-50 overflow-hidden"
        onClick={closeModal}
      ></div>

      <div
        className={`${Styles["layout-container"]}`}
        style={{ maxWidth: "700px" }}
      >
        <div className={`${Styles["modal-header-container"]}`}>
          <div>
            <h1 className={`${Styles["heading"]}  text-primary font-semibold`}>
              Add Customer
            </h1>
          </div>
          <button type="button" className="text-2xl" onClick={closeModal}>
            <CloseIcon width="10" />
          </button>
        </div>
        <div className={`${Styles["modal-body"]}`}>
          <form onSubmit={createCustomer}>
            <div className="input-container">
              <label htmlFor="firstName" className="label">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="input"
                placeholder="First Name"
                value={customerDetails.firstName}
                onChange={handleChange}
              />
              {errors.firstName !== "" && (
                <span className="text-red-600  text-[12px] mt-1 block">
                  {errors.firstName}
                </span>
              )}
            </div>
            <div className="input-container">
              <label htmlFor="LastName" className="label">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="LastName"
                className="input"
                placeholder="Last Name"
                value={customerDetails.lastName}
                onChange={handleChange}
              />
              {errors.lastName !== "" && (
                <span className="text-red-600  text-[12px] mt-1 block">
                  {errors.lastName}
                </span>
              )}
            </div>
            <div className="input-container">
              <label htmlFor="email" className="label">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="input"
                placeholder="example@gmail.com "
                value={customerDetails.email}
                onChange={handleChange}
              />
              {errors.email !== "" && (
                <span className="text-red-600  text-[12px] mt-1 block">
                  {errors.email}
                </span>
              )}
            </div>
            <div className="input-container">
              <label htmlFor="phoneNumber" className="label">
                Phone Number
              </label>
              <input
                type="number"
                name="phoneNumber"
                id="phoneNumber"
                className="input"
                placeholder="Enter your phone number "
                value={customerDetails.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber !== "" && (
                <span className="text-red-600  text-[12px] mt-1 block">
                  {errors.phoneNumber}
                </span>
              )}
            </div>
            <div className="input-container">
              <label htmlFor="street" className="label">
                Street
              </label>
              <input
                type="text"
                name="street"
                id="street"
                className="input"
                placeholder="Enter your street "
                value={customerDetails.street}
                onChange={handleChange}
              />
              {errors.street !== "" && (
                <span className="text-red-600  text-[12px] mt-1 block">
                  {errors.street}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <div className="input-container">
                <label htmlFor="city" className="label">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  className="input"
                  placeholder="Enter your city "
                  value={customerDetails.city}
                  onChange={handleChange}
                />
                {errors.city !== "" && (
                  <span className="text-red-600  text-[12px] mt-1 block">
                    {errors.city}
                  </span>
                )}
              </div>
              <div className="input-container">
                <label htmlFor="state" className="label">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  className="input"
                  placeholder="Enter your state "
                  value={customerDetails.state}
                  onChange={handleChange}
                />
                {errors.state !== "" && (
                  <span className="text-red-600  text-[12px] mt-1 block">
                    {errors.state}
                  </span>
                )}
              </div>
              <div className="input-container">
                <label htmlFor="zip" className="label">
                  Zip
                </label>
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  className="input"
                  placeholder="Enter your zip "
                  value={customerDetails.zip}
                  onChange={handleChange}
                />
                {errors.zip !== "" && (
                  <span className="text-red-600  text-[12px] mt-1 block">
                    {errors.zip}
                  </span>
                )}
              </div>
              <div className="input-container">
                <label htmlFor="country" className="label">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  className="input"
                  placeholder="Enter your country "
                  value={customerDetails.country}
                  onChange={handleChange}
                />
                {errors.country !== "" && (
                  <span className="text-red-600  text-[12px] mt-1 block">
                    {errors.country}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-[#EDEDED] text-secondary_text/[0.57] border border-border_color/[0.1] font-medium px-4 py-2 rounded-lg mr-4 text-[14px]"
                onClick={closeModal}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-primary px-4 py-2 text-white rounded-[7px] text-sm "
              >
                {Object.keys(editData).length > 0
                  ? "Edit Customer"
                  : "Add Customer"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

AddCustomer.propTypes = {
  closeModal: PropTypes.func.isRequired,
  editData: PropTypes.shape({
    _id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    street: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string,
    country: PropTypes.string,
  }),
};
export default AddCustomer;
