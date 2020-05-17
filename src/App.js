import React, { useState, useRef, useMemo, useCallback } from 'react';
import './App.css';

import UserList from './UserList';
import CreateUser from './CreateUser';

// ## 렌더링 최적화
// 함수를 재사용 할때는 useCallback
//  => 무조건적으로 성능이 좋아지는 것은 아님 
// 컴포넌트를 재사용 할때는 useMemo

function countActiveUsers(users) {
  console.log('Active Users... : ' + (user => user.active).length);
  return users.filter(user => user.active).length;
}

function App() {

  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });
  const { username, email } = inputs;
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  }, [inputs]); // inputs를 관리하기 때문에 2번째 파라미터로 선언

  const [users, setusers] = useState([
    {
      id: 1,
      username: 'pamin2',
      email: 'pamin2@naver.com',
      active: true,
    }
  ]);

  const nextId = useRef(4);
  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    // setUsers([...Users, user]); 와 같음
    setusers(users => users.concat(user)); // functional update
    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  }, [username, email]);

  const onRemove = useCallback(id => {
    setusers(users => users.filter(user => user.id !== id));
  }, []);

  const onToggle = useCallback(id => {
    setusers(users => users.map(
      user => user.id === id
      ? { ...user, active: !user.active }
      : user
    ));
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]); // [user]가 바뀔 때에만 수행 함

  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}> </UserList>
      <div>Active Users: {count}</div> 
    </>
  )
}

export default App;
