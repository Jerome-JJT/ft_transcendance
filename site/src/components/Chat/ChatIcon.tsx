import classNames from 'classnames';
import React, { useState } from 'react'
import ChatChannels from './ChatChannels';
// import Icon from '../../assets/svg/balloon-heart.svg'

export default function ChatIcon() {
	const [isOpen, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!isOpen);
	};

	return (
		<div className="bottom-5 right-0 items-center items-justify-center p-2 h-max">
			{isOpen && <div className='flex flex-col flex-1 w-96 bottom h-full'>
					<ChatChannels />
				<input type="text" placeholder="Write your message!" className=" mt-2 w-64 focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3" />
			</div>
			}
			<div className='flex flex-inline justify-end mt-2'>
			<button type="button" onClick={handleClick} className="inline-flex items-end rounded-full h-12 px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-balloon-heart" viewBox="0 0 16 16">
					<path fill-rule="evenodd" d="m8 2.42-.717-.737c-1.13-1.161-3.243-.777-4.01.72-.35.685-.451 1.707.236 3.062C4.16 6.753 5.52 8.32 8 10.042c2.479-1.723 3.839-3.29 4.491-4.577.687-1.355.587-2.377.236-3.061-.767-1.498-2.88-1.882-4.01-.721L8 2.42Zm-.49 8.5c-10.78-7.44-3-13.155.359-10.063.045.041.089.084.132.129.043-.045.087-.088.132-.129 3.36-3.092 11.137 2.624.357 10.063l.235.468a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29.054.27.161.488.419 1.003.288.578.235 1.15.076 1.629-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3.177 3.177 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.235-.468ZM6.013 2.06c-.649-.18-1.483.083-1.85.798-.131.258-.245.689-.08 1.335.063.244.414.198.487-.043.21-.697.627-1.447 1.359-1.692.217-.073.304-.337.084-.398Z" />
				</svg>
			</button>
				</div>
			</div>
	);
}











/*
return (
	<div className='bg-gray-400 rounded-full h-10 w-10 p-4 items-center'>
	</div>
);
}
*/
// hein!

// <i className="bi bi-balloon-heart"></i>
{/* <img src={Icon} height="20px" alt="Chat" /> */ }