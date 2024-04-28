import React from 'react'

const AboutInfo = () => {
    return (
        <div className=' sm:h-screen h-full  justify-center flex pt-10 mt-32 mb-20'>
            <div className=' w-8/12'>
                <h1 className=' pl-2 text-4xl text-cyan-900 font-semibold border-l-8 border-cyan-600'>About Us </h1>
                <div className=' mt-6 font-semibold opacity-70'>
                    <h1>
                        <a className=' text-blue-800'>CommuteGo.com</a> is a team of dedicated members, who are passionate about Indian Transportation Systems.
                    </h1>
                    <h1 className=' mt-4'>
                        This web site (<a className=' text-blue-800'>CommuteGo.com</a>) is a privately maintained site and does not have any official connection or affiliation whatsoever to State Governments and related organizations, or to the Government of India, nor is it endorsed or supported by any of them in any way. Opinions expressed on this web site are solely the personal opinions of the authors and do not necessarily reflect official views of the Indian Governments or any other related organization.
                    </h1>
                    <h1 className=' mt-4'>
                        THE INFORMATION AVAILABLE ON THIS SITE IS FOR GENERAL INFORMATION PURPOSES.
                    </h1>
                    <h1 className=' mt-4'>
                        By accessing this website you agree to abide by and bound by the Terms and Conditions. <a className=' text-blue-800'>CommuteGo.com</a> reserves the right to modify the terms and conditions of the Service and Disclaimer without any prior notification. You are advised to regularly review the Terms. If you do not agree with any of the Terms and any amendments thereto, you must not use this site/service.
                    </h1>
                    <h1 className=' mt-4'>
                        The information displayed on this site is based on the information collected from the various sources. This site contains information about the train fares, train route, time schedule of Indian Transportation Systems. The information provided on this site is intended for personal non-commercial use. The train fare, train route, time schedule and such other information listed on this site are only indicative and are subject to change from time to time without any prior notification. CommuteGo.com does not warrant or represents that the prices/time/route indicated on this site shall be the same as at the time of purchase / booking or intended purchase / booking or any other purpose or usage. The prices indicated on this site are published fares taken from the respective sources. The users are requested to please check directly with the respective third party sources for promotional offers, time schedule, train routes and such other information, if any. <a className=' text-blue-800'>CommuteGo.com</a> wishes you a happy & safe journey.
                    </h1>
                </div>
            </div>


        </div>
    )
}

export default AboutInfo
