import classNames from 'classnames';
import './TitleComponent.css';


// eslint-disable-next-line react/prop-types
function TitleComponent({ title }) {
    return (
        <div>
            <div className={classNames('grid justify-center text-center h-24 mt-20 text-2xl font-bold', 'text-gray-800')}>
                <div className="boxTitle ">
                    {title}
                </div>
            </div>
            <div className={classNames('mx-auto separator mt-7')}>
            </div>
        </div>
    )
}

export default TitleComponent;