import classNames from 'classnames';
import './UserCardComponent.css';

function UserCardComponent({ user }) {
    return (
        <div className = {classNames('w-28 rounded-lg grid justify-center pading text-center bg-white')}>
            <span>{user}</span>
        </div>
    )
}
export default UserCardComponent;