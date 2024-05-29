import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TitleComponent.css';

function TitleComponent({ title }) {
    return (
        <div className="mt-10">
            <div className={classNames('text-center font-bold text-gray-800 mx-2')}>
                <div className="bg-white px-4 py-2 inline-block boxTitle">
                    {title}
                </div>
            </div>
            <div className="mt-7 mx-auto separator"></div>
        </div>
    )
}

TitleComponent.propTypes = {
    title: PropTypes.string.isRequired,
};

export default TitleComponent;
