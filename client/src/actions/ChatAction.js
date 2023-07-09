import * as ChatApi from "../api/ChatRequests";

export const createChat = (data) => async (dispatch) => {
    dispatch({ type: 'SET_LOADING' });
  
    try {
  
      const newChat = await ChatApi.createChat(data);
  
      dispatch({ type: 'SET_CHAT', data: newChat.data });
  
    } catch (error) {
      console.log(error);
    }
  };
  