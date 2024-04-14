const Tittle2 = () => {
    // Objeto JSON con el código de solicitud
    const data = {
      codigo: 'CE000215'
    };
  
    return (
      <div>
        <h1 className="flex items-center text-3xl font-bold md:text-5xl mb-3">Solicitud <span className="ml-2">{data.codigo}</span></h1>
      </div>
    );
  };
  
  export default Tittle2;
  