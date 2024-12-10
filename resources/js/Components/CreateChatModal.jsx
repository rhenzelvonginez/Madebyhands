import { useState } from 'react';
import Modal from './Modal';
import TextArea from './TextArea';
import { useForm } from '@inertiajs/react';
import InputError from './InputError';

/* Components    */

export default function CreateChatModal({ dataAddedTrigger, setDataAddedTrigger, productData }) {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };
    const { data, setData, post, errors, processing, reset } = useForm({
        message: '',
        product_id: productData.id,
        seller_id: productData.seller.user_id
    })

    console.log(errors)

    const chatSellerHandler = (e) => {
        e.preventDefault();
        post(route('chat.seller'), {
            onSuccess: () => {
                reset();
                toggleModal();
            }, onError: (error) => {
                console.log('Error', error);
            }
        })
    }

    return <>

        <button onClick={toggleModal} className="px-4 py-2 font-medium text-white transition duration-200 rounded-md bg-secondaryColor hover:bg-thirdColor-dark disabled:opacity-50">
            <span>Message Seller</span>
        </button>

        <Modal show={showModal} maxWidth='lg' onClose={toggleModal} >
            <strong>Chat {productData.seller.shop_name}</strong>
            <div className='flex items-center justify-between w-full text-white border rounded-md bg-themeColor border-slate-300'>
                <img
                    className={`rounded-md rounded-r-none h-14 w--14 object-cover  `}
                    src={productData.images[0].image_path}
                    alt="Sample Image"

                />
                <div className='px-2 py-1 text-right'>
                    <p>{productData.product_name}</p>
                    <small>
                        Php{" "}
                        {new Intl.NumberFormat().format(
                            productData.price
                        )}
                    </small>
                </div>
            </div>
            <div className='flex flex-col items-end gap-2 mt-4'>
                <TextArea onChange={(e) => setData('message', e.target.value)} placeholder={'Enter your message here...'} />
                <div className="w-full">
                    <InputError message={errors.message} className="mb-2 w-fit" />
                </div>
                <button onClick={chatSellerHandler} disabled={processing} className="px-4 py-2 font-medium text-white transition duration-200 rounded-md w-fit bg-secondaryColor hover:bg-thirdColor-dark disabled:opacity-50">
                    {processing ? 'Sending..' : 'Send'}
                </button>
            </div>


        </Modal>
    </>
}
