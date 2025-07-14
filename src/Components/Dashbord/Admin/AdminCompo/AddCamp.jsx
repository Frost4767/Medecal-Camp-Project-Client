import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../../../../Hooks/useAuth";
import LoadingEle from "../../../Share/LoadingEle";
import { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const AddCamp = () => {
  const {user,loading}= useAuth()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  const axiosSecure= useAxiosSecure();
  const [profilePic, setProfilePic] = useState('');

  const onSubmit = async (data) => {
    const campData = {
      ...data,
      image: profilePic,
      email: user?.email,
      participantCount: 0
    };
    console.log(campData);

    try {
      const res = await axiosSecure.post("/addcamp", campData);

      if (res.data.insertedId) {
        alert("✅ Camp added successfully!");
        reset();
      } else {
        alert("❌ Failed to add camp");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Something went wrong.");
    }
   };

   const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        
        const formData = new FormData();
        formData.append('image', image);

        const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`
        const res = await axios.post(imagUploadUrl, formData)

        setProfilePic(res.data.data.url);
    }

   if(loading) return <LoadingEle></LoadingEle>

  return (
    <section className="min-h-screen bg-gradient-to-r from-green-50 to-green-100 flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-4xl w-full p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#0d542b] to-green-700 mb-4 drop-shadow-md">
          Add A Medical Camp
        </h2>
        <p className="text-center text-sm md:text-base text-gray-600 mb-10 max-w-xl mx-auto">
          Fill out the details below to create a new medical camp and help your community access quality healthcare services.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5"
        >
          {/* Camp Name */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700 text-sm md:text-base">Camp Name</label>
            <input
              type="text"
              {...register("name", { required: "Camp Name is required" })}
              className={`border rounded-md px-3 py-2 text-sm md:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0d542b] transition ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && <p className="text-red-500 mt-1 text-xs md:text-sm">{errors.name.message}</p>}
          </div>

          {/* Image URL */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700 text-sm md:text-base">Image URL</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="border rounded-md px-3 py-2 text-sm md:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0d542b] transition"
            />
          </div>

          {/* Camp Fees */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700 text-sm md:text-base">Camp Fees ($)</label>
            <input
              type="number"
              {...register("fees", { required: "Camp Fees is required", min: 0 })}
              className={`border rounded-md px-3 py-2 text-sm md:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0d542b] transition ${
                errors.fees ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.fees && <p className="text-red-500 mt-1 text-xs md:text-sm">{errors.fees.message}</p>}
          </div>

          {/* Date & Time */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700 text-sm md:text-base">Date & Time</label>
            <input
              type="datetime-local"
              {...register("dateTime", { required: "Date & Time is required" })}
              className={`border rounded-md px-3 py-2 text-sm md:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0d542b] transition ${
                errors.dateTime ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.dateTime && <p className="text-red-500 mt-1 text-xs md:text-sm">{errors.dateTime.message}</p>}
          </div>

          {/* Location */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700 text-sm md:text-base">Location</label>
            <input
              type="text"
              {...register("location", { required: "Location is required" })}
              className={`border rounded-md px-3 py-2 text-sm md:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0d542b] transition ${
                errors.location ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.location && <p className="text-red-500 mt-1 text-xs md:text-sm">{errors.location.message}</p>}
          </div>

          {/* Healthcare Professional */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700 text-sm md:text-base">Healthcare Professional</label>
            <input
              type="text"
              {...register("healthcareProfessional", { required: "Healthcare Professional is required" })}
              className={`border rounded-md px-3 py-2 text-sm md:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0d542b] transition ${
                errors.healthcareProfessional ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.healthcareProfessional && (
              <p className="text-red-500 mt-1 text-xs md:text-sm">{errors.healthcareProfessional.message}</p>
            )}
          </div>

          {/* Description (textarea full width) */}
          <div className="flex flex-col md:col-span-2">
            <label className="mb-1 font-semibold text-gray-700 text-sm md:text-base">Description</label>
            <textarea
              {...register("description", { required: "Description is required" })}
              className={`border rounded-md px-3 py-2 text-sm md:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0d542b] transition resize-none h-24 ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.description && <p className="text-red-500 mt-1 text-xs md:text-sm">{errors.description.message}</p>}
          </div>

          {/* Submit Button full width */}
          <button
            type="submit"
            className="md:col-span-2 w-full py-3 bg-gradient-to-r from-[#0d542b] to-green-800 rounded-lg text-white font-semibold text-base md:text-lg hover:scale-105 hover:shadow-lg transition transform duration-300"
          >
            Add Camp
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddCamp;
