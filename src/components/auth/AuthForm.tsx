import { FC } from 'react';

interface AuthFormsProps {
    type: 'signin' | 'signup';
    onClose: (type: 'signin' | 'signup') => void;
}

const AuthForms: FC<AuthFormsProps> = ({ type, onClose }) => {
    const isSignIn = type === 'signin';
    
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-accent text-center">
                {isSignIn ? 'Sign In' : 'Sign Up'}
            </h2>
            <form className="space-y-4">
                {!isSignIn && (
                    <div>
                        <label className="block text-sm mb-1">Full Name</label>
                        <input 
                            type="text" 
                            className="w-full p-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:border-secondary text-white placeholder-white/50"
                            placeholder="John Doe"
                        />
                    </div>
                )}
                <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input 
                        type="email" 
                        className="w-full p-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:border-secondary text-white placeholder-white/50"
                        placeholder="you@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm mb-1">Password</label>
                    <input 
                        type="password" 
                        className="w-full p-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:border-secondary text-white placeholder-white/50"
                        placeholder="••••••••"
                    />
                </div>
                <button 
                    type="submit"
                    className="w-full px-4 py-2 rounded-md bg-secondary text-white hover:bg-secondary/80 transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                >
                    {isSignIn ? 'Sign In' : 'Sign Up'}
                </button>
            </form>
            <p className="text-sm text-center text-white/70">
                {isSignIn ? "Don't have an account? " : "Already have an account? "}
                <span 
                    onClick={() => onClose(isSignIn ? 'signup' : 'signin')}
                    className="text-accent hover:underline cursor-pointer"
                >
                    {isSignIn ? 'Sign Up' : 'Sign In'}
                </span>
            </p>
        </div>
    );
};

export default AuthForms;