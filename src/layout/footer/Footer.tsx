import styles from './Footer.module.css';
import githubImg from '/assets/icon_github.svg';
import logoGrayImg from '/assets/logo_gray.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<footer id={styles.footer}>
			<section className={styles.footerSection}>
				<nav className={styles.footerLinks}>
					<ul className={styles.logoAndFooterMenu}>
						<li className={styles.logoGrayImg}>
							<img src={logoGrayImg} alt="회색 레시피 연구소 로고" />
						</li>
						<li className={styles.footerMenuText}>
							<Link to="/login">로그인</Link>
						</li>
						<li className={styles.footerMenuText}>
							<Link to="/signup">회원가입</Link>
						</li>
						<li className={styles.footerMenuText}>
							<Link to="/create">레시피 작성</Link>
						</li>
						<li className={styles.footerMenuText}>
							<Link to="/recipe-ai">AI 레시피 추천(BETA)</Link>
						</li>
					</ul>
					<ul className={styles.githubLink}>
						<li>
							<img src={githubImg} alt="깃허브 로고" />
						</li>
						<li>
							<a href="https://github.com/Jung-sunghoon">정성훈</a>
						</li>
						<li>
							<a href="https://github.com/Forhye">강지혜</a>
						</li>
						<li>
							<a href="https://github.com/rong9835">박초롱</a>
						</li>
						<li>
							<a href="https://github.com/Hongaproject">홍성원</a>
						</li>
					</ul>
				</nav>
				<p className={styles.footerCopyright}>
					&copy; 2024. 레시피 연구소 팀 All Rights Reserved.
				</p>
			</section>
		</footer>
	);
};

export default Footer;
