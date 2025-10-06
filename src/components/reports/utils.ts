import { AdditionalField } from "../button/DateRange";

export const fieldUsersActive: AdditionalField[] = [{
                name: 'anexo',
                label: 'Seleccione el anexo a generar',
                type: 'select',
                options : [
              {
                  value: "1",
                  label: "Ventas a Consumidor Final"
                },
              {
                  value: "2",
                  label: "Ventas a Contribuyentes"
                },
              {
                  value: "3",
                  label: "Documentos Anulados"
                },
              {
                  value: "4",
                  label: "Compras a Sujetos Excluidos"
                }]
              },
            {
                name: 'sucursal',
                label: 'Seleccione la sucursal',
                type: 'select',
                options : [{
                  value: "0",
                  label: "Esta Sucursal"
                },
              {
                  value: "1",
                  label: "Todas Las Sucursales"
                }]
              }];