import React, { useEffect } from 'react';

function User({ user, onRemove, onToggle }) {
    const { username, email, id, active } = user;

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
                onClick={() => onToggle(id)}
            >  
            {username}
            </b>
            <span>({ email })</span>
            <button onClick={() => onRemove(id)}>삭제</button>
        </div>
    );
}

function UserList({ users, onRemove, onToggle }) {
    return (
        <div>
            {
                users.map(
                    (user) => (
                        <User user={user} key={user.id} onRemove={onRemove} onToggle={onToggle} />
                    )
                )
            }
        </div>
    );
}

export default React.memo(UserList, (prevProps, nextProps) => nextProps.users === prevProps.users); // Props가 같은경우에는 rerendering 하지 않음