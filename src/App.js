import React, {
  useReducer,
  useRef,
  useCallback,
  useMemo,
  createContext,
} from 'react';
import './App.css';
import produce from 'immer';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './useInputs';

window.produce = produce;

// ## 렌더링 최적화
// 함수를 재사용 할때는 useCallback
//  => 무조건적으로 성능이 좋아지는 것은 아님
// 컴포넌트를 재사용 할때는 useMemo

// ## 상태 업데이트 useState vs useReducer
// useState : 설정하고 싶은 다음 상태를 직접 지정
// useReducer : Action 객체를 기반으로 상태를 update

const initialState = {
  users: [
    {
      id: 1,
      username: 'pamin2',
      email: 'pamin2@naver.com',
      active: true,
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value,
        },
      };
    case 'CREATE_USER':
      return produce(state, (draft) => {
        draft.users.push(action.user);
      });
    case 'TOGGLE_USER':
      return produce(state, (draft) => {
        const user = draft.users.find((user) => user.id === action.id);
        user.active = !user.active;
      });
    case 'REMOVE_USER':
      return produce(state, (draft) => {
        const index = draft.users.findIndex((user) => user.id === action.id);
        draft.users.splice(index, 1);
      });
    default:
      throw new Error('Unhandled action');
  }
}

// 여러 컴포넌트를 불러와야 하는 경우 Dispatch를 작성하여 관리하는 것이 좋다.
export const UserDispatch = createContext(null); // 기본값 null로 지정

function App() {
  //
  // ## useReducer 방식
  //
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(2);
  const { users } = state;
  const [form, onChange, reset] = useInputs({
    username: '',
    email: '',
  });
  const { username, email } = form;

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    nextId.current += 1;
    reset();
  }, [username, email, reset]);

  const count = useMemo(() => countActiveUsers(users), [users]);

  function countActiveUsers(users) {
    console.log('Active Users... : ' + ((user) => user.active).length);
    return users.filter((user) => user.active).length;
  }

  return (
    <>
      {/* <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}> </UserList> */}

      <UserDispatch.Provider value={dispatch}>
        <CreateUser
          username={username}
          email={email}
          onChange={onChange}
          onCreate={onCreate}
        />
        <UserList users={users}> </UserList>

        {/* <div>Active Users: {count}</div>  */}
        <div>Active Users: {count}</div>
      </UserDispatch.Provider>
    </>
  );
}

export default App;
