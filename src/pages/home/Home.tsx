import { useEffect, useRef, useState } from 'react';
import CustomButton, {
	ButtonType,
} from '../../components/custombutton/CustomButton';
import RecommendCard from '../../components/recommendcard/RecommendCard';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import PlusMenuBtn from '../../components/plusmenubutton/PlusMenuBtn';
import { useAuth } from '../../context/AuthContext';
import RecipeList from '../recipelist/RecipeList';

const Home = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const plusRef = useRef<HTMLUListElement>(null);
	const { user } = useAuth(); // user 정보를 가져옵니다.
	const navigate = useNavigate();
	const recipeListRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (isLoading) {
				navigate('/404');
			}
		}, 5000);

		const handleClickOutside = (event: MouseEvent) => {
			if (plusRef.current && !plusRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		const currentUrl = window.location.href;

		if (currentUrl.includes('/')) {
			document.body.style.marginTop = '50px';
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			clearTimeout(timer);
			document.removeEventListener('mousedown', handleClickOutside);
			document.body.style.marginTop = '';
		};
	}, [isLoading, navigate]);

	const options = [
		{ label: '레시피 작성하기', path: '/create' },
		{ label: 'AI 추천 레시피(BETA)', path: '/recipe-ai' },
		{ label: '마이페이지', path: '/profile' },
	];

	const handleOptionClick = (path: string) => {
		if (!user) {
			alert('로그인이 필요한 서비스입니다.');
			navigate('/login'); // 로그인되지 않았다면 로그인 페이지로 리다이렉트
		} else {
			navigate(path); // 로그인된 경우 해당 경로로 이동
		}
	};

	const handleShareRecipe = () => {
		if (user) {
			navigate('/create'); // 로그인된 경우 레시피 작성하기 페이지로 이동
		} else {
			alert('로그인이 필요한 서비스입니다.');
			navigate('/login'); // 로그인되지 않았다면 로그인 페이지로 리다이렉트
		}
	};

	const handleRecipeList = () => {
		if (recipeListRef.current) {
			const { top } = recipeListRef.current.getBoundingClientRect();
			const offset = 140;

			window.scrollTo({
				top: top + window.scrollY - offset,
				behavior: 'smooth',
			});
		}
	};

	return (
		<>
			<div id={styles.home}>
				<section className={styles.homeBanner}>
					<header className={styles.bannerText}>
						<p>가족과 함께한 행복했던 시간, 친구들과 나눈 즐거운 순간,</p>
						<p>혹은 당신의 인생에 특별한 의미를 지닌 소중한 기억이 담긴.</p>
						<p>
							할머니의 손맛이 그리워지는 전통 음식부터, 여행지에서 우연히 발견한
							이국적인 맛,
						</p>
						<p>
							또는 힘들 때 위로가 되어준 comfort food까지, 당신의 마음을
							따뜻하게 만드는 모든 요리의 레시피를 들려주세요.
						</p>
					</header>
					<div className={styles.linkBtnWrapper}>
						<CustomButton
							btnType={ButtonType.Share}
							color="orange"
							shape="rad20"
							onClick={() => handleShareRecipe()}
						>
							내 레시피 공유하기
						</CustomButton>
						<CustomButton
							btnType={ButtonType.All}
							color="ivory"
							shape="rad20"
							onClick={() => handleRecipeList()}
						>
							전체 레시피 확인하기
						</CustomButton>
					</div>
				</section>

				<aside>
					<RecommendCard />
					<PlusMenuBtn isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
					{isOpen && (
						<nav className={styles.plusMenu} ref={plusRef}>
							<ul>
								{options.map((option) => (
									<li key={option.label}>
										<span
											className={styles.plusMenuList}
											onClick={() => handleOptionClick(option.path)}
										>
											{option.label}
										</span>
									</li>
								))}
							</ul>
						</nav>
					)}
				</aside>
			</div>

			<div className={styles.backgroundWrap} ref={recipeListRef}>
				<section className={styles.listWrap}>
					<RecipeList />
				</section>
			</div>
		</>
	);
};

export default Home;
