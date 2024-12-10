export default function backup() {
    return <>


        <div className="flex justify-end mb-4 cursor-pointer">
            <div className="flex gap-3 p-3 text-white rounded-lg drop-shadow-md bg-themeColor max-w-96">
                <p>
                    {data.message}
                </p>
            </div>
            <div className="flex items-center justify-center ml-2 rounded-full w-9 h-9">
                <img
                    src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                    alt="My Avatar"
                    className="w-8 h-8 rounded-full"
                />
            </div>
        </div>


    </>
}
