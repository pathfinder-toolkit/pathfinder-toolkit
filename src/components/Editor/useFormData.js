import { useState } from "react";
import { useEditor } from "../../utils/EditorProvider";
import { useTimer } from "../../utils/useTimer";

const useFormData = (category) => {
  const {
    getSavedCategory,
    setSavedCategory,
    getSuggestions,
    suggestionsAreaId,
    getComments,
  } = useEditor();

  /*TODO:: Add debounce to suggestion fetching,
   to reduce lag on number inputs */

  // Get form data from local storage
  // Only get the items saved under a category, not the whole building data
  const [formData, setFormData] = useState(getSavedCategory(category));

  // Used for properties, that can't have change history. => (Only details component in editor currently.)
  const handleChange = (event, propertyName) => {
    event.persist();

    if (formData[propertyName].hasSuggestions) {
      if (event.target.value !== null) {
        getSuggestions(propertyName, event.target.value, suggestionsAreaId);
        getComments(propertyName);
      }
    }

    setFormData((formData) => ({
      ...formData,
      [propertyName]: {
        ...formData[propertyName],
        value: event.target.value,
      },
    }));
  };

  // Used for properties, that can have change history.
  // Replaces the current object with new object.
  const addNewEntry = (event, propertyName) => {
    event.persist();

    let currentObjectIndex = formData[propertyName].findIndex(
      (x) => x.isCurrent
    );

    if (formData[propertyName][currentObjectIndex].hasSuggestions) {
      getSuggestions(propertyName, event.target.value, suggestionsAreaId);
      getComments(propertyName);
    }

    let objects = formData[propertyName];
    objects[0].value = event.target.value;

    setFormData((formData) => ({
      ...formData,
      [propertyName]: objects,
    }));
  };

  // Used for properties, that can have change history
  // Adds a new object to the change history.
  const addOldEntry = (value, year, propertyName) => {
    let newObject = {
      propertyName: "",
      value: "",
      usageStartYear: "",
      hasSuggestions: false,
      isCurrent: false,
    };

    let objects = formData[propertyName];

    newObject.propertyName = objects[0].propertyName;
    newObject.hasSuggestions = objects[0].hasSuggestions;
    newObject.isCurrent = false;
    newObject.value = value;
    newObject.usageStartYear = year;

    objects.push(newObject);

    setFormData((formData) => ({
      ...formData,
      [propertyName]: objects,
    }));
  };

  const deleteEntry = (propertyName, index) => {
    let objects = formData[propertyName];
    objects.splice(index, 1);

    setFormData((formData) => ({
      ...formData,
      [propertyName]: objects,
    }));
  };

  const addImage = (publicId) => {
    setFormData((formData) => ({
      ...formData,
      image: {
        ...formData.image,
        value: publicId,
      },
    }));
  };

  //Save category to local storage with debounce
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
    addNewEntry,
    addOldEntry,
    deleteEntry,
    addImage,
  };
};

export default useFormData;
