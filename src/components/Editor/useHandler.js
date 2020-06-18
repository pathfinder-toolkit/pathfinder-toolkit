import { useState } from "react";
import { useEditor } from "../../utils/EditorProvider";
import { useEffect } from "react";

const useHandler = () => {
  const { setSavedProperty, buildingInformation } = useEditor();
  const [values, setValues] = useState();

  const handleChange = (event, category, propertyName) => {
    event.persist();
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
