import {
  ADD_CONTENT,
  ADD_READING_HISTORY,
  REMOVE_CONTENT,
  SET_CONTENTS,
  SORT_BY_FIRST_UPLOAD,
  SORT_BY_LAST_UPLOAD,
  UPDATE_CONTENT,
} from "../actionTypes/actionTypes";

export const addContent = (data) => {
  return {
    type: ADD_CONTENT,
    payload: data,
  };
};

export const setContents = (contents) => ({
  type: SET_CONTENTS,
  payload: contents,
});

export const addReadingHistory = (contentId) => ({
  type: ADD_READING_HISTORY,
  payload: contentId,
});

export const removeContent = (id) => {
  return {
    type: REMOVE_CONTENT,
    payload: id,
  };
};
export const updateContentMy = (id) => {
  return {
    type: UPDATE_CONTENT,
    payload: id,
  };
};

export const sortByLastUpload = (timestamp) => ({
  type: SORT_BY_LAST_UPLOAD,
  payload: timestamp,
});

export const sortByFirstUpload = (timestamp) => ({
  type: SORT_BY_FIRST_UPLOAD,
  payload: timestamp,
});
