"use client";
import React from "react";

import { CheckCheck, XCircle } from "lucide-react";
import pro from "../../public/lightning.png";
import caseImg from "../../public/heart.png";
import privacy from "../../public/privacy.png";

const PlanModal = ({ closeModal }) => {
  const planData = [
    {
      name: "Basic",
      icon: privacy,
      price: "Free",
      p: "To discover agent and try them out",
      features: [
        "Unlimited conversations",
        "API Integration",
        "Rechargeable balance",
        "Up to 4 agents",
        "Up to 1,000 messages (one time - 1$)",
      ],
    },
    {
      name: "Semi-Premium",
      icon: pro,
      p: "To discover agent and try them out",
      price: "900",
      button: "Start 30 days Free trail",
      features: [
        "Unlimited conversations",
        "API Integration",
        "Rechargeable balance",
        "Up to 4 agents",
        "Up to 1,000 messages (one time - 1$)",
      ],
    },
    {
      name: "Premium ",
      icon: caseImg,
      p: "To discover agent and try them out",
      price: "1300",
      button: "Start 30 days Free trail",
      features: [
        "Unlimited conversations",
        "API Integration",
        "Rechargeable balance",
        "Up to 4 agents",
        "Up to 1,000 messages (one time - 1$)",
      ],
    },
  ];
  return (
    <>
      <div>
        <div className="bg:backdrop-blur-sm fixed inset-0 z-10 flex items-center justify-center bg-opacity-50 backdrop-blur-sm dark:bg-black dark:bg-opacity-50">
          {" "}
          <div className="rounded-2xl bg-white p-10 dark:bg-black">
            <div className="mb-10 flex items-center justify-between">
              <h5 className="font-medium">Upgrade your plan</h5>
              <button
                onClick={closeModal}
                className="rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-800"
              >
                <XCircle size={22} className="" />
              </button>
            </div>
            <div className="relative grid gap-10 sm:grid-cols-1 lg:grid-cols-3">
              {planData.map((item, index) => (
                <div
                  key={index}
                  className={`col-span-1 grid cursor-pointer rounded-xl border bg-white p-5 hover:bg-blue-100 ${
                    item.name === "Semi-Premium"
                      ? "-mt-10 border-black bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h5 className="my-3 text-2xl">{item.name}</h5>
                    <img src={item.icon} width={50} alt="" />
                  </div>

                  <p className="my-2 text-gray-500">{item.p}</p>
                  <div className="flex items-center gap-3">
                    <p className="my-3 text-2xl font-semibold text-black">
                      ₹{item.price}
                    </p>
                    <p className="text-xl">/Month</p>
                  </div>
                  <button
                    className={`my-2 rounded-xl border-2 hover:bg-black hover:text-white ${
                      item.button ? "bg-black text-white" : ""
                    }`}
                  >
                    {item.button
                      ? "Start a-7 days Free trail"
                      : " Current Plan"}
                  </button>

                  <ul className="my-10">
                    {item.features.map((feature, index) => (
                      <li
                        key={index}
                        className="mt-2 flex items-center gap-2 text-white dark:text-black"
                      >
                        <CheckCheck className="text-green-600" size={18} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanModal;
