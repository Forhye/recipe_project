import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import {
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	GoogleAuthProvider,
	User,
} from 'firebase/auth';

// 로그인 상태와 관련된 context 값의 타입 정의
interface AuthContextProps {
	user: User | null;
	loading: boolean;
	login: (email: string, password: string) => Promise<void>;
	googleLogin: () => Promise<void>;
	logout: () => Promise<void>;
}

// AuthContext 생성
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Context 사용을 위한 커스텀 훅
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth는 AuthProvider 안에서만 사용할 수 있습니다.');
	}
	return context;
};

// AuthProvider 컴포넌트
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	// Firebase Auth 상태를 확인하고 로그인 여부 관리
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	// 이메일/비밀번호 로그인 함수
	const login = async (email: string, password: string) => {
		setLoading(true);
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			console.error('로그인 실패:', error);
			throw error; // 로그인 컴포넌트에서 처리할 수 있도록 예외를 던짐
		} finally {
			setLoading(false);
		}
	};

	// 구글 로그인 함수
	const googleLogin = async () => {
		const provider = new GoogleAuthProvider();
		setLoading(true);
		try {
			await signInWithPopup(auth, provider);
		} catch (error) {
			console.error('구글 로그인 실패:', error);
			throw error; // 로그인 컴포넌트에서 처리할 수 있도록 예외를 던짐
		} finally {
			setLoading(false);
		}
	};

	// 로그아웃 함수
	const logout = async () => {
		try {
			await signOut(auth);
		} catch (error) {
			console.error('로그아웃 실패:', error);
		}
	};

	return (
		<AuthContext.Provider value={{ user, loading, login, googleLogin, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
