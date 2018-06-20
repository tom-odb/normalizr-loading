export const paginationReducer = (reducer) => (state, action) => {

  if (action.pagination) {
    return {
      pagination: action.pagination,
      ...reducer(state, action),
    };
  }

  return reducer(state, action);
};
