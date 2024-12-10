import { formatDistanceToNow } from "date-fns";
import DefaultUserIcon from "../../../assets/img/default_user_profile.png";
import StarRating from "@/Components/StarRating";

export default function ReviewComponent({ data }) {
    return (
        <>
            <div className="bg-white m-1 rounded-md p-3 border border-slate-200">
                <div className="flex gap-2 justify-between items-center">
                    <div className="flex gap-1 justify-between w-full items-center">
                        <div className="flex gap-1 items-center">
                            <img
                                className="h-8 w-8 rounded-full"
                                src={
                                    data.user.profile_picture_path == null
                                        ? DefaultUserIcon
                                        : data.user.profile_picture_path
                                }
                                alt=""
                            />
                            {data.user.first_name}
                        </div>
                        <div className="text-sm">
                            {formatDistanceToNow(new Date(data.created_at))}
                        </div>
                    </div>
                </div>
                <div className="flex gap-1 items-center text-sm mt-1">
                    <h1>Product Rating: </h1>
                    <StarRating rating={data.product_quality} />
                </div>
                <div className="flex gap-1 items-center text-sm mt-1">
                    <h1>Seller Service Rating: </h1>
                    <StarRating rating={data.seller_service} />
                </div>
                <p className=" text-sm my-2 bg-sky-100 p-2 rounded-lg">
                    {data.review_text}
                </p>
            </div>
        </>
    );
}
