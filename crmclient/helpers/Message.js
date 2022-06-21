const mostrarMensaje = (mensaje) => {
  return (
    <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
      <p>{mensaje}</p>
    </div>
  );
};

const errorMensaje = (data) => {
  return (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 ">
      <p className="font-bold">Error</p>
      <p>{data}</p>
    </div>
  );
};

export { mostrarMensaje, errorMensaje };
