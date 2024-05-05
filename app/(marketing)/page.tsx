import Footer from "./_components/footer";
import Heading from "./_components/heading";
import Heroes from "./_components/heroes";
const MarketingPage = () => {
    return (
        <div className="min-h-screen flex flex-col mt-32">
            <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-8 pb-10">
                <Heading />
                <Heroes />
            </div>
            <Footer />
        </div>
        
    );
}

export default MarketingPage;
