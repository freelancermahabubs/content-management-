import {
  ADD_CONTENT,
  ADD_READING_HISTORY,
  REMOVE_CONTENT,
  SET_CONTENTS,
  SORT_BY_FIRST_UPLOAD,
  SORT_BY_LAST_UPLOAD,
  UPDATE_CONTENT,
} from "../actionTypes/actionTypes";

const initialState = {
  contents: [],
  readingHistory: [],
};
const contentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTENTS:
      return {
        ...state,
        contents: action.payload,
      };
    case ADD_CONTENT:
      return {
        ...state,
        contents: [...state.contents, action.payload],
      };

    case REMOVE_CONTENT:
      return {
        ...state,
        contents: [
          ...state.contents.filter((content) => content._id !== action.payload),
        ],
      };
    case UPDATE_CONTENT:
      return {
        ...state,
        contents: action.payload,
      };

    case SORT_BY_LAST_UPLOAD:
      return {
        ...state,
        contents: [...state.contents].sort(
          (a, b) => b.timestamp - a.timestamp
        ),
      };
    case SORT_BY_FIRST_UPLOAD:
      return {
        ...state,
        contents: [...state.contents].sort(
          (a, b) => a.timestamp - b.timestamp
        ),
      };
    case ADD_READING_HISTORY:
      const contentId = action.payload;
      const alreadyRead = state.readingHistory.includes(contentId);

      return {
        ...state,
        readingHistory: alreadyRead
          ? [
              contentId,
              ...state.readingHistory.filter((id) => id !== contentId),
            ]
          : [contentId, ...state.readingHistory],
      };

    default:
      return state;
  }
};

export default contentReducer;
