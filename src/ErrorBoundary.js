import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';

class ErrorBoundary extends Component {
    state = {
        error: false,
    };

    // 아래 메소드에서 에러 부분을 Catch 할 수 있다.
    componentDidCatch(error, info) {
        console.log('error occured!');
        console.log({
            error,
            info
        });
        this.setState({
            error: true,
        })

        // # Sentry 연동 부분 => sentry.io 참고 필요 
        //   index.js에 (import, key값 입력 등 작업 필요함)
        //
        // if(process.env.NODE_ENV === 'production') {
        //     Sentry.captureException(error, { extra: info });
        // }
    }

    render() {
        if(this.state.error) {
            return <h1>에러 발생!</h1>
        }
        return this.props.children;
    }
}

/*  USAGE
    <ErrorBoundary>
        <User />
    </ErrorBoundary>
*/
export default ErrorBoundary;