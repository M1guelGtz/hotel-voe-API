const HotelRepository = require('../../Domain/hotelRepository');

class InMemoryHotelRepository extends HotelRepository {
  constructor() {
    super();
    this.hotels = [];
    this.nextId = 1;
  }

  async postHotels(hotel) {
    const newHotel = {
      hotelID: this.nextId++,
      nombre: hotel.nombre,
      direccion: hotel.direccion,
      telefono: hotel.telefono,
      email: hotel.email,
      activo: hotel.activo !== undefined ? !!hotel.activo : true,
    };
    this.hotels.push(newHotel);
    return newHotel;
  }

  async getHotels() {
    return this.hotels.slice();
  }

  async getHotelsById(id) {
    return this.hotels.find(h => h.hotelID == id) || null;
  }

  async getHotelsByActivo() {
    return this.hotels.filter(h => h.activo === true);
  }

  async getHotelsByNombre(nombre) {
    return this.hotels.filter(h => h.nombre === nombre);
  }

  async getHotelsByDireccion(direccion) {
    return this.hotels.filter(h => h.direccion === direccion);
  }

  async getHotelsByTelefono(telefono) {
    return this.hotels.filter(h => h.telefono === telefono);
  }

  async getHotelsByEmail(email) {
    return this.hotels.filter(h => h.email === email);
  }

  async putHotels(id, hotelData) {
    const hotel = this.hotels.find(h => h.hotelID == id);
    if (!hotel) return null;

    if (hotelData.nombre !== undefined) hotel.nombre = hotelData.nombre;
    if (hotelData.direccion !== undefined) hotel.direccion = hotelData.direccion;
    if (hotelData.telefono !== undefined) hotel.telefono = hotelData.telefono;
    if (hotelData.email !== undefined) hotel.email = hotelData.email;
    if (hotelData.activo !== undefined) hotel.activo = !!hotelData.activo;

    return hotel;
  }

  async deleteHotels(id) {
    const index = this.hotels.findIndex(h => h.hotelID == id);
    if (index === -1) return false;
    this.hotels.splice(index, 1);
    return true;
  }
}

module.exports = InMemoryHotelRepository;
