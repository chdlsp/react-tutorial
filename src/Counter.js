import React, { useReducer } from 'react';

function reducer(state, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state+1;
        case 'DECREMENT':
            return state-1;
        default:
            // return state;
            throw new Error('Unhandled Action');
    }
}

function Counter() {
    // const [number, setNumber] = useState(0); => useState 방식
    const[number, dispatch] = useReducer(reducer, 0); // useReducer(함수명, 초기값)

    const onIncrease = () => {
        // setNumbrer(prevNumber => prevNumber + 1);
        dispatch({
            type: 'INCREMENT'
        })
    };

    const onDecrease = () => {
        // setNumber(number -1);
        dispatch({
            type: 'DECREMENT'
        })
    };

    return (
        <div>
            <h1>{number}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    );
}

export default Counter;