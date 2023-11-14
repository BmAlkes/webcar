import { useContext, useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";
import Container from "../../components/container";
import PanelHeader from "../../components/panelheader";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db, storage } from "../../service/firebase";
import { ref, deleteObject } from "firebase/storage";
import { AuthContext } from "../../context/AuthContext";

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
const Dashboard = () => {
  const [cars, setCars] = useState<CarProps[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    function loadCars() {
      if (!user?.uid) {
        return;
      }
      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef, where("uid", "==", user.uid));

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
          setCars(listcars);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    loadCars();
  }, [user]);

  const handleDeleteItem = async (car: CarProps) => {
    const itemCar = car;
    const docRef = doc(db, "cars", itemCar.id);
    await deleteDoc(docRef);

    itemCar.images.map(async (image) => {
      const imagePath = `images/${image.uid}/${image.name}`;
      const imageRef = ref(storage, imagePath);

      try {
        await deleteObject(imageRef);
        setCars(cars.filter((car) => car.id !== itemCar.id));
      } catch (e) {
        console.log(e);
      }
    });
  };
  return (
    <Container>
      <PanelHeader />

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <section className="w-full bg-white rounded-lg relative" key={car.id}>
            <button
              className="absolute right-2 border-2 p-1 rounded-full bg-white flex items-center justify-center top-2 drop-shadow-md"
              onClick={() => {
                handleDeleteItem(car);
              }}
            >
              <FiTrash size={26} color="#000" />
            </button>
            <img
              src={car.images[0].url}
              alt=""
              className="w-full rounded-lg mb-2 max-h-70"
            />
            <p className="font-bold mt-1 px-w mb-2">{car.name}</p>
            <div className="flex flex-col px-2">
              <span className="text-zin-700">
                Year {car.year} | {car.km} Km
              </span>
              <strong className="text-black font-bold mt-4">
                <span className="text-2xl">₪</span> {car.price}
              </strong>
            </div>
            <div className="w-full h-px bg-slate-200 my-2"></div>
            <div className="px-2 pb-2">
              <span className="text-black">{car.city}</span>
            </div>
          </section>
        ))}
      </main>
    </Container>
  );
};

export default Dashboard;
