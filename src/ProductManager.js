import { promises } from 'fs';

export default class ProductManager {

  constructor(ruta) {
    this.ruta = ruta;
  }



  async getAll() {
    try {
      const products = await promises.readFile(this.ruta, 'utf-8');
      return JSON.parse(products);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

 async getById(id) {
    try {
      const array = await this.getAll()
        .then((res) => res)
        .catch((err) => {
          throw err;
        });
      if (array.length <= 0) {
        return null;
      }
      for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
          return array[i];
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async save(obj) {
    try {
      const array = await this.getAll()
        .then((res) => res)
        .catch((error) => {
          throw error;
        });
      if (array.length <= 0) {
        obj.id = 1;
        array.push(obj);
        const data = JSON.stringify(array);
        fs.writeFileSync(this.ruta, data, "utf-8");
        return obj.id;
      }
      obj.id = array.length + 1;
      array.push(obj);
      const data = JSON.stringify(array);
      fs.writeFileSync(this.ruta, data, "utf-8");
      return obj.id;
    } catch (error) {
      throw error;
    }
  }

  async deleteAll() {
    try {
      const array = await this.getAll()
        .then((res) => res)
        .catch((error) => {
          throw error;
        });
      if (array.length >= 1) {
        fs.writeFileSync(this.ruta, JSON.stringify([]));
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id) {
    try {
      let array = await this.getAll()
        .then((res) => res)
        .catch((error) => {
          throw error;
        });
      if (array.length >= 1) {
        array = array.filter((obj) => {
          return obj.id !== id;
        });
        for (let i = 0; i < array.length; i++) {
          if (array[i].id > id) {
            array[i].id -= 1;
          }
        }
        fs.writeFileSync(this.ruta, JSON.stringify(array), "utf-8");
      }
    } catch (error) {
      throw error;
    }
  }

}