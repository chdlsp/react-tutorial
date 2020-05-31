import React, { useEffect, useContext } from 'react';
import { UserDispatch } from './App';

function User({ user }) {
    const { username, email, id, active } = user;
    const dispatch = useContext(UserDispatch);

    useEffect(() => {
        console.log('Component Appears');
        // ## Appears 활용 예제
        // props -> component 의 state로 설정
        // REST API 처리
        // D3, Video.js 등 라이브러리 사용할 때
        // setInterval, setTimeout
        return () => {
            // ## Disappears 사용 예제
            // clearInterval, clearTimeout
            // 라이브러리 인스턴스 해제 작업
            console.log('Component Disappears');
        }
    }, []); // []안의 dependency가 설정되거나 해제될 때 useEffect 수행

    return (
        <div>
            <b
                style={{
                    color: active ? 'green' : 'black',
                    cursor: 'pointer'
                }}
                onClick={() =>dispatch({
                    type: 'TOGGLE_USER',
                    id
                })}
            >  
            {username}
            </b>
            <span>({ email })</span>
            <button onClick={() => dispatch({
                type: 'REMOVE_USER',
                id
            })}>삭제</button>
        </div>
    );
}

function UserList({ users }) {
    return (
        <div>
            {
                users.map(
                    (user) => (
                        <User user={user} key={user.id} />
                    )
                )
            }
        </div>
    );
}

export default React.memo(UserList, (prevProps, nextProps) => nextProps.users === prevProps.users); // Props가 같은경우에는 rerendering 하지 않음