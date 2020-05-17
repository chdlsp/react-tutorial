import React from 'react';

const User = React.memo(function User({ user, onRemove, onToggle }){

    const { username, email, id, active } = user;
    return (
        <div>
            <b
                style={{
                    color: active ? 'green' : 'black',
                    cursor: 'pointer'
                }}
                onClick={() => onToggle(id)}
            >
                {username}
            </b>

            <span>({email})</span>
            <button onClick={() => onRemove(id)}>삭제</button>
        </div>
    );
});

export default User;