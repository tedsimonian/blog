import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

// action creator that calls other action creators
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  //must dispatch the action creator manually
  await dispatch(fetchPosts());

  // const userIds = _.uniq(_.map(getState().posts, "userId"));

  // userIds.forEach(id => {
  //   dispatch(fetchUser(id));
  // });

  //lodash chain statement
  _.chain(getState().posts)
    .map("userId")
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();
};

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get("/posts");
  dispatch({
    type: "FETCH_POSTS",
    payload: response.data
  });
};

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({
    type: "FETCH_USER",
    payload: response.data
  });
};

// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);
// memoize make sure that any fetch is only called once per unique argument, if a fetch
// is called again with the same argument, it returns the previous return data of that argument
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);
//   dispatch({
//     type: "FETCH_USER",
//     payload: response.data
//   });
// });
