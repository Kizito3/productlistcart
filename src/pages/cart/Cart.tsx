import React from "react";
import Illustration from "../../assets/images/illustration-empty-cart.svg";
import useStore from "@/store/controlStore";
import { Modal } from "../modal/Modal";

export const Cart: React.FC = () => {
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const clearCart = useStore((state) => state.clearCart);
  const orderTotal = cart.reduce(
    (total, item) => total + item.price * (item.quantity ?? 1),
    0
  );

  const handleConfirmOrder = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleClearCart = () => {
    clearCart();
    setModalOpen(false);
  };

  return (
    <div>
      <div className="font-body flex flex-col gap-6 bg-[#fff] py-8 px-5 w-full rounded-2xl sm:w-[450px] sm:mt-[1.5rem] sm:sticky sm:top-[2rem]">
        <h2 className="text-2xl text-[#bd3d1b] font-bold">
          Your Cart({cart.length})
        </h2>
        {cart.length === 0 ? (
          <div>
            <div className="flex items-center justify-center">
              <img src={Illustration} alt="Empty cart illustration" />
            </div>
            <div className="flex items-center justify-center">
              <p className="text-[#887f7d] text-[16px] font-semibold">
                Your added items will appear here
              </p>
            </div>
          </div>
        ) : (
          <div>
            <ul>
              {cart.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b py-4"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="text-[16px] font-semibold">{item.name}</h3>
                      <div className="flex gap-2 items-center">
                        <p className="text-xl font-bold text-[#c83c0e]">
                          {item.quantity}
                          <span className="text-[16px]">X</span>
                        </p>
                        <p className="text-lg text-black">
                          @{item.price.toFixed(2)}
                        </p>
                        <p className="text-lg text-[#87635a]">
                          ${(item.price * (item.quantity ?? 1)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.name)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <div className=" inline-flex items-center justify-center text-center h-7 w-7 rounded-full border-[3px] border-[#c2b2a3]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        fill="none"
                        viewBox="0 0 10 10"
                      >
                        <path
                          fill="#CAAFA7"
                          d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
                        />
                      </svg>
                    </div>
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex justify-between items-center mt-6">
              <span className="text-[17px]">Order Total</span>
              <span className="font-bold text-xl">
                ${orderTotal.toFixed(2)}
              </span>
            </div>
            <div className="bg-[#fcf8f6] py-4 rounded-lg sm:mt-7 mt-4 mb-5">
              <div className="flex gap-4 items-center justify-center text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="20"
                  fill="none"
                  viewBox="0 0 21 20"
                >
                  <path
                    fill="#1EA575"
                    d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z"
                  />
                  <path
                    fill="#1EA575"
                    d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z"
                  />
                </svg>
                <p className="text-[17px]">
                  This is <span className="font-bold">carbon-neutral</span>{" "}
                  delivery.
                </p>
              </div>
            </div>
            <div className="flex mt-4 w-full">
              <button
                onClick={handleConfirmOrder}
                className="bg-[#c73b0f] font-semibold text-xl text-white py-5 px-4 rounded-full w-full"
              >
                Confirm Order
              </button>
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 32.121L13.5 24.6195L15.6195 22.5L21 27.879L32.3775 16.5L34.5 18.6225L21 32.121Z"
              fill="#1EA575"
            />
            <path
              d="M24 3C19.8466 3 15.7865 4.23163 12.333 6.53914C8.8796 8.84665 6.18798 12.1264 4.59854 15.9636C3.0091 19.8009 2.59323 24.0233 3.40352 28.0969C4.21381 32.1705 6.21386 35.9123 9.15077 38.8492C12.0877 41.7861 15.8295 43.7862 19.9031 44.5965C23.9767 45.4068 28.1991 44.9909 32.0364 43.4015C35.8736 41.812 39.1534 39.1204 41.4609 35.667C43.7684 32.2135 45 28.1534 45 24C45 18.4305 42.7875 13.089 38.8493 9.15076C34.911 5.21249 29.5696 3 24 3ZM24 42C20.4399 42 16.9598 40.9443 13.9997 38.9665C11.0397 36.9886 8.73256 34.1774 7.37018 30.8883C6.0078 27.5992 5.65134 23.98 6.34587 20.4884C7.04041 16.9967 8.75474 13.7894 11.2721 11.2721C13.7894 8.75473 16.9967 7.0404 20.4884 6.34587C23.98 5.65133 27.5992 6.00779 30.8883 7.37017C34.1774 8.73255 36.9886 11.0397 38.9665 13.9997C40.9443 16.9598 42 20.4399 42 24C42 28.7739 40.1036 33.3523 36.7279 36.7279C33.3523 40.1036 28.7739 42 24 42Z"
              fill="#1EA575"
            />
          </svg>
          <h2 className="text-5xl font-bold mt-4"> Order Confirmed</h2>
          <p className="text-xl my-5 font-semibold">
            We hope you enjoyed your food!
          </p>
          <div className="sm:max-h-48 max-h-24 overflow-y-scroll bg-[#fcf8f6] w-full p-5 rounded-2xl">
            {cart.map((item, index) => (
              <div key={index} className=" items-center border-b py-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="sm:text-[16px] text-sm font-semibold">{item.name}</h3>
                    <div className="flex items-center gap-2">
                      <p className="sm:text-xl text-sm font-bold text-[#c83c0e]">
                        {item.quantity}
                        <span className="sm:text-[16px] text-sm">X</span>
                      </p>
                      <p className="sm:text-lg text-sm text-black">
                        @{item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <p className="sm:text-lg text-sm text-[#87635a]">
                      ${(item.price * (item.quantity ?? 1)).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-6">
            <span className="text-[17px]">Order Total</span>
            <span className="font-bold text-xl">${orderTotal.toFixed(2)}</span>
          </div>
          <div className="flex mt-4 w-full">
            <button
              onClick={handleClearCart}
              className="bg-[#c73b0f] font-semibold text-xl text-white py-5 px-4 rounded-full w-full"
            >
              Start New Order
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;
