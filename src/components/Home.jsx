import { Link } from 'react-router-dom';
import { useEffect, useMemo, lazy, Suspense, useRef } from 'react';
import useFetchData from '../Hooks/useFetchData';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { addProduct } from '../utils/productSlice';
import { useDispatch } from 'react-redux';
import { TiStar } from 'react-icons/ti';

const Err = lazy(() => import('./Err'));

export default function Home() {
  const { data, loading, error } = useFetchData('https://dummyjson.com/products');
  const dispatch = useDispatch();

  // Categories data
  const categories = useMemo(() => [
    {
      name: 'Beauty',
      img: 'https://static.vecteezy.com/system/resources/previews/009/731/074/non_2x/cosmetics-or-skin-care-product-ads-with-bottle-banner-ad-for-beauty-products-leaf-and-sea-background-glittering-light-effect-design-vector.jpg',
    },
    {
      name: 'Fragrances',
      img: 'https://www.shutterstock.com/image-vector/cosmetic-banner-ads-flying-chiffon-260nw-1202921827.jpg',
    },
    {
      name: 'Furniture',
      img: 'https://www.shutterstock.com/image-illustration/interior-design-concept-sale-home-260nw-2176522145.jpg',
    },
    {
      name: 'Groceries',
      img: 'https://www.shutterstock.com/image-photo/grocery-shopping-cart-260nw-363658811.jpg',
    },
    {
      name: 'All Categories',
      img: 'https://cdn.pathedits.com/Images/posts/ecommerce-product-photography-trends-in-2022/ecommerce-product-photography-trends-2022-cover.webp',
    },
  ], []);

  // Add products to redux store when data loads
  useEffect(() => {
    if (data?.products) dispatch(addProduct(data.products));
  }, [data, dispatch]);

  const carouselRef = useRef(null);
  const indexRef = useRef(0);
  const pausedRef = useRef(false);

  // Auto-scroll carousel every 2 seconds
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const slideWidth = carousel.offsetWidth;

    const autoScroll = () => {
      if (pausedRef.current) return; // pause on hover
      indexRef.current = (indexRef.current + 1) % categories.length;
      carousel.scrollTo({
        left: indexRef.current * slideWidth,
        behavior: 'smooth',
      });
    };

    const intervalId = setInterval(autoScroll, 2000);

    const handleMouseEnter = () => {
      pausedRef.current = true;
    };

    const handleMouseLeave = () => {
      pausedRef.current = false;
    };

    carousel.addEventListener('mouseenter', handleMouseEnter);
    carousel.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearInterval(intervalId);
      carousel.removeEventListener('mouseenter', handleMouseEnter);
      carousel.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [categories]);

  // Scroll carousel left or right on button press
  const scrollCarousel = (direction) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const slideWidth = carousel.offsetWidth;

    if (direction === 'left') {
      indexRef.current = (indexRef.current - 1 + categories.length) % categories.length;
    } else if (direction === 'right') {
      indexRef.current = (indexRef.current + 1) % categories.length;
    }

    carousel.scrollTo({
      left: indexRef.current * slideWidth,
      behavior: 'smooth',
    });
  };

  // Derived product data
  const crazyDealsProducts = useMemo(() => {
    if (!data?.products) return [];
    return [...data.products]
      .sort((a, b) => b.discountPercentage - a.discountPercentage)
      .slice(0, 5);
  }, [data]);

  const topRatedProducts = useMemo(() => {
    if (!data?.products) return [];
    return [...data.products]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);
  }, [data]);

  return (
    <div className="bg-[#EAEDED] min-h-screen py-10">
      {/* Header Section */}
      <div className="text-center mb-10 bg-[#232F3E] py-12 rounded-md shadow-md">
        <h1 className="text-4xl font-bold text-white mb-3 tracking-wide">
          Welcome to <span className="text-[#FFD814]">Shoppy Globe</span>
        </h1>
        <p className="text-base text-gray-200 max-w-2xl mx-auto">
          Shop More. Spend Less. Enjoy Better<br></br> Quality, Quantity, and Savings — All in One Place..!
        </p>
      </div>

      {/* Category Carousel */}
      <h2 className="text-center text-2xl font-semibold mb-6 text-gray-900 border-b border-gray-300 pb-2">
        Shop by Category
      </h2>

      <div className="relative w-full overflow-hidden mb-10">
        <div
          ref={carouselRef}
          id="categoryCarousel"
          className="flex overflow-x-hidden scroll-smooth transition-transform duration-700 ease-in-out"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="flex-shrink-0 min-w-full h-[33vh] relative flex flex-col items-center justify-center"
              style={{ scrollSnapAlign: 'center' }}
            >
              <Link
                to={`/category/${cat.name === 'All Categories' ? '' : cat.name.toLowerCase()}`}
                className="w-full h-full"
              >
                <LazyLoadImage
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </Link>
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/50 px-4 py-1 rounded-md">
                <h3 className="text-white font-semibold text-lg">{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll buttons */}
        <button
          onClick={() => scrollCarousel('left')}
          className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 rounded-full shadow-md p-2 transition"
          aria-label="Scroll Left"
        >
          ◀
        </button>

        <button
          onClick={() => scrollCarousel('right')}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 rounded-full shadow-md p-2 transition"
          aria-label="Scroll Right"
        >
          ▶
        </button>

        {/* Gradient edges */}
        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#EAEDED] to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#EAEDED] to-transparent pointer-events-none"></div>
      </div>

      {/* Loading & Error */}
      {loading && (
        <div className="text-center text-gray-600 text-lg py-6">Loading...</div>
      )}
      {error && (
        <Suspense fallback={<div className="text-center text-gray-500 py-6">Loading Error...</div>}>
          <Err />
        </Suspense>
      )}

      {/* Product Sections */}
      {!loading && !error && (
        <>
          {/* Crazy Deals Section */}
          <section className="mb-12">
            <h2 className="text-center text-2xl font-semibold mb-6 text-gray-900">
              🔥 Don’t Miss Out — Exclusive 20% OFF Today!
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 justify-items-center">
              {crazyDealsProducts.map((item) => (
                <Link to={`/productdetail/${item.id}`} key={item.id}>
                  <div className="bg-white w-[220px] rounded-md border border-gray-200 shadow-sm hover:shadow-md transition-all p-3 relative hover:scale-105">
                    <LazyLoadImage
                      src={item.thumbnail}
                      alt={item.title}
                      className="rounded-sm h-[150px] w-full object-contain mb-3"
                    />
                    <span className="absolute top-2 left-2 bg-[#B12704] text-white text-xs font-semibold px-2 py-1 rounded-sm shadow-sm">
                      {item.discountPercentage}% OFF
                    </span>
                    <div className="text-center">
                      <h2 className="font-medium text-gray-900 text-sm mb-1 truncate">
                        {item.title}
                      </h2>
                      <div className="flex justify-center gap-2 mt-1 text-sm">
                        <span className="line-through text-gray-400">₹{item.price}</span>
                        <span className="font-bold text-[#B12704]">
                          ₹
                          {(item.price * (1 - item.discountPercentage / 100)).toFixed(
                            2
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Top Rated Section */}
          <section>
            <h2 className="text-center text-2xl font-semibold mb-6 text-gray-900">
              ⭐ Top Rated Products — Loved by Thousands!
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 justify-items-center">
              {topRatedProducts.map((item) => (
                <Link to={`/productdetail/${item.id}`} key={item.id}>
                  <div className="bg-white w-[220px] rounded-md border border-gray-200 shadow-sm hover:shadow-md transition-all p-3 hover:scale-105">
                    <LazyLoadImage
                      src={item.thumbnail}
                      alt={item.title}
                      className="rounded-sm h-[150px] w-full object-contain mb-3"
                    />
                    <div className="text-center">
                      <h2 className="font-medium text-gray-900 text-sm mb-1 truncate">
                        {item.title}
                      </h2>
                      <span
                        className={`text-sm font-bold flex justify-center items-center ${
                          item.rating >= 4
                            ? 'text-green-600'
                            : item.rating >= 3
                            ? 'text-orange-500'
                            : 'text-red-500'
                        }`}
                      >
                        <TiStar className="text-lg mr-1" />
                        {item.rating}
                      </span>
                      <div className="flex justify-center gap-2 mt-1 text-sm">
                        <span className="line-through text-gray-400">₹{item.price}</span>
                        <span className="font-bold text-[#B12704]">
                          ₹
                          {(item.price * (1 - item.discountPercentage / 100)).toFixed(
                            2
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
