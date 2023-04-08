import React, { useState} from "react";
import SignatureCanvas from "react-signature-canvas";
import "./Report.css";
import axios from "axios";
import { saveAs } from "file-saver";
import { API } from "../../../shared/api";
import { CONST } from "../../../shared/constants";



const Report = () => {
  let [form, setForm] = useState({
    engineername: "",
    jobname: "",
    jobcode: "",
    contactnumber: "",
    inchargename: "",
    signature: "",
  });
  // let trim = () => {
  //   setForm({trimmedDataURL: this.sigPad.getTrimmedCanvas()
  //     .toDataURL('image/png')})
  // }
  let handleChange = ({ target: { value, name } }) => {
    console.log(name, value);
    setForm({ ...form, [name]: value });
    console.log("form is here", form);
  };
  let handleCheckboxChange = ({ target: { name, value, checked } }) => {
    console.log(value, checked, name);
    if (checked == true) {
      setForm({ ...form, [name]: value });
      console.log("form is here", form);
    } else {
      setForm({ ...form, [name]: "" });
    }
  };

  let FORM = {
      engineername_jobname_jobcode: [
        {
            label: 'ENGINEER NAME',
            placeholder: 'Enter Your Name',
            type: 'text',
            value: null,
            name: 'engineername'
          
        },
        {
          label: 'JOB NAME',
          placeholder: 'Enter job name',
          type: 'text',
          value: null,
          name: 'jobname'
      },
        {
          label: 'JOB CODE',
          placeholder: 'Enter job code',
          type: 'text',
          value: null,
          name: 'jobcode'
      }
  
    ],
    contactnumber_inchargename: [
          {
            label: 'Contact No',
            placeholder: 'Enter Contact',
            type: 'tel',
            value: null,
            name: 'contactnumber'
        },
        {
          label: 'Incharge Name',
          placeholder: 'Enter incharge name',
          type: 'text',
          value: null,
          name: 'inchargename'
      }
          
    ]
    
  }

  let submitForm = () => {
    axios.post(`${CONST.url}${API.generatePdf}`, form)
      .then((res) => {
        console.log("res is here", res);
        const pdfBlob = new File(res.data,  {type:'application/pdf'})
        FileSaver.saveAs(pdfBlob, "Report.pdf");
      })
      .catch((err) => {
        console.log("err is here", err);
      });
  };

  return (
    <div className="form-container">
      <form className="w-full">
        <div className="flex flex-wrap -mx-3 mb-6">
          {/*  mb-6 md:mb-0 */}
          {
            FORM.engineername_jobname_jobcode.map((form,index) => {
              return (
              <div className="w-full md:w-1/3 px-3" key={index}>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  {form.label}
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type={form.type}
                    placeholder={form.placeholder}
                    name={form.name}
                    onChange={(e) => handleChange(e)}
                  />
                </label>
             </div>)
            })
          }
         
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
            {
              FORM.contactnumber_inchargename.map((form,index) => {
                return (
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0" key={index}>
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      {form.label}
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                        type={form.type}
                        placeholder={form.placeholder}
                        name={form.name}
                        onChange={(e) => handleChange(e)}
                      />
                      
                    </label>
                </div>
                )
              })
            }
        
        </div>

        <div className="w-full flex flex-wrap -mx-3 mb-6">
          <div className="flex items-center md:w-1/11 px-3">
            <input
              onChange={handleCheckboxChange}
              name="newInstall"
              id="checked-checkbox"
              type="checkbox"
              value="New Installation"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="checked-checkbox"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              New Installtion
            </label>
          </div>
          <div className="flex items-center md:w-1/11 px-3">
            <input
              onChange={handleCheckboxChange}
              name="reinstall"
              id="checked-checkbox-2"
              type="checkbox"
              value="Reinstallation"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="checked-checkbox-2"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Reinstallation
            </label>
          </div>
          <div className="flex items-center md:w-1/11 px-3">
            <input
              onChange={handleCheckboxChange}
              name="rectification"
              id="checked-checkbox-3"
              type="checkbox"
              value="Rectification"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="checked-checkbox-3"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Rectification
            </label>
          </div>
          <div className="flex items-center md:w-1/11 px-3">
            <input
              onChange={handleCheckboxChange}
              name="kmrTesting"
              id="checked-checkbox-4"
              type="checkbox"
              value="KMR Testing"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="checked-checkbox-4"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              KMR Testing
            </label>
          </div>
          <div className="flex items-center md:w-1/11 px-3">
            <input
              onChange={handleCheckboxChange}
              name="hmrTesting"
              id="checked-checkbox-5"
              type="checkbox"
              value="HMR Testing"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="checked-checkbox-5"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              HMR Testing
            </label>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Asset Code :
              <input
                onChange={handleChange}
                name="assetCode"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Enter Your Assest Code"
              />
            </label>

            {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Assest Description
              <input
                onChange={handleChange}
                name="assetDescription"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Enter Your Assest Description"
              />
            </label>
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Asset Reg. No.
              <input
                onChange={handleChange}
                name="assetReg"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Enter Your Asset Reg. No."
              />
            </label>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Device IMEI No.
              <input
                onChange={handleChange}
                name="deviceImei"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Enter Your Device IMEI No."
              />
            </label>

            {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              SIM No.
              <input
                onChange={handleChange}
                name="simNo"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Enter Your SIM No."
              />
            </label>
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Fuel Sensor Sr. No.
              <input
                onChange={handleChange}
                name="fuelSensorNo"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Enter Your Fuel Sensor Sr. No."
              />
            </label>
          </div>
        </div>
        <div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Power Supply Taken From
              </label>
              <div className="w-full flex flex-wrap -mx-3 mb-6">
                <div className="flex items-center md:w-1/3 px-3">
                  <input
                    onChange={handleCheckboxChange}
                    name="powerSupplyBattery"
                    id="checked-checkbox"
                    type="checkbox"
                    value="Battery"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Battery
                  </label>
                </div>
                <div className="flex items-center md:w-1/3 px-3">
                  <input
                    onChange={handleCheckboxChange}
                    name="powerSupplyAdaptor"
                    id="checked-checkbox"
                    type="checkbox"
                    value="Adaptor"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Adaptor
                  </label>
                </div>
                <div className="flex items-center md:w-1/3 px-3">
                  <input
                    onChange={handleCheckboxChange}
                    name="powerSupplyOther"
                    id="checked-checkbox"
                    type="checkbox"
                    value="Other"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Other
                  </label>
                </div>
              </div>
              {/* <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p> */}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Earthing Supply Taken From
              </label>
              <div className="w-full flex flex-wrap -mx-3 mb-6">
                <div className="flex items-center md:w-1/3 px-3">
                  <input
                    onChange={handleCheckboxChange}
                    name="earthingSupplyBattery"
                    id="checked-checkbox"
                    type="checkbox"
                    value="Battery"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Battery
                  </label>
                </div>
                <div className="flex items-center md:w-1/3 px-3">
                  <input
                    onChange={handleCheckboxChange}
                    name="earthingSupplyVehicle"
                    id="checked-checkbox"
                    type="checkbox"
                    value="Vehicle Body"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Vehicle Body
                  </label>
                </div>
                <div className="flex items-center md:w-1/3 px-3">
                  <input
                    onChange={handleCheckboxChange}
                    name="earthingSupplyOther"
                    id="checked-checkbox"
                    type="checkbox"
                    value="Other"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Other
                  </label>
                </div>
              </div>
              {/* <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p> */}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Earthing Connections are tied securely with
              </label>
              <div className="w-full flex flex-wrap -mx-3 mb-6">
                <div className="flex items-center md:w-1/3 px-3">
                  <input
                    onChange={handleCheckboxChange}
                    name="earthingConnectionTie"
                    id="checked-checkbox"
                    type="checkbox"
                    value="Tie"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Tie
                  </label>
                </div>
                <div className="flex items-center md:w-1/3 px-3">
                  <input
                    onChange={handleCheckboxChange}
                    name="earthingConnectionTape"
                    id="checked-checkbox"
                    type="checkbox"
                    value="Tape"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Tape
                  </label>
                </div>
                <div className="flex items-center md:w-1/3 px-3">
                  <input
                    onChange={handleCheckboxChange}
                    name="earthingConnectionThimble"
                    id="checked-checkbox"
                    type="checkbox"
                    value="Thimble"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Thimble
                  </label>
                </div>
              </div>
              {/* <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p> */}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Ignition Connections are tied securely with
              </label>
              <div className="w-full flex flex-wrap -mx-3 mb-6">
                <div className="flex items-center md:w-1/3 px-3">
                  <input
                    onChange={handleCheckboxChange}
                    name="ignitionConnectionTie"
                    id="checked-checkbox"
                    type="checkbox"
                    value="Tie"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Tie
                  </label>
                </div>
                <div className="flex items-center md:w-1/3 px-3">
                  <input
                    onChange={handleCheckboxChange}
                    name="ignitionConnectionTape"
                    id="checked-checkbox"
                    type="checkbox"
                    value="Tape"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Tape
                  </label>
                </div>
                <div className="flex items-center md:w-1/3 px-3">
                  <input
                    onChange={handleCheckboxChange}
                    name="ignitionConnectionThimble"
                    id="checked-checkbox"
                    type="checkbox"
                    value="Thimble"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Thimble
                  </label>
                </div>
              </div>
              {/* <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p> */}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Real Time Matching of Ignition ON / OFF
              </label>
              <div className="w-full flex flex-wrap -mx-3 mb-6">
                <div className="flex items-center md:w-1/3 px-3">
                  <input
                    onChange={handleCheckboxChange}
                    name="RealTimeMatching"
                    id="checked-checkbox"
                    type="checkbox"
                    value="Yes"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Yes
                  </label>
                </div>
                <div className="flex items-center md:w-1/3 px-3">
                  <input
                    onChange={handleCheckboxChange}
                    name="RealTimeMatching"
                    id="checked-checkbox"
                    type="checkbox"
                    value="No"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    No
                  </label>
                </div>
              </div>
              {/* <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p> */}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Device Mounted Securely
              </label>
              <div className="w-full flex flex-wrap -mx-3 mb-6">
                <div className="flex items-center md:w-1/3 px-3">
                  <input
                    onChange={handleCheckboxChange}
                    name="DeviceMountedSecurely"
                    id="checked-checkbox"
                    type="checkbox"
                    value="Yes"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Yes
                  </label>
                </div>
                <div className="flex items-center md:w-1/3 px-3">
                  <input
                    onChange={handleCheckboxChange}
                    name="DeviceMountedSecurely"
                    id="checked-checkbox"
                    type="checkbox"
                    value="No"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    No
                  </label>
                </div>
              </div>
              {/* <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p> */}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Cable Connector in Gateway Tied Securely with
              </label>
              <div className="w-full flex flex-wrap -mx-3 mb-6">
                <div className="flex items-center md:w-1/3 px-3">
                  <input
                    onChange={handleCheckboxChange}
                    name="cableConnectorGatewayTie"
                    id="checked-checkbox"
                    type="checkbox"
                    value="Tie"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Tie
                  </label>
                </div>
                <div className="flex items-center md:w-1/3 px-3">
                  <input
                    onChange={handleCheckboxChange}
                    name="cableConnectorGatewayTape"
                    id="checked-checkbox"
                    type="checkbox"
                    value="Tape"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Tape
                  </label>
                </div>
                <div className="flex items-center md:w-1/3 px-3">
                  <input
                    onChange={handleCheckboxChange}
                    name="cableConnectorGatewayThimble"
                    id="checked-checkbox"
                    type="checkbox"
                    value="Thimble"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Thimble
                  </label>
                </div>
              </div>
              {/* <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p> */}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Engine Connection are Tied Securely with
              </label>
              <div className="w-full flex flex-wrap -mx-3 mb-6">
                <div className="flex items-center md:w-1/3 px-3">
                  <input
                    onChange={handleCheckboxChange}
                    name="EngineConnectionTiedSecurelyTie"
                    id="checked-checkbox"
                    type="checkbox"
                    value="Tie"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Tie
                  </label>
                </div>
                <div className="flex items-center md:w-1/3 px-3">
                  <input
                    onChange={handleCheckboxChange}
                    name="EngineConnectionTiedSecurelyTape"
                    id="checked-checkbox"
                    type="checkbox"
                    value="Tape"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Tape
                  </label>
                </div>
                <div className="flex items-center md:w-1/3 px-3">
                  <input
                    onChange={handleCheckboxChange}
                    name="EngineConnectionTiedSecurelyThimble"
                    id="checked-checkbox"
                    type="checkbox"
                    value="Thimble"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Thimble
                  </label>
                </div>
              </div>
              {/* <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p> */}
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Real Time Matching of Engine ON / OFF
              </label>
              <div className="w-full flex flex-wrap -mx-3 mb-6">
                <div className="flex items-center md:w-1/3 px-3">
                  <input
                    onChange={handleCheckboxChange}
                    name="RealTimeMatchingEngine"
                    id="checked-checkbox"
                    type="checkbox"
                    value="Yes"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Yes
                  </label>
                </div>
                <div className="flex items-center md:w-1/3 px-3">
                  <input
                    onChange={handleCheckboxChange}
                    name="RealTimeMatchingEngine"
                    id="checked-checkbox"
                    type="checkbox"
                    value="No"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    No
                  </label>
                </div>
              </div>
              {/* <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p> */}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Engine Connections Taken from
              </label>
              <div className="w-full flex flex-wrap -mx-3 mb-6">
                <div className="flex items-center md:w-1/3 px-3">
                  <input
                    onChange={handleCheckboxChange}
                    name="EngineConnectionsTakenAlternators"
                    id="checked-checkbox"
                    type="checkbox"
                    value="Alternator"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Alternator
                  </label>
                </div>
                <div className="flex items-center md:w-1/3 px-3">
                  <input
                    onChange={handleCheckboxChange}
                    name="EngineConnectionsTakenOps"
                    id="checked-checkbox"
                    type="checkbox"
                    value="Oil Pressure Switch"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Oil Pressure Switch
                  </label>
                </div>
                <div className="flex items-center md:w-1/3 px-3">
                  <input
                    onChange={handleCheckboxChange}
                    name="EngineConnectionsTakenBattery"
                    id="checked-checkbox"
                    type="checkbox"
                    value="Battery Voltage"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Battery Voltage
                  </label>
                </div>
              </div>
              {/* <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p> */}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Taking Photographs for Installations
              </label>
              <div className="w-full flex flex-wrap -mx-3 mb-6">
                <div className="flex items-center md:w-1/3 px-3">
                  <input
                    onChange={handleCheckboxChange}
                    name="TakingPhotographsInstallations"
                    id="checked-checkbox"
                    type="checkbox"
                    value="Yes"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Yes
                  </label>
                </div>
                <div className="flex items-center md:w-1/3 px-3">
                  <input
                    onChange={handleCheckboxChange}
                    name="TakingPhotographsInstallations"
                    id="checked-checkbox"
                    type="checkbox"
                    value="No"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    No
                  </label>
                </div>
              </div>
              {/* <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p> */}
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-3">HMR Testing</h1>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Machine Parameters
                  </label>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/4 px-3 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Engine Starting Time
                        <input
                          onChange={handleChange}
                          name="hmrMachineEngineStartingTime"
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          id="grid-first-name"
                          type="text"
                          placeholder="Enter Engine Starting Time"
                        />
                      </label>

                      {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                    </div>
                    <div className="w-full md:w-1/4 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Engine Stop Time
                        <input
                          onChange={handleChange}
                          name="hmrMachineEngineStopTime"
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-last-name"
                          type="text"
                          placeholder="Enter Engine Stop Time"
                        />
                      </label>
                    </div>
                    <div className="w-full md:w-1/4 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Starting Meter Reading
                        <input
                          onChange={handleChange}
                          name="hmrMachineMeterStartRead"
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-last-name"
                          type="text"
                          placeholder="Enter Starting Meter Reading"
                        />
                      </label>
                    </div>
                    <div className="w-full md:w-1/4 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        End Meter Reading
                        <input
                          onChange={handleChange}
                          name="hmrMachineMeterEndRead"
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-last-name"
                          type="text"
                          placeholder="Enter End Meter Reading"
                        />
                      </label>
                    </div>
                  </div>
                  {/* <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p> */}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    GPS Parameters
                  </label>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Engine Starting Time
                        <input
                          onChange={handleChange}
                          name="hmrGpsEngineStartingTime"
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          id="grid-first-name"
                          type="text"
                          placeholder="Enter Engine Starting Time"
                        />
                      </label>

                      {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Engine Stop Time
                        <input
                          onChange={handleChange}
                          name="hmrGpsEngineStopTime"
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-last-name"
                          type="text"
                          placeholder="Enter Engine Stop Time"
                        />
                      </label>
                    </div>
                  </div>
                  {/* <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p> */}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Total Difference
                  </label>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Machine Reading
                        <input
                          onChange={handleChange}
                          name="hmrTdMachineRead"
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          id="grid-first-name"
                          type="text"
                          placeholder="Enter Machine Reading "
                        />
                      </label>

                      {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        GPS Reading
                        <input
                          onChange={handleChange}
                          name="hmrTdGpsRead"
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-last-name"
                          type="text"
                          placeholder="Enter GPS Reading"
                        />
                      </label>
                    </div>
                  </div>
                  {/* <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-3">HMR Testing</h1>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Machine Parameters
                  </label>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/4 px-3 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Engine Starting Time
                        <input
                          onChange={handleChange}
                          name="kmrMachineEngineStartTime"
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          id="grid-first-name"
                          type="text"
                          placeholder="Enter Engine Starting Time"
                        />
                      </label>

                      {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                    </div>
                    <div className="w-full md:w-1/4 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Engine Stop Time
                        <input
                          onChange={handleChange}
                          name="kmrMachineEngineStopTime"
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-last-name"
                          type="text"
                          placeholder="Enter Engine Stop Time"
                        />
                      </label>
                    </div>
                    <div className="w-full md:w-1/4 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Starting Meter Reading
                        <input
                          onChange={handleChange}
                          name="kmrMeterReadStart"
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-last-name"
                          type="text"
                          placeholder="Enter Starting Meter Reading"
                        />
                      </label>
                    </div>
                    <div className="w-full md:w-1/4 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        End Meter Reading
                        <input
                          onChange={handleChange}
                          name="kmrMeterReadEnd"
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-last-name"
                          type="text"
                          placeholder="Enter End Meter Reading"
                        />
                      </label>
                    </div>
                  </div>
                  {/* <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p> */}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Other Parameters
                  </label>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Starting
                        <input
                          onChange={handleChange}
                          name="kmrOtherParamStart"
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          id="grid-first-name"
                          type="text"
                          placeholder="Enter Starting"
                        />
                      </label>

                      {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        End
                        <input
                          onChange={handleChange}
                          name="kmrOtherParamEnd"
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-last-name"
                          type="text"
                          placeholder="Enter End"
                        />
                      </label>
                    </div>
                  </div>
                  {/* <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p> */}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    GPS Parameters
                  </label>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Engine Starting Time
                        <input
                          onChange={handleChange}
                          name="kmrGpsParamEngineStart"
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          id="grid-first-name"
                          type="text"
                          placeholder="Enter Engine Starting Time"
                        />
                      </label>

                      {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Engine Stop Time
                        <input
                          onChange={handleChange}
                          name="kmrGpsParamEngineStop"
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-last-name"
                          type="text"
                          placeholder="Enter Engine Stop Time"
                        />
                      </label>
                    </div>
                  </div>
                  {/* <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p> */}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Machine Parameters
                  </label>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/3 px-3 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Machine Reading
                        <input
                          onChange={handleChange}
                          name="kmrMachineParamMr"
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          id="grid-first-name"
                          type="text"
                          placeholder="Enter Machine Reading"
                        />
                      </label>

                      {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                    </div>
                    <div className="w-full md:w-1/3 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Other Parameters Reading
                        <input
                          onChange={handleChange}
                          name="kmrMachineParamOtherParam"
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-last-name"
                          type="text"
                          placeholder="Enter Other Parameters Reading"
                        />
                      </label>
                    </div>
                    <div className="w-full md:w-1/3 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        GPS Reading
                        <input
                          onChange={handleChange}
                          name="kmrMachineParamGpsRead"
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-last-name"
                          type="text"
                          placeholder="Enter GPS Reading"
                        />
                      </label>
                    </div>
                  </div>
                  {/* <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Remark:</label>
          <textarea
            onChange={handleChange}
            name="remark"
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Old Sim No:
              <input
                onChange={handleChange}
                name="oldSimNo"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Enter Your Old Sim No."
              />
            </label>

            {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Old Device No.
              <input
                onChange={handleChange}
                name="oldDeviceNo"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Enter Your Old Device No."
              />
            </label>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Service Engineer
            </label>

            <SignatureCanvas
              penColor="green"
              canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
            />
            <p className="text-red-500 text-xs italic">Please Sign here</p>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Site Engineer.
              <SignatureCanvas
                penColor="green"
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: "sigCanvas",
                }}
                onChange="handleChange"
                name="signature"
              />
              <p className="text-red-500 text-xs italic">Name & Signature</p>
            </label>
          </div>
        </div>
        <button className="rounded-none ..." onClick={submitForm}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Report;
