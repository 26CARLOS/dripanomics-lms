import banner from "../../../../public/banner.jpeg"
function StudentHomePage() {


    return (
    <div className="min-h-screen bg-white">
        <section className="flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg:px-8">
            <div className="lg:w-1/2 lg:pr-12 ">
            <h1 className="text-6xl font-bold mb-4">Enriching the lives of others through education.</h1>
            <p className="text-xl">Want better results? Get Started with us.</p>

            </div>
            <div className="lg:w-full mb-8 lg:mb-0">
            <img src={banner} alt="homepage" className="w-full h-full object-cover" />
            </div>
        </section>
    </div>  );
}

export default StudentHomePage;