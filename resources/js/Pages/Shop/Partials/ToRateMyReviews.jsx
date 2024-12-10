import StarRating from "@/Components/StarRating";
import DefaultProductIcon from "../../../assets/img/Default-Product-Placeholder.svg";

export default function ToRateMyReviews({ data }) {
    return (
        <>
            {data.length === 0
                ? "No rated products yet"
                : data.map((review) => (
                      <div
                          key={review.id}
                          className="bg-slate-50 border mb-8 border-slate-200 p-4 rounded-lg"
                      >
                          <div className="flex items-center">
                              <img
                                  className="w-16 h-16 object-cover rounded-lg"
                                  src={
                                      review.product.images.length === 0
                                          ? DefaultProductIcon
                                          : review.product.images[0].image_path
                                  }
                                  alt="Product"
                              />
                              <div className=" ml-2 text-mainText">
                                  <h1 className=" font-bold">
                                      {review.product.product_name}
                                  </h1>
                                  <p>{review.product.category}</p>
                              </div>
                          </div>
                          <div className="bg-white mx-3 mt-3 rounded-md p-3 border border-slate-200">
                              <div className="flex items-center gap-4">
                                  <div className="flex gap-1 items-center text-sm mt-1">
                                      <h1>Product Rating: </h1>
                                      <StarRating
                                          rating={review.product_quality}
                                      />
                                  </div>
                                  <div className="flex gap-1 items-center text-sm mt-1">
                                      <h1>Seller Service Rating: </h1>
                                      <StarRating
                                          rating={review.seller_service}
                                      />
                                  </div>
                              </div>
                              <p className=" text-sm my-2 bg-sky-100 p-2 rounded-lg">
                                  {review.review_text}
                              </p>
                          </div>
                      </div>
                  ))}
        </>
    );
}
