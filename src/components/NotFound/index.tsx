import { Link } from 'react-router-dom';
const NOT_FOUND_IMAGE =
  'https://img.freepik.com/vector-premium/minimo-moderno-pagina-error-404-sitio-web-error-404-pagina-no-encontrada-concepto-fantasma-muerto_599740-714.jpg?w=2000';

const NotFound = () => {
  return (
    <div className="Not-Found">
      <Link to="/">
        <img alt={'not found'} src={NOT_FOUND_IMAGE} />
      </Link>
    </div>
  );
};

export { NotFound };
