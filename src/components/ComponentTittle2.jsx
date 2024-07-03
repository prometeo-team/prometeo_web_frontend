import PropTypes from 'prop-types';

const Title = ({ title, codigo }) => {
  return (
    <div>
      <h1 className="flex items-center text-xl md:text-3xl mb-3">{title} <span className="ml-2">{codigo}</span></h1>
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  codigo: PropTypes.string.isRequired,
};

export default Title;
