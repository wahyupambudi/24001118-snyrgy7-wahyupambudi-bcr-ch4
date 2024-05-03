class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description.substring(0, 60);
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return `
          <div class="card shadow p-3 rounded">
            <img class="img-car-filter" src="${this.image}" alt="">
            <p class="card-text fs-14">${this.type} / ${this.manufacture}</p>
            <p class="card-title fs-16">Rp ${new Intl.NumberFormat("id").format(this.rentPerDay)} / hari</p>
            <p class="card-text fs-14 fw-light">${this.description}</p>
            <ul class="list-unstyled">
              <li class="mb-3"><img class="icon-20 me-2" src="./images/main/icon/fi_users.png" alt="logo">${this.capacity} orang</li>
              <li class="mb-3"><img class="icon-20 me-2" src="./images/main/icon/fi_settings.png" alt="logo">${this.transmission}</li>
              <li class="mb-3"><img class="icon-20 me-2" src="./images/main/icon/fi_calendar.png" alt="logo">${this.year} </li>
            </ul>
            <button class="btn text-white fs-14 btn-header" id="filter-btn">Pilih Mobil</button>
          </div>
        </br>
    `;
  }
}
