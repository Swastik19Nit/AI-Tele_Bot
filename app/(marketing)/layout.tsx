import Navbar from "./_components/navbar";

const MarketingLayout = (
    {children}:
    {children: React.ReactNode
    }) => {
  return (
    <div className="h-screen">
        <Navbar/>
      <main className="h-full pt-[73px]">
        {children}
      </main>
    </div>
  )
}

export default MarketingLayout;
