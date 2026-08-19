import React from 'react';

class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error('Unhandled render error:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 gap-3">
                    <p className="text-xl font-medium text-gray-800">Something went wrong.</p>
                    <p className="text-gray-500">Please refresh the page and try again.</p>
                    <button
                        onClick={() => window.location.assign('/')}
                        className="mt-2 bg-[#c9595a] hover:bg-[#b14c4d] transition text-white rounded-full px-6 py-2"
                    >
                        Go home
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
