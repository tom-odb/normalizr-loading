export const entitiesReducer = (
  state = {},
  action
) => {
  if (action.type === 'ENTITY/SET') {
    return {
      ...state,
      [action.entity]: action.data,
    };
  }

  return state;
};
