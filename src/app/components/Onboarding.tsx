import Link from "next/link";

export default function Homepage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-white">
            <h1 className="text-5xl md:text-6xl text-black font-bold mb-8">Onboarding</h1>
            <div>
                <div className="pt-5 md:pt-10">
                    <label className=" text-black md:text-l" htmlFor="name">Name Of The Issuer</label><br/>
                    <input className="bg-[#CCCCCC] h-7" type="text" id="name" name="name" size={30} />
                </div>
                <div className="pt-5 md:pt-10">
                    <label className="text-black md:text-l" htmlFor="name">Issuer Landing URL</label><br/>
                    <input className="bg-[#CCCCCC] h-7" type="text" id="url" name="name" size={30} />
                </div>
                <div className="pt-5 md:pt-10">
                
                        <input type="checkbox" id="scales" name="credentials"/>
                        <label className="text-black" htmlFor="credentials">Remember my credentials</label>
                
                </div>
                <div className="justify-center items-center flex pt-10">
                    <input className="border-2 text-white bg-black px-6 py-2 cursor-pointer" type="submit" value="Complete Setup" />
                </div>
                <div className="justify-center flex pt-10 items-center">
                    <p className="text-black "><span>T&C</span> ©Alacrity  Education</p>
                </div>
            </div>
        </div>
    )
}