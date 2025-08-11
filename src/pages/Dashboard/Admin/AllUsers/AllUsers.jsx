import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const AllUsers = () => {
  const {
    data: allUsers,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["allUsersDetails"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/allUsersDetails");
      return res.json();
    },
  });

  if (isPending) return "Loading...";

  const handleUserType = (id, name, value) => {
    console.log(value);
    console.log(value.userType);
    Swal.fire({
      title: "Are you sure you want to make this person Admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        if (value.userType === "Admin") {
          axios.patch(`http://localhost:3000/handleUserType/${id}`, value);
          Swal.fire({
            title: "Congrats",
            text: `${name} became an Admin now.`,
            icon: "success",
            confirmButtonText: "OK",
          });
          refetch();
        } else if (value.userType === "DeliveryMen") {
          axios.patch(`http://localhost:3000/handleUserType/${id}`, value);
          Swal.fire({
            title: "Congrats",
            text: `${name} became a DeliveryMen now.`,
            icon: "success",
            confirmButtonText: "OK",
          });

          refetch();
        }
      }
    });
  };

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      {allUsers?.length === 0 ? (
        <div>
          <p>Nothing to show</p>
        </div>
      ) : (
        <div>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Number of parcels delivered</th>
                <th>Total Spending</th>
                <th>Make DeliveryMen Panel</th>
                <th>Make Admin Panel</th>
              </tr>
            </thead>

            {allUsers?.map((man, index) => (
              <tbody key={index}>
                <tr>
                  <th>{index + 1}</th>
                  <td>{man?.displayName}</td>
                  <td>{man?.buyerPhoneNo}</td>
                  <td>Booked Parcels Quantity</td>
                  <td>Total Spent</td>
                  {man.userType !== "DeliveryMen" &&
                  man.userType !== "Admin" ? (
                    <td>
                      <button
                        className="btn m-4"
                        onClick={() => {
                          handleUserType(man._id, man.displayName, {
                            userType: "DeliveryMen",
                          });
                        }}
                      >
                        Make DeliveryMen
                      </button>
                    </td>
                  ) : (
                    <td>
                      <button className="btn m-4" disabled>
                        Make DeliveryMen
                      </button>
                    </td>
                  )}
                  {man.userType !== "DeliveryMen" &&
                  man.userType !== "Admin" ? (
                    <td>
                      <button
                        className="btn m-4"
                        onClick={() => {
                          handleUserType(man._id, man.displayName, {
                            userType: "Admin",
                          });
                        }}
                      >
                        Make Admin
                      </button>
                    </td>
                  ) : (
                    <td>
                      <button className="btn m-4" disabled>
                        Make Admin
                      </button>
                    </td>
                  )}
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
