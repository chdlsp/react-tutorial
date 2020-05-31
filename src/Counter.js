import React, { Component } from 'react';

// # Class 컴포넌트 방식

class Counter extends Component {

    constructor(props) {
        super(props);
        // 함수호출 시 this 연결관계 설정 방법#1 : Constructor 에서 bind
        // this.handleIncrease = this.handleIncrease.bind(this);
        // this.handleDecrease = this.handleDecrease.bind(this);

        this.state = {
            // counstructor 에서 state는 무조건 class 형태여야 한다. 
            counter: 0
        };
    }

    // 함수호출 시 this 연결관계 설정 방법#2 : 화살표 함수 작성
    handleIncrease = () => {
        console.log('increase');
        // class형 컴포넌트에서는 this.setState를 이용해 상태를 변경한다.
        this.setState({
            counter: this.state.counter + 1
        });
    }

    handleDecrease = () => {
        console.log('decrease');
        this.setState({
            counter: this.state.counter - 1
        });
    }

    render() {
        return (
            <div>
                <h1>{this.state.counter}</h1>
                <button onClick={this.handleIncrease}>+1</button>
                <button onClick={this.handleDecrease}>-1</button>
            </div>
        )
    }
}

// # useReducer 방식
//
// function reducer(state, action) {
//     switch (action.type) {
//         case 'INCREMENT':
//             return state+1;
//         case 'DECREMENT':
//             return state-1;
//         default:
//             // return state;
//             throw new Error('Unhandled Action');
//     }
// }

// function Counter() {
//     // const [number, setNumber] = useState(0); => useState 방식
//     const[number, dispatch] = useReducer(reducer, 0); // useReducer(함수명, 초기값)

//     const onIncrease = () => {
//         // setNumbrer(prevNumber => prevNumber + 1);
//         dispatch({
//             type: 'INCREMENT'
//         })
//     };

//     const onDecrease = () => {
//         // setNumber(number -1);
//         dispatch({
//             type: 'DECREMENT'
//         })
//     };

//     return (
//         <div>
//             <h1>{number}</h1>
//             <button onClick={onIncrease}>+1</button>
//             <button onClick={onDecrease}>-1</button>
//         </div>
//     );
// }

export default Counter;