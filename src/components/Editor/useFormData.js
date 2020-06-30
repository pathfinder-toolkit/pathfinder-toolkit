import { useState } from "react";
import { useEditor } from "../../utils/EditorProvider";
import { useTimer } from "../../utils/useTimer";

const useFormData = (category) => {
  const {
    getSavedCategory,
    setSavedCategory,
    getSuggestions,
    getComments,
  } = useEditor();
  //Get form data from local storage
  const [formData, setFormData] = useState(getSavedCategory(category));

  const handleChange = (event, propertyName) => {
    event.persist();

    console.log(category + " | " + propertyName + " | " + event.target.value);

    // If property is array, find current property
    if (Array.isArray(formData[propertyName])) {
      handleArrayChange(event, propertyName);
    } else {
      handleObjectChange(event, propertyName);
    }
  };

  const handleObjectChange = (event, propertyName) => {
    console.log(propertyName + " | object | " + event.target.value);
    if (formData[propertyName].hasSuggestions) {
      console.log("has suggestions.");
      getSuggestions(propertyName, event.target.value);
      getComments(propertyName);
    } else {
      console.log("has no suggestions.");
    }

    setFormData((formData) => ({
      ...formData,
      [propertyName]: {
        ...formData[propertyName],
        value: event.target.value,
      },
    }));
  };

  const handleArrayChange = (event, propertyName) => {
    console.log(propertyName + " | array | " + event.target.value);
    let currentObjectIndex;

    currentObjectIndex = formData[propertyName].findIndex((x) => x.isCurrent);

    if (formData[propertyName][currentObjectIndex].hasSuggestions) {
      console.log("has suggestions");
      getSuggestions(propertyName, event.target.value);
      getComments(propertyName);
    } else {
      console.log("has no suggestions.");
    }

    console.log(formData[propertyName][currentObjectIndex]);
    setFormData((formData) => ({
      ...formData,
      [propertyName]: [
        {
          ...formData[propertyName][currentObjectIndex],
          value: event.target.value,
        },
      ],
    }));
  };
  //
  const addNewEntry = (event, propertyName) => {
    event.persist();
    console.log("adding new entry to: " + propertyName);

    let newObject = {
      propertyName: "",
      value: "",
      hasSuggestions: false,
      isCurrent: false,
    };

    let previousObject = getObjectByIndex(
      propertyName,
      getCurrentIndex(propertyName)
    );

    newObject.propertyName = previousObject.propertyName;
    newObject.hasSuggestions = previousObject.hasSuggestions;
    newObject.isCurrent = true;
    newObject.value = event.target.value;

    //Set old object isCurrent false
    setFormData((formData) => ({
      ...formData,
      [propertyName]: [
        ...formData[propertyName],
        {
          ...formData[propertyName][getCurrentIndex(propertyName)],
          isCurrent: false,
        },
      ],
    })); 

    //Add new object to property array
    setFormData((formData) => ({
      ...formData,
      [propertyName]: [...formData[propertyName], newObject],
    }));
  };

  const getCurrentIndex = (propertyName) => {
    return formData[propertyName].findIndex((x) => x.isCurrent);
  };

  const getObjectByIndex = (propertyName, index) => {
    return formData[propertyName][index];
  };
  //

  const handleFileChange = (event) => {
    event.persist();
    console.log(event.target.files[0]);
    setFormData((formData) => ({
      ...formData,
      image: {
        ...formData.image,
        value: event.target.files[0],
      },
    }));
    console.log(formData);
  };

  const resetProperty = (propertyName) => {
    console.log("resetting: " + propertyName);
    setFormData((formData) => ({
      ...formData,
      [propertyName]: {
        ...formData[propertyName],
        value: "",
      },
    }));
    console.log(formData);
  };

  //Save category to local storage with timer debounce
  useTimer(
    () => {
      setSavedCategory(category, formData);
      return () => {
        setSavedCategory(category, formData);
      };
    },
    500,
    [formData]
  );

  return { formData, handleChange, handleFileChange, addNewEntry };
};

export default useFormData;
