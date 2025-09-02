import React, { useEffect, useState } from "react";
import ShopProducts from "./ShopProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const ShopCategories = ({
  category,
  setProductsCart,
  productsCart,
  products,
}) => {
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      if (width < 576) setSlidesPerView(1);
      else if (width < 768) setSlidesPerView(2);
      else if (width < 992) setSlidesPerView(3);
      else setSlidesPerView(4);
    };
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  const categoryProducts = products.filter(
    (product) => product.categoryName === category.name
  );
  const enableNavigation = categoryProducts.length > slidesPerView;

  return categoryProducts.length === 0 ? (
    ""
  ) : (
    <div className="page-header mb-3">
      <h2 className="fs-1">
        {category.name} | <em>{category.description}</em>
      </h2>

      <Swiper
        breakpoints={{
          320: { slidesPerView: 1 },
          576: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          992: { slidesPerView: 4 },
        }}
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation={enableNavigation}
        modules={[Pagination, Navigation]}
        className="mySwiper w-100"
      >
        {categoryProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <ShopProducts product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
