class App {
  constructor() {
    // this.clearButton = document.getElementById("clear-btn");
    // this.loadButton = document.getElementById("load-btn");
    this.filterBtn = document.getElementById("filter-btn");
    this.carContainerElement = document.getElementById("cars-container");
  }

  async init() {
    await this.load();
    // add click listener
    this.filterBtn.onclick = this.filterCar;
  }

  async filterCar() {
    const driverType = document.getElementById("driverType").value;
    const date = document.getElementById("date").value;
    const pickupTime = document.getElementById("pickupTime").value;
    const seat = Number(document.getElementById("seat").value);

    const carList = JSON.parse(localStorage.getItem("CARS"));
    const newCarList = carList.map((car) => {
      return {
        ...car,
      };
    });

    const cars = newCarList.filter((car) => {
      // to get new date from input
      const newDate = new Date(date);

      // get date from availableAt
      const newDateAvailable = new Date(car.availableAt);

      // get time from input
      const [hoursString, minutesString] = pickupTime.split(":");
      const hours = Number(hoursString);
      const minutes = Number(minutesString);
      const newPickupTime = hours * 60 + minutes;

      // get time from availableAt
      const hoursAvailable = Number(`${newDateAvailable.getHours()}`);
      const minutesAvailable = Number(`${newDateAvailable.getMinutes()}`);
      const newTimeAvailable = hoursAvailable * 60 + minutesAvailable;

      return (
        car.typeDriver === driverType &&
        newDate.getDate() === newDateAvailable.getDate() &&
        newPickupTime <= newTimeAvailable &&
        car.capacity === seat
      );
    });

    Car.init(cars);
    document.getElementById("cars-container").innerHTML = "";
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
    // remove cars from local storage
    localStorage.removeItem("CARS");
    // set localstorage baru
    await Binar.listCars();
    // get carList from localstorage
    const carList = JSON.parse(localStorage.getItem("CARS"));
    const newCarList = carList.map((car) => {
      const isPositive = getRandomInt(0, 1) === 1;
      const typeDriver = isPositive ? "Tanpa Supir" : "Dengan Supir";
      return {
        ...car,
        typeDriver,
      };
    });

    // const cars = await Binar.listCars();
    localStorage.setItem("CARS", JSON.stringify(newCarList));
    // console.log(newCarList);
    Car.init(newCarList);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
