/**
 * Reducer para manejar el estado de las marcas de lugares.
 *
 * @param {Array} initialState - El estado inicial de la lista de marcas.
 * @param {Object} action - El objeto de acción que describe la operación a realizar.
 * @param {string} action.type - El tipo de operación a realizar (Add Mark o Del Mark).
 * @param {Object} action.payload - El objeto de carga útil que contiene la marca a añadir o eliminar.
 * @param {string} action.payload.id - El ID único de la marca.
 * @param {string} action.payload.name - El nombre de la marca.
 * @returns {Array} - El nuevo estado de la lista de marcas.
 */

const placesMarksReducer = (initialState,action) => {
  switch (action.type) {

    case "Add Mark":
      
        console.log("Mark place" + action.payload )

        return [ ...initialState, action.payload]

    case "Del Mark":
      
        console.log("Delete mark" + action.payload )
      
        return initialState.filter( (mark) => mark.id !== action.payload)
              
    default:
      
    return [...initialState]
      
  }
}

export default placesMarksReducer