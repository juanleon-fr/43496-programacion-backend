const SpecialBtn = ({ children, className, onClick }) => {
	return (
		<button className={`btn ${className}`} onClick={onClick}>
			{children}
			<div className='blackbar'></div>
		</button>
	);
};
export default SpecialBtn;
