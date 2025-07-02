import { useContext, useState } from "react";
import { AuthContext } from "../../../../provider/AuthProvider";
import { imageUpload } from "../../../../api/imgApi";
import axios from "axios";
import Swal from "sweetalert2";
import { MdReportGmailerrorred } from "react-icons/md";

const MyProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [img, setImg] = useState(user?.photoURL);
  // console.log(img);
  const handleUpdate = async (e) => {
    e.preventDefault();
    const image = e.target.image.files[0];
    // console.log(image);
    let photoURL;
    if (image) {
      setErrorMessage("");
      try {
        photoURL = await imageUpload(image);
        // console.log("Uploaded photoURL", photoURL);
        updateUserProfile(user?.displayName, photoURL);
        const updatedInfo = {
          photoURL: photoURL,
        };
        await axios.patch(
          `http://localhost:3000/userProfile/${user?.email}`,
          updatedInfo
        );
        Swal.fire({
          title: "Success",
          text: "User Profile picture is changed now",
          icon: "success",
          confirmButtonText: "OK",
        });
        setImg(photoURL);
      } catch {
        photoURL = user?.photoURL;
        updateUserProfile(user?.displayName, photoURL);
        setImg(photoURL);
        return;
      }
    } else {
      photoURL = user?.photoURL;
      updateUserProfile(user?.displayName, photoURL);
      setImg(photoURL);
      setErrorMessage("Please upload photo if you want to change it");
      return;
    }
    e.target.reset();
  };
  return (
    <div>
      <div className="w-10/12 mx-auto h-auto bg-black pt-12 pb-12 rounded-xl ">
        <div className="w-10/12 mx-auto bg-gray-400 h-auto rounded-xl flex flex-col justify-center items-center pt-4 pb-4 space-y-2">
          <img
            src={img}
            className="w-14 h-14 rounded-full border-4 border-gray-900"
            alt=""
          />
          <p className="text-lg">{user?.displayName}</p>
          <p className="text-xs"> {user?.email}</p>

          <form onSubmit={handleUpdate}>
            <div className="form-control flex flex-col">
              <label className="label mb-2 mt-10 text-lg font-bold text-black">
                Upload Photo
              </label>

              <input
                type="file"
                className="file-input file-input-success w-full border-none h-[60px] text-xl"
                name="image"
                accept="image/*"
              />
            </div>
            {errorMessage && (
              <div className="flex gap-2 mt-4 items-center">
                <MdReportGmailerrorred color="red" />
                <p className="text-red-500 text-sm ">{errorMessage}</p>
              </div>
            )}
            <button className="btn mt-8">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
