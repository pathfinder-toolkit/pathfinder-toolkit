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

  const addNewEntry = (event, propertyName) => {
    event.persist();
    console.log("adding new entry to: " + propertyName);

    let currentObjectIndex = formData[propertyName].findIndex(
      (x) => x.isCurrent
    );

    if (formData[propertyName][currentObjectIndex].hasSuggestions) {
      console.log("has suggestions");
      getSuggestions(propertyName, event.target.value);
      getComments(propertyName);
    } else {
      console.log("has no suggestions.");
    }

    let objects = formData[propertyName];
    objects[0].value = event.target.value;

    setFormData((formData) => ({
      ...formData,
      [propertyName]: objects,
    }));
  };

  const addOldEntry = (value, year, propertyName, description) => {
    let newObject = {
      propertyName: "",
      value: "",
      usageStartYear: "",
      hasSuggestions: false,
      isCurrent: false,
      description: "",
    };

    let objects = formData[propertyName];

    newObject.propertyName = objects[0].propertyName;
    newObject.hasSuggestions = objects[0].hasSuggestions;
    newObject.isCurrent = false;
    newObject.value = value;
    newObject.usageStartYear = year;
    newObject.description = description;

    objects.push(newObject);

    setFormData((formData) => ({
      ...formData,
      [propertyName]: objects,
    }));
  };

  const deleteEntry = (propertyName, index) => {
    console.log("deleting: " + propertyName + " | index " + index);

    let objects = formData[propertyName];
    objects.splice(index, 1);

    setFormData((formData) => ({
      ...formData,
      [propertyName]: objects,
    }));
  };

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

  const validateNumber = (input) => {
    if (isNaN(input)) {
      return false;
    }

    if (input < 0) {
      return false;
    }

    return true;
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

  return {
    formData,
    handleChange,
    handleFileChange,
    addNewEntry,
    addOldEntry,
    deleteEntry,
    validateNumber,
  };
};

export default useFormData;
