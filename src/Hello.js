import React, { Component } from 'react';

// Class형 컴포넌트 예제
// => Class형 컴포넌트를 이용한 작성 방법은 더이상 권장 방법이 아님
//    불가피한 경우에만 활용하도록 한다.

// # 함수형 컴포넌트
// function Hello({ color, name, isSpeacial }) {
//     return (
//         <div style={{ color }}>
//             {isSpecial && <b>*</b>}
//             안녕하세요 {name}
//         </div>
//     );
// }

class Hello extends Component { 
    // default props 설정
    static defaultProps = {
        name: '이름없음',
    };

    render() {
        const { color, isSpecial, name } = this.props;
        // 내부에서 jsx를 반환 해줘야 함
        return (
          <div sylte={{ color }}>
              {isSpecial && <b>*</b>}
              안녕하세요 {name}
          </div>  
        );
    }
}

// default props 설정 방법 다른 예제
// Hello.defaultProps = {
//     name: 'NoName'
// };

export default Hello;