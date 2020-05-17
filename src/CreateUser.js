import React from 'react'

function Createuser({ username, email, onChange, onCreate }) {
    return (
        <div>
            <input name="username" placeholder="name" onChange={onChange} value={username}></input>
            <input name="email" placeholder="email" onChange={onChange} value={email}></input>
            <button onClick={onCreate}>등록</button>
        </div>
    );
}

export default React.memo(Createuser); // React.memo 로 감싸주면 렌더링이 발생할 때만 갱신하게 된다.