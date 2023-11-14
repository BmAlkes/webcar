import { useEffect, useState } from "react";
import Container from "../../components/container";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../service/firebase";
import { FaWhatsapp } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../../components/ui/dialog";

interface CarProps {
  id: string;
  name: string;
  city: string;
  model: string;
  created: string;
  description: string;
  images: ImagesProps[];
  uid: string;
  km: string;
  owner: string;
  price: string | number;
  whatsapp: string;
  year: string;
}
interface ImagesProps {
  uid: string;
  name: string;
  url: string;
}
const CarDetail = () => {
  const [car, setCar] = useState<CarProps>();
  const { id } = useParams();
  const [sliderPreview, setSliderPreview] = useState<number>(2.5);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCar() {
      if (!id) {
        return;
      }

      const docRef = doc(db, "cars", id);
      getDoc(docRef)
        .then((snapshot) => {
          if (!snapshot.data()) {
            navigate("/");
          }
          setCar({
            id: snapshot.id,
            name: snapshot.data()?.name,
            year: snapshot.data()?.year,
            city: snapshot.data()?.city,
            model: snapshot.data()?.model,
            uid: snapshot.data()?.uid,
            description: snapshot.data()?.description,
            created: snapshot.data()?.created,
            whatsapp: snapshot.data()?.whatsapp,
            price: snapshot.data()?.price,
            km: snapshot.data()?.km,
            owner: snapshot.data()?.owner,
            images: snapshot.data()?.images,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    loadCar();
  }, [id]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 720) {
        setSliderPreview(1);
      } else {
        setSliderPreview(2.5);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container>
      {car && (
        <Swiper
          slidesPerView={sliderPreview}
          pagination={{ clickable: true }}
          spaceBetween={20}
          // navigation
        >
          {car?.images.map((image) => (
            <SwiperSlide key={image.name}>
              <Dialog>
                <DialogTrigger>
                  <img
                    src={image.url}
                    alt=""
                    className="w-full h-96 object-cover"
                  />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogDescription>
                      <img
                        src={image.url}
                        alt=""
                        className="w-full h-96 object-cover"
                      />
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {car && (
        <main className="w-full bg-white rounded-lg p-6 my-4">
          <div className="flex flex-col sm:flex-row mb-4 items-center justify-between">
            <h1 className="font-bold text-3xl text-black">{car?.name}</h1>
            <h1 className="font-bold text-3xl text-black">₪{car?.price}</h1>
          </div>
          <p>{car?.model}</p>
          <div className="flex w-full gap-6 my-4">
            <div className="flex flex-col gap-4">
              <div>
                <p>City</p>
                <strong>{car?.city}</strong>
              </div>
              <div>
                <p>Year</p>
                <strong>{car?.year}</strong>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <p>KM</p>
                <strong>{car?.km}</strong>
              </div>
            </div>
          </div>
          <strong>Description</strong>
          <p className="mb-4">{car?.description}</p>
          <strong>Phone / Phone</strong>
          <p>{car?.whatsapp}</p>
          <a
            className="w-full bg-green-500 text-white flex items-center justify-center gap-2 my-6 h-11 text-xl rounded-lg font-medium cursor-pointer"
            href={`https://api.whatsapp.com/send?phone=${car?.whatsapp}&text=Did you like this ${car.name} talk with us for a good offer`}
            target="_blank"
          >
            Talk with seller
            <FaWhatsapp size={26} color="#fff" />
          </a>
        </main>
      )}
    </Container>
  );
};

export default CarDetail;
