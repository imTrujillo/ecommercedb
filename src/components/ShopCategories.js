import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ShopProducts from "./ShopProducts";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";

export const ShopCategories = ({ category, setProducts }) => {
  return (
    <div className="page-header mb-3">
      <h2 className="fs-1">
        {category.NombreCategoría} | <em>{category.Descripción}</em>
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
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper w-100"
      >
        {category.Productos.map((product) => (
          <SwiperSlide key={product.IDProducto}>
            <ShopProducts product={product} setProducts={setProducts} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
