import { FC, useEffect, useState } from "react";
import { products } from "../../data";
import { Button } from "@/components/ui/button";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import useStore from "@/store/controlStore";

interface Image {
  thumbnail: string;
  desktop: string;
  tablet: string;
  mobile: string;
}

interface productItem {
  image: Image;
  name: string;
  category: string;
  price: number;
}

const FoodItems: productItem[] = products;

export const ProductList: FC = () => {
  const cart = useStore((state) => state.cart);
  const addToCart = useStore((state) => state.addToCart);
  const decrementQuantity = useStore((state) => state.decrementQuantity);

  const [imgSrc, setImgSrc] = useState<"desktop" | "tablet" | "mobile">(
    window.innerWidth > 1000
      ? "desktop"
      : window.innerWidth > 600
      ? "tablet"
      : "mobile"
  );

  useEffect(() => {
    const handleImageResize = () => {
      if (window.innerWidth > 1100) {
        setImgSrc("desktop");
      } else if (window.innerWidth > 600) {
        setImgSrc("tablet");
      } else {
        setImgSrc("mobile");
      }
    };
    window.addEventListener("resize", handleImageResize);
  }, []);

  return (
    <div className="font-body">
      <h1 className="font-bold text-5xl mb-12">Desserts</h1>
      <div className="flex flex-col gap-7 min-[600px]:flex-row max-w-[9000px] flex-wrap">
        {FoodItems.map((product) => {
          const cartItem = cart.find((item) => item.name === product.name);
          const isInCart = !!cartItem;

          return (
            <div
              key={product.name}
              className="min-[600px]:w-[200px] min-[820px]:w-[30%]"
            >
              <div>
                <img
                  src={product.image[imgSrc]}
                  alt={product.name}
                  className={`rounded-lg mb-5 border-[3px] h-full w-full object-cover ${
                    isInCart ? "border-[#c73d0e]" : ""
                  }`}
                />
              </div>
              <div className="relative flex justify-center items-center">
                <div className="absolute bottom-[-4px]">
                  {cartItem ? (
                    <div className="items-center gap-2">
                      <div className="bg-[#c73d0e] rounded-full px-6 border-[#c2b2a3] border-[4px] hover:border-[#c73d0e]">
                        <Button
                          onClick={() => decrementQuantity(product.name)}
                          className="p-7 hover:!bg-[#c73d0e] hover:border-[#c83c0e] rounded-full hover:text-[#fff] bg-[#c73d0e] text-white text-[19px] font-bold"
                        >
                          <span className="h-7 w-7 rounded-full border-[3px] border-white inline-flex justify-center items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="10"
                              height="2"
                              fill="none"
                              viewBox="0 0 10 2"
                            >
                              <path fill="#fff" d="M0 .375h10v1.25H0V.375Z" />
                            </svg>
                          </span>
                        </Button>
                        <span className="text-[16px] text-white font-bold">
                          {cartItem.quantity}
                        </span>
                        <Button
                          onClick={() => addToCart(product)}
                          className="p-7 hover:!bg-[#c73d0e] hover:border-[#c83c0e] rounded-full hover:text-[#fff] bg-[#c73d0e] text-white text-[19px] font-bold"
                        >
                          <span className="h-7 w-7 rounded-full border-[3px] border-white inline-flex justify-center items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="10"
                              height="10"
                              fill="none"
                              viewBox="0 0 10 10"
                            >
                              <path
                                fill="#fff"
                                d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
                              />
                            </svg>
                          </span>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      onClick={() => addToCart(product)}
                      className="bg-white p-7 hover:!bg-white hover:border-[#c83c0e] hover:text-[#c83c0e] !px-9 rounded-full text-black border-[#c2b2a3] border-[4px] text-[19px] font-semibold"
                    >
                      <MdOutlineAddShoppingCart
                        className="text-[#c83c0e]"
                        size={23}
                      />
                      Add to Cart
                    </Button>
                  )}
                </div>
              </div>
              <p className="text-[#b7a8a5]">{product.category}</p>
              <p className="text-[#260f08] font-semibold text-[17px] mt-2">
                {product.name}
              </p>
              <p className="text-[#b27162] text-[16px] font-semibold mt-2">
                ${product.price.toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
