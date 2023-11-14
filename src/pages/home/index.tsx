import { useEffect, useState } from "react";
import Container from "../../components/container";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../service/firebase";
import { Link } from "react-router-dom";

interface CarProps {
  id: string;
  name: string;
  year: string;
  km: string;
  uid: string;
  price: string | number;
  images: CarImageProps[];
  city: string;
}
interface CarImageProps {
  name: string;
  uid: string;
  url: string;
}
const Home = () => {
  const [allCars, setAllCars] = useState<CarProps[]>([]);
  const [loadImages, setLoadImages] = useState<string[]>([]);

  useEffect(() => {
    function loadCars() {
      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef, orderBy("created", "desc"));

      getDocs(queryRef)
        .then((snapshot) => {
          const listcars = [] as CarProps[];

          snapshot.forEach((doc) => {
            listcars.push({
              id: doc.id,
              city: doc.data().city,
              name: doc.data().name,
              km: doc.data().km,
              price: doc.data().price,
              uid: doc.data().uid,
              year: doc.data().year,
              images: doc.data().images,
            });
          });
          setAllCars(listcars);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    loadCars();
  }, []);

  function handleImageLoad(id: string) {
    setLoadImages((prevImage) => [...prevImage, id]);
  }
  return (
    <Container>
      {/* section car */}
      <section className="bg-white rounded-lg  w-full max-w-3xl mx-auto flex items-center justify-center gap-2">
        <input
          type="text"
          placeholder="Type car name"
          className="w-full border-2 rounded-lg h-9 px-3 outline-none"
        />
        <button className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium text text-lg text-ellipsis">
          Search
        </button>
      </section>
      <h1 className="font-bold text-center mt-6 text-2xl mb-4">
        New and used cars throughout Israel
      </h1>
      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ">
        {allCars.map((car) => {
          return (
            <Link to={`/car/${car.id}`} key={car.id}>
              <section className="shadow-lg w-full bg-white rounded-lg">
                <div
                  className="w-full h-72 rounded-lg bg-gradient-to-r from-slate-200 to-slate-500 "
                  style={{
                    display: loadImages.includes(car.id) ? "none" : "block",
                  }}
                ></div>

                <img
                  className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all object-cover"
                  src={car.images[0].url}
                  alt="Carro"
                  onLoad={() => handleImageLoad(car.id)}
                  style={{
                    display: loadImages.includes(car.id) ? "block" : "none",
                  }}
                />
                <p className="font-bold mt-1 mb-2 px-2">{car.name}</p>
                <div className="flex flex-col px-2">
                  <span className="text-zinc-700 mb-6">
                    Year {car.year} | {car.km} km
                  </span>
                  <strong className="text-black font-medium text-xl">
                    <span className="text-2xl">₪</span> {car.price}
                  </strong>

                  <div className="w-full h-px bg-slate-200 my-2"></div>
                  <div className="px-2 pb-2">
                    <span className="text-zinc-700">{car.city}</span>
                  </div>
                </div>
              </section>
            </Link>
          );
        })}
      </main>
    </Container>
  );
};

export default Home;
