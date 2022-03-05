import { useEffect } from 'react';

const Modal = ({children}: any) => {

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [])

	return (
		<div className='modal_background'>
			<div className='modal_container'>
				{children}
			</div>
		</div>
	)
}
export default Modal;