import React, { useReducer, useRef, useCallback, useMemo } from 'react';
import './App.css';

import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './useInputs';

// ## 렌더링 최적화
// 함수를 재사용 할때는 useCallback
//  => 무조건적으로 성능이 좋아지는 것은 아님 
// 컴포넌트를 재사용 할때는 useMemo

// ## 상태 업데이트 useState vs useReducer
// useState : 설정하고 싶은 다음 상태를 직접 지정
// useReducer : Action 객체를 기반으로 상태를 update

const initialState = {
  // ## useInputs custom hook 으로 대체
  // inputs: {
  //   username: '',
  //   email: ''
  // },
  users: [
    {
      id: 1,
      username: 'pamin2',
      email: 'pamin2@naver.com',
      active: true,
    },
  ]
  
}

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      };
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user)
      };
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map(user => 
          user.id === action.id
            ? { ...user, active: !user.active}
            : user
          )
      }
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      }
    default:
        throw new Error('Unhandled action');
    }
}
function App() {

  
  // ## useState 방식
  
  // const [inputs, setInputs] = useState({
  //   username: '',
  //   email: ''
  // });

  // const { username, email } = inputs;
  // const onChange = useCallback(e => {
  //   const { name, value } = e.target;
  //   setInputs({
  //     ...inputs,
  //     [name]: value
  //   });
  // }, [inputs]); // inputs를 관리하기 때문에 2번째 파라미터로 선언

  // const [users, setusers] = useState([
  //   {
  //     id: 1,
  //     username: 'pamin2',
  //     email: 'pamin2@naver.com',
  //     active: true,
  //   }
  // ]);

  // const nextId = useRef(4);
  // const onCreate = useCallback(() => {
  //   const user = {
  //     id: nextId.current,
  //     username,
  //     email,
  //   };
  //   // setUsers([...Users, user]); 와 같음
  //   setusers(users => users.concat(user)); // functional update
  //   setInputs({
  //     username: '',
  //     email: ''
  //   });
  //   nextId.current += 1;
  // }, [username, email]);

  // const onRemove = useCallback(id => {
  //   setusers(users => users.filter(user => user.id !== id));
  // }, []);

  // const onToggle = useCallback(id => {
  //   setusers(users => users.map(
  //     user => user.id === id
  //     ? { ...user, active: !user.active }
  //     : user
  //   ));
  // }, []);

  // const count = useMemo(() => countActiveUsers(users), [users]); // [user]가 바뀔 때에만 수행 함

  //
  // ## useReducer 방식
  //
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(2);
  const { users } = state; 
  // const { username, email } = state.inputs;
  const [form, onChange, reset] = useInputs({
    username: '',
    email: '',
  });
  const { username, email } = form;

  // ## useInputs custom hook 으로 대체
  // const onChange = useCallback(e => {
  //   const { name, value } = e.target;
  //   dispatch({
  //     type: 'CHANGE_INPUT',
  //     name,
  //     value
  //   })
  // }, []);
  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email,
      }
    })
    nextId.current += 1;
    reset();
  }, [username, email, reset]);
  
  const onToggle = useCallback(id => {
    dispatch({
      type: 'TOGGLE_USER',
      id
    });
  }, []);
  
  const onRemove = useCallback(id => {
    dispatch({
      type: 'REMOVE_USER',
      id
    });
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);

  function countActiveUsers(users) {
    console.log('Active Users... : ' + (user => user.active).length);
    return users.filter(user => user.active).length;
  }

  return (
    <>
      {/* <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}> </UserList> */}

      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}> </UserList>

      {/* <div>Active Users: {count}</div>  */}
      <div>Active Users: {count}</div>
    </>
  )
}

export default App;
