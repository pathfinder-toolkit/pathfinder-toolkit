import React, { useState, useEffect } from "react";
import { useEditor } from "../../utils/EditorProvider";
import { useTimer } from "../../utils/useTimer";

const useFormData = (category) => {
  const { getSavedCategory, setSavedCategory, getSuggestions } = useEditor();
  const [formData, setFormData] = useState(getSavedCategory(category));

  const handleChange = (event, propertyName) => {
    event.persist();

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

  useTimer(
    () => {
      console.log("saving");
      setSavedCategory(category, formData);
      return () => {
        setSavedCategory(category, formData);
      };
    },
    500,
    [formData]
  );

  return { formData, handleChange };
};

export default useFormData;
