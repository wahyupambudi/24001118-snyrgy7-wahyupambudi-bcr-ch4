class App {
  constructor() {
    // this.clearButton = document.getElementById("clear-btn");
    // this.loadButton = document.getElementById("load-btn");
    this.filterBtn = document.getElementById("filter-btn");
    this.carContainerElement = document.getElementById("cars-container");
  }

  async init() {
    await this.load();

    // Register click listener
    this.filterBtn.onclick = this.filter;
  }

  async filter() {
    // console.log("This Filter");
    const driverType = document.getElementById("driverType").value;
    console.log(driverType);
    const date = document.getElementById("date").value;
    console.log(date);
    const pickupTime = document.getElementById("pickupTime").value;
    console.log(pickupTime);
    const passenger = document.getElementById("passenger").value;
    console.log(passenger);

    Car.init(cars);
    document.getElementById("cars-container").innerHTML = '';
    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.classList.add("col-md-4");
      node.innerHTML = car.render();
      document.getElementById("cars-container").appendChild(node);
    });
  }

  run = () => {
    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.classList.add("col-md-4");
      node.innerHTML = car.render();
      this.carContainerElement.appendChild(node);
    });
  };

  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
