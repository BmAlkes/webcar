import { ChangeEvent, useContext, useState } from "react";
import Container from "../../../components/container";
import PanelHeader from "../../../components/panelheader";

import { FiTrash, FiUpload } from "react-icons/fi";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../components/input/indext";
import { AuthContext } from "../../../context/AuthContext";

import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../../service/firebase";

const schema = z.object({
  name: z.string().nonempty("name is required"),
  model: z.string().nonempty("model is required"),
  year: z.string().nonempty("year is required"),
  km: z.string().nonempty("km is required"),
  price: z.string().nonempty("price is required"),
  city: z.string().nonempty("city is required"),
  whatsapp: z
    .string()
    .min(1, "Phone is required")
    .refine((value) => /^(\d{10,11})$/.test(value), {
      message: "Phone number is invalid",
    }),
  description: z.string().nonempty("description is required"),
});

type FormData = z.infer<typeof schema>;

interface ImageItemProps {
  uid: string;
  name: string;
  previewUrl: string;
  url: string;
}
const RegisterCar = () => {
  const { user } = useContext(AuthContext);
  const [carImages, setCarImages] = useState<ImageItemProps[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        handleUpload(image);
      } else {
        alert("Send a image file png or Jpeg");
        return;
      }
    }
  };
  async function handleUpload(image: File) {
    if (!user?.uid) {
      return;
    }
    const currentUid = user?.uid;
    const uidImage = Date.now().toString();

    const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`);

    uploadBytes(uploadRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        const imageItem = {
          name: uidImage,
          uid: currentUid,
          previewUrl: URL.createObjectURL(image),
          url: downloadURL,
        };
        setCarImages((prev) => [...prev, imageItem]);
      });
    });
  }

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const handleDeleteImage = async (item: ImageItemProps) => {
    const imagePath = `images/${item.uid}/${item.name}`;
    const imageRef = ref(storage, imagePath);
    try {
      await deleteObject(imageRef);
      setCarImages(carImages.filter((car) => car.url !== item.url));
    } catch (e) {
      console.log("Error deleting image");
    }
  };
  return (
    <Container>
      <PanelHeader />
      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
        <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32">
          <div className="absolute cursor-pointer">
            <FiUpload size={30} color="#000" />
          </div>
          <div className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="opacity-0 cursor-pointer"
              onChange={handleFile}
            />
          </div>
        </button>
        {carImages.map((item) => (
          <div
            key={item.uid}
            className="w-full h-32 items-center flex justify-center relative"
          >
            <button
              className="absolute"
              onClick={() => handleDeleteImage(item)}
            >
              <FiTrash size={28} color="#fff" />
            </button>
            <img
              src={item.previewUrl}
              className="rounded-lg w-full h-32 object-cover"
            />
          </div>
        ))}
      </div>

      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <p className="mb-2 font-medium">Car Name</p>
            <Input
              type="text"
              register={register}
              name="name"
              error={errors.name?.message}
              placeholder="Ex: Tesla Model 3"
            />
          </div>
          <div className="mb-3">
            <p className="mb-2 font-medium">Car Model</p>
            <Input
              type="text"
              register={register}
              name="model"
              error={errors.model?.message}
              placeholder="Ex: Tesla"
            />
          </div>
          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div className="w-full">
              <p className="mb-2 font-medium">Year</p>
              <Input
                type="text"
                register={register}
                name="year"
                error={errors.year?.message}
                placeholder="Ex: 2023"
              />
            </div>
            <div className="w-full">
              <p className="mb-2 font-medium">Km</p>
              <Input
                type="text"
                register={register}
                name="km"
                error={errors.km?.message}
                placeholder="Ex: 2000Km"
              />
            </div>
          </div>
          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div className="w-full">
              <p className="mb-2 font-medium">Price</p>
              <Input
                type="text"
                register={register}
                name="price"
                error={errors.price?.message}
                placeholder="Ex: 159.000"
              />
            </div>
            <div className="w-full">
              <p className="mb-2 font-medium">city</p>
              <Input
                type="text"
                register={register}
                name="city"
                error={errors.city?.message}
                placeholder="Ex: Ashkelon"
              />
            </div>
          </div>
          <div className="mb-3">
            <p className="mb-2 font-medium">Phone / WhatsApp</p>
            <Input
              type="text"
              register={register}
              name="whatsapp"
              error={errors.whatsapp?.message}
              placeholder="Ex: 043-55555001"
            />
          </div>
          <div className="mb-3">
            <p className="mb-2 font-medium">Description</p>
            <textarea
              className="border-2 w-full rounded-md h-24 px-2"
              {...register("description")}
              name="description"
              placeholder="Enter the full description about the car"
              id="description"
            ></textarea>
            {errors.description && (
              <p className="mb-1 text-red-500">{errors.description.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="rounded-md bg-zinc-900 w-full text-white font-medium h-10 hover:bg-zinc-600"
          >
            Register
          </button>
        </form>
      </div>
    </Container>
  );
};

export default RegisterCar;
