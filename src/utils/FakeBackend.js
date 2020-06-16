import React, { useState, useContext, useEffect } from "react";
import frontPageImage from "../external/images/frontpage_house.jpg";

import axios from "axios";
import { useAuth0 } from "./react-auth0-spa";

export const BackendContext = React.createContext();
export const useBackend = () => useContext(BackendContext);

export const BackendProvider = ({ children }) => {
  const { getTokenSilently } = useAuth0();

  const [loading, setLoading] = useState(true);
  const [materials, setMaterials] = useState();
  const [countries, setCountries] = useState();
  const [roofTypes, setRoofTypes] = useState();
  const [heatingTypes, setHeatingTypes] = useState();
  const [ventilationTypes, setVentilationTypes] = useState();
  const [buildingTypes, setBuildingTypes] = useState();
  const [tips, setTips] = useState();

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

  useEffect(() => {
    testRequest();
  }, []);


  const fakeRequest = async () => {
    const result = await fakeResponse();
    console.log("result: " + result);
  };

  const fakeResponse = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setMaterials(["Wood", "Stone", "Concrete"]);
        setCountries([
          "Southern Finland",
          "Northern Finland",
          "Southern Sweden",
          "Northern Sweden",
          "Scotland",
          "Northern Ireland",
          "Ireland",
          "Faroe Islands",
        ]);
        setRoofTypes(["Roof 1", "Roof 2", "Roof 3"]);
        setVentilationTypes(["Gravity based", "Machine based", "Mixed type"]);
        setHeatingTypes(["Heating 1", "Heating 2", "Heating 3"]);
        setTips(
          ["Replace heating system", "Remove windows & doors"],
          "Placeholder tip"
        );
        setBuildingTypes(["Building 1", "Building 2", "Building 3"]);
        resolve("resolved");
        setLoading(false);
      }, 2000);
    });
  };

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

  const getTips = (tag) => {
    return tips;
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
        fakeRequest,
        getMaterials,
        getRoofTypes,
        getVentilationTypes,
        getHeatingTypes,
        getCountries,
        getSavedBuildings,
        getTips,
        getBuildingTypes,
        getBuildingFromSlug,
      }}
    >
      {children}
    </BackendContext.Provider>
  );
};
