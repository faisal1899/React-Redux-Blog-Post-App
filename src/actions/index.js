import jsonPlaceholder from '../apis/jsonPlaceholder';
import { uniq } from 'lodash';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_USER = 'FETCH_USER';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());
  const userIds = uniq(getState()
    .posts
    .map(post => post.userId)
  );
  userIds.forEach(userId => dispatch(fetchUser(userId)));
}

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get('/posts');

  dispatch({
    type: FETCH_POSTS,
    payload: response.data,
  });
}

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  // console.log('response.data = ', response.data);

  dispatch({
    type: FETCH_USER,
    payload: response.data,
  })
}