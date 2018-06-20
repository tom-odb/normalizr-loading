export const paginationReducer = (reducer) => (state, action) => {

  if (action.pagination) {
    return {
      ...reducer(state, action),
      pagination: action.pagination,
    };
  }

  return reducer(state, action);
};
