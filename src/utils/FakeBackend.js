import React, { useState, useContext, useEffect } from "react";
import frontPageImage from "../external/images/frontpage_house.jpg";

import axios from "axios";
import { useAuth0 } from "./react-auth0-spa";

export const BackendContext = React.createContext();
export const useBackend = () => useContext(BackendContext);

export const BackendProvider = ({ children }) => {
  const { getTokenSilently } = useAuth0();
  
  const [materials, setMaterials] = useState();
  const [countries, setCountries] = useState();
  const [roofTypes, setRoofTypes] = useState();
  const [heatingTypes, setHeatingTypes] = useState();
  const [ventilationTypes, setVentilationTypes] = useState();
  const [buildingTypes, setBuildingTypes] = useState();
  
  const [loading, setLoading] = useState(true);
  const [optionsLoading, setOptionsLoading] = useState(true);

  const testRequest = async () => {
    const address = process.env.REACT_APP_API_ROOT + "/buildings";
    console.log("test: " + address);
    try {
      const response = await axios.get(address);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const requestAreas = async () => {
    const address = process.env.REACT_APP_API_ROOT + "/editor/areas";
    try {
      const response = await axios.get(address)
      console.log(response.data)
      setCountries(response.data);
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const requestAreaOptions = async (selectedArea) => {
    const address = encodeURI(process.env.REACT_APP_API_ROOT + "/editor/options/" + selectedArea);
    console.log("asd: " +  address);
    setOptionsLoading(true);
    try {
      const response = await axios.get(address)
      console.log(response.data)
      console.log(response.data.materials)
      setMaterials(response.data.materials);
      setRoofTypes(response.data.roofTypes);
      setVentilationTypes(response.data.ventilationTypes);
      setHeatingTypes(response.data.heatingTypes);
      setBuildingTypes(response.data.buildingTypes);
      console.log("here:");
      setOptionsLoading(false);
    } catch (error) {
      console.log("err:" + error);
    }
  }

  const getMaterials = () => {
    return materials;
  };

  const getRoofTypes = () => {
    return roofTypes;
  };

  const getVentilationTypes = () => {
    return ventilationTypes;
  };

  const getHeatingTypes = () => {
    return heatingTypes;
  };

  const getCountries = () => {
    return countries;
  };

  const getBuildingTypes = () => {
    return buildingTypes;
  };

  const getSavedBuildings = async () => {
    const createData = (name, image, date, improvements, id) => {
      return { name, image, date, improvements, id };
    };

    const data = [
      createData("Burj Khalifa", frontPageImage, "2020-05-22 10:10:03", 12, 1),
      createData("Shanghai Tower", frontPageImage, "2020-05-24 13:25:01", 3, 2),
      createData(
        "Makkah Royal Clock Tower",
        frontPageImage,
        "2020-05-25 12:10:03",
        14,
        3
      ),
      createData(
        "Ping An Finance Center",
        frontPageImage,
        "2020-05-26 15:22:08",
        16,
        4
      ),
      createData(
        "Lotte World Tower",
        frontPageImage,
        "2020-05-26 19:13:03",
        21,
        5
      ),
      createData(
        "One World Trade Center",
        frontPageImage,
        "2020-05-28 15:00:01",
        5,
        6
      ),
      createData(
        "Guangzhou CTF Finance Centre",
        frontPageImage,
        "2020-05-29 09:56:00",
        7,
        7
      ),
      createData(
        "Tianjin CTF Finance Centre",
        frontPageImage,
        "2020-05-31 15:12:43",
        31,
        8
      ),
    ];

    return data;
  };

  const getBuildingFromSlug = async () => {
    const buildingInformation = {
      "details": {
        "name": {
          "propertyName": "Name",
          "value": "Talo"
        },
        "area": {
          "propertyName": "Area",
          "value": "Northern Finland"
        },
        "year": {
          "propertyName": "Construction year",
          "value": 1900
        },
        "floorArea": {
          "propertyName": "Floor area(in square meters)",
          "value": 62
        },
        "heatedFloorArea": {
          "propertyName": "Heated floor area(in square meters)",
          "value": 50
        },
        "floorsAmount": {
          "propertyName": "Amount of floors",
          "value": 2
        },
        "description": {
          "propertyName": "Description of building",
          "value": "Quisque vulputate enim ligula, sed lobortis metus commodo efficitur. Suspendisse ante lectus, sagittis eu diam a, convallis aliquam eros. Vivamus consequat sagittis nunc in euismod. Vivamus laoreet erat elit. Praesent erat diam, dapibus a purus ac, scelerisque consequat tortor. Aliquam nunc metus, ultricies et lacus a, rutrum feugiat ligula. Proin a enim tortor."
        },
        "image": {
          "propertyName": "Image",
          "value": frontPageImage
        }
      },
      "heating": {
        "heatingSystem": {
          "propertyName": "Heating System",
          "value": "Oil",
          "suggestions": [
            {
              "suggestionText": "Nulla urna lorem, porttitor vehicula risus vitae, ultrices commodo nisl. Nullam viverra mollis tortor at vestibulum.",
              "priority": 95
            }
          ],
          "comments": [
            {
              "commentText": "Donec dapibus facilisis nisl vel posuere. Morbi bibendum magna ac lacus vestibulum, eu egestas lacus viverra.",
              "date": "2020-06-15 12:14:34",
              "author": "John Doe",
              "sentiment": "positive"
            }
          ]
        },
        "heatingSource": {
          "propertyName": "Heating Source",
          "value": "Source 1"
        },
        "annualCost": {
          "propertyName": "Annual cost",
          "value": 300
        }
      },
      "electricity": {
        "annualUse": {
          "propertyName": "Annual use",
          "value": 500
        },
        "annualCost": {
          "propertyName": "Annual cost",
          "value": 250
        }
      },
      "structure": {
        "wallMaterial": {
          "propertyName": "Wall material",
          "value": "Wood",
          "suggestions": [
            {
              "suggestionText": "Sed sapien turpis, rutrum et semper in, eleifend nec elit. Etiam lobortis, ante quis varius vehicula, magna urna ultricies justo, non interdum est lectus a est.",
              "priority": 30
            }
          ],
          "comments": [
            {
              "commentText": "Quisque et convallis diam, eget interdum sapien. Vivamus felis nulla, condimentum a volutpat vel, luctus id odio. ",
              "date": "2020-06-15 15:44:23",
              "sentiment": "negative"
            }
          ]
        },
        "wallThickness": {
          "propertyName": "Wall Thickness",
          "value": 16
        },
        "windowAmount": {
          "propertyName": "Amount of windows",
          "value": 12
        },
        "doorMaterial": {
          "propertyName": "Door material",
          "value": "Wood"
        },
        "doorAmount": {
          "propertyName": "Amount of doors",
          "value": 4
        },
        "roofMaterial": {
          "propertyName": "Roof material",
          "value": "Roof material 1"
        },
        "roofInsulation": {
          "propertyName": "Roof insulation",
          "value": true
        }
      },
      "ventilation": {
        "ventilationSystem": {
          "propertyName": "Ventilation system",
          "value": "Ventilation system 1",
          "suggestions": [
            {
              "suggestionText": "Vivamus laoreet erat elit. Praesent erat diam, dapibus a purus ac, scelerisque consequat tortor. Aliquam nunc metus, ultricies et lacus a, rutrum feugiat ligula.",
              "priority": 1
            }
          ],
          "comments": [
            {
              "commentText": "Proin a enim tortor. Cras vestibulum bibendum libero, a pulvinar turpis eleifend fringilla. Suspendisse et nunc hendrerit, lacinia enim eu, tincidunt dolor.",
              "date": "2020-06-16 11:44:23",
              "author": "Jane Doe",
              "sentiment": "neutral"
            }
          ]
        }
      }
    }

    return buildingInformation;
  };

  return (
    <BackendContext.Provider
      value={{
        loading,
        optionsLoading,
        requestAreas,
        requestAreaOptions,
        getMaterials,
        getRoofTypes,
        getVentilationTypes,
        getHeatingTypes,
        getCountries,
        getSavedBuildings,
        getBuildingTypes,
        getBuildingFromSlug,
      }}
    >
      {children}
    </BackendContext.Provider>
  );
};
