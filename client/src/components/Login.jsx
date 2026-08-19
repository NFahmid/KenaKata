import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {
    const { setShowUserLogin, setUser, axios, navigate } = useAppContext();
    const [state, setState] = useState('login'); // 'login' | 'register'
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (submitting) return;
        setSubmitting(true);
        try {
            const payload = state === 'login' ? { email, password } : { name, email, password };
            const { data } = await axios.post(`/api/user/${state}`, payload);

            if (data.success) {
                setUser(data.user);
                setShowUserLogin(false);
                toast.success(state === 'login' ? 'Logged in successfully' : 'Account created successfully');
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div
            onClick={() => setShowUserLogin(false)}
            className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50"
        >
            <form
                onClick={(e) => e.stopPropagation()}
                onSubmit={onSubmitHandler}
                className="flex flex-col gap-4 m-auto items-start p-8 py-10 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
            >
                <p className="text-2xl font-medium m-auto">
                    <span style={{ color: '#c9595a' }}>User</span> {state === 'login' ? 'Login' : 'Sign Up'}
                </p>

                {state === 'register' && (
                    <div className="w-full">
                        <p>Name</p>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="Enter your name"
                            className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#c9595a]"
                            type="text"
                            required
                        />
                    </div>
                )}
                <div className="w-full">
                    <p>Email</p>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Enter your email"
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#c9595a]"
                        type="email"
                        required
                    />
                </div>
                <div className="w-full">
                    <p>Password</p>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Enter your password"
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#c9595a]"
                        type="password"
                        required
                    />
                </div>

                {state === 'login' ? (
                    <p>
                        Don't have an account?{' '}
                        <span onClick={() => setState('register')} className="text-[#c9595a] cursor-pointer">
                            Sign up
                        </span>
                    </p>
                ) : (
                    <p>
                        Already have an account?{' '}
                        <span onClick={() => setState('login')} className="text-[#c9595a] cursor-pointer">
                            Login
                        </span>
                    </p>
                )}

                <button
                    type="submit"
                    disabled={submitting}
                    className="bg-[#c9595a] hover:bg-[#b14c4d] transition-all text-white w-full py-2 rounded-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {submitting ? 'Please wait...' : state === 'login' ? 'Login' : 'Create Account'}
                </button>
            </form>
        </div>
    );
};

export default Login;
