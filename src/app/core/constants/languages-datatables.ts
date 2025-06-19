export const LANGUAGE_DATATABLE = {
    processing: "Procesando...",
    search: "Buscar:",
    lengthMenu: "Mostrar _MENU_ registros",
    info: "Mostrando desde _START_ al _END_ de _TOTAL_ elementos",
    infoEmpty: "Mostrando ningún elemento.",
    infoFiltered: "(filtrado _MAX_ elementos total)",
    infoPostFix: "",
    loadingRecords: "Cargando registros...",
    zeroRecords: "No se encontraron registros",
    emptyTable: "No hay datos disponibles en la tabla",
    paginate: {
      first: "Primero",
      previous: "Anterior",
      next: "Siguiente",
      last: "Último"
    },
    aria: {
      sortAscending: ": Activar para ordenar la tabla en orden ascendente",
      sortDescending: ": Activar para ordenar la tabla en orden descendente"
    }
};

export const OPTIONS_DATATABLE = {
    destroy: true,
    paging: true,
    scrollX: true,
    lengthChange : true,
    searching: true,
    ordering: true,
    language: LANGUAGE_DATATABLE,
    scrollY: "800px",
    scrollCollapse: true,
    displayLength: 25,
    responsive: true
}