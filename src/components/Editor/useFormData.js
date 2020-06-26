import { useState } from "react";
import { useEditor } from "../../utils/EditorProvider";
import { useTimer } from "../../utils/useTimer";

const useFormData = (category) => {
  const { getSavedCategory, setSavedCategory, getSuggestions } = useEditor();
  //Get form data from local storage
  const [formData, setFormData] = useState(getSavedCategory(category));

  const handleChange = (event, propertyName) => {
    event.persist();

    // If property is array, find current property, get suggestions and update
    if (Array.isArray(formData[propertyName])) {
      console.log(propertyName + " | array | " + event.target.value);
      let currentObjectIndex;

      currentObjectIndex = formData[propertyName].findIndex((x) => x.isCurrent);

      if (formData[propertyName][currentObjectIndex].hasSuggestions) {
        getSuggestions(propertyName, event.target.value);
      }

      setFormData((formData) => ({
        ...formData,
        [propertyName]: {
          ...formData[propertyName[currentObjectIndex]],
          value: event.target.value,
        },
      }));
    } else {
      console.log(propertyName + " | object | " + event.target.value);
      if (formData[propertyName].hasSuggestions) {
        getSuggestions(propertyName, event.target.value);
      }

      setFormData((formData) => ({
        ...formData,
        [propertyName]: {
          ...formData[propertyName],
          value: event.target.value,
        },
      }));
    }
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

  return { formData, handleChange, handleFileChange };
};

export default useFormData;
