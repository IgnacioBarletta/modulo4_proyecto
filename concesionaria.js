// Requiere módulo "autos"
const autos = require("./autos")

// Declaro concesionaria
let concesionaria = {
   autos: autos,
   
   // Busqueda de auto por patente
   buscarAuto: function(patente) {
      for (let i=0; i < autos.length; i++) {
         if (autos[i].patente == patente) {
            return autos[i];
         }
      }
   return null
   },

   // Busqueda de auto por patente y lo devuelve como vendido
   venderAuto: function(patente, callback) {
        this.buscarAuto(patente).vendido = true;
   },
   
   // Busqueda de autos para la venta
   autosParaLaVenta: function(autos) {
      return this.autos.filter(function(elemento) {
         return elemento.vendido == false
      })
   },
   
   // Busqueda de autos cero km (>100 km)
   autosNuevos: function(autos) {
      return this.autosParaLaVenta(autos).filter(function(elemento) {
   return elemento.km < 100
      })
   },
   
   // Lista de precios de autos vendidos
   listaDeVentas: function() {
      let ventas = []
      this.autos.filter(function(elemento) {
         if (elemento.vendido == true){
            ventas.push(elemento.precio)
         }
      })
      return ventas;
   },
   
   // Total de ventas realizadas
   totalDeVentas: function() {
      return this.listaDeVentas().reduce(function(totalVentas,venta) {
         return totalVentas + venta
      },0)
   },
   
   // Validación de persona para la compra de auto
   puedeComprar: function(autopat,persona) {
      if ((persona.capacidadDePagoTotal >= autopat.precio) && (persona.capacidadDePagoEnCuotas >= (autopat.precio/autopat.cuotas))){
         return true
      } else {
         return false
      }
   },
   
   // Autos que puede comprar la persona validada
   autosQuePuedeComprar: function(persona) {
      console.log(this.autosParaLaVenta())
      return this.autosParaLaVenta().filter(function(autopat) {
         return ((persona.capacidadDePagoTotal >= autopat.precio)&&(persona.capacidadDePagoEnCuotas >= (autopat.precio/autopat.cuotas))) == true
      })
   }
}