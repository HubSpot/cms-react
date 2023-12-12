import Layout from '../Layout.jsx';

import styles from '../../styles/cars.module.css';

import tacoma from '../../assets/tacoma.jpg';
import vwid from '../../assets/vw-id.jpg';
import orangeLine from '../../assets/orange-line.jpg';
import huayra from '../../assets/huayra.jpg';

const cars = [
  {
    year: 2009,
    make: 'Toyota',
    model: 'Tacoma',
    id: 1,
    img: tacoma,
    contact: {
      firstname: 'Byron',
      lastname: 'Matto',
    },
  },
  {
    year: 1979,
    make: 'MBTA',
    model: 'Orange Line',
    id: 2,
    img: orangeLine,
    contact: {
      firstname: 'Ben',
      lastname: 'Briggs',
    },
  },
  {
    year: 2021,
    make: 'Volkswagen',
    model: 'ID',
    id: 3,
    img: vwid,
    contact: {
      firstname: 'Timothy',
      lastname: 'Finley',
    },
  },
  {
    year: 2019,
    make: 'Pagani',
    model: 'Huayra',
    id: 4,
    img: huayra,
    contact: {
      firstname: 'Charles',
      lastname: 'Boamah',
    },
  },
];

function Cars() {
  return (
    <Layout>
      <h2>{`My Teammates' Cars`}</h2>
      <div className={styles.cars}>
        {cars.map((car) => {
          return (
            <div key={car.id} className={styles.carGrid}>
              <div className={styles.car}>
                <div className={styles.carInfo}>
                  <h2>
                    {car.contact.firstname} {car.contact.lastname}
                  </h2>
                  <p>
                    <span>
                      {car.year} {car.make} {car.model}
                    </span>
                  </p>{' '}
                </div>
                <div className={styles.carDetails}>
                  <img src={car.img} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export default Cars;
