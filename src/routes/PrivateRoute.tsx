import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
	element: JSX.Element;
}

const PrivateRoute = ({ element }: PrivateRouteProps) => {
	const { user, loading } = useAuth();

	// 인증 상태가 로딩 중일 때는 아무것도 렌더링하지 않음
	if (loading) {
		return <div>데이터를 불러오고 있습니다...</div>; // 로딩 중일 때 로딩 스피너를 보여주거나 아무것도 렌더링하지 않음
	}

	if (!user) {
		alert('로그인이 필요한 서비스입니다.');
		return <Navigate to="/login" />;
	}

	return element;
};

export default PrivateRoute;
