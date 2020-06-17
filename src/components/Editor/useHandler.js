import { useState } from "react";
import { useEditor } from "../../utils/EditorProvider";
import { useEffect } from "react";

const useHandler = () => {
  const [values, setValues] = useState({});
  const { setSavedProperty, getSavedProperty } = useEditor();


  const handleChange = (event, category, propertyName) => {
    setValues((values) => ({
      ...values,
      [propertyName]: event.target.value,
    }));
    setSavedProperty(category, propertyName, event.target.value);
    console.log(values);
  };

  return {
    handleChange,
    values,
  };
};

export default useHandler;
