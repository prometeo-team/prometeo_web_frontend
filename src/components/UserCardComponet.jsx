import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FaUserCircle } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import './UserCardComponent.css';

function UserCardComponent({ user, number }) {
    let notification = null;

    if (number > 1) {
        notification = <div className={classNames('w-5 h-5 rounded-full text-center bg-red-600 -ml-3 text-white')}><span>{number}</span></div>;
    }

    return (
        <>
            <link href="https://api.fontshare.com/v2/css?f[]=poppins@700&display=swap" rel="stylesheet"></link>
            <div className={classNames('flex flex-row justify-end')}>
                <div className={classNames('mt-2 text_font w-53 rounded-full flex flex-row justify-center p-6 text-center font bg-white')}>
                    <span>{user}</span>
                    <FaUserCircle className={classNames('w-6 h-6')} />
                </div>
                <div className={classNames('flex flex-row items-end ml-3')}>
                    <IoNotifications className={classNames('h-full w-8 cursor-pointer')} />
                    {notification}
                </div>
            </div>
        </>
    );
}

UserCardComponent.propTypes = {
    user: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
};

export default UserCardComponent;
