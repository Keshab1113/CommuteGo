import React from 'react'
import img from "/back2.png";

const Aboutus = () => {
    return (
        <div className='sm:h-screen h-full flex bg-slate-100 sm:flex-row flex-col-reverse justify-center'>
            <div className=' sm:w-2/4 w-full sm:h-full h-2/4 flex justify-center items-center'>
                <img src={img} alt="" className=' h-[80%] w-[90%]' />
            </div>
            <div className=' sm:w-2/4 w-full  flex justify-center items-center flex-col'>
                <h1 className=' text-4xl text-cyan-950 font-bold flex justify-center items-center pt-4 pl-5'>About Us</h1>

                <div className='  text-black font-semibold  w-4/5 mt-10 opacity-70 space-y-4'>
                    <h1>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates neque magnam, maxime minus eligendi beatae recusandae perspiciatis temporibus ab, nesciunt repudiandae aspernatur perferendis reiciendis. Sit cum voluptates doloribus recusandae dolorum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur obcaecati earum nobis unde cum ipsa vitae ipsam accusantium! Odit inventore cumque ad, itaque recusandae sequi soluta? Est esse aspernatur reprehenderit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, repellendus illum fugit at harum aliquam ipsam. Culpa molestiae recusandae deserunt. Harum error exercitationem, atque vel dolor nobis laudantium esse dolore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur optio architecto provident ab numquam expedita, obcaecati quo magni corrupti ad vel error alias consequatur esse hic dolor quis corporis sunt.</h1>
                </div>
            </div>

        </div>
    )
}

export default Aboutus